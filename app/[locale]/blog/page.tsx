// app/[locale]/blog/page.tsx
import Script from "next/script";
import type { Metadata } from "next";
import InteractiveBlogGrid from "@/components/InteractiveBlogGrid";
import PageHeader from "@/components/PageHeader";
import Choreography from "@/components/motion/Choreography";
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
        <Choreography>
            <Script id="blog-schema" type="application/ld+json">
                {JSON.stringify(blogSchema)}
            </Script>

            <PageHeader
                title="Blog"
                lens={false}
                intro={
                    isNL
                        ? "Inzichten over webdevelopment, digitaal ontwerp en marketing. Praktische kennis om je online zichtbaarheid te laten groeien."
                        : "Insights on web development, digital design and marketing. Practical knowledge to grow your visibility online."
                }
            />

            <div className="container pb-28 md:pb-44">
                <InteractiveBlogGrid posts={blogData} locale={locale} />
            </div>
        </Choreography>
    );
}
