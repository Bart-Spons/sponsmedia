"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { blogData as defaultPosts } from "@/lib/data/blog";
import { duration, ease, motionOK, stagger } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

type BlogPost = {
    id: string;
    title: string;
    titleNl?: string;
    excerpt: string;
    excerptNl?: string;
    tags: string[];
    tagsNl?: string[];
    author: string;
    publishDate: string | Date;
    image: string;
};

type RowPost = BlogPost & { date: Date };

/**
 * Blog index in the same language as the projects index: one big row per
 * article, a preview image that trails the cursor, search and category chips.
 * Filtering re-plays a short, interruptible stagger on the rows.
 */
export default function InteractiveBlogGrid({
    posts,
    locale = "en",
}: {
    posts?: BlogPost[];
    locale?: "en" | "nl";
}) {
    const L = locale === "nl";
    const LABELS = {
        search: L ? "Zoek artikelen" : "Search articles",
        all: L ? "Alles" : "All",
        found: (n: number) =>
            L ? `${n} ${n === 1 ? "artikel" : "artikelen"}` : `${n} article${n === 1 ? "" : "s"}`,
        empty: L
            ? "Geen resultaten. Probeer een andere zoekterm of categorie."
            : "No results. Try a different search or category.",
    };

    const source = posts && posts.length ? posts : defaultPosts;

    const normalized = useMemo<RowPost[]>(
        () =>
            source
                .map((p) => ({
                    ...p,
                    title: (L && p.titleNl) || p.title,
                    excerpt: (L && p.excerptNl) || p.excerpt,
                    tags: ((L && p.tagsNl) || p.tags) ?? [],
                    date: new Date(p.publishDate),
                }))
                .sort((a, b) => b.date.getTime() - a.date.getTime()),
        [source, L]
    );

    const categories = useMemo(() => {
        const set = new Set<string>();
        normalized.forEach((p) => p.tags.forEach((t) => set.add(t)));
        return Array.from(set).sort((a, b) => a.localeCompare(b, L ? "nl" : "en"));
    }, [normalized, L]);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string | null>(null);
    const [active, setActive] = useState(0);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return normalized.filter((p) => {
            const matchesQ = !q || [p.title, p.excerpt, ...p.tags].join(" ").toLowerCase().includes(q);
            const matchesCat = !category || p.tags.some((t) => t.toLowerCase() === category.toLowerCase());
            return matchesQ && matchesCat;
        });
    }, [normalized, query, category]);

    const dateFmt = new Intl.DateTimeFormat(L ? "nl-NL" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const root = useRef<HTMLElement>(null);
    const preview = useRef<HTMLDivElement>(null);
    const moveX = useRef<((v: number) => void) | null>(null);
    const moveY = useRef<((v: number) => void) | null>(null);

    // Rows rise in on first load and again after every filter change.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(motionOK, () => {
                gsap.fromTo(
                    "[data-post-row]",
                    { y: 24, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: duration.short,
                        ease: ease.enter,
                        stagger,
                        overwrite: true,
                        clearProps: "transform",
                    }
                );
            });
        },
        { scope: root, dependencies: [query, category], revertOnUpdate: false }
    );

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(`(pointer: fine) and ${motionOK}`, () => {
                gsap.set(preview.current, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
                moveX.current = gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "power3" });
                moveY.current = gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "power3" });
                return () => {
                    moveX.current = null;
                    moveY.current = null;
                };
            });
        },
        { scope: root }
    );

    const show = (visible: boolean, e?: React.MouseEvent) => {
        if (!moveX.current) return;
        // First appearance: start right under the cursor instead of flying in from a corner.
        if (visible && e) gsap.set(preview.current, { x: e.clientX, y: e.clientY });
        gsap.to(preview.current, {
            autoAlpha: visible ? 1 : 0,
            scale: visible ? 1 : 0.6,
            rotate: visible ? 3 : 0,
            duration: visible ? duration.short : duration.short * 0.6,
            ease: visible ? ease.enter : ease.exit,
            overwrite: "auto",
        });
    };

    const chip = (label: string, value: string | null) => {
        const on = category === value;
        return (
            <button
                key={label}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={on}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                    on
                        ? "border-primary bg-primary text-night"
                        : "border-line text-frost/80 hover:border-frost/40 hover:text-frost"
                }`}
            >
                {label}
            </button>
        );
    };

    return (
        <section ref={root}>
            {/* Filters */}
            <div data-meta className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
                <label className="relative block md:col-span-5">
                    <span className="sr-only">{LABELS.search}</span>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={LABELS.search}
                        className="h-14 w-full border-b border-line bg-transparent pr-10 text-xl text-frost outline-none transition-colors placeholder:text-haze focus:border-primary"
                    />
                    <svg
                        className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-haze"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                    >
                        <path
                            d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                </label>
                <div className="flex flex-wrap gap-2 md:col-span-7 md:justify-end">
                    {chip(LABELS.all, null)}
                    {categories.map((c) => chip(c, c))}
                </div>
            </div>

            <p aria-live="polite" className="mb-4 text-sm text-haze">
                {LABELS.found(filtered.length)}
            </p>

            {filtered.length === 0 ? (
                <p className="border-t border-line py-20 text-haze">{LABELS.empty}</p>
            ) : (
                <ol
                    className="border-b border-line"
                    onMouseEnter={(e) => show(true, e)}
                    onMouseLeave={() => show(false)}
                    onMouseMove={(e) => {
                        moveX.current?.(e.clientX);
                        moveY.current?.(e.clientY);
                    }}
                >
                    {filtered.map((post) => (
                        <li key={post.id} data-post-row className="border-t border-line">
                            <Link
                                href={`/${locale}/blog/${post.id}`}
                                onMouseEnter={() => setActive(normalized.indexOf(post))}
                                onFocus={() => setActive(normalized.indexOf(post))}
                                className="group grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-3 py-8 md:grid-cols-12 md:items-baseline md:gap-x-10 md:py-10"
                            >
                                {/* Small thumbnail on touch screens, where there is no cursor preview */}
                                <span className="relative row-span-2 aspect-square overflow-hidden rounded-lg bg-deep md:hidden">
                                    <Image src={post.image} alt="" fill sizes="88px" className="object-cover" />
                                </span>
                                <time
                                    dateTime={String(post.publishDate)}
                                    className="text-sm tabular-nums text-haze md:col-span-2"
                                >
                                    {dateFmt.format(post.date)}
                                </time>
                                <span className="md:col-span-7">
                                    <span className="block text-[clamp(1.4rem,3vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.03em] transition-[color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 group-hover:text-primary">
                                        {post.title}
                                    </span>
                                    <span className="mt-3 hidden max-w-[60ch] leading-relaxed text-frost/70 md:line-clamp-2">
                                        {post.excerpt}
                                    </span>
                                </span>
                                <span className="col-start-2 text-sm text-haze md:col-span-3 md:col-start-auto md:text-right">
                                    {post.tags.slice(0, 2).join(", ")}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            )}

            {/* Cursor preview */}
            <div
                ref={preview}
                aria-hidden
                className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[clamp(16rem,24vw,26rem)] overflow-hidden rounded-xl bg-deep shadow-2xl md:block"
            >
                {normalized.map((p, i) => (
                    <Image
                        key={p.id}
                        src={p.image}
                        alt=""
                        fill
                        sizes="26rem"
                        className={`object-cover transition-[opacity,transform] duration-500 ${
                            i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
