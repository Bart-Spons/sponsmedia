"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";

interface ThreeEarthProps {
    animationPhase: number;
    className?: string;
}

type FC = GeoJSON.FeatureCollection;

let WORLD_CACHE: FC | null = null;

async function loadWorld(): Promise<FC> {
    if (WORLD_CACHE) return WORLD_CACHE;
    const res = await fetch("/world-110m.geojson", { cache: "force-cache" });
    if (!res.ok) throw new Error("Could not load world-110m.geojson");
    WORLD_CACHE = (await res.json()) as FC;
    return WORLD_CACHE;
}

function colorsForPhase(phase: number, componentStartTime: number) {
    const baseWhite = "#F5F5F5";
    const redColor = "#EF4444";

    const europeCountries = [
        "Germany",
        "France",
        "United Kingdom",
        "Belgium",
        "Spain",
        "Italy",
        "Switzerland",
        "Norway",
        "Sweden",
        "Denmark",
        "Finland",
        "Poland",
        "Czech Republic",
        "Austria",
        "Portugal",
        "Greece",
        "Ukraine",
        "Romania",
        "Hungary",
        "Bulgaria",
        "Croatia",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Lithuania",
        "Latvia",
        "Estonia",
        "Ireland",
        "Iceland",
        "Luxembourg",
        "Malta",
        "Cyprus",
        "Albania",
        "North Macedonia",
        "Bosnia and Herzegovina",
        "Montenegro",
        "Moldova",
        "Belarus",
    ];

    const worldCountries = [
        "United States of America",
        "Canada",
        "Brazil",
        "Argentina",
        "Australia",
        "Japan",
        "China",
        "India",
        "South Africa",
        "Egypt",
        "Russia",
        "Turkey",
        "Mexico",
        "Chile",
        "Peru",
        "Colombia",
        "Venezuela",
        "Ecuador",
        "Uruguay",
        "Paraguay",
        "Bolivia",
        "Guyana",
        "Suriname",
        "Thailand",
        "Vietnam",
        "Malaysia",
        "Singapore",
        "Indonesia",
        "Philippines",
        "South Korea",
        "Taiwan",
        "Mongolia",
        "Kazakhstan",
        "Uzbekistan",
        "Pakistan",
        "Bangladesh",
        "Sri Lanka",
        "Myanmar",
        "Cambodia",
        "Laos",
        "New Zealand",
        "Papua New Guinea",
        "Morocco",
        "Algeria",
        "Tunisia",
        "Libya",
        "Sudan",
        "Ethiopia",
        "Kenya",
        "Tanzania",
        "Uganda",
        "Ghana",
        "Nigeria",
        "Cameroon",
        "Democratic Republic of the Congo",
        "Angola",
        "Zambia",
        "Zimbabwe",
        "Botswana",
        "Namibia",
        "Madagascar",
        "Iran",
        "Iraq",
        "Saudi Arabia",
        "Afghanistan",
        "Israel",
        "Jordan",
        "Lebanon",
        "Syria",
        "Yemen",
        "Oman",
        "United Arab Emirates",
    ];

    const timeInSeconds = (Date.now() - componentStartTime) / 1000;
    let highlightedCountries: string[] = [];

    if (timeInSeconds <= 6) {
        const europeProgress = timeInSeconds / 6;
        const europeCountriesToColor = Math.floor(
            europeProgress * europeCountries.length
        );
        highlightedCountries = europeCountries.slice(0, europeCountriesToColor);
    } else if (timeInSeconds <= 12) {
        const worldColoringTime = timeInSeconds - 6;
        const worldProgress = worldColoringTime / 6;
        const worldCountriesToColor = Math.floor(
            worldProgress * worldCountries.length
        );
        highlightedCountries = [
            ...europeCountries,
            ...worldCountries.slice(0, worldCountriesToColor),
        ];
    } else {
        highlightedCountries = [...europeCountries, ...worldCountries];
    }

    return {
        land: baseWhite,
        europe: baseWhite,
        netherlands: redColor,
        highlightedCountries,
    };
}

