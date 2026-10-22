"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Locale = "en" | "nl";

const LABELS = {
    en: {
        home: "SponsMedia, home",
        main: "Main navigation",
        open: "Open menu",
        close: "Close menu",
        menu: "Menu",
        links: [
            ["projects", "Projects"],
            ["services", "Services"],
            ["about", "About"],
            ["blog", "Blog"],
        ],
        cta: "Start a project",
        lang: "Language",
    },
    nl: {
        home: "SponsMedia, home",
        main: "Hoofdnavigatie",
        open: "Menu openen",
        close: "Menu sluiten",
        menu: "Menu",
        links: [
            ["projects", "Projecten"],
            ["services", "Diensten"],
            ["about", "Over"],
            ["blog", "Blog"],
        ],
        cta: "Start een project",
        lang: "Taal",
    },
} as const;

function swapLocale(pathname: string, target: Locale) {
    const parts = pathname.split("/");
    if (parts[1] === "en" || parts[1] === "nl") parts[1] = target;
    else parts.splice(1, 0, target);
    return parts.join("/") || `/${target}`;
}

export default function Nav({ locale }: { locale: Locale }) {
    const L = LABELS[locale];
    const pathname = usePathname() || `/${locale}`;
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [solid, setSolid] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // Hide the bar while scrolling down, bring it back on the way up.
    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setSolid(y > 24);
            setHidden(y > 240 && y > last);
            last = y;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        document.documentElement.classList.toggle("lenis-stopped", open);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Menu opening is the one place the nav itself moves: links rise in order.
    useGSAP(
        () => {
            if (!open || !panelRef.current) return;
            gsap.fromTo(
                panelRef.current.querySelectorAll("[data-menu-item]"),
                { yPercent: 110 },
                {
                    yPercent: 0,
                    duration: 0.7,
                    ease: "expo.out",
                    stagger: 0.06,
                }
            );
        },
        { dependencies: [open] }
    );

    const isActive = (slug: string) =>
        pathname.startsWith(`/${locale}/${slug}`);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] border-b ${
                hidden && !open ? "-translate-y-full" : "translate-y-0"
            } ${
                solid || open
                    ? "bg-night/85 backdrop-blur-md border-line"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
                <Link
                    href={`/${locale}`}
                    aria-label={L.home}
                    className="text-lg font-extrabold tracking-[-0.03em] md:text-xl"
                >
                    SponsMedia
                </Link>

                <nav aria-label={L.main} className="hidden md:block">
                    <ul className="flex items-center gap-8 text-[0.95rem]">
                        {L.links.map(([slug, label]) => (
                            <li key={slug}>
                                <Link
                                    href={`/${locale}/${slug}`}
                                    aria-current={isActive(slug) ? "page" : undefined}
                                    className={`relative py-2 transition-colors hover:text-frost ${
                                        isActive(slug) ? "text-frost" : "text-haze"
                                    } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-500 ${
                                        isActive(slug)
                                            ? "after:scale-x-100"
                                            : "after:scale-x-0 hover:after:scale-x-100"
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden items-center gap-5 md:flex">
                    <LangSwitch locale={locale} pathname={pathname} label={L.lang} />
                    <Link href={`/${locale}/contact`} className="btn btn-primary">
                        {L.cta}
                    </Link>
                </div>

                <button
                    type="button"
                    className="-mr-2 flex h-11 items-center gap-3 px-2 text-sm font-semibold md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? L.close : L.open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span aria-hidden>{L.menu}</span>
                    <span aria-hidden className="relative block h-3 w-6">
                        <span
                            className={`absolute left-0 h-[2px] w-6 bg-frost transition-transform duration-300 ${
                                open ? "top-[5px] rotate-45" : "top-0"
                            }`}
                        />
                        <span
                            className={`absolute left-0 h-[2px] w-6 bg-frost transition-transform duration-300 ${
                                open ? "top-[5px] -rotate-45" : "top-[10px]"
                            }`}
                        />
                    </span>
                </button>
            </div>

            {open && (
                <div
                    id="mobile-menu"
                    ref={panelRef}
                    data-lenis-prevent
                    className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-night md:hidden"
                >
                    <nav aria-label={L.main} className="container flex h-full flex-col pb-10 pt-8">
                        <ul className="space-y-1">
                            {[...L.links, ["contact", "Contact"] as const].map(
                                ([slug, label]) => (
                                    <li key={slug} className="overflow-hidden">
                                        <Link
                                            data-menu-item
                                            href={`/${locale}/${slug}`}
                                            className={`display block py-1 text-[2.75rem] ${
                                                isActive(slug) ? "text-primary" : "text-frost"
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                        <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                            <LangSwitch locale={locale} pathname={pathname} label={L.lang} />
                            <Link href={`/${locale}/contact`} className="btn btn-primary">
                                {L.cta}
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

function LangSwitch({
    locale,
    pathname,
    label,
}: {
    locale: Locale;
    pathname: string;
    label: string;
}) {
    return (
        <div role="group" aria-label={label} className="flex items-center gap-1 text-sm">
            {(["en", "nl"] as const).map((l) => (
                <Link
                    key={l}
                    href={swapLocale(pathname, l)}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === locale ? "true" : undefined}
                    className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                        l === locale
                            ? "bg-frost/10 text-frost"
                            : "text-haze hover:text-frost"
                    }`}
                >
                    {l}
                </Link>
            ))}
        </div>
    );
}
