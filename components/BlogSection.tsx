// components/HomeBlogSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/lib/data/blog";

export default function HomeBlogSection({
    locale = "en",
}: {
    locale?: "en" | "nl";
}) {
    const L = locale === "nl";

    const posts = blogData
        .map((p) => ({
            ...p,
            title: L && p.titleNl ? p.titleNl : p.title,
            excerpt: L && p.excerptNl ? p.excerptNl : p.excerpt,
            tags: (L && p.tagsNl ? p.tagsNl : p.tags) || [],
            date: new Date(p.publishDate),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 2);

    return (
        <section id="blog" className="py-16">
            <div className="container max-w-6xl mx-auto">
                {/* Header – centered like Projects */}
                <header className="text-center mb-10">
                    {/* <p className="text-[10px] md:text-xs tracking-[0.22em] text-white/60 uppercase">
                        {L ? "INSIGHTS & EXPERTISE" : "INSIGHTS & EXPERTISE"}
                    </p> */}
                    <h2 className="text-4xl md:text-4xl font-extrabold mb-4">
                        {L ? "Blog" : "Blog"}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {L
                            ? "Onze laatste inzichten over web development, design en social media."
                            : "Latest insights on web development, design, and social media."}
                    </p>
                </header>

                {/* Cards grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="group rounded-2xl overflow-hidden border border-white/10 bg-[#0c0f14]
                         ring-1 ring-white/5 hover:ring-[#e2b76f]/30 transition-all"
                        >
                            <Link
                                href={`/${locale}/blog/${post.id}`}
                                className="block"
                            >
                                {/* Media */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                                </div>
                            </Link>

                            {/* Bottom panel, like Projects cards */}
                            <div className="p-6 md:p-7 bg-gradient-to-b from-white/[0.02] to-white/[0.05] border-t border-white/10">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-gray-300 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <Link
                                    href={`/${locale}/blog/${post.id}`}
                                    className="group/title inline-block"
                                >
                                    <h3
                                        className="text-xl md:text-[1.35rem] font-semibold text-white leading-snug
                                 transition-colors group-hover/title:text-[#e2b76f]"
                                    >
                                        {post.title}
                                    </h3>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-gray-400 mt-2 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Small CTA */}
                                <div className="mt-6">
                                    <Link
                                        href={`/${locale}/blog/${post.id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                               bg-[#23272f] text-white hover:text-black hover:bg-[#e2b76f]
                               transition-colors"
                                    >
                                        {L ? "Lees artikel" : "Read article"}
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

                {/* Big pill CTA centered – like “View All Projects” */}
                <div className="mt-10 text-center">
                    <Link
                        href={`/${locale}/blog`}
                        className="inline-flex h-11 items-center rounded-full px-6 font-medium text-black
                       bg-gradient-to-r from-primary to-accent shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]
                       hover:brightness-105 transition"
                    >
                        {L ? "Bekijk alle blogs" : "View All Blogs"}
                        <svg
                            className="ml-2 w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M5 12h14M13 5l7 7-7 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
