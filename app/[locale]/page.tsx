// app/[locale]/page.tsx
import Link from "next/link";
import { ogImage } from "@/lib/og";
import Image from "next/image";
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import { projectsData, servicesData, blogData } from "@/lib/data";
import Hero from "@/components/home/Hero";
import WorkReel, { type ReelItem } from "@/components/home/WorkReel";
import type { ServiceRow } from "@/components/home/ServicesList";
import ServiceCards from "@/components/home/ServiceCards";
import ClosingCta from "@/components/ClosingCta";
import MeetBart from "@/components/home/MeetBart";
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
    const title = `SponsMedia — ${t("headline").replace(/\*/g, "")}`;
    const description = t("sub");

    return {
        title: { absolute: title },
        description,
        openGraph: {
            images: [ogImage(locale)],
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

            <MeetBart
                locale={locale}
                copy={{
                    kicker: t("meetKicker"),
                    title: t("meetTitle"),
                    text: t("meetText"),
                    link: t("meetLink"),
                }}
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

            {/* Partners */}
            <section aria-labelledby="partners-title" className="container pb-28 md:pb-44">
                <SplitTitle
                    id="partners-title"
                    text={t("partnersTitle")}
                    className="display mb-10 text-[clamp(1.75rem,3vw,2.5rem)] md:mb-14"
                />
                <ul data-stagger className="grid gap-6 md:grid-cols-2">
                    {[
                        { name: "B00", href: "https://b00.com/", logo: "/images/partners/b00.png", w: 507, h: 244, role: t("partnerB00Role") },
                        { name: "Reinspire studio", href: "https://www.reinspire.nl/", logo: "/images/partners/reinspire.png", w: 1219, h: 372, role: t("partnerReinspireRole") },
                    ].map((p) => (
                        <li key={p.name}>
                            <a
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${p.name} (${nl ? "opent in een nieuw tabblad" : "opens in a new tab"})`}
                                className="group flex h-full flex-col gap-8 rounded-[1.5rem] border border-line p-8 transition-colors hover:border-primary/60 md:p-10"
                            >
                            <div className="flex h-36 items-center justify-center rounded-2xl bg-frost/[0.03] px-8 md:h-44">
                                <Image
                                    src={p.logo}
                                    alt={p.name}
                                    width={p.w}
                                    height={p.h}
                                    className="h-auto max-h-24 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105 md:max-h-28"
                                />
                            </div>
                            <p className="flex items-center justify-between gap-4 text-lg font-medium text-primary md:text-xl">
                                {p.role}
                                <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
                            </p>
                            </a>
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