export default function ThreeEarth({
    animationPhase,
    className = "",
}: ThreeEarthProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const earthRef = useRef<THREE.Mesh | null>(null);
    const animRef = useRef<number | null>(null);
    const europeMarkersRef = useRef<THREE.Mesh[]>([]);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const createTexture = async (phase: number, componentStartTime: number) => {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 2048;
            canvas.height = 1024;
            const ctx = canvas.getContext("2d")!;

            const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grad.addColorStop(0, "#E0F2FE");
            grad.addColorStop(0.5, "#BAE6FD");
            grad.addColorStop(1, "#E0F2FE");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const projection = d3
                .geoEquirectangular()
                .translate([canvas.width / 2, canvas.height / 2])
                .scale(canvas.width / (2 * Math.PI));
            const path = d3.geoPath(projection, ctx as any);

            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 0.9;
            ctx.strokeStyle = "rgba(0,0,0,0.28)";

            const world = await loadWorld();
            const { land, netherlands, highlightedCountries } = colorsForPhase(
                phase,
                startTime
            );

            for (const f of world.features) {
                const countryName = (f.properties as any)?.name as
                    | string
                    | undefined;

                ctx.beginPath();
                path(f as any);

                let fillColor = land;
                if (countryName === "Netherlands") {
                    fillColor = netherlands;
                } else if (highlightedCountries.includes(countryName || "")) {
                    fillColor = "#22C55E";
                }

                ctx.fillStyle = fillColor;
                ctx.fill();
                ctx.stroke();
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.anisotropy = 8;
            return texture;
        } catch (error) {
            console.error("Error creating texture:", error);
            const canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 128;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = "#1a1a2e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return new THREE.CanvasTexture(canvas);
        }
    };

    useEffect(() => {
        if (!mountRef.current || typeof window === "undefined") return;

        setStartTime(Date.now());
        setIsLoading(true);
        setHasError(false);

        // Clean up existing renderer
        if (rendererRef.current) {
            if (mountRef.current?.contains(rendererRef.current.domElement)) {
                mountRef.current.removeChild(rendererRef.current.domElement);
            }
            rendererRef.current.dispose();
            rendererRef.current = null;
        }

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Vierkante camera (aspect 1:1)
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0.3, 2.5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        const mount = mountRef.current;
        mount.appendChild(renderer.domElement);

        // Init size: alleen width gebruiken (vierkant)
        const init = () => {
            const size = Math.max(1, Math.floor(mount.clientWidth || 450));
            renderer.setSize(size, size, false);
            // CSS sizing laat de container bepalen
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            camera.aspect = 1;
            camera.updateProjectionMatrix();
        };
        init();

        const geometry = new THREE.SphereGeometry(1.15, 64, 64);
        const material = new THREE.MeshPhongMaterial({ shininess: 0.1 });
        const earth = new THREE.Mesh(geometry, material);
        earthRef.current = earth;

        // Startpositie Europa
        earth.rotation.y = Math.PI * 1.4;
        earth.rotation.x = Math.PI * 0.15;
        scene.add(earth);

        // Licht
        scene.add(new THREE.AmbientLight(0x404040, 0.6));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-1, 0, 1);
        scene.add(directionalLight);

        // NL marker
        const netherlands = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 16, 16),
            new THREE.MeshBasicMaterial({
                color: 0xff4444,
                transparent: true,
                opacity: 1,
            })
        );
        const lat = 52.1326,
            lng = 5.2913;
        const r = 1.17;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        netherlands.position.set(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
        );
        scene.add(netherlands);

        // Texture laden
        let isMounted = true;
        (async () => {
            try {
                const texture = await createTexture(animationPhase, startTime);
                if (!isMounted) return;
                material.map = texture;
                material.needsUpdate = true;
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading earth texture:", error);
                setHasError(true);
                setIsLoading(false);
            }
        })();

        // Progressieve inkleuring
        const progressiveColoringTimer = setInterval(async () => {
            if (!isMounted || !material) return;
            const texture = await createTexture(animationPhase, startTime);
            material.map = texture;
            material.needsUpdate = true;
        }, 250);

        // ResizeObserver: schaal alleen op basis van width (vierkant)
        const ro = new ResizeObserver((entries) => {
            const w = Math.max(1, Math.floor(entries[0].contentRect.width));
            renderer.setSize(w, w, false);
            camera.aspect = 1;
            camera.updateProjectionMatrix();
        });
        ro.observe(mount);

        // Animatie
        const animate = () => {
            if (!renderer || !scene) return;
            const elapsedTime = Date.now() - startTime;
            const shouldRotate = elapsedTime > 5000;
            if (shouldRotate) {
                earth.rotation.y += 0.008;
            }
            const pulse = Math.sin(Date.now() * 0.005) * 0.5 + 1;
            netherlands.scale.setScalar(pulse);

            renderer.render(scene, camera);
            animRef.current = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            isMounted = false;
            if (animRef.current) {
                cancelAnimationFrame(animRef.current);
                animRef.current = null;
            }
            clearInterval(progressiveColoringTimer);
            ro.disconnect();

            if (scene) {
                while (scene.children.length > 0) {
                    const child = scene.children[0];
                    scene.remove(child);
                    if (child instanceof THREE.Mesh) {
                        child.geometry.dispose();
                        if (child.material instanceof THREE.Material) {
                            const m: any = child.material;
                            if (m.map) m.map.dispose();
                            child.material.dispose();
                        }
                    }
                }
                sceneRef.current = null;
            }

            if (rendererRef.current) {
                if (
                    mountRef.current?.contains(rendererRef.current.domElement)
                ) {
                    mountRef.current.removeChild(
                        rendererRef.current.domElement
                    );
                }
                rendererRef.current.dispose();
                rendererRef.current = null;
            }

            earthRef.current = null;
            europeMarkersRef.current = [];
        };
    }, []);

    // Texture updaten bij fase-wijziging
    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!earthRef.current) return;
            const material = earthRef.current
                .material as THREE.MeshPhongMaterial;
            const texture = await createTexture(animationPhase, startTime);
            if (cancelled) return;
            material.map = texture;
            material.needsUpdate = true;
        })();
        return () => {
            cancelled = true;
        };
    }, [animationPhase, startTime]);

    return (
        <div
            ref={mountRef}
            className={className}
            style={{
                width: "100%",
                maxWidth: "450px", // oude breedte als maximum
                aspectRatio: "1 / 1", // houdt 'm perfect rond
                filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                </div>
            )}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">🌍</div>
                        <div>Loading Earth...</div>
                    </div>
                </div>
            )}
        </div>
    );
}
