"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";

interface SimpleThreeEarthProps {
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
            priority: "low", // Lower priority to not block critical resources
        });
        if (!res.ok) {
            console.error(
                "❌ Failed to load geojson:",
                res.status,
                res.statusText
            );
            throw new Error(`Could not load world-110m.geojson: ${res.status}`);
        }
        const data = await res.json();
        WORLD_CACHE = data;
        console.log(
            "✅ World geojson loaded successfully:",
            WORLD_CACHE?.features?.length || 0,
            "features"
        );
        return data;
    } catch (error) {
        console.error("❌ Failed to load world data:", error);
        throw error;
    }
}

export default function SimpleThreeEarth({
    animationPhase,
    className = "",
}: SimpleThreeEarthProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const earthRef = useRef<THREE.Mesh | null>(null);
    const animationRef = useRef<number | null>(null);
    const markerRef = useRef<THREE.Mesh | null>(null);
    const europeanMarkersRef = useRef<THREE.Mesh[]>([]);
    const startTimeRef = useRef<number | null>(null); // Initialize as null
    const [isReady, setIsReady] = useState(false);

    const createTexture = async (
        animationPhase: number
    ): Promise<THREE.CanvasTexture> => {
        const canvas = document.createElement("canvas");
        canvas.width = 1536; // Good balance for quality and performance
        canvas.height = 768; // Proportional to maintain quality
        const ctx = canvas.getContext("2d")!;

        // Create linear gradient ocean background exactly like live site
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

        // Drawing settings exactly like live site
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = "rgba(0,0,0,0.28)";

        const world = await loadWorld();

        // Check if mobile device for performance optimization
        const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;

        // Country lists exactly like live site
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

        let highlightedCountries: string[] = [];

        if (isMobile) {
            // Mobile: Show all countries immediately for better performance
            highlightedCountries = [...europeCountries, ...worldCountries];
            console.log(
                "📱 Mobile detected: Showing all countries immediately"
            );
        } else {
            // Desktop: Progressive loading for visual effect
            const startTime = startTimeRef.current || Date.now();
            const elapsed = (Date.now() - startTime) / 1000;

            if (elapsed <= 6) {
                // First 6 seconds: progressively show Europe
                const count = Math.floor(
                    (elapsed / 6) * europeCountries.length
                );
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
                    `🌎 Phase 2 (${elapsed.toFixed(
                        1
                    )}s): Europe + World ${count}/${worldCountries.length}`
                );
            } else {
                // After 12 seconds: show all countries permanently
                highlightedCountries = [...europeCountries, ...worldCountries];
                console.log(
                    `🌏 Phase 3 (${elapsed.toFixed(1)}s): All countries visible`
                );
            }
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
        texture.anisotropy = 4; // Balanced for performance

        return texture;
    };

    // Single effect that handles everything - like the working /out version
    useEffect(() => {
        console.log("🚀 SimpleThreeEarth mounting with phase:", animationPhase);

        // Initialize start time only once - this prevents the Earth from resetting
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

        // Earth - restore original quality like /out version
        const earthGeometry = new THREE.SphereGeometry(1.15, 64, 64);
        const earthMaterial = new THREE.MeshPhongMaterial({
            shininess: 0.1,
            color: 0x4a90e2, // Base blue color while texture loads
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        const initialRotationY = 1.4 * Math.PI;
        const initialRotationX = 0.15 * Math.PI;
        earth.rotation.y = initialRotationY;
        earth.rotation.x = initialRotationX;
        earthRef.current = earth;
        scene.add(earth);

        // Lighting
        scene.add(new THREE.AmbientLight(0x404040, 0.6));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-1, 0, 1);
        scene.add(directionalLight);

        // Atmosphere - restore original quality like /out version
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.22, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0x87ceeb,
                transparent: true,
                opacity: 0.05,
                side: THREE.BackSide,
            })
        );
        scene.add(atmosphere);

        // Netherlands marker - initial size, will be updated by animationPhase effect
        const nethMarker = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 16, 16), // Start with phase 0 size
            new THREE.MeshBasicMaterial({
                color: 0xff4444,
                transparent: true,
                opacity: 1,
            })
        );
        const nethLat = (37.8674 * Math.PI) / 180;
        const nethLng = (185.2913 * Math.PI) / 180;
        nethMarker.position.set(
            -1.17 * Math.sin(nethLat) * Math.cos(nethLng),
            1.17 * Math.cos(nethLat),
            1.17 * Math.sin(nethLat) * Math.sin(nethLng)
        );
        markerRef.current = nethMarker;
        scene.add(nethMarker);

        // European markers
        const europeanCities = [
            { name: "Germany", lat: 51.1657, lng: 10.4515 },
            { name: "France", lat: 46.6034, lng: 1.8883 },
            { name: "United Kingdom", lat: 55.3781, lng: -3.436 },
            { name: "Spain", lat: 40.4637, lng: -3.7492 },
            { name: "Belgium", lat: 50.5039, lng: 4.4699 },
        ];

        const europeanMarkers: THREE.Mesh[] = [];
        europeanCities.forEach((city) => {
            const marker = new THREE.Mesh(
                new THREE.SphereGeometry(0.015, 12, 12),
                new THREE.MeshBasicMaterial({
                    color: 0xff4444,
                    transparent: true,
                    opacity: 0,
                })
            );
            const lat = (90 - city.lat) * (Math.PI / 180);
            const lng = (city.lng + 180) * (Math.PI / 180);
            marker.position.set(
                -1.16 * Math.sin(lat) * Math.cos(lng),
                1.16 * Math.cos(lat),
                1.16 * Math.sin(lat) * Math.sin(lng)
            );
            europeanMarkers.push(marker);
            scene.add(marker);
        });
        europeanMarkersRef.current = europeanMarkers;

        let isMounted = true;

        // Show Earth immediately - no waiting for texture loading
        setIsReady(true);

        // Load initial texture in background - like the working /out version
        (async () => {
            try {
                console.log("🎨 Creating initial texture...");
                const texture = await createTexture(animationPhase);
                if (isMounted && earthMaterial) {
                    earthMaterial.map = texture;
                    earthMaterial.color.setHex(0xffffff); // Reset to white when texture loads
                    earthMaterial.needsUpdate = true;
                    console.log("✅ Initial texture applied successfully");
                }
            } catch (error) {
                console.error("❌ Texture error:", error);
            }
        })();

        // Update texture every 250ms like the working /out version, but stop after animation completes
        // On mobile, reduce frequency for better performance
        const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;
        const updateInterval = isMobile ? 500 : 250; // 500ms for mobile, 250ms for desktop

        const textureInterval = setInterval(async () => {
            if (!isMounted) return;

            // Stop texture updates after 15 seconds to prevent unnecessary redraws
            // On mobile, stop earlier since countries are shown immediately
            const stopAfter = isMobile ? 5 : 15;
            const startTime = startTimeRef.current || Date.now();
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed > stopAfter) {
                console.log(
                    `🛑 Stopping texture updates - animation complete (${
                        isMobile ? "mobile" : "desktop"
                    })`
                );
                clearInterval(textureInterval);
                return;
            }

            try {
                const texture = await createTexture(animationPhase);
                if (earthMaterial) {
                    earthMaterial.map = texture;
                    earthMaterial.needsUpdate = true;
                }
            } catch (error) {
                console.error("Texture update error:", error);
            }
        }, updateInterval);

        // Animation loop
        const animate = () => {
            if (!isMounted) return;

            // Start rotating after 5 seconds and never stop
            const startTime = startTimeRef.current || Date.now();
            if (Date.now() - startTime > 5000) {
                // Simple continuous rotation - never stops
                earth.rotation.y += 0.002;
            }

            // Pulse Netherlands marker
            const time = Date.now() * 0.005;
            nethMarker.scale.setScalar(0.5 * Math.sin(time) + 1);

            // Pulse European markers
            europeanMarkers.forEach((marker, index) => {
                const markerTime = Date.now() * 0.003 + index * 0.5;
                marker.scale.setScalar(0.3 * Math.sin(markerTime) + 1);
            });

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
            markerRef.current = null;
            europeanMarkersRef.current = [];
        };
    }, []); // NO dependencies - this effect runs only once and never re-renders

    // Separate effect to handle animationPhase changes - only updates markers
    useEffect(() => {
        console.log("🔄 Animation phase changed to:", animationPhase);

        // Update European markers opacity based on animation phase
        europeanMarkersRef.current.forEach((marker) => {
            const material = marker.material as THREE.MeshBasicMaterial;
            if (animationPhase >= 1) {
                material.opacity = animationPhase === 2 ? 0.6 : 0.9;
            } else {
                material.opacity = 0;
            }
        });

        // Update Netherlands marker size based on animation phase
        if (markerRef.current) {
            const markerSize =
                animationPhase === 0
                    ? 0.035
                    : animationPhase === 1
                    ? 0.028
                    : 0.025;
            markerRef.current.geometry.dispose();
            markerRef.current.geometry = new THREE.SphereGeometry(
                markerSize,
                16,
                16
            );
        }
    }, [animationPhase]); // Only animationPhase dependency - no scene recreation

    return (
        <div
            ref={mountRef}
            className={`${className} mt-8 md:mt-0`}
            style={{
                width: "450px",
                height: "450px",
                filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))",
                opacity: 1, // Always visible immediately
                transition: "none", // No fade transition for instant appearance
            }}
        >
            {/* No loading text - Earth appears instantly */}
        </div>
    );
}
