"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { duration, ease, motionOK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tag = "h1" | "h2" | "p";

/**
 * The site's signature: a title that sits out of focus, with a camera-style
 * focus ring showing the part that is sharp. The ring follows the mouse over
 * the surrounding section (or wanders by itself on touch screens). After a
 * few seconds, or once you scroll, it opens until the whole title is sharp.
 *
 * With `park`, the lens does not step aside but glides to a spot next to the
 * title (desktop only) and stays there, showing `parkSlot` inside the ring.
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
    revealAfter = 3,
    quick = false,
    park,
    parkSlot,
    onPark,
    id,
}: {
    text: string;
    as?: Tag;
    className?: string;
    delay?: number;
    /** Seconds the lens searches before the whole title comes into focus; false keeps searching. */
    revealAfter?: number | false;
    /** Skip the slow entrance: the ghost is there at once and the lens starts moving right away. */
    quick?: boolean;
    /** Where the lens parks after the reveal, as fractions of the title area (desktop only). */
    park?: { x: number; y: number };
    /** Shown inside the parked lens. */
    parkSlot?: ReactNode;
    /** Called once the lens has parked. */
    onPark?: () => void;
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
                const intro = gsap.timeline({ delay: quick ? 0 : delay });
                if (quick) {
                    intro
                        .from("[data-ghost]", { autoAlpha: 0, duration: 0.3, ease: "none" })
                        .to(el, { "--r": () => `${radius()}px`, duration: 0.35, ease: "power3.out" }, 0)
                        .from(ring.current, { scale: 0.5, autoAlpha: 0, duration: 0.35, ease: ease.enter }, 0);
                } else {
                    intro
                        .from("[data-ghost]", { y: 50, autoAlpha: 0, duration: duration.long, ease: ease.enter })
                        .to(el, { "--r": () => `${radius()}px`, duration: duration.long, ease: "elastic.out(1, 0.6)" }, "-=0.6")
                        .from(ring.current, { scale: 0.3, autoAlpha: 0, duration: duration.base, ease: ease.enter }, "<");
                }

                // Wander: without a mouse, the lens drifts across the title.
                let wanderTween: gsap.core.Tween | null = null;
                const wander = () => {
                    const b = box();
                    // Search over the words themselves, not the empty space beside them.
                    const w = el.querySelector<HTMLElement>("[data-sharp]")!.offsetWidth;
                    const r = radius();
                    wanderTween = gsap.to(el, {
                        "--x": `${gsap.utils.random(Math.min(r, w / 2), Math.max(w - r, w / 2))}px`,
                        "--y": `${gsap.utils.random(Math.min(r, b.height / 2), Math.max(b.height - r, b.height / 2))}px`,
                        duration: quick ? gsap.utils.random(0.5, 0.7) : gsap.utils.random(1.6, 2.6),
                        ease: "sine.inOut",
                        onComplete: wander,
                    });
                };

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
                const scrollOpen = gsap.timeline({
                    scrollTrigger: { start: 0, end: () => window.innerHeight * 0.5, scrub: true },
                })
                    .to(el, { "--r": () => `${box().width * 1.4}px`, ease: "power2.out", duration: 0.7 }, 0)
                    .to(ring.current, { autoAlpha: 0, scale: 1.4, ease: "power2.out", duration: 0.25 }, 0)
                    .to("[data-ghost]", { autoAlpha: 0, ease: "none", duration: 0.8 }, 0.2);

                const stopSearching = () => {
                    wanderTween?.kill();
                    scrollOpen.scrollTrigger?.kill();
                    scrollOpen.kill();
                    area.removeEventListener("pointermove", onMove);
                    area.removeEventListener("pointerleave", onLeave);
                };

                // Reveal: after searching for a moment the lens opens up and steps
                // aside, leaving a plain, sharp heading.
                const reveal = () => {
                    stopSearching();
                    gsap.timeline({ onComplete: () => el.removeAttribute("data-lens") })
                        .to(el, { "--r": () => `${box().width * 1.5}px`, duration: duration.long, ease: ease.move, overwrite: "auto" })
                        .to(ring.current, { autoAlpha: 0, scale: 1.6, duration: duration.short, ease: ease.exit }, 0)
                        .to("[data-ghost]", { autoAlpha: 0, duration: duration.base, ease: "none" }, 0.2);
                };

                // Park: the title comes into focus while the lens glides to its
                // spot beside it, grows a little and shows what it found.
                let parkedCleanup: (() => void) | null = null;
                const parkLens = () => {
                    stopSearching();
                    const b = box();
                    const at = () => ({
                        x: `${box().width * park!.x}px`,
                        y: `${box().height * park!.y}px`,
                        r: `${gsap.utils.clamp(80, 170, box().width * 0.11)}px`,
                    });
                    // The mask gets its own radius so it can open fully while the ring shrinks.
                    gsap.set(el, { "--m": getComputedStyle(el).getPropertyValue("--r") });
                    gsap.timeline({
                        onComplete: () => {
                            el.setAttribute("data-lens", "parked");
                            onPark?.();
                        },
                    })
                        .to(el, { "--m": `${b.width * 2}px`, duration: duration.long, ease: ease.move }, 0)
                        .to("[data-ghost]", { autoAlpha: 0, duration: duration.base, ease: "none" }, 0.15)
                        .to(el, { "--x": at().x, "--y": at().y, "--r": at().r, duration: duration.long, ease: ease.move }, 0)
                        .to("[data-center]", { autoAlpha: 0, duration: duration.short }, 0)
                        .fromTo(
                            "[data-park-slot]",
                            { autoAlpha: 0, scale: 0.6 },
                            { autoAlpha: 1, scale: 1, duration: duration.base, ease: ease.enter },
                            duration.long - 0.4
                        );

                    // Parked: the markers turn slowly and the ring leans towards the mouse.
                    const spin = gsap.to("[data-ticks]", { rotate: 360, duration: 30, ease: "none", repeat: -1 });
                    const leanX = gsap.quickTo(ring.current, "x", { duration: 1, ease: "power3" });
                    const leanY = gsap.quickTo(ring.current, "y", { duration: 1, ease: "power3" });
                    const onLean = (e: PointerEvent) => {
                        leanX((e.clientX / window.innerWidth - 0.5) * 24);
                        leanY((e.clientY / window.innerHeight - 0.5) * 24);
                    };
                    const onResize = () => gsap.set(el, { "--x": at().x, "--y": at().y, "--r": at().r });
                    window.addEventListener("pointermove", onLean, { passive: true });
                    window.addEventListener("resize", onResize);
                    parkedCleanup = () => {
                        spin.kill();
                        window.removeEventListener("pointermove", onLean);
                        window.removeEventListener("resize", onResize);
                    };
                };

                let revealCall: gsap.core.Tween | null = null;
                const finish = () =>
                    park && window.matchMedia("(min-width: 768px)").matches ? parkLens() : reveal();

                intro.eventCallback("onComplete", () => {
                    wander();
                    if (revealAfter !== false) revealCall = gsap.delayedCall(revealAfter, finish);
                });

                return () => {
                    revealCall?.kill();
                    parkedCleanup?.();
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
                    {parkSlot && (
                        <span
                            data-ring-glow
                            className="absolute -inset-[45%] rounded-full opacity-0"
                            style={{ background: "radial-gradient(closest-side, rgba(255,217,138,0.35), rgba(226,183,111,0.12) 55%, transparent)" }}
                        />
                    )}
                    {parkSlot && (
                        <div data-park-slot className="invisible absolute inset-[9%] overflow-hidden rounded-full opacity-0">
                            {parkSlot}
                        </div>
                    )}
                    <span className="absolute inset-0 rounded-full border border-primary/70" />
                    <span data-ticks className="absolute inset-0">
                        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-primary" />
                        <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-primary" />
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary" />
                        <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary" />
                    </span>
                    <span data-center className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </div>
            </div>
        </div>
    );
}
