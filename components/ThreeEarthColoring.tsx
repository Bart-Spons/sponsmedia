"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";

interface ThreeEarthColoringProps {
    animationPhase: number;
    className?: string;
}

type FC = GeoJSON.FeatureCollection;
let WORLD_CACHE: FC | null = null;

async function loadWorld(): Promise<FC> {
    if (WORLD_CACHE) return WORLD_CACHE;
    try {
        console.log("🌍 Loading world-110m.geojson...");
        const res = await fetch("/world-110m.geojson", {
            cache: "force-cache",
            priority: "low",
        });
        if (!res.ok) {
            throw new Error(`Could not load world-110m.geojson: ${res.status}`);
        }
        const data = await res.json();
        WORLD_CACHE = data;
        return data;
    } catch (error) {
        console.error("❌ Failed to load world data:", error);
        throw error;
    }
}

export default function ThreeEarthColoring({
    animationPhase,
    className = "",
}: ThreeEarthColoringProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const earthRef = useRef<THREE.Mesh | null>(null);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const [isReady, setIsReady] = useState(false);

    const createTexture = async (): Promise<THREE.CanvasTexture> => {
        const canvas = document.createElement("canvas");
        canvas.width = 1536;
        canvas.height = 768;
        const ctx = canvas.getContext("2d")!;

        // Ocean background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#E0F2FE");
        gradient.addColorStop(0.5, "#BAE6FD");
        gradient.addColorStop(1, "#E0F2FE");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Setup projection
        const projection = d3
            .geoEquirectangular()
            .translate([canvas.width / 2, canvas.height / 2])
            .scale(canvas.width / (2 * Math.PI));

        const path = d3.geoPath(projection, ctx);

        // Drawing settings
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = "rgba(0,0,0,0.28)";

        const world = await loadWorld();

        // Country lists
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

        // Time-based progression
        const startTime = startTimeRef.current || Date.now();
        const elapsed = (Date.now() - startTime) / 1000;
        let highlightedCountries: string[] = [];

        if (elapsed <= 6) {
            // First 6 seconds: progressively show Europe
            const count = Math.floor((elapsed / 6) * europeCountries.length);
            highlightedCountries = europeCountries.slice(0, count);
            console.log(
                `🌍 Phase 1 (${elapsed.toFixed(1)}s): Europe ${count}/${
                    europeCountries.length
                }`
            );
        } else if (elapsed <= 12) {
            // Next 6 seconds: Europe + progressively show world countries
            const count = Math.floor(
                ((elapsed - 6) / 6) * worldCountries.length
            );
            highlightedCountries = [
                ...europeCountries,
                ...worldCountries.slice(0, count),
            ];
            console.log(
                `🌎 Phase 2 (${elapsed.toFixed(1)}s): Europe + World ${count}/${
                    worldCountries.length
                }`
            );
        } else {
            // After 12 seconds: show all countries permanently
            highlightedCountries = [...europeCountries, ...worldCountries];
            console.log(
                `🌏 Phase 3 (${elapsed.toFixed(1)}s): All countries visible`
            );
        }

        // Draw countries
        for (const feature of world.features) {
            const countryName = feature.properties?.name as string;

            ctx.beginPath();
            path(feature as any);

            let fillColor = "#F5F5F5"; // Default color

            if (countryName === "Netherlands") {
                fillColor = "#EF4444"; // Red for Netherlands
            } else if (highlightedCountries.includes(countryName || "")) {
                fillColor = "#22C55E"; // Green for highlighted countries
            }

            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.anisotropy = 4;

        return texture;
    };

    useEffect(() => {
        console.log(
            "🎨 ThreeEarthColoring mounting with phase:",
            animationPhase
        );

        // Initialize start time only once - this prevents the animation from resetting
        if (startTimeRef.current === null) {
            startTimeRef.current = Date.now();
            console.log("⏱️ Animation start time set:", startTimeRef.current);
        }

        if (!mountRef.current) {
            console.error("❌ Mount ref not available");
            return;
        }

        // Cleanup any existing renderer
        if (rendererRef.current) {
            const existingCanvas = mountRef.current.querySelector("canvas");
            if (existingCanvas) {
                mountRef.current.removeChild(existingCanvas);
            }
            rendererRef.current.dispose();
            rendererRef.current = null;
        }

        // Create scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0.3, 2.5);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(450, 450);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        // Earth - STATIC position, no rotation
        const earthGeometry = new THREE.SphereGeometry(1.15, 64, 64);
        const earthMaterial = new THREE.MeshPhongMaterial({
            shininess: 0.1,
            color: 0x4a90e2, // Base blue color while texture loads
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.rotation.y = 1.4 * Math.PI;
        earth.rotation.x = 0.15 * Math.PI;
        earthRef.current = earth;
        scene.add(earth);

        // Lighting
        scene.add(new THREE.AmbientLight(0x404040, 0.6));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-1, 0, 1);
        scene.add(directionalLight);

        let isMounted = true;
        setIsReady(true);

        // Load initial texture
        (async () => {
            try {
                console.log("🎨 Creating initial texture...");
                const texture = await createTexture();
                if (isMounted && earthMaterial) {
                    earthMaterial.map = texture;
                    earthMaterial.color.setHex(0xffffff);
                    earthMaterial.needsUpdate = true;
                    console.log("✅ Initial texture applied successfully");
                }
            } catch (error) {
                console.error("❌ Texture error:", error);
            }
        })();

        // Update texture every 250ms for progressive coloring
        const textureInterval = setInterval(async () => {
            if (!isMounted) return;

            // Stop texture updates after 15 seconds
            const startTime = startTimeRef.current || Date.now();
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed > 15) {
                console.log("🛑 Stopping texture updates - animation complete");
                clearInterval(textureInterval);
                return;
            }

            try {
                const texture = await createTexture();
                if (earthMaterial) {
                    earthMaterial.map = texture;
                    earthMaterial.needsUpdate = true;
                }
            } catch (error) {
                console.error("Texture update error:", error);
            }
        }, 250);

        // Simple render loop - NO rotation, only rendering
        const animate = () => {
            if (!isMounted) return;
            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            isMounted = false;

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            clearInterval(textureInterval);

            // Clean up scene
            while (scene.children.length > 0) {
                const child = scene.children[0];
                scene.remove(child);
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (child.material instanceof THREE.Material) {
                        const material = child.material as any;
                        if (material.map) material.map.dispose();
                        child.material.dispose();
                    }
                }
            }

            // Clean up renderer
            if (renderer && mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();

            // Reset refs
            sceneRef.current = null;
            rendererRef.current = null;
            earthRef.current = null;
        };
    }, [animationPhase]); // Only responds to animationPhase changes for texture updates

    return (
        <div
            ref={mountRef}
            className={className}
            style={{
                height: "450px",
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none", // Allow interactions to pass through to rotation component
            }}
        />
    );
}
