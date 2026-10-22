"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Scroll to an element or position, smooth when Lenis is running. */
export function scrollToTarget(target: string | number | HTMLElement) {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -80 });
        return;
    }
    if (typeof target === "number") window.scrollTo({ top: target });
    else {
        const el =
            typeof target === "string"
                ? document.querySelector<HTMLElement>(target)
                : target;
        el?.scrollIntoView();
    }
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and
 * Lenis always agree on the scroll position. Skipped entirely when the
 * visitor prefers reduced motion.
 */
export default function SmoothScroll() {
    const pathname = usePathname();

    useEffect(() => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduce) return;

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisInstance = lenis;

        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    // New page: start at the top and let ScrollTrigger re-measure.
    useEffect(() => {
        lenisInstance?.scrollTo(0, { immediate: true });
        const id = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(id);
    }, [pathname]);

    return null;
}
