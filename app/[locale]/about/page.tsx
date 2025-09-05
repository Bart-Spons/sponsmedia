// app/[locale]/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProofTrust from "@/components/ui/ProofTrust";

type Locale = "en" | "nl";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

/** ──────────────────────────────────────────────────────────────────────────
 *  TEXT COPY (EN/NL)
 *  ────────────────────────────────────────────────────────────────────────── */
const copy = {
    en: {
        metaTitle: "About - SponsMedia | Web Development & Digital Strategy",
        metaDesc:
            "Meet Bart — a 25-year-old Creative Developer in Amsterdam. I build fast websites and social-first strategies that actually perform.",
        eyebrow: "ABOUT",
        h1: "Hey, I’m Bart 👋",

        // Who I Am
        whoTitle: "Who I Am",
        whoIntro: "Bart, 25-year-old Creative Developer living in Amsterdam.",
        whoP1: "I started coding as a teenager, and the moment I shipped my first project to the web, there was no going back.",
        whoP2: "I moved from the south of the Netherlands to Amsterdam for university and recently graduated. During my degree I spent a year studying in the United States and later worked for a year in Japan at an international branding and marketing agency. That path gave me a front-row view of how digital behaviour and marketing differ across cultures.",
        whoP3: "Over the last few years I’ve noticed a pattern: many websites look great but load slowly or break on mobile. And many social accounts publish good content but still don’t grow.",
        mainFocusStrong: "Main focus:",
        mainFocusTail:
            " make your digital presence perform — faster websites, higher search rankings, more visitors, and social audiences that actually grow.",

        linksLead: "Connect & see work:",
        socials: {
            linkedin: "LinkedIn",
            site: "Personal Website",
            github: "GitHub",
        },

        // Small stats row (optional)
        statsYearsValue: "5+",
        statsYearsLabel: "years exp.",
        statsProjectsValue: "15+",
        statsProjectsLabel: "projects",

        // Proof & Trust
        proofTitle: "Proof & Trust",
        proofItems: [
            "Chamber of Commerce (KvK): 97944475",
            "5+ years’ experience",
            "15+ projects",
        ],

        // What I do
        whatTitle: "What I Do",
        whatLead: "Let’s skip the fluff and keep it practical.",
        whatDevTitle: "Development",
        whatDevBody:
            "Fast, secure, accessible websites and apps — optimized for speed and search. Built with modern frameworks and clean code that scales.",
        whatDevStack:
            "Next.js • React • TypeScript • Tailwind CSS • Headless WordPress",
        whatDesignTitle: "Design",
        whatDesignBody:
            "UI/UX that looks great and converts. Design systems, component libraries and brand-consistent visuals that are easy to ship.",
        whatDesignStack: "Figma • Framer • Design Systems • Accessibility",
        whatStratTitle: "Strategy",
        whatStratBody:
            "Data-driven growth: SEO that ranks, social that reaches and analytics that guide decisions.",
        whatStratStack: "SEO • Social Media • Analytics • Content Strategy",
        whatDevLink: "See services →",
        whatDesignLink: "See work →",
        whatStratLink: "Read insights →",

        // CTA
        ctaMidTitle: "Ready to talk?",
        ctaMidSub:
            "Tell me about your project — the first intro call is free and without obligation.",
        ctaMidPrimary: "Contact",

        // Misc
        breadcrumbHome: "Home",
    },

    nl: {
        metaTitle: "Over - SponsMedia | Webontwikkeling & Digitale Strategie",
        metaDesc:
            "Maak kennis met Bart — 25 jaar, Creative Developer in Amsterdam. Ik bouw snelle websites en social-first strategieën die écht presteren.",
        eyebrow: "OVER",
        h1: "Hey, ik ben Bart 👋",

        // Wie ik ben
        whoTitle: "Wie ik ben",
        whoIntro: "Bart, 25 jaar, Creative Developer in Amsterdam.",
        whoP1: "Als tiener begon ik met programmeren en vanaf het moment dat ik mijn eerste project online zette, was er geen weg meer terug.",
        whoP2: "Ik verhuisde vanuit het zuiden van Nederland naar Amsterdam voor mijn studie die ik recent heb afgerond. Tijdens mijn studie heb ik een jaar in de Verenigde Staten gestudeerd en later een jaar in Japan gewerkt bij een internationaal branding- en marketingbureau. Deze ervaringen gaven me een uniek inkijkje in hoe digitaal gedrag en marketing per cultuur verschillen.",
        whoP3: "De afgelopen jaren viel me iets op: veel websites zien er goed uit, maar laden traag of werken slecht op mobiel. En veel social-accounts plaatsen goede content, maar groeien tóch niet.",
        mainFocusStrong: "Hoofdfocus:",
        mainFocusTail:
            " Jouw digitale aanwezigheid verbeteren — snellere websites, hogere zoekposities, meer bezoekers en social media pagina's die wél groeien.",

        linksLead: "Connect & bekijk werk:",
        socials: {
            linkedin: "LinkedIn",
            site: "Persoonlijke Website",
            github: "GitHub",
        },

        // Kleine stats rij (optioneel)
        statsYearsValue: "5+",
        statsYearsLabel: "jaar ervaring",
        statsProjectsValue: "15+",
        statsProjectsLabel: "projecten",

        // Proof & Trust
        proofTitle: "Bewijs & Vertrouwen",
        proofItems: [
            "KvK-nummer: 97944475",
            "5+ jaar ervaring",
            "15+ projecten",
        ],

        // Wat ik doe
        whatTitle: "Wat ik doe",
        whatLead: "Zonder ruis — praktisch en helder.",
        whatDevTitle: "Development",
        whatDevBody:
            "Snelle, veilige en toegankelijke websites en apps — geoptimaliseerd voor performance en vindbaarheid. Met moderne frameworks en schaalbare, schone code.",
        whatDevStack:
            "Next.js • React • TypeScript • Tailwind CSS • Headless WordPress",
        whatDesignTitle: "Design",
        whatDesignBody:
            "UI/UX die er goed uitziet én converteert. Design systems, component libraries en consistente visuals die snel te bouwen zijn.",
        whatDesignStack: "Figma • Framer • Design Systems • Toegankelijkheid",
        whatStratTitle: "Strategie",
        whatStratBody:
            "Data-gedreven groei: SEO die scoort, social dat bereik opbouwt en analytics die keuzes onderbouwen.",
        whatStratStack: "SEO • Social Media • Analytics • Content Strategie",
        whatDevLink: "Bekijk diensten →",
        whatDesignLink: "Bekijk werk →",
        whatStratLink: "Lees inzichten →",

        // CTA
        ctaMidTitle: "Klaar om te sparren?",
        ctaMidSub:
            "Vertel iets over je project — het eerste gesprek is gratis en vrijblijvend.",
        ctaMidPrimary: "Contact",

        // Misc
        breadcrumbHome: "Home",
    },
} as const;

