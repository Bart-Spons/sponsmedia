"use client";

import Link from "next/link";
import FocusTitle from "@/components/motion/FocusTitle";
import Choreography from "@/components/motion/Choreography";
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
        desc: "Deze pagina is uit beeld geraakt. Controleer de URL of ga terug naar de homepage.",
        back: "Vorige pagina",
        home: "Terug naar home",
        contact: "Neem contact op",
        popular: "Populaire bestemmingen",
    },
    en: {
        code: "404",
        brand: "SponsMedia",
        title: "Page not found",
        desc: "This page went out of focus. Check the URL or go back to the homepage.",
        back: "Go back",
        home: "Back to home",
        contact: "Contact us",
        popular: "Popular destinations",
    },
};

export default function NotFoundView() {
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

    const popular = [
        { href: `/${currentLocale}/projects`, label: currentLocale === "nl" ? "Projecten" : "Projects" },
        { href: `/${currentLocale}/services`, label: currentLocale === "nl" ? "Diensten" : "Services" },
        { href: `/${currentLocale}/blog`, label: "Blog" },
        { href: `/${currentLocale}/contact`, label: "Contact" },
    ];

    // The 404 itself never quite comes into focus: the lens keeps searching.
    return (
        <Choreography>
            <section className="container flex min-h-[calc(100svh-5rem)] flex-col justify-center py-16">
                <FocusTitle
                    as="p"
                    text={t.code}
                    className="display text-[clamp(8rem,34vw,30rem)] leading-[0.8] tabular-nums"
                />

                <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
                    <div data-meta className="md:col-span-6">
                        <h1 className="display text-[clamp(2.25rem,5vw,4.5rem)]">{t.title}</h1>
                        <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-frost/75">{t.desc}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href={`/${currentLocale}`} className="btn btn-primary h-12 px-7 text-base" prefetch={false}>
                                {t.home}
                            </Link>
                            <button type="button" onClick={handleBack} className="btn btn-ghost h-12 px-7 text-base">
                                {t.back}
                            </button>
                        </div>
                    </div>

                    <nav aria-label={t.popular} className="md:col-span-5 md:col-start-8">
                        <p className="mb-3 text-sm text-haze">{t.popular}</p>
                        <ul className="border-b border-line">
                            {popular.map((p) => (
                                <li key={p.href} data-row className="relative">
                                    <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                                    <Link href={p.href} prefetch={false} className="group flex items-baseline justify-between py-4">
                                        <span className="overflow-hidden">
                                            <span
                                                data-row-text
                                                className="block text-2xl font-bold tracking-[-0.02em] transition-[color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 group-hover:text-primary"
                                            >
                                                {p.label}
                                            </span>
                                        </span>
                                        <span aria-hidden className="text-haze transition-colors group-hover:text-primary">
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>
        </Choreography>
    );
}
