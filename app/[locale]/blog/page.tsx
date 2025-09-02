import Link from "next/link";
import InteractiveBlogGrid from "@/components/InteractiveBlogGrid";
import { blogData } from "../../../lib/data/blog";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const title =
        locale === "nl"
            ? "Blog - Laatste inzichten over web development, design & digital marketing"
            : "Blog - Latest insights on web development, design & digital marketing";

    const description =
        locale === "nl"
            ? "Blijf op de hoogte van de laatste trends in web development, digitaal ontwerp en digitale marketing. Expert inzichten en praktische tips voor het laten groeien van je online aanwezigheid."
            : "Stay updated with the latest trends in web development, digital design, and digital marketing. Expert insights and practical tips for growing your online presence.";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        alternates: {
            canonical: `/${locale}/blog`,
            languages: {
                "en-US": "/en/blog",
                "nl-NL": "/nl/blog",
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

    return (
        <div className="container py-16">
            {/* Hero Section */}
            <header className="mb-14 text-center">
                <span className="text-sm font-semibold tracking-wider text-[#e2b76f]">
                    {locale === "nl"
                        ? "INZICHTEN & EXPERTISE"
                        : "INSIGHTS & EXPERTISE"}
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-5 text-white">
                    Blog
                </h1>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    {locale === "nl"
                        ? "Blijf voorop met de laatste inzichten in web development, digitaal ontwerp en marketing strategieën. Expert kennis om je online aanwezigheid te laten groeien."
                        : "Stay ahead with the latest insights in web development, digital design, and marketing strategies. Expert knowledge to grow your online presence."}
                </p>
            </header>

            {/* Interactive Blog Grid */}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#e2b76f]"></div>
                    </div>
                }
            >
                <InteractiveBlogGrid posts={blogData} locale={locale} />
            </Suspense>
        </div>
    );
}
