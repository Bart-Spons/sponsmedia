// app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { blogData } from "@/lib/data/blog";
import Choreography from "@/components/motion/Choreography";
import SplitTitle from "@/components/motion/SplitTitle";
import ReadingProgress from "@/components/motion/ReadingProgress";
import NextCase from "@/components/projects/NextCase";

// Helpers
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
        cover: post.cover as string | undefined,
        publishDate: post.publishDate,
    };
}

function estimateReadTime(htmlOrMd: string) {
    const text = htmlOrMd.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const words = text.trim().split(" ").filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

function stripEmbeddedShareFooter(html: string) {
    return html.replace(/<div class="mt-16[\s\S]*?<\/div>\s*$/i, "");
}

function enhanceImagesIfMissingClass(html: string) {
    return html.replace(
        /<img(?![^>]*\bclass=)([^>]*)>/g,
        `<img$1 class="mx-0 w-full md:max-w-[70%] lg:max-w-[58%] rounded-2xl shadow-xl ring-1 ring-white/10" />`
    );
}

export async function generateStaticParams() {
    const locales: Array<"en" | "nl"> = ["en", "nl"];
    return locales.flatMap((locale) =>
        blogData.map((post) => ({ locale, slug: post.id }))
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl"; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const raw = blogData.find((p) => p.id === slug);
    if (!raw) return { title: "Post Not Found" };

    const post = getLocalePost(raw, locale);
    const isNL = locale === "nl";

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
            locale: isNL ? "nl_NL" : "en_US",
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

export default async function BlogPost({
    params,
}: {
    params: Promise<{ locale: "en" | "nl"; slug: string }>;
}) {
    const { locale, slug } = await params;
    const raw = blogData.find((p) => p.id === slug);
    if (!raw) notFound();

    const post = getLocalePost(raw!, locale);
    const isNL = locale === "nl";
    const readTime = estimateReadTime(post.content);

    const enhancedHtml = enhanceImagesIfMissingClass(
        stripEmbeddedShareFooter(post.content)
    );

    // Prev/next (optioneel voor UX)
    const sorted = [...blogData].sort(
        (a, b) => +new Date(b.publishDate) - +new Date(a.publishDate)
    );
    const idx = sorted.findIndex((p) => p.id === slug);
    const prev = idx > 0 ? sorted[idx - 1] : null;
    const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

    // JSON-LD: Article + Breadcrumbs
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        inLanguage: isNL ? "nl-NL" : "en-US",
        author: { "@type": "Person", name: post.author },
        publisher: {
            "@type": "Organization",
            name: "SponsMedia",
            logo: {
                "@type": "ImageObject",
                url: "https://sponsmedia.com/logo.png",
            },
        },
        image: post.image ? [`https://sponsmedia.com${post.image}`] : undefined,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://sponsmedia.com/${locale}/blog/${slug}`,
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `https://sponsmedia.com/${locale}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `https://sponsmedia.com/${locale}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://sponsmedia.com/${locale}/blog/${slug}`,
            },
        ],
    };

    const following = next ?? prev;
    const url = `https://sponsmedia.com/${locale}/blog/${slug}`;

    return (
        <Choreography>
            <ReadingProgress />
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify(articleSchema)}
            </Script>
            <Script id="breadcrumbs-schema" type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </Script>

            <article>
                <header className="container pt-10 md:pt-16">
                    <Link
                        href={`/${locale}/blog`}
                        className="text-sm text-haze transition-colors hover:text-frost"
                    >
                        ← {isNL ? "Terug naar blog" : "Back to blog"}
                    </Link>

                    <div data-meta className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-haze md:mt-20">
                        <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString(isNL ? "nl-NL" : "en-GB", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                        <span>
                            {readTime} {isNL ? "min lezen" : "min read"}
                        </span>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                        <span>{post.author}</span>
                        {post.tags.length > 0 && (
                            <span className="flex flex-wrap gap-2 md:ml-auto">
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </span>
                        )}
                    </div>

                    <SplitTitle
                        as="h1"
                        trigger="load"
                        by="words"
                        text={post.title}
                        className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,6.5vw,6rem)]"
                    />
                </header>

                {/* Cover: a modest illustration in the reading column */}
                {(post.cover ?? post.image) && (
                    <div className="container mt-12 md:mt-16">
                        <div
                            data-rise
                            className="relative mx-auto aspect-[16/10] max-w-[68ch] overflow-hidden rounded-[1.25rem] bg-deep md:max-w-[min(68ch,60rem)]"
                        >
                            <Image
                                src={post.cover ?? post.image}
                                alt=""
                                fill
                                priority
                                sizes="(min-width: 768px) 60rem, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Body */}
                <div className="container py-12 md:py-20">
                    <div
                        data-rise
                        className="
              prose prose-invert prose-lg mx-auto max-w-[68ch] md:prose-xl
              prose-headings:font-extrabold prose-headings:tracking-[-0.03em]
              prose-p:text-frost/80 prose-li:text-frost/80
              prose-a:text-primary prose-a:no-underline hover:prose-a:text-accent
              prose-strong:text-frost
              prose-code:bg-deep prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-xl prose-blockquote:p-4
              prose-img:mx-0 prose-img:w-full md:prose-img:max-w-[70%] lg:prose-img:max-w-[58%]
              prose-img:rounded-2xl prose-img:ring-1 prose-img:ring-white/10
              prose-ul:marker:text-primary prose-ol:marker:text-primary
            "
                        dangerouslySetInnerHTML={{ __html: enhancedHtml }}
                    />

                    {/* Share */}
                    <div className="mx-auto mt-16 flex max-w-[68ch] flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
                        <p className="text-haze">
                            {isNL ? "Artikel interessant? Deel het met je netwerk." : "Enjoyed this article? Share it with your network."}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost h-11 px-5"
                            >
                                X
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost h-11 px-5"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {following && (
                    <NextCase
                        href={`/${locale}/blog/${following.id}`}
                        label={next ? (isNL ? "Volgend artikel" : "Next article") : isNL ? "Vorig artikel" : "Previous article"}
                        title={(isNL && following.titleNl) || following.title}
                        image={following.cover ?? following.image}
                        long
                    />
                )}
            </article>
        </Choreography>
    );
}
