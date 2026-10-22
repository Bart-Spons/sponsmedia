"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { duration, ease, motionOK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tag = "h1" | "h2" | "p";

/**
 * The site's signature: a title that sits out of focus, with a camera-style
 * focus ring showing the part that is sharp. The ring follows the mouse over
 * the surrounding section (or wanders by itself on touch screens), and
 * scrolling the first half screen opens it until the whole title is sharp.
 *
 * Two copies of the text: a blurred ghost (blurred once by CSS) and the real
 * heading on top, masked to a circle. Only CSS variables, transform and
 * opacity change, so the browser never re-blurs anything while animating.
 * Without motion (reduced motion, no JS) it is a normal, sharp heading.
 */
export default function FocusTitle({
    text,
    as: Tag = "h1",
    className = "",
    delay = 0.15,
    id,
}: {
    text: string;
    as?: Tag;
    className?: string;
    delay?: number;
    id?: string;
}) {
    const stage = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = stage.current!;
            const area = (el.closest("section, header") as HTMLElement | null) ?? el;
            const mm = gsap.matchMedia();

            mm.add(motionOK, () => {
                el.setAttribute("data-lens", "");
                gsap.set("[data-sharp]", { visibility: "visible" });

                const box = () => el.getBoundingClientRect();
                const fontSize = () => parseFloat(getComputedStyle(el.querySelector("[data-sharp]")!).fontSize);
                const radius = () => gsap.utils.clamp(40, 160, fontSize() * 0.8);

                gsap.set(el, { "--x": `${Math.min(radius() * 1.3, box().width / 2)}px`, "--y": `${box().height / 2}px`, "--r": "0px" });

                // Entrance: the ghost rises in, then the lens opens and finds focus.
                const intro = gsap.timeline({ delay });
                intro
                    .from("[data-ghost]", { y: 50, autoAlpha: 0, duration: duration.long, ease: ease.enter })
                    .to(el, { "--r": () => `${radius()}px`, duration: duration.long, ease: "elastic.out(1, 0.6)" }, "-=0.6")
                    .from(ring.current, { scale: 0.3, autoAlpha: 0, duration: duration.base, ease: ease.enter }, "<");

                // Wander: without a mouse, the lens drifts across the title.
                let wanderTween: gsap.core.Tween | null = null;
                const wander = () => {
                    const b = box();
                    const r = radius();
                    wanderTween = gsap.to(el, {
                        "--x": `${gsap.utils.random(Math.min(r, b.width / 2), Math.max(b.width - r, b.width / 2))}px`,
                        "--y": `${gsap.utils.random(Math.min(r, b.height / 2), Math.max(b.height - r, b.height / 2))}px`,
                        duration: gsap.utils.random(1.6, 2.6),
                        ease: "sine.inOut",
                        onComplete: wander,
                    });
                };
                intro.eventCallback("onComplete", wander);

                // Mouse: follow the cursor while it is over the section.
                const onMove = (e: PointerEvent) => {
                    if (e.pointerType !== "mouse") return;
                    wanderTween?.kill();
                    const b = box();
                    gsap.to(el, {
                        "--x": `${e.clientX - b.left}px`,
                        "--y": `${e.clientY - b.top}px`,
                        duration: 0.7,
                        ease: "power3",
                        overwrite: "auto",
                    });
                };
                const onLeave = () => wander();
                area.addEventListener("pointermove", onMove, { passive: true });
                area.addEventListener("pointerleave", onLeave);

                // Scroll: over the first half screen the lens opens all the way.
                gsap.timeline({
                    scrollTrigger: { start: 0, end: () => window.innerHeight * 0.5, scrub: true },
                })
                    .to(el, { "--r": () => `${box().width * 1.4}px`, ease: "power2.out", duration: 0.7 }, 0)
                    .to(ring.current, { autoAlpha: 0, scale: 1.4, ease: "power2.out", duration: 0.25 }, 0)
                    .to("[data-ghost]", { autoAlpha: 0, ease: "none", duration: 0.8 }, 0.2);

                return () => {
                    wanderTween?.kill();
                    area.removeEventListener("pointermove", onMove);
                    area.removeEventListener("pointerleave", onLeave);
                    el.removeAttribute("data-lens");
                };
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set("[data-sharp]", { visibility: "visible" });
            });
        },
        { scope: stage }
    );

    return (
        <div ref={stage} className="focus-lens relative">
            <p aria-hidden data-ghost className={`focus-ghost select-none ${className}`}>
                {text}
            </p>
            <Tag id={id} data-sharp className={`focus-sharp split-pending absolute inset-0 ${className}`}>
                {text}
            </Tag>

            {/* Focus ring */}
            <div aria-hidden className="focus-ring pointer-events-none absolute left-0 top-0 hidden">
                <div ref={ring} className="relative h-full w-full">
                    <span className="absolute inset-0 rounded-full border border-primary/70" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-primary" />
                    <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-primary" />
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary" />
                    <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary" />
                    <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </div>
            </div>
        </div>
    );
}
