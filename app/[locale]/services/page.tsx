import Link from "next/link";
import { servicesData } from "../../../lib/data/services";
import { createTranslator } from "next-intl";
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
    const tServices = createTranslator({
        locale,
        messages,
        namespace: "Services",
    });

    const title =
        locale === "en"
            ? "Services - Web Development, Design & Digital Marketing"
            : "Diensten - Web Development, Design & Digital Marketing";
    const description =
        locale === "en"
            ? "Comprehensive digital services including web development, UI/UX design, branding, and social media marketing. Transform your online presence with our expert team."
            : "Uitgebreide digitale diensten waaronder web development, UI/UX design, branding en social media marketing. Transformeer je online aanwezigheid met ons expert team.";

    return {
        title,
        description,
        keywords: [
            "web development",
            "UI/UX design",
            "branding",
            "social media marketing",
            "digital services",
            "Next.js",
            "React",
            "Figma",
        ],
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        alternates: {
            canonical: `/${locale}/services`,
            languages: { "en-US": "/en/services", "nl-NL": "/nl/services" },
        },
    };
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const tServices = createTranslator({
        locale,
        messages,
        namespace: "Services",
    });

    return (
        <div className="relative min-h-screen bg-space">
            {/* Subtiele gouden achtergrondaccenten */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(226,183,111,0.18),transparent)] blur-2xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,97,0.14),transparent)] blur-2xl" />
            </div>

            {/* Hero */}
            <section className="container relative z-10 py-16 sm:py-20 md:py-24">
                <header className="mx-auto max-w-4xl text-center px-4">
                    <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary">
                        {locale === "nl" ? "WAT WE DOEN" : "WHAT WE DO"}
                    </p>
                    <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent">
                        {tServices("title")}
                    </h1>

                    {/* goud accent bar */}
                    <div className="mx-auto mt-5 mb-6 h-1.5 w-24 rounded-full bg-primary/80 shadow-[0_0_28px] shadow-primary/50" />

                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        {tServices("subtitle")}
                    </p>
                </header>

                {/* Services grid */}
                <div className="mt-12 grid gap-8 sm:gap-10">
                    {servicesData.map((service) => (
                        <article
                            key={service.title}
                            className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
                        >
                            {/* Gouden gradient-rand/glow bij hover */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -inset-px rounded-[1.1rem] bg-[linear-gradient(135deg,rgba(226,183,111,0.35),rgba(255,200,97,0.2),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <div className="relative p-6 sm:p-8 lg:p-10">
                                <div className="grid items-start gap-8 lg:grid-cols-2">
                                    {/* Links — hoofdinfo */}
                                    <div>
                                        <div className="mb-5 flex items-start gap-4">
                                            <div className="rounded-2xl bg-primary/12 p-3 text-3xl text-primary ring-1 ring-primary/25">
                                                {service.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                                    {locale === "nl" &&
                                                    service.titleNl
                                                        ? service.titleNl
                                                        : service.title}
                                                </h2>
                                                <p className="mt-1 text-sm md:text-base font-medium text-primary">
                                                    {locale === "nl" &&
                                                    service.highlightNl
                                                        ? service.highlightNl
                                                        : service.highlight}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mb-6 text-base md:text-lg leading-relaxed text-gray-300">
                                            {locale === "nl" && service.descNl
                                                ? service.descNl
                                                : service.desc}
                                        </p>

                                        {/* Tech stack chips */}
                                        <div>
                                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                {tServices("technologiesLabel")}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.technologies.map(
                                                    (tech, i) => (
                                                        <span
                                                            key={`${tech}-${i}`}
                                                            className="rounded-full border border-primary/25 bg-white/5 px-3 py-1 text-xs text-gray-200 transition-colors hover:bg-primary hover:text-black"
                                                        >
                                                            {tech}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rechts — features */}
                                    <div>
                                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            {tServices("whatsIncluded")}
                                        </h4>
                                        <ul className="space-y-3">
                                            {(locale === "nl" &&
                                            service.featuresNl
                                                ? service.featuresNl
                                                : service.features
                                            ).map((feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="mt-2 inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_14px] shadow-primary/60" />
                                                    <p className="text-sm md:text-base text-gray-300 transition-colors group-hover:text-white">
                                                        {feature}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* zachte onder-glow */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-6 bottom-0 h-24 rounded-t-full bg-[radial-gradient(60%_40%_at_50%_100%,rgba(226,183,111,0.25),transparent)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                            />
                        </article>
                    ))}
                </div>

                {/* --- CTA Footer Strip (gold) --- */}
                <div className="mt-12 sm:mt-16 lg:mt-20">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
                        {/* subtle gold glow */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            aria-hidden
                            style={{
                                background:
                                    "radial-gradient(1200px 400px at 10% 0%, rgba(226,183,111,0.18), transparent 60%), radial-gradient(800px 300px at 90% 100%, rgba(255,200,97,0.12), transparent 60%)",
                            }}
                        />
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h2
                                    id="services-cta-title"
                                    className="text-2xl md:text-3xl font-extrabold tracking-tight"
                                >
                                    {tServices("readyTitle")}
                                </h2>
                                <p className="text-muted-foreground mt-2 max-w-2xl">
                                    {tServices("readySubtitle")}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <Link
                                    href={`/${locale}/contact`}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-primary text-black hover:bg-accent transition-colors"
                                    aria-label={tServices("startProject")}
                                >
                                    {tServices("startProject")}
                                    <svg
                                        width="18"
                                        height="18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden
                                    >
                                        <path d="M5 9h8M11 5l4 4-4 4" />
                                    </svg>
                                </Link>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-white/15 text-white hover:bg-white/10 transition-colors"
                                    aria-label={tServices("scheduleCall")}
                                >
                                    {tServices("scheduleCall")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --- /CTA --- */}
            </section>
        </div>
    );
}
