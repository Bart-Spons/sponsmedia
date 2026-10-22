"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type ServiceRow = {
    slug: string;
    title: string;
    desc: string;
    highlight: string;
    features: string[];
    technologies: string[];
};

/**
 * Services as large rows instead of cards. Opening a row is the motion:
 * the panel unfolds and the rest of the list dims back slightly.
 */
export default function ServicesList({
    items,
    labels,
    defaultOpen = -1,
}: {
    items: ServiceRow[];
    labels: { included: string; tools: string; show: string; hide: string };
    defaultOpen?: number;
}) {
    const [open, setOpen] = useState(defaultOpen);
    const root = useRef<HTMLUListElement>(null);

    const { contextSafe } = useGSAP({ scope: root });

    const toggle = contextSafe((index: number) => {
        const next = open === index ? -1 : index;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root.current ?? undefined);

        panels.forEach((panel, i) => {
            const shouldOpen = i === next;
            const isOpen = i === open;
            if (shouldOpen === isOpen) return;
            gsap.killTweensOf(panel);
            if (shouldOpen) {
                gsap.set(panel, { display: "block" });
                gsap.fromTo(
                    panel,
                    { height: 0, autoAlpha: 0 },
                    {
                        height: "auto",
                        autoAlpha: 1,
                        duration: reduce ? 0 : 0.7,
                        ease: "expo.out",
                    }
                );
                gsap.from(panel.querySelectorAll("[data-panel-item]"), {
                    y: 14,
                    autoAlpha: 0,
                    stagger: 0.04,
                    duration: reduce ? 0 : 0.6,
                    ease: "expo.out",
                    delay: reduce ? 0 : 0.1,
                });
            } else {
                gsap.to(panel, {
                    height: 0,
                    autoAlpha: 0,
                    duration: reduce ? 0 : 0.45,
                    ease: "power3.inOut",
                    onComplete: () => gsap.set(panel, { display: "none" }),
                });
            }
        });
        setOpen(next);
    });

    return (
        <ul ref={root} className="border-b border-line">
            {items.map((s, i) => {
                const isOpen = open === i;
                const dimmed = open !== -1 && !isOpen;
                return (
                    <li key={s.slug} id={s.slug} className="rule scroll-mt-28">
                        <button
                            type="button"
                            onClick={() => toggle(i)}
                            aria-expanded={isOpen}
                            aria-controls={`panel-${s.slug}`}
                            className={`group grid w-full gap-4 py-8 text-left transition-opacity duration-500 md:grid-cols-12 md:items-baseline md:py-12 ${
                                dimmed ? "opacity-40 hover:opacity-100" : ""
                            }`}
                        >
                            <span className="display text-[clamp(2.4rem,6.5vw,6rem)] transition-colors group-hover:text-primary md:col-span-7">
                                {s.title}
                            </span>
                            <span className="text-lg leading-relaxed text-frost/75 md:col-span-4">
                                {s.desc}
                            </span>
                            <span
                                aria-hidden
                                className="relative hidden h-10 w-10 place-self-end self-center rounded-full border border-line md:col-span-1 md:block"
                            >
                                <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-frost" />
                                <span
                                    className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-frost transition-transform duration-500 ${
                                        isOpen ? "rotate-0" : "rotate-90"
                                    }`}
                                />
                            </span>
                            <span className="text-sm font-semibold text-primary md:hidden">
                                {isOpen ? labels.hide : labels.show}
                            </span>
                        </button>

                        <div
                            id={`panel-${s.slug}`}
                            data-panel
                            role="region"
                            aria-label={s.title}
                            className="overflow-hidden"
                            style={isOpen ? undefined : { display: "none", height: 0 }}
                        >
                            <div className="grid gap-10 pb-12 md:grid-cols-12">
                                <p
                                    data-panel-item
                                    className="text-2xl font-semibold leading-snug tracking-[-0.02em] md:col-span-5 md:col-start-1"
                                >
                                    {s.highlight}
                                </p>
                                <div data-panel-item className="md:col-span-4 md:col-start-8">
                                    <p className="mb-3 text-sm text-haze">{labels.included}</p>
                                    <ul className="space-y-2">
                                        {s.features.map((f) => (
                                            <li key={f} data-panel-item className="flex gap-3">
                                                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mb-3 mt-8 text-sm text-haze">{labels.tools}</p>
                                    <p data-panel-item className="text-frost/80">
                                        {s.technologies.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
