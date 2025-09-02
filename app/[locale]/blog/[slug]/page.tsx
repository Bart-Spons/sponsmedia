// app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogData } from "@/lib/data/blog";

// — Helpers —
function getLocalePost(post: any, locale: "en" | "nl") {
    const L = locale === "nl";
    return {
        id: post.id,
        title: L && post.titleNl ? post.titleNl : post.title,
        excerpt: L && post.excerptNl ? post.excerptNl : post.excerpt,
        content: L && post.contentNl ? post.contentNl : post.content,
        tags: (L && post.tagsNl ? post.tagsNl : post.tags) || [],
        author: post.author,
        image: post.image,
        publishDate: post.publishDate,
    };
}

function estimateReadTime(htmlOrMd: string) {
    // simpele schatting: 200 wpm
    const text = htmlOrMd.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const words = text.trim().split(" ").filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

/** Strip het embedded share-blok dat onderaan in sommige content-items zit */
function stripEmbeddedShareFooter(html: string) {
    // Matcht het laatste blok dat in je data staat (begint met mt-16 ...)
    // en verwijdert dat aan het einde van de content.
    return html.replace(/<div class="mt-16[\s\S]*?<\/div>\s*$/i, "");
}

/** Voeg nette img-klassen toe als er nog geen class="" op de <img> staat */
function enhanceImagesIfMissingClass(html: string) {
    return html.replace(
        /<img(?![^>]*\bclass=)([^>]*)>/g,
        `<img$1 class="mx-0 w-full md:max-w-[70%] lg:max-w-[58%] rounded-2xl shadow-xl ring-1 ring-white/10" />`
    );
}

// — Static params (locale + slug) —
export async function generateStaticParams() {
    const locales: Array<"en" | "nl"> = ["en", "nl"];
    return locales.flatMap((locale) =>
        blogData.map((post) => ({ locale, slug: post.id }))
    );
}

// — Metadata —
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl"; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const raw = blogData.find((p) => p.id === slug);
    if (!raw) return { title: "Post Not Found" };

    const post = getLocalePost(raw, locale);

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishDate,
            authors: [post.author],
            tags: post.tags,
            images: post.image ? [{ url: post.image }] : undefined,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : undefined,
        },
        alternates: {
            canonical: `/${locale}/blog/${slug}`,
            languages: {
                "en-US": `/en/blog/${slug}`,
                "nl-NL": `/nl/blog/${slug}`,
            },
        },
    };
}

// — Page —
export default async function BlogPost({
    params,
}: {
    params: Promise<{ locale: "en" | "nl"; slug: string }>;
}) {
    const { locale, slug } = await params;
    const raw = blogData.find((p) => p.id === slug);
    if (!raw) notFound();

    const post = getLocalePost(raw!, locale);
    const readTime = estimateReadTime(post.content);

    // ✨ Content opschonen + img’s verrijken
    const enhancedHtml = enhanceImagesIfMissingClass(
        stripEmbeddedShareFooter(post.content)
    );

    return (
        <div className="container py-10 md:py-16 max-w-4xl mx-auto">
            {/* Back */}
            <nav className="mb-8">
                <Link
                    href={`/${locale}/blog`}
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                >
                    <svg
                        className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    {locale === "nl" ? "Terug naar Blog" : "Back to Blog"}
                </Link>
            </nav>

            <article>
                {/* Header */}
                <header className="mb-8 text-center">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-5">
                            {post.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm bg-white/5 text-gray-300 rounded-full border border-white/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                        {post.title}
                    </h1>

                    <div className="text-sm text-gray-400 flex flex-wrap items-center justify-center gap-4">
                        <span>{post.author}</span>
                        <span>•</span>
                        <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString(
                                locale === "nl" ? "nl-NL" : "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </time>
                        <span>•</span>
                        <span>
                            {readTime}{" "}
                            {locale === "nl" ? "min lezen" : "min read"}
                        </span>
                    </div>
                </header>

                {/* Hero image – contain en compacter */}
                {post.image && (
                    <div className="relative w-full max-w-3xl mx-auto h-[220px] md:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden mb-8 shadow-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-contain object-center"
                            priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
                    </div>
                )}

                {/* Body */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-10 shadow-xl">
                    <div
                        className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-black prose-headings:tracking-tight
              prose-a:no-underline hover:prose-a:text-accent
              prose-strong:text-white
              prose-code:bg-gray-900/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-xl prose-blockquote:p-4
              /* afbeeldingen links + compacte desktopbreedtes */
              prose-img:mx-0 prose-img:w-full md:prose-img:max-w-[70%] lg:prose-img:max-w-[58%]
              prose-img:rounded-2xl prose-img:ring-1 prose-img:ring-white/10 prose-img:shadow-xl
              prose-ul:marker:text-primary prose-ol:marker:text-primary
            "
                        dangerouslySetInnerHTML={{ __html: enhancedHtml }}
                    />

                    {/* Enige share-balk (de embedded variant is gestript) */}
                    <div className="mt-10 p-6 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="text-sm text-gray-300">
                                <p className="font-semibold mb-1">
                                    {locale === "nl"
                                        ? "Artikel interessant?"
                                        : "Enjoyed this article?"}
                                </p>
                                <p>
                                    {locale === "nl"
                                        ? "Deel het met je netwerk!"
                                        : "Share it with your network!"}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                        post.title
                                    )}&url=${encodeURIComponent(
                                        `https://sponsmedia.com/${locale}/blog/${slug}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors text-sm font-medium"
                                >
                                    Share on X
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                        `https://sponsmedia.com/${locale}/blog/${slug}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-700/20 hover:bg-blue-700/30 text-blue-300 rounded-lg transition-colors text-sm font-medium"
                                >
                                    Share on LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back button */}
                <div className="text-center mt-10">
                    <Link
                        href={`/${locale}/blog`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                       bg-white/10 hover:bg-white/15 text-white transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        {locale === "nl"
                            ? "Terug naar alle artikelen"
                            : "Back to all articles"}
                    </Link>
                </div>
            </article>
        </div>
    );
}
