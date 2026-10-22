import Link from "next/link";

type Locale = "en" | "nl";

const T = {
    en: {
        talk: "Web development, digital design and social media.",
        pages: "Pages",
        follow: "Follow",
        legal: "Legal",
        links: [
            ["projects", "Projects"],
            ["services", "Services"],
            ["about", "About"],
            ["blog", "Blog"],
            ["contact", "Contact"],
        ],
        legalLinks: [
            ["privacy-policy", "Privacy policy"],
            ["terms", "Terms of service"],
            ["cookies", "Cookie policy"],
        ],
        newTab: "opens in a new tab",
        rights: "All rights reserved.",
        coc: "Chamber of Commerce",
    },
    nl: {
        talk: "Webdevelopment, digital design en social media.",
        pages: "Pagina's",
        follow: "Volg",
        legal: "Juridisch",
        links: [
            ["projects", "Projecten"],
            ["services", "Diensten"],
            ["about", "Over"],
            ["blog", "Blog"],
            ["contact", "Contact"],
        ],
        legalLinks: [
            ["privacy-policy", "Privacybeleid"],
            ["terms", "Algemene voorwaarden"],
            ["cookies", "Cookiebeleid"],
        ],
        newTab: "opent in een nieuw tabblad",
        rights: "Alle rechten voorbehouden.",
        coc: "KvK",
    },
} as const;

const SOCIALS = [
    ["Instagram", "https://www.instagram.com/sponsmedia_/"],
    ["LinkedIn", "https://linkedin.com/company/sponsmedia"],
    ["GitHub", "https://github.com/Bart-Spons"],
] as const;

export default function Footer({ locale }: { locale: Locale }) {
    const t = T[locale];
    const linkCls = "text-haze transition-colors hover:text-frost";

    return (
        <footer className="border-t border-line" role="contentinfo">
            <div className="container grid gap-14 py-16 md:grid-cols-12 md:py-24">
                <div className="md:col-span-6">
                    <p className="text-2xl font-extrabold tracking-[-0.03em]">SponsMedia</p>
                    <p className="mt-2 max-w-[32ch] text-haze">{t.talk}</p>
                    <div className="mt-8 space-y-1 text-lg">
                        <a href="mailto:contact@sponsmedia.com" className="block w-fit underline decoration-primary decoration-2 underline-offset-[6px] hover:text-primary">
                            contact@sponsmedia.com
                        </a>
                        <a href="tel:+31683092973" className={`block w-fit ${linkCls}`}>
                            +31&nbsp;6&nbsp;83092973
                        </a>
                    </div>
                </div>

                <nav aria-label={t.pages} className="md:col-span-2">
                    <h2 className="mb-4 text-sm text-haze">{t.pages}</h2>
                    <ul className="space-y-2">
                        {t.links.map(([slug, label]) => (
                            <li key={slug}>
                                <Link href={`/${locale}/${slug}`} className={linkCls}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="md:col-span-2">
                    <h2 className="mb-4 text-sm text-haze">{t.follow}</h2>
                    <ul className="space-y-2">
                        {SOCIALS.map(([name, href]) => (
                            <li key={name}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    className={linkCls}
                                >
                                    {name}
                                    <span className="sr-only"> ({t.newTab})</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <nav aria-label={t.legal} className="md:col-span-2">
                    <h2 className="mb-4 text-sm text-haze">{t.legal}</h2>
                    <ul className="space-y-2">
                        {t.legalLinks.map(([slug, label]) => (
                            <li key={slug}>
                                <Link href={`/${locale}/${slug}`} className={linkCls}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="border-t border-line">
                <div className="container flex flex-col gap-2 py-6 text-sm text-haze sm:flex-row sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} SponsMedia. {t.rights}
                    </p>
                    <p>
                        {t.coc} <span className="tabular-nums">97944475</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
