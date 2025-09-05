import { NextResponse } from "next/server";
import { blogData } from "@/lib/data/blog";

export const dynamic = "force-static"; // statisch bouwen
export const revalidate = 3600; // cache 1 uur

function escapeXml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET(
    _req: Request,
    ctx: { params: { locale: "en" | "nl" } }
) {
    const { locale } = ctx.params;
    const isNL = locale === "nl";

    const site = "https://sponsmedia.com";
    const channelTitle = isNL ? "SponsMedia Blog (NL)" : "SponsMedia Blog (EN)";
    const channelDesc = isNL
        ? "Laatste inzichten over web development, design en digital marketing."
        : "Latest insights on web development, design and digital marketing.";

    // sorteer nieuwste eerst (optioneel limiet, bv. 50)
    const items = blogData
        .slice()
        .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate))
        .map((post) => {
            const title = isNL && post.titleNl ? post.titleNl : post.title;
            const desc = isNL && post.excerptNl ? post.excerptNl : post.excerpt;
            const url = `${site}/${locale}/blog/${post.id}`;
            const pubDate = new Date(post.publishDate).toUTCString();

            return `
<item>
  <title>${escapeXml(title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${pubDate}</pubDate>
  <description><![CDATA[${desc}]]></description>
</item>`.trim();
        })
        .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(channelTitle)}</title>
  <link>${site}/${locale}/blog</link>
  <language>${isNL ? "nl-NL" : "en-US"}</language>
  <description>${escapeXml(channelDesc)}</description>
  ${items}
</channel>
</rss>`;

    return new NextResponse(rss, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            // Feeds wil je meestal niet indexeren als aparte pagina:
            "X-Robots-Tag": "noindex",
        },
    });
}
