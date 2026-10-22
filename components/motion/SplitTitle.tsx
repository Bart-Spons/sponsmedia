"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Heading whose characters (or words) rise out of a mask, one after another.
 * `trigger="load"` plays straight away, `"scroll"` when it enters the viewport.
 * The text stays hidden until it is split (see `.split-pending` in globals.css),
 * with a CSS failsafe that shows it anyway if the script never runs.
 */
export default function SplitTitle({
    text,
    as: Tag = "h2",
    trigger = "scroll",
    by = "chars",
    delay = 0,
    className = "",
    id,
}: {
    text: string;
    as?: Tag;
    trigger?: "load" | "scroll";
    /** Long titles (over ~8 words) read better word by word. */
    by?: "chars" | "words";
    delay?: number;
    className?: string;
    id?: string;
}) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const split = SplitText.create(el, {
                    type: "words,chars",
                    mask: "words",
                    autoSplit: true,
                    onSplit(self) {
                        gsap.set(el, { visibility: "visible" });
                        return gsap.from(by === "chars" ? self.chars : self.words, {
                            yPercent: 115,
                            rotate: by === "chars" ? 6 : 3,
                            duration: 1.1,
                            ease: "expo.out",
                            stagger: by === "chars" ? 0.022 : 0.06,
                            delay,
                            scrollTrigger:
                                trigger === "scroll"
                                    ? { trigger: el, start: "top 88%" }
                                    : undefined,
                        });
                    },
                });
                return () => split.revert();
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(el, { visibility: "visible" });
            });
        },
        { scope: ref }
    );

    return (
        <Tag
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={ref as any}
            id={id}
            className={`split-pending ${className}`}
        >
            {text}
        </Tag>
    );
}
