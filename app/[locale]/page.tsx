import { createTranslator } from "next-intl";
import Link from "next/link";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import BlogSection from "@/components/BlogSection";
import HeroGraphic from "@/components/HeroGraphic";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const tHero = createTranslator({ locale, messages, namespace: "Hero" });

    const title = tHero("title");
    const description = tHero("sub");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                "en-US": "/en",
                "nl-NL": "/nl",
            },
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;

    const messages =
        locale === "nl"
            ? (await import("@/messages/nl.json")).default
            : (await import("@/messages/en.json")).default;

    const tHero = createTranslator({ locale, messages, namespace: "Hero" });

    return (
        <div className="container">
            {/* HERO */}
            <section className="relative" aria-labelledby="hero-title">
                <div className="py-12 sm:py-8 md:py-6 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                    <header className="min-w-0">
                        <p
                            className="text-xl xl:text-xl font-medium tracking-widest text-primary"
                            role="doc-subtitle"
                        >
                            {tHero("eyebrow")}
                        </p>
                        <h1
                            id="hero-title"
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-tight mt-2 break-words hyphens-auto"
                        >
                            {tHero("title")}
                        </h1>
                        <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-prose break-words">
                            {tHero("sub")}
                        </p>
                        {/* <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-prose break-words">
                            {tHero("tagline")}
                        </p> */}
                        <nav
                            className="mt-5 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 min-w-0"
                            role="navigation"
                            aria-label="Primary actions"
                        >
                            <Link
                                href={`/${locale}/projects`}
                                className="btn btn-ghost flex-shrink-0 justify-center"
                                aria-describedby="projects-link-desc"
                            >
                                {tHero("seeWork")}
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                className="btn btn-primary flex-shrink-0 justify-center"
                                aria-describedby="contact-link-desc"
                            >
                                {tHero("getInTouch")}
                            </Link>
                        </nav>
                        <div className="sr-only">
                            <span id="projects-link-desc">
                                {tHero("projectsDescription")}
                            </span>
                            <span id="contact-link-desc">
                                {tHero("contactDescription")}
                            </span>
                        </div>
                    </header>

                    <div
                        aria-label="Interactive Earth visualization showing global presence"
                        className="flex items-center justify-center"
                    >
                        <HeroGraphic key={locale} />
                    </div>
                </div>
            </section>

            {/* SECTIONS — alles netjes BINNEN de return */}
            <ServicesSection locale={locale} />
            <ProjectsSection locale={locale} />
            <BlogSection locale={locale} />

            {/* CTA onderaan: compact + zonder extra hero */}
            <CTASection locale={locale} variant="compact" />
        </div>
    );
}
