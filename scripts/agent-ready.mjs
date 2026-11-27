// scripts/agent-ready.mjs
//
// Runs after `next build` (static export in out/). Makes the site easy to read
// for AI agents and LLM tools, without any extra dependencies:
//
//   1. Next to every page's index.html, an index.md with the page's main
//      content as clean Markdown (title, description and URL on top).
//      .htaccess serves it to requests that send "Accept: text/markdown".
//   2. Every index.html gets <link rel="alternate" type="text/markdown">.
//   3. /llms.txt: a short index of the site with links to those Markdown pages.
//   4. /llms-full.txt: all English and Dutch pages in one Markdown file.

import { promises as fs } from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] || "out");
const SITE = "https://sponsmedia.com";

// ---------- small HTML helpers ----------

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…", mdash: "—", ndash: "–", middot: "·", rarr: "→", larr: "←", copy: "©", eacute: "é", euml: "ë", iuml: "ï" };
function decode(s) {
    return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
        if (e[0] === "#") {
            const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
            return Number.isFinite(n) ? String.fromCodePoint(n) : m;
        }
        return ENTITIES[e.toLowerCase()] ?? m;
    });
}
const attr = (tag, name) => {
    const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
    return m ? decode(m[2] ?? m[3] ?? "") : "";
};
const meta = (html, re) => {
    const tag = html.match(re);
    return tag ? attr(tag[0], "content") || attr(tag[0], "href") : "";
};
const absolute = (href, pageUrl) => {
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) return href;
    try {
        return new URL(href, pageUrl).href;
    } catch {
        return href;
    }
};

// Remove whole elements (with their content) by tag name
function dropElements(html, tags) {
    for (const t of tags) html = html.replace(new RegExp(`<${t}\\b[^>]*>[\\s\\S]*?<\\/${t}>`, "gi"), " ");
    return html;
}

function htmlToMarkdown(html, pageUrl) {
    let s = dropElements(html, ["script", "style", "noscript", "template", "svg", "iframe", "canvas", "video", "audio", "button", "form", "select", "nav"]);
    s = s.replace(/<!--[\s\S]*?-->/g, "");

    // Inline formatting
    s = s.replace(/<br\s*\/?>/gi, "\n");
    s = s.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (m, t, x) => (x.trim() ? `**${x.trim()}**` : x));
    s = s.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (m, t, x) => (x.trim() ? `*${x.trim()}*` : x));
    s = s.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");
    s = s.replace(/<img\b[^>]*>/gi, (tag) => {
        const alt = attr(tag, "alt").trim();
        return alt ? ` ![${alt}](${absolute(attr(tag, "src"), pageUrl)}) ` : " ";
    });
    s = s.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (m, a, inner) => {
        const text = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        const href = absolute(attr(`<a ${a}>`, "href"), pageUrl);
        if (!text) return " ";
        return href && !href.startsWith("#") ? `[${text}](${href})` : text;
    });

    // Blocks
    s = s.replace(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (m, n, a, x) => {
        // Headings split into letters for animation carry the real text in aria-label
        const text = (attr(`<h ${a}>`, "aria-label") || x.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
        return text ? `\n\n${"#".repeat(Number(n))} ${text}\n\n` : "";
    });
    s = s.replace(/<li\b[^>]*>/gi, "\n- ").replace(/<\/li>/gi, "\n");
    s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, x) => "\n\n> " + x.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() + "\n\n");
    s = s.replace(/<\/?(p|div|section|article|header|footer|main|aside|ul|ol|dl|dt|dd|figure|figcaption|table|tr|details|summary)\b[^>]*>/gi, "\n\n");
    s = s.replace(/<\/?(td|th)\b[^>]*>/gi, " | ");
    s = s.replace(/<[^>]+>/g, "");
    s = decode(s);

    // Tidy whitespace
    return s
        .split("\n")
        .map((l) => l.replace(/[ \t ]+/g, " ").trim())
        .join("\n")
        .replace(/^- *$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/^(- .*)\n\n(?=- )/gm, "$1\n")
        .replace(/^(- .*)\n\n(?=- )/gm, "$1\n")
        .trim();
}

// ---------- the build output ----------

async function walk(dir) {
    const out = [];
    for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "_next") continue;
            out.push(...(await walk(p)));
        } else if (e.name === "index.html") out.push(p);
    }
    return out;
}

