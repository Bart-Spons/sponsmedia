"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RdxSelect from "@/components/ui/RdxSelect";
import { blogData as defaultPosts } from "@/lib/data/blog";

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

type CardPost = BlogPost & {
    title: string;
    excerpt: string;
    tags: string[];
    date: Date;
};

export default function InteractiveBlogGrid({
    posts,
    locale = "en",
}: {
    posts?: BlogPost[];
    locale?: "en" | "nl";
}) {
    const L = locale === "nl";
    const LABELS = {
        search: L ? "Zoek artikelen..." : "Search articles...",
        allCats: L ? "Alle categorieën" : "All Categories",
        readMore: L ? "Lees meer" : "Read more",
        found: (n: number) =>
            L
                ? `${n} ${n === 1 ? "artikel" : "artikelen"} gevonden`
                : `${n} article${n === 1 ? "" : "s"} found`,
    };

    // fallback naar blogData als posts niet meegegeven is
    const source = posts && posts.length ? posts : defaultPosts;

    const normalized = useMemo<CardPost[]>(() => {
        return source
            .map((p) => {
                const title = L && p.titleNl ? p.titleNl : p.title;
                const excerpt = L && p.excerptNl ? p.excerptNl : p.excerpt;
                const tags = (L && p.tagsNl ? p.tagsNl : p.tags) || [];
                const date = new Date(p.publishDate);
                return { ...p, title, excerpt, tags, date };
            })
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [source, L]);

    const allCategories = useMemo(() => {
        const set = new Set<string>();
        normalized.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
        return Array.from(set).sort((a, b) =>
            a.localeCompare(b, L ? "nl" : "en")
        );
    }, [normalized, L]);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string>("__all__");

    const filtered = useMemo<CardPost[]>(() => {
        const q = query.trim().toLowerCase();
        return normalized.filter((p) => {
            const matchesQ =
                !q ||
                [p.title, p.excerpt, ...(p.tags || [])]
                    .join(" • ")
                    .toLowerCase()
                    .includes(q);
            const matchesCat =
                category === "__all__" ||
                (p.tags || []).some(
                    (t) => t.toLowerCase() === category.toLowerCase()
                );
            return matchesQ && matchesCat;
        });
    }, [normalized, query, category]);

    const categoryOptions = [
        { value: "__all__", label: LABELS.allCats },
        ...allCategories.map((c) => ({ value: c, label: c })),
    ];

    return (
        <section>
            {/* Filters */}
            <div className="mx-auto max-w-5xl mb-10">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={LABELS.search}
                            className="w-full h-[48px] rounded-xl bg-black/30 border border-white/20 px-5 pr-11
                         text-white placeholder:text-gray-400
                         focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40"
                        />
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
                    </div>

                    {/* Category */}
                    <RdxSelect
                        value={category}
                        onValueChange={setCategory}
                        placeholder={LABELS.allCats}
                        options={categoryOptions}
                    />
                </div>

                {/* Count */}
                <p className="text-center text-sm text-gray-500 mt-3">
                    {LABELS.found(filtered.length)}
                </p>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400">
                        {L
                            ? "Geen resultaten. Probeer een andere zoekterm of categorie."
                            : "No results. Try a different query or category."}
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-10">
                    {filtered.map((post) => (
                        <article
                            key={post.id}
                            className="group rounded-2xl overflow-hidden border border-white/10
                         bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#10141c]
                         shadow-lg transition-transform duration-300 will-change-transform
                         hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-[#e2b76f]/40"
                        >
                            {/* Media link */}
                            <Link
                                href={`/${locale}/blog/${post.id}`}
                                className="block relative"
                                aria-label={post.title}
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                </div>
                            </Link>

                            <div className="p-6 md:p-7">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(post.tags || []).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title link */}
                                <Link
                                    href={`/${locale}/blog/${post.id}`}
                                    className="inline-block group/title"
                                    aria-label={post.title}
                                >
                                    <h3 className="text-xl md:text-[1.35rem] font-semibold text-white leading-snug transition-colors group-hover/title:text-[#e2b76f]">
                                        {post.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-400 mt-2 md:mt-3 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-[12px] text-gray-500 mt-5">
                                    <span>{post.author}</span>
                                    <time dateTime={String(post.publishDate)}>
                                        {post.date.toLocaleDateString(
                                            L ? "nl-NL" : "en-US",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </time>
                                </div>

                                <div className="mt-6">
                                    {/* Read more link (separate, geen nesting) */}
                                    <Link
                                        href={`/${locale}/blog/${post.id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                               bg-[#23272f] text-white hover:text-black hover:bg-[#e2b76f]
                               transition-colors"
                                        aria-label={LABELS.readMore}
                                    >
                                        {LABELS.readMore}
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
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
