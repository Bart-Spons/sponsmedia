"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { ServiceRow } from "@/components/home/ServicesList";
import ServiceIcon from "@/components/services/ServiceIcon";
import { motionOK } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

/**
 * Homepage overview of the services: three cards that respond to the mouse.
 * The card tilts towards the cursor and a gold spotlight follows it; the
 * service icon draws itself on scroll and a big outlined number sits behind
 * the content. Inside <Choreography> the cards rise in one after another
 * (data-stagger) and the icons draw (data-draw). Touch screens get the
 * cards without the tilt.
 */
export default function ServiceCards({
    locale,
    items,
    more,
}: {
    locale: "en" | "nl";
    items: ServiceRow[];
    more: string;
}) {
    const root = useRef<HTMLUListElement>(null);
    const tilters = useRef<Map<HTMLElement, { rx: (v: number) => void; ry: (v: number) => void }>>(new Map());

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(`(pointer: fine) and ${motionOK}`, () => {
                gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
                    gsap.set(card, { transformPerspective: 900 });
                    tilters.current.set(card, {
                        rx: gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" }),
                        ry: gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" }),
                    });
                });
                return () => tilters.current.clear();
            });
        },
        { scope: root }
    );

    const onMove = (e: React.PointerEvent<HTMLElement>) => {
        const card = e.currentTarget;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        // The spotlight is plain CSS driven by two variables.
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        const t = tilters.current.get(card);
        t?.rx((0.5 - py) * 6);
        t?.ry((px - 0.5) * 8);
    };

    const onLeave = (e: React.PointerEvent<HTMLElement>) => {
        const t = tilters.current.get(e.currentTarget);
        t?.rx(0);
        t?.ry(0);
    };

    return (
        <ul ref={root} data-stagger className="grid gap-5 md:grid-cols-3 md:gap-6">
            {items.map((s, i) => (
                <li key={s.slug}>
                    <Link
                        href={`/${locale}/services#${s.slug}`}
                        data-tilt
                        onPointerMove={onMove}
                        onPointerLeave={onLeave}
                        className="group relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-deep p-7 transition-[border-color] duration-500 [transform-style:preserve-3d] hover:border-primary/50 md:p-8"
                    >
                        {/* Spotlight that follows the cursor */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                                background:
                                    "radial-gradient(22rem circle at var(--mx, 50%) var(--my, 30%), rgba(226,183,111,0.16), transparent 60%)",
                            }}
                        />
                        {/* Big outlined number behind the content */}
                        <span
                            aria-hidden
                            className="display pointer-events-none absolute -bottom-6 -right-2 select-none text-[11rem] leading-none text-transparent transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1px_rgba(234,240,248,0.1)] group-hover:[-webkit-text-stroke-color:rgba(226,183,111,0.45)]"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="relative [transform:translateZ(40px)]">
                            <ServiceIcon name={s.slug} className="h-14 w-14 md:h-16 md:w-16" />
                        </span>
                        <h3 className="display relative mt-10 text-[clamp(1.9rem,2.6vw,2.5rem)] [transform:translateZ(30px)]">
                            {s.title}
                        </h3>
                        <p className="relative mt-4 leading-relaxed text-frost/75">{s.desc}</p>
                        <ul className="relative mt-6 space-y-2 text-sm text-frost/80">
                            {s.features.slice(0, 3).map((f) => (
                                <li key={f} className="flex gap-3">
                                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-primary" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <span className="relative mt-auto pt-10 font-semibold text-primary">
                            {more}
                            <span
                                aria-hidden
                                className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
