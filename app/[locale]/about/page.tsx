// app/[locale]/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FocusTitle from "@/components/motion/FocusTitle";
import SplitTitle from "@/components/motion/SplitTitle";
import Choreography from "@/components/motion/Choreography";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import Magnet from "@/components/reactbits/Magnet";
import ClosingCta from "@/components/ClosingCta";

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

    const orMail: string = (await import(`@/messages/${locale}.json`)).default.Home.orMail;

    const links = [
        { href: "https://www.linkedin.com/in/bartspons/", label: t.socials.linkedin, icon: "linkedin" },
        { href: "https://bartspons.com", label: t.socials.site, icon: "globe" },
        { href: "https://github.com/Bart-Spons", label: t.socials.github, icon: "github" },
    ] as const;

    const stats = [
        { value: 5, suffix: "+", label: t.statsYearsLabel },
        { value: 15, suffix: "+", label: t.statsProjectsLabel },
    ];

    const what = [
        { title: t.whatDevTitle, body: t.whatDevBody, stack: t.whatDevStack, link: t.whatDevLink, href: `/${locale}/services` },
        { title: t.whatDesignTitle, body: t.whatDesignBody, stack: t.whatDesignStack, link: t.whatDesignLink, href: `/${locale}/projects` },
        { title: t.whatStratTitle, body: t.whatStratBody, stack: t.whatStratStack, link: t.whatStratLink, href: `/${locale}/blog` },
    ];

    return (
        <Choreography>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />

            {/* Hero: name behind the lens */}
            <header className="container grid gap-8 pb-16 pt-16 md:grid-cols-12 md:items-end md:pb-24 md:pt-28">
                <div className="md:col-span-8">
                    <FocusTitle text={t.h1} className="display text-[clamp(3.25rem,9vw,8.5rem)]" />
                </div>
                <p data-meta className="max-w-[30ch] text-xl leading-relaxed text-frost/80 md:col-span-4 md:pb-3">
                    <span className="block">{t.whoIntro}</span>
                </p>
            </header>

            {/* Portrait: opens from an inset card to full width */}
            <div data-case-media className="relative aspect-[4/5] w-full overflow-hidden bg-deep md:aspect-[16/9] md:max-h-[90svh]">
                <div data-case-media-inner className="absolute inset-0">
                    <Image
                        src="/placeholders/jp-1800.webp"
                        alt="Bart Spons — Web Developer"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[50%_45%] md:object-[50%_50%]"
                    />
                </div>
            </div>

            {/* Story */}
            <section aria-labelledby="who-title" className="container grid gap-10 py-20 md:grid-cols-12 md:py-32">
                <h2 id="who-title" className="self-start text-haze md:sticky md:top-28 md:col-span-3">
                    <span className="tabular-nums text-primary">01</span> {t.whoTitle}
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-frost/80 md:col-span-8 md:col-start-5 md:text-xl">
                    <p data-rise>{t.whoP1}</p>
                    <p data-rise>{t.whoP2}</p>
                    <p data-rise>{t.whoP3}</p>
                </div>
            </section>

            {/* Main focus: sharpens as you read */}
            <section className="container pb-20 md:pb-32">
                <p className="mb-6 text-haze">
                    <span className="tabular-nums text-primary">02</span> {t.mainFocusStrong.replace(/:$/, "")}
                </p>
                <ScrollReveal
                    as="p"
                    baseOpacity={0.12}
                    enableBlur
                    blurStrength={6}
                    baseRotation={0}
                    containerClassName="max-w-[30ch]"
                    textClassName="text-[clamp(1.9rem,4.2vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em]"
                    wordAnimationEnd="bottom 60%"
                >
                    {t.mainFocusTail.trim()}
                </ScrollReveal>

                <div className="mt-14 md:mt-20">
                    <p data-rise className="mb-5 text-haze">
                        {t.linksLead}
                    </p>
                    <ul data-rise className="flex flex-wrap gap-3">
                        {links.map((l) => (
                            <li key={l.href}>
                                <Magnet padding={40} magnetStrength={4} maxOffset={10}>
                                    <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${l.label} (opens in new tab)`}
                                        className="btn btn-ghost h-12 px-6 text-base"
                                    >
                                        <SocialIcon name={l.icon} />
                                        {l.label}
                                    </a>
                                </Magnet>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Proof: numbers that count up */}
            <section aria-labelledby="proof-title" className="container pb-20 md:pb-32">
                <h2 id="proof-title" className="mb-10 text-haze">
                    <span className="tabular-nums text-primary">03</span> {t.proofTitle}
                </h2>
                <dl className="grid gap-y-10 border-t border-line pt-10 sm:grid-cols-3">
                    {stats.map((s) => (
                        <div key={s.label} className="flex flex-col-reverse">
                            <dt className="mt-3 text-haze">{s.label}</dt>
                            <dd className="display text-[clamp(4.5rem,11vw,10rem)] leading-none">
                                <span data-count>{s.value}</span>
                                <span className="text-primary">{s.suffix}</span>
                            </dd>
                        </div>
                    ))}
                    <div className="flex flex-col-reverse justify-end">
                        <dt className="mt-3 text-haze">{t.proofItems[0].split(":")[0]}</dt>
                        <dd className="display text-[clamp(2rem,4vw,3.25rem)] leading-none tabular-nums sm:pt-[clamp(1.5rem,3.5vw,3.5rem)]">
                            97944475
                        </dd>
                    </div>
                </dl>
            </section>

            {/* What I do: big rows */}
            <section aria-labelledby="what-title" className="container pb-24 md:pb-36">
                <header className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
                    <SplitTitle id="what-title" text={t.whatTitle} className="display text-[clamp(2.75rem,6vw,6rem)] md:col-span-7" />
                    <p data-rise className="text-lg text-haze md:col-span-4 md:col-start-9">
                        {t.whatLead}
                    </p>
                </header>
                <ol className="border-b border-line">
                    {what.map((w, i) => (
                        <li key={w.title} data-row className="relative">
                            <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                            <Link
                                href={w.href}
                                className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline md:gap-10 md:py-14"
                            >
                                <span className="overflow-hidden md:col-span-1">
                                    <span data-row-text className="block tabular-nums text-haze">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </span>
                                <span className="overflow-hidden pb-[0.08em] md:col-span-5">
                                    <span
                                        data-row-text
                                        className="display block text-[clamp(2.5rem,5.5vw,5rem)] transition-[color,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 group-hover:text-primary"
                                    >
                                        {w.title}
                                    </span>
                                </span>
                                <span className="overflow-hidden md:col-span-6">
                                    <span data-row-text className="block text-lg leading-relaxed text-frost/80">
                                        {w.body}
                                    </span>
                                    <span data-row-text className="mt-3 block text-sm text-haze">
                                        {w.stack}
                                    </span>
                                    <span data-row-text className="mt-5 block font-semibold text-primary">
                                        {w.link}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </section>

            <ClosingCta
                locale={locale}
                title={t.ctaMidTitle}
                sub={t.ctaMidSub}
                button={t.ctaMidPrimary}
                orMail={orMail}
            />
        </Choreography>
    );
}

function SocialIcon({ name }: { name: "linkedin" | "globe" | "github" }) {
    if (name === "globe")
        return (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d={name === "linkedin" ? "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" : "M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"} />
        </svg>
    );
}
