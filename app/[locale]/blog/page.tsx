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
            <header className="mb-14 text-center">
                <span className="text-ms font-semibold tracking-wider text-[#e2b76f]">
                    {isNL ? "INZICHTEN & EXPERTISE" : "INSIGHTS & EXPERTISE"}
                </span>
                <h1 className="text-3xl md:text-6xl font-extrabold mt-3 mb-5 text-white">
                    Blog
                </h1>
                <div className="mx-auto mt-5 mb-6 h-1.5 w-24 rounded-full bg-primary/80 shadow-[0_0_28px] shadow-primary/50" />
                <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    {isNL
                        ? "Blijf voorop met de laatste inzichten in web development, digitaal ontwerp en marketing strategieën. Expert kennis om je online aanwezigheid te laten groeien."
                        : "Stay ahead with the latest insights in web development, digital design, and marketing strategies. Expert knowledge to grow your online presence."}
                </p>
            </header>

            {/* Grid */}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#e2b76f]" />
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
