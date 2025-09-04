// app/[locale]/not-found.tsx
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Locale = "nl" | "en";

const T: Record<
    Locale,
    {
        code: string;
        brand: string;
        title: string;
        desc: string;
        back: string;
        home: string;
        contact: string;
        popular: string;
    }
> = {
    nl: {
        code: "404",
        brand: "SponsMedia",
        title: "Pagina niet gevonden",
        desc: "Deze pagina bestaat niet. Controleer de URL of ga terug naar de homepage.",
        back: "Vorige pagina",
        home: "Terug naar home",
        contact: "Neem contact op",
        popular: "Populaire bestemmingen",
    },
    en: {
        code: "404",
        brand: "SponsMedia",
        title: "Page not found",
        desc: "This page does not exist. Check the URL or go back to the homepage.",
        back: "Go back",
        home: "Back to home",
        contact: "Contact us",
        popular: "Popular destinations",
    },
};

export default function NotFound() {
    const router = useRouter();
    const { locale } = useParams() as { locale?: Locale };
    const currentLocale: Locale =
        locale === "nl" || locale === "en" ? locale : "en";
    const t = T[currentLocale];

    // Safe back: alleen terug als referrer hetzelfde domein is, anders naar locale-home
    const handleBack = () => {
        if (typeof window === "undefined") return;
        try {
            const ref = document.referrer;
            if (ref && new URL(ref).origin === window.location.origin) {
                router.back();
                return;
            }
        } catch {
            // ignore parse errors
        }
        router.replace(`/${currentLocale}`);
    };

    return (
        <main className="relative min-h-screen bg-space text-white">
            {/* zachte glows */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(226,183,111,0.16),transparent)] blur-2xl" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,97,0.10),transparent)] blur-2xl" />
            </div>

            <section className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
                {/* Brand */}
                <Link
                    href={`/${currentLocale}`}
                    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
                    prefetch={false}
                    aria-label={`${t.brand} home`}
                >
                    {t.brand}
                </Link>

                <p className="text-primary font-semibold tracking-[0.2em] mb-2">
                    {t.code}
                </p>

                {/* H1 niet afsnijden */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight md:leading-[1.1] tracking-[-0.02em] pb-1">
                    {t.title}
                </h1>

                <p className="mt-4 text-gray-300 max-w-xl">{t.desc}</p>

                {/* CTA's */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold border border-white/15 text-white hover:bg-white/10 transition-colors"
                    >
                        {t.back}
                    </button>
                    <Link
                        href={`/${currentLocale}`}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold bg-primary text-black hover:bg-accent transition-colors"
                        prefetch={false}
                    >
                        {t.home}
                    </Link>
                    <Link
                        href={`/${currentLocale}/contact`}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold border border-white/15 text-white hover:bg-white/10 transition-colors"
                        prefetch={false}
                    >
                        {t.contact}
                    </Link>
                </div>

                {/* Popular destinations – compact */}
                <div className="mt-10 text-sm text-gray-400">
                    <p className="mb-3 font-semibold tracking-wide uppercase">
                        {t.popular}
                    </p>
                    <ul className="flex flex-wrap justify-center gap-4">
                        <li>
                            <Link
                                href={`/${currentLocale}/services`}
                                className="underline hover:text-white"
                                prefetch={false}
                            >
                                {currentLocale === "nl"
                                    ? "Diensten"
                                    : "Services"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${currentLocale}/projects`}
                                className="underline hover:text-white"
                                prefetch={false}
                            >
                                {currentLocale === "nl"
                                    ? "Projecten"
                                    : "Projects"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${currentLocale}/blog`}
                                className="underline hover:text-white"
                                prefetch={false}
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${currentLocale}/contact`}
                                className="underline hover:text-white"
                                prefetch={false}
                            >
                                {currentLocale === "nl" ? "Contact" : "Contact"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
