"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReelMedia, type ReelItem } from "@/components/home/WorkReel";
import Magnet from "@/components/reactbits/Magnet";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The showcase: on desktop the section pins and scrolling down slides the
 * projects past sideways, with parallax inside each frame and a skew that
 * follows scroll speed. On phones, and with reduced motion, it is a plain
 * vertical list.
 */
export default function ProjectsReel({
    locale,
    items,
    label,
    viewCase,
    nextTitle,
    nextButton,
}: {
    locale: "en" | "nl";
    items: ReelItem[];
    label: string;
    viewCase: string;
    nextTitle: string;
    nextButton: string;
}) {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const bar = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = root.current!;
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
                section.setAttribute("data-horizontal", "");
                const distance = () => track.current!.scrollWidth - window.innerWidth;

                const skew = gsap.quickTo("[data-panel]", "skewX", { duration: 0.5, ease: "power3" });

                const slide = gsap.to(track.current, {
                    x: () => -distance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${distance()}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -400));
                        },
                        onScrubComplete: () => skew(0),
                    },
                });

                gsap.to(bar.current, {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${distance()}`,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });

                gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
                    gsap.fromTo(
                        el,
                        { xPercent: -7 },
                        {
                            xPercent: 7,
                            ease: "none",
                            scrollTrigger: {
                                trigger: el.parentElement,
                                containerAnimation: slide,
                                start: "left right",
                                end: "right left",
                                scrub: true,
                            },
                        }
                    );
                });

                gsap.utils.toArray<HTMLElement>("[data-panel-copy]").forEach((el) => {
                    gsap.from(el.children, {
                        yPercent: 60,
                        autoAlpha: 0,
                        stagger: 0.06,
                        ease: "expo.out",
                        duration: 1,
                        scrollTrigger: {
                            trigger: el,
                            containerAnimation: slide,
                            start: "left 85%",
                        },
                    });
                });

                return () => section.removeAttribute("data-horizontal");
            });

            mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el) => {
                    gsap.from(el, {
                        y: 60,
                        autoAlpha: 0,
                        duration: 1,
                        ease: "expo.out",
                        scrollTrigger: { trigger: el, start: "top 85%" },
                    });
                });
            });
        },
        { scope: root }
    );

    return (
        <section ref={root} aria-label={label} className="h-reel relative overflow-hidden">
            <div ref={track} className="h-reel-track flex flex-col gap-16 px-4 sm:px-6 md:gap-[5vw] md:px-[6vw]">
                {items.map((p, i) => (
                    <article
                        key={p.id}
                        data-panel
                        className="w-full shrink-0 md:w-[min(64vw,64rem,calc((100svh_-_15rem)*1.6))]"
                    >
                        <Link
                            href={`/${locale}/projects/${p.id}`}
                            aria-label={`${p.title}: ${viewCase}`}
                            className="group block"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-deep">
                                <div data-parallax className="absolute inset-y-0 -left-[8%] -right-[8%]">
                                    <ReelMedia item={p} priority={false} sizes="(min-width: 768px) 70vw, 100vw" />
                                </div>
                            </div>
                        </Link>
                        <div data-panel-copy className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                            <p className="tabular-nums text-haze">
                                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                            </p>
                            <h3 className="display text-[clamp(2.25rem,4.5vw,4rem)]">
                                <Link href={`/${locale}/projects/${p.id}`} className="transition-colors hover:text-primary">
                                    {p.title}
                                </Link>
                            </h3>
                            <p className="text-haze">
                                {p.category}, {p.year}
                            </p>
                        </div>
                    </article>
                ))}

                {/* Last frame: the visitor's own project */}
                <div data-panel className="flex w-full shrink-0 flex-col justify-center gap-10 py-10 md:w-[min(48vw,44rem)] md:py-0">
                    <p className="display text-[clamp(3rem,6.5vw,6.5rem)]">
                        {nextTitle}
                    </p>
                    <Magnet padding={90} magnetStrength={3} maxOffset={22} wrapperClassName="self-start">
                        <Link href={`/${locale}/contact`} className="btn btn-primary h-16 px-10 text-lg">
                            {nextButton}
                        </Link>
                    </Magnet>
                </div>
            </div>

            <div aria-hidden className="absolute inset-x-[6vw] bottom-10 hidden h-px bg-line md:block">
                <div ref={bar} className="h-full origin-left scale-x-0 bg-primary" />
            </div>
        </section>
    );
}
