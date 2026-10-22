"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { duration, ease, motionOK, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll choreography for a whole page, driven by data attributes so the
 * page itself can stay a server component. Only transform, opacity and
 * clip-path are animated, so nothing triggers layout while scrolling.
 *
 * - `data-meta`        children rise in on load, hairlines (`data-line`) draw above them
 * - `data-case-media`  frame opens from an inset card to full bleed, `data-case-media-inner` zooms out
 * - `data-hscroll`     section pins and its `.h-reel-track` slides sideways (desktop)
 * - `data-row`         list rows: `data-line` draws, then `data-row-text` rises
 * - `data-rise`        generic fade-up on enter
 */
export default function Choreography({ children }: { children: React.ReactNode }) {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(motionOK, () => {
                gsap.utils.toArray<HTMLElement>("[data-meta]").forEach((group) => {
                    gsap.from(group.children, {
                        y: 24,
                        autoAlpha: 0,
                        duration: duration.base,
                        ease: ease.enter,
                        stagger: stagger * 2,
                        delay: 0.5,
                    });
                    gsap.from(group.querySelectorAll("[data-line]"), {
                        scaleX: 0,
                        transformOrigin: "0% 50%",
                        duration: duration.long,
                        ease: ease.move,
                        stagger: stagger * 2,
                        delay: 0.4,
                    });
                });

                gsap.utils.toArray<HTMLElement>("[data-case-media]").forEach((frame) => {
                    const inner = frame.querySelector<HTMLElement>("[data-case-media-inner]");
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: frame,
                            start: "top 85%",
                            end: "top 10%",
                            scrub: 0.8,
                        },
                    });
                    tl.fromTo(
                        frame,
                        { clipPath: "inset(6% 14% 6% 14% round 28px)" },
                        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }
                    );
                    if (inner) tl.fromTo(inner, { scale: 1.3 }, { scale: 1, ease: "none" }, 0);
                });

                // Rows start hidden; rows entering together share a batch and stagger.
                gsap.set("[data-row-text]", { yPercent: 100, autoAlpha: 0 });
                gsap.set("[data-row] > [data-line]", { scaleX: 0, transformOrigin: "0% 50%" });
                const revealRows = (rows: Element[]) => {
                    rows.forEach((row, i) => {
                        gsap.timeline({ delay: i * stagger * 2 })
                            .to(row.querySelectorAll(":scope > [data-line]"), {
                                scaleX: 1,
                                duration: duration.long,
                                ease: ease.move,
                            })
                            .to(
                                row.querySelectorAll("[data-row-text]"),
                                {
                                    yPercent: 0,
                                    autoAlpha: 1,
                                    duration: duration.base,
                                    ease: ease.enter,
                                    stagger,
                                    // Hand transform back to CSS so hover effects work.
                                    clearProps: "transform",
                                },
                                "-=0.9"
                            );
                    });
                };
                // onLeave too: a fast jump past a row (anchor link, refresh
                // mid-page) must still reveal it.
                ScrollTrigger.batch("[data-row]", {
                    start: "top 90%",
                    once: true,
                    onEnter: revealRows,
                    onLeave: revealRows,
                });

                gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
                    gsap.from(el, {
                        y: 32,
                        autoAlpha: 0,
                        duration: duration.base,
                        ease: ease.enter,
                        scrollTrigger: { trigger: el, start: "top 90%" },
                    });
                });
            });

            mm.add(`(min-width: 768px) and ${motionOK}`, () => {
                const sections = gsap.utils.toArray<HTMLElement>("[data-hscroll]");
                sections.forEach((section) => {
                    section.setAttribute("data-horizontal", "");
                    const track = section.querySelector<HTMLElement>(".h-reel-track")!;
                    const distance = () => track.scrollWidth - window.innerWidth;

                    const slide = gsap.to(track, {
                        x: () => -distance(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: () => `+=${distance()}`,
                            pin: true,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    section.querySelectorAll<HTMLElement>("[data-hscroll-item]").forEach((item) => {
                        gsap.fromTo(
                            item,
                            { scale: 0.86, rotate: 2 },
                            {
                                scale: 1,
                                rotate: 0,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: item,
                                    containerAnimation: slide,
                                    start: "left right",
                                    end: "center center",
                                    scrub: true,
                                },
                            }
                        );
                    });
                });
                return () => sections.forEach((s) => s.removeAttribute("data-horizontal"));
            });

            // Triggers further down the page were created before the pins above
            // them existed; put them back in page order and re-measure.
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        },
        { scope: root }
    );

    return <div ref={root}>{children}</div>;
}