function pageInfo(html, rel) {
    const urlPath = "/" + rel.replace(/index\.html$/, "");
    const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim());
    const description = meta(html, /<meta[^>]+name=["']description["'][^>]*>/i);
    const canonical = meta(html, /<link[^>]+rel=["']canonical["'][^>]*>/i) || SITE + urlPath;
    const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang") || "en";
    const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
    return { urlPath, title, description, canonical: absolute(canonical, SITE + urlPath), lang, main };
}

function frontmatter(p) {
    const q = (v) => JSON.stringify(v ?? "");
    return `---\ntitle: ${q(p.title)}\ndescription: ${q(p.description)}\nurl: ${q(p.canonical)}\nlanguage: ${q(p.lang)}\n---\n\n`;
}

// Next copies public/ into out/; make sure the dotfile .htaccess is there too
try {
    await fs.access(path.join(OUT, ".htaccess"));
} catch {
    await fs.copyFile(path.resolve("public/.htaccess"), path.join(OUT, ".htaccess")).catch(() => {});
}

const pages = [];
for (const file of await walk(OUT)) {
    const rel = path.relative(OUT, file).split(path.sep).join("/");
    let html = await fs.readFile(file, "utf8");
    const info = pageInfo(html, rel);
    if (rel === "index.html") continue; // the bare domain, handled below

    let body = htmlToMarkdown(info.main, SITE + info.urlPath);
    if (!/^# /m.test(body) && info.title) body = `# ${info.title}\n\n${body}`;
    const md = frontmatter(info) + body + "\n";
    await fs.writeFile(path.join(path.dirname(file), "index.md"), md);

    const mdUrl = `${info.urlPath}index.md`;
    if (!html.includes('type="text/markdown"')) {
        html = html.replace(/<\/head>/i, `<link rel="alternate" type="text/markdown" href="${mdUrl}"/></head>`);
        await fs.writeFile(file, html);
    }
    pages.push({ ...info, md, mdUrl });
}

// The bare domain answers Markdown requests with the English homepage
const enHome = pages.find((p) => p.urlPath === "/en/");
if (enHome) await fs.writeFile(path.join(OUT, "index.md"), enHome.md);

// ---------- llms.txt ----------

const order = ["", "about/", "services/", "projects/", "blog/", "contact/"];
const legal = ["terms/", "privacy-policy/", "cookies/"];
const rank = (p) => {
    const sub = p.urlPath.replace(/^\/(en|nl)\//, "");
    const i = order.indexOf(sub);
    return i >= 0 ? i : legal.includes(sub) ? 900 : 100 + sub.length;
};
const byLang = (lang) =>
    pages
        .filter((p) => p.urlPath.startsWith(`/${lang}/`))
        .sort((a, b) => rank(a) - rank(b) || a.urlPath.localeCompare(b.urlPath));
const line = (p) => `- [${p.title.replace(/\s*[|—-]\s*SponsMedia$/, "") || p.urlPath}](${SITE}${p.mdUrl})${p.description ? `: ${p.description}` : ""}`;
const group = (list, test) => list.filter(test).map(line).join("\n");

function section(lang) {
    const list = byLang(lang);
    const sub = (p) => p.urlPath.replace(/^\/(en|nl)\//, "");
    const main = group(list, (p) => order.includes(sub(p)));
    const services = group(list, (p) => /^services\/.+/.test(sub(p)));
    const projects = group(list, (p) => /^projects\/.+/.test(sub(p)));
    const posts = group(list, (p) => /^blog\/.+/.test(sub(p)));
    const other = group(list, (p) => legal.includes(sub(p)));
    const nl = lang === "nl";
    return [
        `## ${nl ? "Pagina's (Nederlands)" : "Pages (English)"}\n\n${main}`,
        services && `## ${nl ? "Diensten" : "Services"}\n\n${services}`,
        projects && `## ${nl ? "Projecten" : "Projects"}\n\n${projects}`,
        posts && `## Blog\n\n${posts}`,
        other && `## ${nl ? "Juridisch" : "Legal"}\n\n${other}`,
    ]
        .filter(Boolean)
        .join("\n\n");
}

const llms = `# SponsMedia

> SponsMedia is the studio of Bart Spons, a creative developer from Amsterdam. SponsMedia helps brands get seen online with websites, design, video and social media. The site is in English (/en/) and Dutch (/nl/).

Every page is also available as Markdown: add \`index.md\` to its address, or request it with the header \`Accept: text/markdown\`. The full text of the site is in [llms-full.txt](${SITE}/llms-full.txt).

Contact: contact@sponsmedia.com · Instagram: https://www.instagram.com/sponsmedia_/

${section("en")}

${section("nl")}
`;
await fs.writeFile(path.join(OUT, "llms.txt"), llms);

// ---------- llms-full.txt ----------

const full = ["en", "nl"]
    .flatMap((l) => byLang(l))
    .map((p) => p.md.replace(/^---[\s\S]*?---\n\n/, `<!-- ${p.canonical} -->\n`))
    .join("\n\n---\n\n");
await fs.writeFile(path.join(OUT, "llms-full.txt"), `# SponsMedia: full site text\n\n${full}\n`);

console.log(`agent-ready: ${pages.length} Markdown pages, llms.txt and llms-full.txt written to ${OUT}`);
