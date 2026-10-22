"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ServiceRow } from "@/components/home/ServicesList";
import { duration, ease, motionOK, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Services as a deck of cards. On desktop every card sticks below the nav;
 * the next one slides over it while the one underneath shrinks back and dims.
 * Sticky positioning does the holding, GSAP only scales and fades, so there
 * are no pin spacers to measure. On phones the cards simply stack.
 */
export default function ServiceStack({
    items,
    labels,
}: {
    items: ServiceRow[];
    labels: { included: string; tools: string };
}) {
    const root = useRef<HTMLOListElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

            mm.add(`(min-width: 768px) and ${motionOK}`, () => {
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (!next) return;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: next,
                            start: "top bottom",
                            end: "top top+=120",
                            scrub: true,
                        },
                    })
                        .to(card.querySelector("[data-card-body]"), { scale: 0.9, ease: "none" }, 0)
                        .to(card.querySelector("[data-card-dim]"), { opacity: 0.65, ease: "none" }, 0);
                });
            });

            mm.add(motionOK, () => {
                cards.forEach((card) => {
                    gsap.from(card.querySelectorAll("[data-card-in]"), {
                        y: 40,
                        autoAlpha: 0,
                        duration: duration.base,
                        ease: ease.enter,
                        stagger: stagger * 2,
                        scrollTrigger: { trigger: card, start: "top 75%" },
                    });
                });
            });
        },
        { scope: root }
    );

    return (
        <ol ref={root} className="space-y-6 md:space-y-[12vh]">
            {items.map((s, i) => (
                <li
                    key={s.slug}
                    id={s.slug}
                    data-card
                    className="scroll-mt-28 md:sticky"
                    style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
                >
                    <article
                        data-card-body
                        className="relative origin-top overflow-hidden rounded-[1.75rem] border border-line bg-deep will-change-transform"
                    >
                        <span data-card-dim aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-night opacity-0" />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
                            style={{ background: "radial-gradient(closest-side, rgba(226,183,111,0.18), transparent)" }}
                        />
                        <div className="relative grid gap-10 p-7 md:min-h-[min(70svh,40rem)] md:grid-cols-12 md:gap-12 md:p-14">
                            <div className="flex flex-col md:col-span-7">
                                <p data-card-in className="display text-[clamp(1.25rem,2vw,1.75rem)] tabular-nums text-primary">
                                    {String(i + 1).padStart(2, "0")}
                                    <span className="text-haze"> / {String(items.length).padStart(2, "0")}</span>
                                </p>
                                <h2 data-card-in className="display mt-6 text-[clamp(2.75rem,6.5vw,6rem)]">
                                    {s.title}
                                </h2>
                                <p data-card-in className="mt-6 max-w-[40ch] text-lg leading-relaxed text-frost/75 md:text-xl">
                                    {s.desc}
                                </p>
                                <p
                                    data-card-in
                                    className="mt-auto pt-10 text-[clamp(1.35rem,2.2vw,1.9rem)] font-semibold leading-snug tracking-[-0.02em]"
                                >
                                    {s.highlight}
                                </p>
                            </div>

                            <div className="md:col-span-4 md:col-start-9 md:self-end">
                                <p data-card-in className="mb-4 text-sm text-haze">
                                    {labels.included}
                                </p>
                                <ul data-card-in className="space-y-3">
                                    {s.features.map((f) => (
                                        <li key={f} className="flex gap-3 text-frost/90">
                                            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <p data-card-in className="mb-3 mt-10 text-sm text-haze">
                                    {labels.tools}
                                </p>
                                <ul data-card-in className="flex flex-wrap gap-2">
                                    {s.technologies.map((t) => (
                                        <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-haze">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                </li>
            ))}
        </ol>
    );
}
