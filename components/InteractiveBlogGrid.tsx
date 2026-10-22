"use client";

import { useMemo, useRef, useState } from "react";
import BlogCard from "@/components/BlogCard";
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
    cover?: string;
};

type RowPost = BlogPost & { date: Date };

/**
 * Blog index: the same cards as on the homepage, with search and category
 * chips. Filtering re-plays a short, interruptible stagger on the cards.
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
    // Cards rise in on first load and again after every filter change.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(motionOK, () => {
                gsap.fromTo(
                    "[data-post-card]",
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
                <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((post) => (
                        <li key={post.id} data-post-card>
                            <BlogCard
                                href={`/${locale}/blog/${post.id}`}
                                image={post.cover ?? post.image}
                                title={post.title}
                                date={String(post.publishDate)}
                                dateLabel={dateFmt.format(post.date)}
                                tags={post.tags}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
