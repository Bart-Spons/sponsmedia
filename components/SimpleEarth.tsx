"use client";
import { useEffect, useRef } from "react";

export default function SimpleEarth() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("SimpleEarth component mounted!");
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log("Canvas not found!");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.log("Canvas context not found!");
            return;
        }

        console.log("Starting animation...");
        // Simple animated earth visualization
        let rotation = 0;

        const animate = () => {
            // Clear canvas with space background
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw earth
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 180;

            // Main earth circle with gradient
            const gradient = ctx.createRadialGradient(
                centerX - 50,
                centerY - 50,
                0,
                centerX,
                centerY,
                radius
            );
            gradient.addColorStop(0, "#4a90e2");
            gradient.addColorStop(0.7, "#2563eb");
            gradient.addColorStop(1, "#1e40af");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // Continents (more realistic shapes and colors)
            ctx.fillStyle = "#10b981";

            // Europe/Africa
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(rotation) * 45,
                centerY - 30,
                35,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Americas
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(rotation + Math.PI) * 60,
                centerY + 15,
                45,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Asia
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(rotation + Math.PI / 2) * 50,
                centerY - 45,
                30,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Additional smaller continents
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(rotation + Math.PI / 4) * 70,
                centerY + 60,
                20,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Netherlands highlight (more prominent)
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(rotation) * 40,
                centerY - 35,
                4,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Add a glow effect for Netherlands
            ctx.shadowColor = "#ef4444";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(rotation) * 40,
                centerY - 35,
                2,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.shadowBlur = 0;

            rotation += 0.005; // Slower rotation for more realistic effect
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-full">
            <canvas
                ref={canvasRef}
                width={400}
                className="rounded-full"
                style={{
                    filter: "drop-shadow(0 0 20px rgba(59,130,246,0.3))",
                }}
            />
        </div>
    );
}
