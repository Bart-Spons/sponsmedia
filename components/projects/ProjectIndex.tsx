"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ReelItem } from "@/components/home/WorkReel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Table of contents for the work: huge project names in rows. On devices with
 * a mouse, a preview of the hovered project trails the cursor.
 */
export default function ProjectIndex({
    locale,
    items,
}: {
    locale: "en" | "nl";
    items: ReelItem[];
}) {
    const root = useRef<HTMLDivElement>(null);
    const preview = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const moveX = useRef<((v: number) => void) | null>(null);
    const moveY = useRef<((v: number) => void) | null>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray<HTMLElement>("[data-index-row]").forEach((row, i) => {
                    const tl = gsap.timeline({
                        scrollTrigger: { trigger: row, start: "top 90%" },
                        delay: i * 0.08,
                    });
                    tl.from(row.querySelector("[data-line]"), {
                        scaleX: 0,
                        transformOrigin: "0% 50%",
                        duration: 1.2,
                        ease: "expo.inOut",
                    }).from(
                        row.querySelectorAll("[data-rise]"),
                        { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.06, clearProps: "transform" },
                        "-=0.7"
                    );
                });
            });

            mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
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

    const show = (visible: boolean) => {
        if (!moveX.current) return;
        gsap.to(preview.current, {
            autoAlpha: visible ? 1 : 0,
            scale: visible ? 1 : 0.6,
            rotate: visible ? -3 : 0,
            duration: 0.6,
            ease: "expo.out",
            overwrite: "auto",
        });
    };

    return (
        <div
            ref={root}
            className="relative"
            onMouseEnter={() => show(true)}
            onMouseLeave={() => show(false)}
            onMouseMove={(e) => {
                moveX.current?.(e.clientX);
                moveY.current?.(e.clientY);
            }}
        >
            <ol>
                {items.map((p, i) => (
                    <li key={p.id} data-index-row className="relative">
                        <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                        <Link
                            href={`/${locale}/projects/${p.id}`}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 md:grid-cols-12 md:gap-x-10 md:py-10"
                        >
                            <span className="overflow-hidden text-sm tabular-nums text-haze md:col-span-1">
                                <span data-rise className="block">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </span>
                            <span className="overflow-hidden pb-[0.08em] md:col-span-7">
                                <span
                                    data-rise
                                    className="display block text-[clamp(2.75rem,8vw,7.5rem)] transition-[color,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4 group-hover:text-primary"
                                >
                                    {p.title}
                                </span>
                            </span>
                            <span className="col-span-3 col-start-2 overflow-hidden text-haze md:col-span-3 md:col-start-auto">
                                <span data-rise className="block">
                                    {p.category}
                                </span>
                            </span>
                            <span className="hidden overflow-hidden text-right tabular-nums text-haze md:col-span-1 md:block">
                                <span data-rise className="block">
                                    {p.year}
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
            <span aria-hidden className="block h-px bg-line" />

            {/* Cursor preview */}
            <div
                ref={preview}
                aria-hidden
                className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[clamp(16rem,24vw,26rem)] overflow-hidden rounded-xl bg-deep shadow-2xl md:block"
            >
                {items.map((p, i) => (
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
        </div>
    );
}
