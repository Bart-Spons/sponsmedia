"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Bulb from "@/components/home/Bulb";

/**
 * The SponsMedia light bulb in real 3D (three.js): a lathed glass bulb, a
 * glowing filament, a metal screw base with reflections and bloom for the
 * glow. It turns slowly and leans towards the mouse. `on` switches it on with
 * a flicker, after which the light keeps breathing.
 *
 * three.js is only loaded on desktop with motion allowed (the only place the
 * hero shows the bulb), only renders while the bulb is on screen, and falls
 * back to the flat SVG bulb when WebGL is not available.
 */
export default function Bulb3D({ on }: { on: boolean }) {
    const host = useRef<HTMLDivElement>(null);
    const switchOn = useRef<(() => void) | null>(null);
    const wantsOn = useRef(on);
    wantsOn.current = on;
    const [failed, setFailed] = useState(false);
    const fallback = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const el = host.current;
        if (!el) return;
        if (!window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return;

        let disposed = false;
        let cleanup = () => {};

        (async () => {
            try {
                const THREE = await import("three");
                const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
                const { EffectComposer } = await import("three/examples/jsm/postprocessing/EffectComposer.js");
                const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js");
                const { UnrealBloomPass } = await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");
                const { OutputPass } = await import("three/examples/jsm/postprocessing/OutputPass.js");
                if (disposed) return;

                const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 0.8;
                renderer.domElement.className = "absolute inset-0 h-full w-full";
                el.appendChild(renderer.domElement);

                const scene = new THREE.Scene();
                scene.background = new THREE.Color("#0a0f1a");
                const pmrem = new THREE.PMREMGenerator(renderer);
                const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
                scene.environment = env;

                const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
                camera.position.set(0, 0, 8.2);

                const bulb = new THREE.Group();
                bulb.position.y = 0.2;
                scene.add(bulb);

                // Glass: a lathed profile from the neck up over the dome.
                const profile: InstanceType<typeof THREE.Vector2>[] = [
                    new THREE.Vector2(0.43, -0.95),
                    new THREE.Vector2(0.46, -0.78),
                    new THREE.Vector2(0.56, -0.55),
                ];
                for (let a = -40; a <= 90; a += 5) {
                    const r = (a * Math.PI) / 180;
                    profile.push(new THREE.Vector2(Math.max(Math.cos(r), 0.0001), 0.35 + Math.sin(r)));
                }
                const glassMat = new THREE.MeshPhysicalMaterial({
                    color: "#ffd7a0",
                    transparent: true,
                    opacity: 0.2,
                    roughness: 0.04,
                    metalness: 0,
                    clearcoat: 1,
                    clearcoatRoughness: 0.05,
                    emissive: new THREE.Color("#ff9a1f"),
                    emissiveIntensity: 0,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                });
                const glass = new THREE.Mesh(new THREE.LatheGeometry(profile, 72), glassMat);
                glass.renderOrder = 2;
                bulb.add(glass);

                // Warm haze inside the glass
                const hazeMat = new THREE.MeshBasicMaterial({
                    color: "#ff9f2e",
                    transparent: true,
                    opacity: 0,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                });
                const haze = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), hazeMat);
                haze.position.y = 0.3;
                bulb.add(haze);

                // Filament on two supports
                const filMat = new THREE.MeshStandardMaterial({
                    color: "#ffd9a0",
                    emissive: new THREE.Color("#ff9f30"),
                    emissiveIntensity: 0.15,
                    roughness: 0.4,
                });
                const zigzag = new THREE.CatmullRomCurve3(
                    [
                        [-0.22, -0.5],
                        [-0.22, 0.05],
                        [-0.11, 0.3],
                        [0, 0.05],
                        [0.11, 0.3],
                        [0.22, 0.05],
                        [0.22, -0.5],
                    ].map(([x, y]) => new THREE.Vector3(x, y, 0)),
                    false,
                    "catmullrom",
                    0.15
                );
                bulb.add(new THREE.Mesh(new THREE.TubeGeometry(zigzag, 120, 0.022, 10), filMat));
                const wireMat = new THREE.MeshStandardMaterial({ color: "#8a8f9a", metalness: 0.8, roughness: 0.35 });
                for (const x of [-0.22, 0.22]) {
                    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8), wireMat);
                    wire.position.set(x, -0.72, 0);
                    bulb.add(wire);
                }

                // Screw base: ridges, then the contact tip
                const basePts: InstanceType<typeof THREE.Vector2>[] = [new THREE.Vector2(0.44, -0.95)];
                for (let i = 0; i < 5; i++) {
                    const y = -0.98 - i * 0.12;
                    basePts.push(new THREE.Vector2(0.47, y), new THREE.Vector2(0.43, y - 0.06));
                }
                basePts.push(new THREE.Vector2(0.4, -1.62), new THREE.Vector2(0.2, -1.74), new THREE.Vector2(0.0001, -1.76));
                const baseMat = new THREE.MeshStandardMaterial({ color: "#c9ccd4", metalness: 1, roughness: 0.28 });
                bulb.add(new THREE.Mesh(new THREE.LatheGeometry(basePts, 64), baseMat));

                const bulbLight = new THREE.PointLight("#ffa940", 0, 6, 1.5);
                bulbLight.position.set(0, 0.2, 0);
                bulb.add(bulbLight);
                scene.add(new THREE.AmbientLight("#ffffff", 0.15));
                const key = new THREE.DirectionalLight("#ffffff", 0.6);
                key.position.set(-3, 4, 5);
                scene.add(key);

                const composer = new EffectComposer(renderer);
                composer.addPass(new RenderPass(scene, camera));
                const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0, 0.4, 0.82);
                composer.addPass(bloom);
                composer.addPass(new OutputPass());

                const resize = () => {
                    const w = el.clientWidth || 1;
                    const h = el.clientHeight || 1;
                    renderer.setSize(w, h, false);
                    composer.setSize(w, h);
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                };
                resize();
                const ro = new ResizeObserver(resize);
                ro.observe(el);

                // Everything the switch-on animates
                const p = { fil: 0.15, glass: 0, haze: 0, light: 0, bloom: 0 };
                const apply = () => {
                    filMat.emissiveIntensity = p.fil;
                    glassMat.emissiveIntensity = p.glass;
                    glassMat.opacity = 0.2 + p.glass * 0.3;
                    hazeMat.opacity = p.haze;
                    bulbLight.intensity = p.light;
                    bloom.strength = p.bloom;
                };
                switchOn.current = () => {
                    gsap.timeline({ onUpdate: apply })
                        .to(p, { fil: 3, duration: 0.05 })
                        .to(p, { fil: 0.6, duration: 0.08 })
                        .to(p, { fil: 3, duration: 0.06 })
                        .to(p, { fil: 1, duration: 0.1 })
                        .to(p, { fil: 3.5, duration: 0.15 })
                        .to(p, { glass: 0.22, haze: 0.16, light: 3, bloom: 0.7, duration: 1.4, ease: "power2.out" }, "<")
                        .add(() => {
                            gsap.to(p, {
                                bloom: 0.5,
                                light: 2.2,
                                haze: 0.1,
                                duration: 2.4,
                                ease: "sine.inOut",
                                yoyo: true,
                                repeat: -1,
                                onUpdate: apply,
                            });
                        });
                };

                // Slow turn, leaning towards the mouse
                const lean = { x: 0, y: 0 };
                const onPointer = (e: PointerEvent) => {
                    lean.x = (e.clientY / window.innerHeight - 0.5) * 0.5;
                    lean.y = (e.clientX / window.innerWidth - 0.5) * 0.8;
                };
                window.addEventListener("pointermove", onPointer, { passive: true });

                let visible = true;
                const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
                io.observe(el);

                let spin = 0;
                const tick = () => {
                    if (!visible || document.hidden) return;
                    spin += 0.004;
                    bulb.rotation.y += (spin + lean.y - bulb.rotation.y) * 0.06;
                    bulb.rotation.x += (lean.x * 0.6 - bulb.rotation.x) * 0.06;
                    bulb.rotation.z = Math.sin(spin * 2) * 0.04;
                    composer.render();
                };
                gsap.ticker.add(tick);
                // Parked before three.js finished loading? Switch on now.
                if (wantsOn.current) switchOn.current();

                cleanup = () => {
                    gsap.ticker.remove(tick);
                    gsap.killTweensOf(p);
                    window.removeEventListener("pointermove", onPointer);
                    io.disconnect();
                    ro.disconnect();
                    scene.traverse((o) => {
                        const mesh = o as InstanceType<typeof THREE.Mesh>;
                        mesh.geometry?.dispose();
                        const m = mesh.material as { dispose?: () => void } | undefined;
                        m?.dispose?.();
                    });
                    env.dispose();
                    pmrem.dispose();
                    composer.dispose();
                    renderer.dispose();
                    renderer.domElement.remove();
                };
            } catch {
                if (!disposed) setFailed(true);
            }
        })();

        return () => {
            disposed = true;
            switchOn.current = null;
            cleanup();
        };
    }, []);

    useEffect(() => {
        if (!on) return;
        if (failed) {
            // Flat fallback: just show the lit drawing.
            const q = gsap.utils.selector(fallback.current);
            gsap.to(q("[data-glass], [data-halo], [data-rays], [data-filament]"), { opacity: 1, duration: 0.8 });
            gsap.to(q("[data-core]"), { opacity: 0.9, duration: 0.8 });
            return;
        }
        switchOn.current?.();
    }, [on, failed]);

    return (
        <div ref={host} className="relative h-full w-full bg-[#0a0f1a]">
            {failed && <Bulb ref={fallback} />}
        </div>
    );
}
