// app/[locale]/blog/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import Script from "next/script";
import type { Metadata } from "next";
import InteractiveBlogGrid from "@/components/InteractiveBlogGrid";
import { blogData } from "@/lib/data/blog";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isNL = locale === "nl";

    const title = isNL
        ? "Blog - Laatste inzichten over web development, design & digital marketing"
        : "Blog - Latest insights on web development, design & digital marketing";

    const description = isNL
        ? "Blijf op de hoogte van de laatste trends in web development, digitaal ontwerp en digitale marketing. Expert inzichten en praktische tips voor het laten groeien van je online aanwezigheid."
        : "Stay updated with the latest trends in web development, digital design, and digital marketing. Expert insights and practical tips for growing your online presence.";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            locale: isNL ? "nl_NL" : "en_US",
        },
        alternates: {
            canonical: `/${locale}/blog`,
            languages: {
                "en-US": "/en/blog",
                "nl-NL": "/nl/blog",
            },
            // 🔗 RSS autodiscovery
            types: {
                "application/rss+xml": `/${locale}/blog/rss.xml`,
            },
        },
    };
}

export default async function BlogIndex({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;
    const isNL = locale === "nl";

    // JSON-LD: Blog schema (CollectionPage)
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: isNL ? "SponsMedia Blog" : "SponsMedia Blog",
        url: `https://sponsmedia.com/${locale}/blog`,
        inLanguage: isNL ? "nl-NL" : "en-US",
        blogPost: blogData.slice(0, 10).map((p) => ({
            "@type": "BlogPosting",
            headline: isNL && p.titleNl ? p.titleNl : p.title,
            url: `https://sponsmedia.com/${locale}/blog/${p.id}`,
            datePublished: p.publishDate,
            image: p.image ? [`https://sponsmedia.com${p.image}`] : undefined,
            author: { "@type": "Person", name: p.author },
        })),
    };

    return (
        <div className="container py-16">
            {/* JSON-LD */}
            <Script id="blog-schema" type="application/ld+json">
                {JSON.stringify(blogSchema)}
            </Script>

            {/* Hero */}
            <header className="mb-16 grid gap-8 pt-8 md:mb-24 md:grid-cols-12 md:items-end md:pt-16">
                <h1 className="display text-[clamp(3rem,8vw,7rem)] md:col-span-7">Blog</h1>
                <p className="max-w-[44ch] text-lg leading-relaxed text-frost/75 md:col-span-5 md:pb-3 md:text-xl">
                    {isNL
                        ? "Inzichten over webdevelopment, digitaal ontwerp en marketing. Praktische kennis om je online zichtbaarheid te laten groeien."
                        : "Insights on web development, digital design and marketing. Practical knowledge to grow your visibility online."}
                </p>
            </header>

            {/* Grid */}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
                    </div>
                }
            >
                <InteractiveBlogGrid posts={blogData} locale={locale} />
            </Suspense>

            {/* CTA to RSS (optioneel) */}
            {/* <div className="mt-10 text-center text-sm text-gray-400">
        <Link
          className="hover:text-primary transition-colors"
          href={`/${locale}/blog/rss.xml`}
        >
          RSS feed
        </Link>
      </div> */}
        </div>
    );
}
