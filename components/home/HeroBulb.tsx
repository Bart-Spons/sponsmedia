"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * The hero's light bulb: a flat drawing (warm glass, silver screw base) that
 * stays still. `on` switches it on with a short flicker. It is plain SVG, so
 * it is there instantly with nothing extra to load.
 */
export default function HeroBulb({ on }: { on: boolean }) {
    const svg = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!on || !svg.current) return;
        const q = gsap.utils.selector(svg.current);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            gsap.set(q("[data-lit]"), { opacity: 1 });
            gsap.set(q("[data-filament]"), { attr: { stroke: "#fff3d0" } });
            return;
        }
        const tl = gsap
            .timeline()
            .to(q("[data-lit]"), { opacity: 1, duration: 0.04 })
            .to(q("[data-lit]"), { opacity: 0.15, duration: 0.06 })
            .to(q("[data-lit]"), { opacity: 1, duration: 0.05 })
            .to(q("[data-filament]"), { attr: { stroke: "#fff3d0" }, duration: 0.05 }, "<");
        return () => {
            tl.kill();
        };
    }, [on]);

    return (
        <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "radial-gradient(circle at 50% 42%, #141c2e, #070b14)" }}
        >
            <svg ref={svg} viewBox="0 0 100 140" className="h-auto w-[52%]" aria-hidden>
                <defs>
                    <radialGradient id="hero-bulb-lit" cx="46%" cy="38%" r="62%">
                        <stop offset="0" stopColor="#fffaf0" />
                        <stop offset="0.35" stopColor="#ffe3a3" />
                        <stop offset="0.75" stopColor="#f0bf62" />
                        <stop offset="1" stopColor="#b9822a" />
                    </radialGradient>
                    <linearGradient id="hero-bulb-metal" x1="0" x2="1">
                        <stop offset="0" stopColor="#4a4f5c" />
                        <stop offset="0.45" stopColor="#c9ccd4" />
                        <stop offset="0.6" stopColor="#8d929e" />
                        <stop offset="1" stopColor="#3b404c" />
                    </linearGradient>
                </defs>
                {/* Glass: dark when off, the warm gradient fades in when it switches on */}
                <path
                    d="M50 4C27 4 10 21 10 43c0 14 7 24 15 32 5 5 8 11 8 18v6h34v-6c0-7 3-13 8-18 8-8 15-18 15-32C90 21 73 4 50 4z"
                    fill="#232b3d"
                />
                <path
                    data-lit
                    d="M50 4C27 4 10 21 10 43c0 14 7 24 15 32 5 5 8 11 8 18v6h34v-6c0-7 3-13 8-18 8-8 15-18 15-32C90 21 73 4 50 4z"
                    fill="url(#hero-bulb-lit)"
                    opacity="0"
                />
                <path
                    data-filament
                    d="M40 98V74c0-6 4-8 5-14 1 6 3 6 5 0 2 6 4 6 5 0 1 6 5 8 5 14v24"
                    fill="none"
                    stroke="#55607a"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
                <rect x="33" y="99" width="34" height="9" rx="2" fill="url(#hero-bulb-metal)" />
                <rect x="34" y="109" width="32" height="8" rx="2" fill="url(#hero-bulb-metal)" />
                <rect x="36" y="118" width="28" height="8" rx="2" fill="url(#hero-bulb-metal)" />
                <path d="M42 127h16l-3 8h-10z" fill="#3b404c" />
            </svg>
        </div>
    );
}
