"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Thin gold line along the top of the window that fills as you read.
 * It is feedback tied directly to the scroll position, so it also runs
 * with reduced motion.
 */
export default function ReadingProgress() {
    const bar = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            bar.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            }
        );
    });

    return (
        <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-primary" />
        </div>
    );
}
