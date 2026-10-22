// app/[locale]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import { projectsData, servicesData, blogData } from "@/lib/data";
import Hero from "@/components/home/Hero";
import WorkReel, { type ReelItem } from "@/components/home/WorkReel";
import type { ServiceRow } from "@/components/home/ServicesList";
import ServiceCards from "@/components/home/ServiceCards";
import ClosingCta from "@/components/ClosingCta";
import BlogCard from "@/components/BlogCard";
import Choreography from "@/components/motion/Choreography";
import SplitTitle from "@/components/motion/SplitTitle";

type Locale = "en" | "nl";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

async function getMessages(locale: Locale) {
    return locale === "nl"
        ? (await import("@/messages/nl.json")).default
        : (await import("@/messages/en.json")).default;
}

export async function generateMetadata({
    params,
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const { locale } = params;
    const messages = await getMessages(locale);
    const t = createTranslator({ locale, messages, namespace: "Home" });
    const title = `SponsMedia — ${t("headline")}`;
    const description = t("sub");

    return {
        title: { absolute: title },
        description,
        openGraph: {
            title,
            description,
            url: `/${locale}`,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        alternates: {
            canonical: `/${locale}`,
            languages: { "en-US": "/en", "nl-NL": "/nl" },
        },
    };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const nl = locale === "nl";
    const messages = await getMessages(locale);
    const t = createTranslator({ locale, messages, namespace: "Home" });

    const featured = projectsData.filter((p) => p.featured);

    const reel: ReelItem[] = featured.map((p) => ({
        id: p.id,
        title: (nl && p.titleNl) || p.title,
        description: (nl && p.descriptionNl) || p.description,
        category: (nl && p.categoryNl) || p.category,
        year: p.completedDate.slice(0, 4),
        image: p.image,
        video: p.video,
        technologies: p.technologies,
    }));

    const services: ServiceRow[] = servicesData.map((s) => ({
        slug: s.slug,
        title: (nl && s.titleNl) || s.title,
        desc: (nl && s.descNl) || s.desc,
        highlight: (nl && s.highlightNl) || s.highlight,
        features: (nl && s.featuresNl) || s.features,
        technologies: s.technologies,
    }));

    const posts = [...blogData]
        .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
        .slice(0, 3);

    const dateFmt = new Intl.DateTimeFormat(nl ? "nl-NL" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Choreography>
            <Hero
                locale={locale}
                copy={{
                    kicker: t("kicker"),
                    headline: t("headline"),
                    focusWords: t("focusWords"),
                    sub: t("sub"),
                    seeWork: t("seeWork"),
                    startProject: t("startProject"),
                    recentFor: t("recentFor"),
                }}
                clients={featured.map((p) => ({
                    id: p.id,
                    name: p.client || p.title,
                }))}
            />

            {/* Work */}
            <section aria-labelledby="work-title" className="container pb-28 md:pb-44">
                <header className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
                    <SplitTitle id="work-title" text={t("workTitle")} className="display text-[clamp(1.75rem,3vw,2.5rem)] md:col-span-5" />
                    <p data-rise className="max-w-[46ch] text-lg leading-relaxed text-haze md:col-span-5 md:col-start-8">
                        {t("workIntro")}
                    </p>
                </header>

                <WorkReel locale={locale} items={reel} viewCase={t("viewCase")} />

                <div className="mt-20 md:mt-28">
                    <Link href={`/${locale}/projects`} className="btn btn-ghost h-12 px-7 text-base">
                        {t("allProjects")}
                    </Link>
                </div>
            </section>

            {/* Services */}
            <section aria-labelledby="services-title" className="container pb-28 md:pb-44">
                <header className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
                    <SplitTitle id="services-title" text={t("servicesTitle")} className="display text-[clamp(1.75rem,3vw,2.5rem)] md:col-span-5" />
                    <p data-rise className="max-w-[46ch] text-lg leading-relaxed text-haze md:col-span-5 md:col-start-8">
                        {t("servicesIntro")}
                    </p>
                </header>
                <ServiceCards locale={locale} items={services} more={nl ? "Bekijk dienst" : "View service"} />
            </section>

            {/* Blog */}
            <section aria-labelledby="blog-title" className="container pb-28 md:pb-44">
                <header className="mb-10 flex items-end justify-between gap-6">
                    <SplitTitle id="blog-title" text={t("blogTitle")} className="display text-[clamp(1.75rem,3vw,2.5rem)]" />
                    <Link
                        href={`/${locale}/blog`}
                        className="font-semibold underline decoration-primary decoration-2 underline-offset-[6px] hover:text-primary"
                    >
                        {t("allPosts")}
                    </Link>
                </header>
                <ul data-stagger className="grid gap-x-6 gap-y-12 md:grid-cols-3">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <BlogCard
                                href={`/${locale}/blog/${post.id}`}
                                image={post.cover ?? post.image}
                                title={(nl && post.titleNl) || post.title}
                                date={post.publishDate}
                                dateLabel={dateFmt.format(new Date(post.publishDate))}
                                tags={(nl && post.tagsNl) || post.tags}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <ClosingCta
                locale={locale}
                title={t("ctaTitle")}
                sub={t("ctaSub")}
                button={t("startProject")}
                orMail={t("orMail")}
            />
        </Choreography>
    );
}