/** ──────────────────────────────────────────────────────────────────────────
 *  METADATA
 *  ────────────────────────────────────────────────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = copy[locale];

    return {
        title: t.metaTitle,
        description: t.metaDesc,
        openGraph: {
            title: t.metaTitle,
            description: t.metaDesc,
            url: `/${locale}/about`,
            images: [
                { url: "/og.jpg", width: 1200, height: 630, alt: "SponsMedia" },
            ],
            type: "website",
            locale: locale === "nl" ? "nl_NL" : "en_US",
        },
        alternates: {
            canonical: `/${locale}/about`,
            languages: { "en-US": "/en/about", "nl-NL": "/nl/about" },
        },
    };
}

/** ──────────────────────────────────────────────────────────────────────────
 *  PAGE
 *  ────────────────────────────────────────────────────────────────────────── */
export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = copy[locale];
    const site = "https://sponsmedia.com";

    const jsonLdAbout = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: t.metaTitle,
        url: `${site}/${locale}/about`,
        primaryImageOfPage: `${site}/og.jpg`,
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: t.breadcrumbHome,
                    item: `${site}/${locale}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: locale === "nl" ? "Over" : "About",
                    item: `${site}/${locale}/about`,
                },
            ],
        },
        mainEntity: {
            "@type": "Organization",
            name: "SponsMedia",
            url: site,
            logo: `${site}/logo.png`,
            sameAs: [
                "https://www.instagram.com/sponsmedia_/",
                "https://linkedin.com/company/sponsmedia",
                "https://www.linkedin.com/in/bartspons",
                "https://codepen.io/LuckyBart",
            ],
        },
    };

    const jsonLdPerson = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Bart Spons",
        jobTitle: "Founder, Creative Developer",
        worksFor: { "@type": "Organization", name: "SponsMedia", url: site },
        sameAs: [
            "https://www.linkedin.com/in/bartspons",
            "https://codepen.io/LuckyBart",
            "https://www.instagram.com/sponsmedia_/",
        ],
    };

    return (
        <div className="min-h-screen bg-space">
            <section className="container py-16 relative">
                {/* soft background accents */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                >
                    <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(226,183,111,0.18),transparent)] blur-2xl" />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,97,0.14),transparent)] blur-2xl" />
                </div>

                {/* JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLdAbout),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLdPerson),
                    }}
                />

                {/* HERO */}
                <div className="text-center max-w-4xl mx-auto mb-10 relative z-10">
                    <p className="text-ms font-semibold tracking-[0.2em] text-primary">
                        {t.eyebrow}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {t.h1}
                    </h1>
                    <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-primary/80 shadow-[0_0_28px] shadow-primary/50" />
                </div>

                {/* STORY + PHOTO */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
                        <div className="grid gap-8 lg:grid-cols-[minmax(360px,480px)_1fr] items-stretch">
                            {/* Image */}
                            <div className="relative h-full min-h-[320px] lg:min-h-[520px] rounded-3xl overflow-hidden border border-white/15 shadow-xl">
                                <Image
                                    src="/placeholders/jp.png"
                                    alt="Bart Spons — Web Developer"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 480px"
                                    className="object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent"
                                    aria-hidden
                                />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col justify-center h-full">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {t.whoTitle}
                                </h2>

                                <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                                    <p>
                                        <strong className="text-white">
                                            {t.whoIntro}
                                        </strong>
                                    </p>
                                    <p>{t.whoP1}</p>
                                    <p>{t.whoP2}</p>
                                    <p>{t.whoP3}</p>
                                    <p>
                                        <strong className="text-white">
                                            {t.mainFocusStrong}
                                        </strong>
                                        {t.mainFocusTail}
                                    </p>
                                    <p>{t.linksLead}</p>
                                </div>

                                {/* Links */}
                                <div className="flex flex-wrap gap-4 mt-6">
                                    <a
                                        href="https://www.linkedin.com/in/bartspons/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                        aria-label={`${t.socials.linkedin} (opens in new tab)`}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                                        </svg>
                                        {t.socials.linkedin}
                                    </a>

                                    <a
                                        href="https://bartspons.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                                        aria-label={`${t.socials.site} (opens in new tab)`}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {t.socials.site}
                                    </a>

                                    <a
                                        href="https://github.com/Bart-Spons"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                        aria-label={`${t.socials.github} (opens in new tab)`}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden
                                        >
                                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        {t.socials.github}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WHAT I DO */}
                {/* What I Do */}
                <section className="container py-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-3">
                            {t.whatTitle}
                        </h2>
                        <p className="text-gray-300">{t.whatLead}</p>
                    </div>

                    {/* stretch alle items even hoog */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                        {/* Development */}
                        <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col hover:bg-white/10 transition-colors">
                            <div className="text-3xl mb-4">💻</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t.whatDevTitle}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {t.whatDevBody}
                            </p>
                            <div className="mt-4 text-sm text-gray-400">
                                {t.whatDevStack}
                            </div>

                            {/* CTA onderaan */}
                            <div className="mt-auto pt-6">
                                <Link
                                    href={`/${locale}/services`}
                                    className="text-primary group-hover:text-accent"
                                >
                                    {t.whatDevLink}
                                </Link>
                            </div>
                        </article>

                        {/* Design */}
                        <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col hover:bg-white/10 transition-colors">
                            <div className="text-3xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t.whatDesignTitle}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {t.whatDesignBody}
                            </p>
                            <div className="mt-4 text-sm text-gray-400">
                                {t.whatDesignStack}
                            </div>

                            <div className="mt-auto pt-6">
                                <Link
                                    href={`/${locale}/projects`}
                                    className="text-primary group-hover:text-accent"
                                >
                                    {t.whatDesignLink}
                                </Link>
                            </div>
                        </article>

                        {/* Strategy */}
                        <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col hover:bg-white/10 transition-colors">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t.whatStratTitle}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {t.whatStratBody}
                            </p>
                            <div className="mt-4 text-sm text-gray-400">
                                {t.whatStratStack}
                            </div>

                            <div className="mt-auto pt-6">
                                <Link
                                    href={`/${locale}/blog`}
                                    className="text-primary group-hover:text-accent"
                                >
                                    {t.whatStratLink}
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>

                {/* PROOF & TRUST */}
                <ProofTrust
                    locale={locale}
                    kvk="97944475"
                    years={5}
                    projects={15}
                />

                {/* CTA */}
                <div className="mt-10 text-center">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-10 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {t.ctaMidTitle}
                        </h3>
                        <p className="text-gray-300 mb-6">{t.ctaMidSub}</p>
                        <Link
                            href={`/${locale}/contact`}
                            className="btn btn-primary"
                        >
                            {t.ctaMidPrimary}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
