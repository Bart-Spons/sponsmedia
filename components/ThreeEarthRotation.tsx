"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeEarthRotationProps {
    className?: string;
}

export default function ThreeEarthRotation({
    className = "",
}: ThreeEarthRotationProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const earthRef = useRef<THREE.Mesh | null>(null);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        console.log("🌍 ThreeEarthRotation mounting");
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

        // Earth geometry and material
        const earthGeometry = new THREE.SphereGeometry(1.15, 64, 64);
        const earthMaterial = new THREE.MeshPhongMaterial({
            shininess: 0.1,
            color: 0x4a90e2, // Base blue color
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);

        // Initial rotation to show Europe
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

        // Atmosphere
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

        // Netherlands marker
        const nethMarker = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 16, 16),
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
        scene.add(nethMarker);

        let isMounted = true;
        setIsReady(true);

        // Animation loop - ONLY handles rotation
        const animate = () => {
            if (!isMounted) return;

            // Start rotating after 5 seconds to show the whole world gradually
            if (Date.now() - startTimeRef.current > 5000) {
                // Continuous slow rotation to show all continents
                earth.rotation.y += 0.002;

                // Very gentle oscillation on X-axis (minimal)
                const time = (Date.now() - startTimeRef.current) * 0.0003;
                earth.rotation.x = initialRotationX + Math.sin(time) * 0.03;

                // Very subtle Z rotation for dynamic movement
                earth.rotation.z = Math.sin(time * 0.7) * 0.01;
            }

            // Pulse Netherlands marker
            const time = Date.now() * 0.005;
            nethMarker.scale.setScalar(0.5 * Math.sin(time) + 1);

            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            isMounted = false;

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

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
    }, []); // No dependencies - this component never re-renders

    return (
        <div
            ref={mountRef}
            className={className}
            style={{
                height: "450px",
                filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))",
                opacity: 1,
                transition: "none",
                
            }}
        />
    );
}
