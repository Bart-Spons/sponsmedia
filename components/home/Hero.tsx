"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import BlurText from "@/components/reactbits/BlurText";
import TrueFocus from "@/components/reactbits/TrueFocus";
import Magnet from "@/components/reactbits/Magnet";

gsap.registerPlugin(useGSAP);

export type HeroCopy = {
    kicker: string;
    headline: string;
    focusWords: string;
    sub: string;
    seeWork: string;
    startProject: string;
    recentFor: string;
};

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

    // One orchestrated entrance: the headline comes into focus (BlurText),
    // then everything around it settles in behind it.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from("[data-hero-after]", {
                    autoAlpha: 0,
                    y: 18,
                    filter: "blur(8px)",
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.12,
                    delay: 0.75,
                    clearProps: "filter",
                });
            });
        },
        { scope: root }
    );

    return (
        <section
            ref={root}
            className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden md:min-h-[calc(100svh-5rem)]"
        >
            {/* A single soft light, off to the side, like a lamp just out of frame */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-[20vw] -top-[30vh] h-[90vh] w-[70vw] rounded-full opacity-60"
                style={{
                    background:
                        "radial-gradient(closest-side, rgba(226,183,111,0.22), rgba(226,183,111,0.06) 55%, transparent)",
                }}
            />

            <div className="container relative pb-10 pt-16 md:pb-14">
                <p data-hero-after className="mb-6 text-base text-haze md:text-lg">
                    {copy.kicker}
                </p>

                <BlurText
                    as="h1"
                    text={copy.headline}
                    trigger="load"
                    animateBy="words"
                    effect="focus"
                    delay={110}
                    blur={18}
                    className="display max-w-[11ch] text-[clamp(3.4rem,11.5vw,11rem)]"
                />

                <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
                    <div data-hero-after className="md:col-span-6" aria-hidden>
                        <TrueFocus
                            sentence={copy.focusWords}
                            separator="|"
                            focusStyle="brackets"
                            blurAmount={4}
                            borderColor="#e2b76f"
                            animationDuration={0.55}
                            pauseBetweenAnimations={1.4}
                            cornerSize={12}
                            borderWidth={2}
                            unfocusedOpacity={0.55}
                            className="justify-start gap-x-[0.9em] gap-y-3"
                            wordClassName="text-[clamp(1.25rem,2.4vw,2rem)] font-semibold tracking-[-0.02em]"
                        />
                    </div>

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
