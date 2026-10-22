"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Endless row of words that drifts sideways and reacts to scrolling:
 * scroll faster and it speeds up, scroll up and it turns around.
 * With reduced motion it is a plain, static row.
 */
export default function Marquee({
    items,
    speed = 40,
    className = "",
    separator = "✦",
}: {
    items: string[];
    /** Seconds for one full loop at rest. */
    speed?: number;
    className?: string;
    separator?: string;
}) {
    const root = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const loop = gsap.to(track.current, {
                    xPercent: -50,
                    duration: speed,
                    ease: "none",
                    repeat: -1,
                });

                let direction = 1;
                const st = ScrollTrigger.create({
                    trigger: root.current,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        if (self.direction !== direction) direction = self.direction;
                        const boost = Math.min(Math.abs(self.getVelocity()) / 220, 6);
                        gsap.to(loop, {
                            timeScale: direction * (1 + boost),
                            duration: 0.25,
                            overwrite: true,
                            onComplete: () => {
                                gsap.to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out" });
                            },
                        });
                    },
                });

                return () => st.kill();
            });
        },
        { scope: root }
    );

    // Two identical halves so a -50% shift loops seamlessly.
    const half = (hidden: boolean) => (
        <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
            {items.map((item, i) => (
                <span key={i} className="flex shrink-0 items-center">
                    <span className="px-[0.35em]">{item}</span>
                    <span aria-hidden className="px-[0.35em] text-primary">
                        {separator}
                    </span>
                </span>
            ))}
        </div>
    );

    return (
        <div ref={root} className={`overflow-hidden whitespace-nowrap ${className}`}>
            <div ref={track} className="flex w-max will-change-transform">
                {half(false)}
                {half(true)}
            </div>
        </div>
    );
}
