"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnet from "@/components/reactbits/Magnet";
import FocusTitle from "@/components/motion/FocusTitle";
import { duration, ease, motionOK, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HeroCopy = {
    kicker: string;
    headline: string;
    focusWords: string;
    sub: string;
    seeWork: string;
    startProject: string;
    recentFor: string;
};

/**
 * "Be more visible", as an autofocus: the headline is a FocusTitle (blurred,
 * with a focus ring showing what is sharp). Around it, the rest of the hero
 * settles in, and as you scroll on it sinks back so the next section slides
 * over it.
 */
export default function Hero({
    locale,
    copy,
    clients,
}: {
    locale: "en" | "nl";
    copy: HeroCopy;
    clients: { id: string; name: string }[];
}) {
    const root = useRef<HTMLElement>(null);
    const content = useRef<HTMLDivElement>(null);
    const light = useRef<HTMLDivElement>(null);

    const focusWords = copy.focusWords.split("|");

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(motionOK, () => {
                // Everything around the headline settles in once the lens has opened.
                gsap.from("[data-hero-after]", {
                    autoAlpha: 0,
                    y: 16,
                    duration: duration.base,
                    ease: ease.enter,
                    stagger: stagger * 3,
                    delay: 1.1,
                });
                gsap.from(light.current, { autoAlpha: 0, scale: 0.7, duration: duration.long * 2, ease: ease.enter });

                // As you scroll on, the hero sinks back and dims.
                gsap.to(content.current, {
                    yPercent: -12,
                    scale: 0.96,
                    autoAlpha: 0.2,
                    ease: "none",
                    scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
                });
            });

            // The light drifts a little towards the cursor, like it's watching.
            mm.add(`(pointer: fine) and ${motionOK}`, () => {
                const toX = gsap.quickTo(light.current, "x", { duration: 2.4, ease: "power3" });
                const toY = gsap.quickTo(light.current, "y", { duration: 2.4, ease: "power3" });
                const onMove = (e: PointerEvent) => {
                    toX((e.clientX / window.innerWidth - 0.5) * 160);
                    toY((e.clientY / window.innerHeight - 0.5) * 120);
                };
                window.addEventListener("pointermove", onMove, { passive: true });
                return () => window.removeEventListener("pointermove", onMove);
            });
        },
        { scope: root }
    );

    const headlineClass = "display text-[clamp(3.6rem,13.5vw,14rem)] leading-[0.88]";

    return (
        <section
            ref={root}
            className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden md:min-h-[calc(100svh-5rem)]"
        >
            {/* A single soft light, off to the side, like a lamp just out of frame */}
            <div
                ref={light}
                aria-hidden
                className="pointer-events-none absolute -right-[20vw] -top-[30vh] h-[90vh] w-[70vw] rounded-full opacity-60 will-change-transform"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(226,183,111,0.22), rgba(226,183,111,0.06) 55%, transparent)",
                }}
            />

            <div ref={content} className="container relative origin-bottom pb-10 pt-16 md:pb-14">
                <p data-hero-after className="mb-6 flex items-center gap-3 text-base text-haze md:mb-10 md:text-lg">
                    <span aria-hidden className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    {copy.kicker}
                </p>

                <FocusTitle text={copy.headline} className={headlineClass} />

                <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
                    <ul data-hero-after className="flex flex-wrap gap-2 md:col-span-6">
                        {focusWords.map((w) => (
                            <li
                                key={w}
                                className="rounded-full border border-line px-4 py-1.5 text-sm text-frost/80 md:text-base"
                            >
                                {w}
                            </li>
                        ))}
                    </ul>

                    <div data-hero-after className="md:col-span-5 md:col-start-8">
                        <p className="max-w-[38ch] text-lg leading-relaxed text-frost/80 md:text-xl">
                            {copy.sub}
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Magnet padding={60} magnetStrength={4} maxOffset={14}>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="btn btn-primary h-12 px-7 text-base"
                                >
                                    {copy.startProject}
                                </Link>
                            </Magnet>
                            <Link
                                href={`/${locale}/projects`}
                                className="btn btn-ghost h-12 px-7 text-base"
                            >
                                {copy.seeWork}
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    data-hero-after
                    className="rule mt-14 flex flex-wrap gap-x-6 gap-y-2 pt-5 text-sm text-haze md:mt-20"
                >
                    <span>{copy.recentFor}</span>
                    {clients.map((c) => (
                        <Link
                            key={c.id}
                            href={`/${locale}/projects/${c.id}`}
                            className="text-frost underline-offset-4 hover:underline"
                        >
                            {c.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
