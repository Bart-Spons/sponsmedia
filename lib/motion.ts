// lib/motion.ts
// One rhythm for the whole site: every GSAP animation pulls its timing from here.
// Enter slow and decelerating, leave faster (about 60% of the enter duration).

export const ease = {
    /** Arriving: fast start, long soft landing. */
    enter: "expo.out",
    /** Leaving: quick and out of the way. */
    exit: "power3.in",
    /** Moving between two states, e.g. lines drawing or frames opening. */
    move: "expo.inOut",
} as const;

export const duration = {
    /** Small things: labels, buttons, list items. */
    short: 0.6,
    /** Headings, rows, media. */
    base: 1,
    /** Big hero moments. */
    long: 1.3,
} as const;

/** Delay between items in a list (30–50ms per item feels natural). */
export const stagger = 0.04;

/** Same media query everywhere so reduced motion is never forgotten. */
export const motionOK = "(prefers-reduced-motion: no-preference)";
