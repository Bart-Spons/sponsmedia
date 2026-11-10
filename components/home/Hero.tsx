"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnet from "@/components/reactbits/Magnet";
import Bulb3D from "@/components/home/Bulb3D";
import { duration, ease, motionOK, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HeroCopy = {
    kicker: string;
    /** The word between *asterisks* is the highlighted one. */
    headline: string;
    focusWords: string;
    sub: string;
    seeWork: string;
    startProject: string;
    recentFor: string;
};

/**
 * "Lights on": the hero starts in the dark. The SponsMedia bulb flickers on,
 * and its light sweeps across the headline letter by letter until it reads
 * clearly; the highlighted word lights up gold and gets a hand-drawn
 * underline. Then a soft light follows the mouse. The whole intro takes
 * about a second. As you scroll on, the hero sinks back so the next section
 * slides over it. Without motion it is simply there, lit.
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
    const [lit, setLit] = useState(false);

    const focusWords = copy.focusWords.split("|");
    const plainHeadline = copy.headline.replace(/\*/g, "");
    const words = copy.headline.split(" ").map((token) => {
        const m = token.match(/^\*(.+)\*(.*)$/);
        return m ? { text: m[1], hl: true, after: m[2] } : { text: token, hl: false, after: "" };
    });

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(motionOK, () => {
                const letters = gsap.utils.toArray<HTMLElement>("[data-letter]");
                const underline = root.current!.querySelector<SVGPathElement>("[data-underline]");

                // Start in the dark.
                gsap.set("[data-headline]", { visibility: "visible" });
                gsap.set(letters, { color: "#1d2638" });
                gsap.set("[data-dark]", { opacity: 1 });
                gsap.set(light.current, { opacity: 0 });
                if (underline) gsap.set(underline, { strokeDashoffset: 1 });

                const tl = gsap.timeline();
                tl.fromTo("[data-lens]", { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: ease.enter }, 0)
                    // The bulb flickers on…
                    .add(() => setLit(true), 0.1)
                    .to("[data-ring-glow]", { opacity: 1, duration: duration.base, ease: ease.enter }, 0.2)
                    // …the room lights up…
                    .to("[data-dark]", { opacity: 0, duration: 0.5, ease: "power1.out" }, 0.25)
                    .to(light.current, { opacity: 1, scale: 1.15, duration: duration.long, ease: ease.enter }, 0.25)
                    // …and the light sweeps over the headline, letter by letter.
                    .to(
                        letters,
                        {
                            color: (_i: number, el: HTMLElement) => (el.dataset.hl ? "#e2b76f" : "#eaf0f8"),
                            duration: 0.25,
                            stagger: 0.018,
                            ease: "power1.out",
                        },
                        0.25
                    )
                    .to(
                        letters,
                        {
                            textShadow: "0 0 18px rgba(255,217,138,0.55)",
                            duration: 0.15,
                            stagger: 0.018,
                            yoyo: true,
                            repeat: 1,
                        },
                        0.25
                    )
                    .to("[data-hero-after]", { autoAlpha: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger * 3 }, 0.55);
                if (underline) tl.to(underline, { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" }, 0.65);
                tl.add(() => {
                    gsap.to("[data-ring-glow]", { opacity: 0.55, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
                });
                gsap.set("[data-hero-after]", { autoAlpha: 0, y: 12 });

                // As you scroll on, the hero sinks back and dims.
                gsap.to(content.current, {
                    yPercent: -12,
                    scale: 0.96,
                    autoAlpha: 0.2,
                    ease: "none",
                    scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
                });
            });

            // Mouse: a soft light follows the cursor, the room light drifts
            // after it and the lens leans towards it.
            mm.add(`(pointer: fine) and ${motionOK}`, () => {
                const toX = gsap.quickTo(light.current, "x", { duration: 2.4, ease: "power3" });
                const toY = gsap.quickTo(light.current, "y", { duration: 2.4, ease: "power3" });
                const leanX = gsap.quickTo("[data-lens-ring]", "x", { duration: 1, ease: "power3" });
                const leanY = gsap.quickTo("[data-lens-ring]", "y", { duration: 1, ease: "power3" });
                const spin = gsap.to("[data-ticks]", { rotate: 360, duration: 30, ease: "none", repeat: -1 });
                gsap.to("[data-beam]", { opacity: 1, duration: 0.6, delay: 0.8 });
                const onMove = (e: PointerEvent) => {
                    toX((e.clientX / window.innerWidth - 0.5) * 160);
                    toY((e.clientY / window.innerHeight - 0.5) * 120);
                    leanX((e.clientX / window.innerWidth - 0.5) * 24);
                    leanY((e.clientY / window.innerHeight - 0.5) * 24);
                    const b = root.current!.getBoundingClientRect();
                    gsap.to(root.current, {
                        "--mx": `${e.clientX - b.left}px`,
                        "--my": `${e.clientY - b.top}px`,
                        duration: 0.6,
                        ease: "power3",
                        overwrite: "auto",
                    });
                };
                window.addEventListener("pointermove", onMove, { passive: true });
                return () => {
                    spin.kill();
                    window.removeEventListener("pointermove", onMove);
                };
            });

            // No motion: everything is simply there, with the light on.
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set("[data-headline]", { visibility: "visible" });
                gsap.set("[data-lens]", { autoAlpha: 1 });
                setLit(true);
            });
        },
        { scope: root }
    );

    const headlineClass = "display text-[clamp(3.2rem,10.5vw,8.75rem)] leading-[0.9]";

    return (
        <section
            ref={root}
            className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden md:min-h-[calc(100svh-5rem)]"
        >
            {/* The dark the hero starts in; fades away when the bulb switches on */}
            <div data-dark aria-hidden className="pointer-events-none absolute inset-0 bg-[#070b14] opacity-0" />

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

            {/* A soft light that follows the mouse */}
            <div
                data-beam
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0"
                style={{
                    background:
                        "radial-gradient(600px circle at var(--mx, 70%) var(--my, 45%), rgba(255,217,138,0.10), transparent 60%)",
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

                <div className="grid items-center gap-8 md:grid-cols-12">
                    <h1 data-headline aria-label={plainHeadline} className={`split-pending md:col-span-8 ${headlineClass}`}>
                        {words.map((w, wi) => (
                            <Fragment key={wi}>
                            <span aria-hidden className="inline-block whitespace-nowrap">
                                <span className={w.hl ? "relative inline-block text-primary" : "inline-block"}>
                                    {[...w.text].map((c, ci) => (
                                        <span key={ci} data-letter data-hl={w.hl ? "" : undefined} className="inline-block">
                                            {c}
                                        </span>
                                    ))}
                                    {w.hl && (
                                        <svg
                                            aria-hidden
                                            viewBox="0 0 300 20"
                                            preserveAspectRatio="none"
                                            className="pointer-events-none absolute -bottom-[0.1em] left-0 h-[0.14em] w-full overflow-visible"
                                        >
                                            <path
                                                data-underline
                                                d="M3 13 C 80 3, 200 3, 297 11"
                                                fill="none"
                                                stroke="#e2b76f"
                                                strokeWidth="7"
                                                strokeLinecap="round"
                                                pathLength={1}
                                                strokeDasharray="1"
                                                strokeDashoffset="0"
                                            />
                                        </svg>
                                    )}
                                </span>
                                {[...w.after].map((c, ci) => (
                                    <span key={`a${ci}`} data-letter className="inline-block">
                                        {c}
                                    </span>
                                ))}
                            </span>
                            {wi < words.length - 1 ? " " : null}
                            </Fragment>
                        ))}
                    </h1>

                    {/* The SponsMedia bulb inside a camera-style lens (desktop) */}
                    <div
                        data-lens
                        aria-hidden
                        className="invisible relative hidden aspect-square w-[clamp(170px,20vw,300px)] justify-self-center md:col-span-4 md:block"
                    >
                        <div data-lens-ring className="relative h-full w-full">
                            <span
                                data-ring-glow
                                className="absolute -inset-[45%] rounded-full opacity-0"
                                style={{
                                    background:
                                        "radial-gradient(closest-side, rgba(255,217,138,0.35), rgba(226,183,111,0.12) 55%, transparent)",
                                }}
                            />
                            <div className="absolute inset-[9%] overflow-hidden rounded-full">
                                <Bulb3D on={lit} />
                            </div>
                            <span className="absolute inset-0 rounded-full border border-primary/70" />
                            <span data-ticks className="absolute inset-0">
                                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-primary" />
                                <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-primary" />
                                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary" />
                                <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary" />
                            </span>
                        </div>
                    </div>
                </div>

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
