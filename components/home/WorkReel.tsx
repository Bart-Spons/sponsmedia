"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ReelItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    year: string;
    image: string;
    video?: string;
    technologies: string[];
};

/**
 * The signature moment of the site: every project starts out of focus and
 * sharpens as you scroll it into view — "be more visible", literally.
 */
export default function WorkReel({
    locale,
    items,
    viewCase,
}: {
    locale: "en" | "nl";
    items: ReelItem[];
    viewCase: string;
}) {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray<HTMLElement>("[data-focus-media]").forEach((el) => {
                    gsap.fromTo(
                        el,
                        { filter: "blur(22px) saturate(0.4)", scale: 0.88, opacity: 0.45 },
                        {
                            filter: "blur(0px) saturate(1)",
                            scale: 1,
                            opacity: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 95%",
                                end: "center 60%",
                                scrub: 0.6,
                            },
                        }
                    );
                });

                gsap.utils.toArray<HTMLElement>("[data-focus-copy]").forEach((el) => {
                    gsap.from(el.children, {
                        autoAlpha: 0,
                        y: 24,
                        stagger: 0.08,
                        duration: 0.9,
                        ease: "expo.out",
                        scrollTrigger: { trigger: el, start: "top 80%" },
                    });
                });
            });
        },
        { scope: root }
    );

    return (
        <div ref={root} className="space-y-24 md:space-y-40">
            {items.map((p, i) => (
                <article
                    key={p.id}
                    className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10"
                >
                    <Link
                        href={`/${locale}/projects/${p.id}`}
                        aria-label={`${p.title}: ${viewCase}`}
                        className={`group block md:col-span-8 ${i % 2 ? "md:order-2 md:col-start-5" : ""}`}
                    >
                        <div
                            data-focus-media
                            className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-deep will-change-[filter,transform]"
                        >
                            <ReelMedia item={p} priority={i === 0} />
                        </div>
                    </Link>

                    <div
                        data-focus-copy
                        className={`md:col-span-4 ${i % 2 ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`}
                    >
                        <p className="text-sm text-haze">
                            {p.category}, {p.year}
                        </p>
                        <h3 className="display mt-3 text-[clamp(2.5rem,5vw,4.5rem)]">
                            <Link
                                href={`/${locale}/projects/${p.id}`}
                                className="transition-colors hover:text-primary"
                            >
                                {p.title}
                            </Link>
                        </h3>
                        <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-frost/80">
                            {p.description}
                        </p>
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {p.technologies.map((t) => (
                                <li
                                    key={t}
                                    className="rounded-full border border-line px-3 py-1 text-xs text-haze"
                                >
                                    {t}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={`/${locale}/projects/${p.id}`}
                            className="mt-8 inline-block font-semibold underline decoration-primary decoration-2 underline-offset-[6px] hover:text-primary"
                        >
                            {viewCase}
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
}

/** Poster image, with the video only loaded and played while it's on screen. */
function ReelMedia({ item, priority }: { item: ReelItem; priority: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (v.preload === "none") v.preload = "auto";
                    v.play().catch(() => {});
                } else v.pause();
            },
            { threshold: 0.35 }
        );
        io.observe(v);
        return () => io.disconnect();
    }, []);

    return (
        <>
            <Image
                src={item.image}
                alt=""
                fill
                priority={priority}
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
            />
            {item.video && (
                <video
                    ref={videoRef}
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                />
            )}
        </>
    );
}
