// components/HeroTechStack.tsx
"use client";
import { useState, useEffect } from "react";

const techStack = [
    { name: "React", icon: "⚛️", color: "text-blue-400" },
    { name: "Next.js", icon: "▲", color: "text-white" },
    { name: "TypeScript", icon: "📘", color: "text-blue-500" },
    { name: "Tailwind", icon: "🎨", color: "text-cyan-400" },
    { name: "Figma", icon: "🎯", color: "text-purple-400" },
    { name: "WordPress", icon: "📝", color: "text-blue-600" },
];

export default function HeroTechStack() {
    const [hoveredTech, setHoveredTech] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % techStack.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            {/* Main display area */}
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4 transition-all duration-500">
                    {techStack[activeIndex].icon}
                </div>
                <h3
                    className={`text-2xl font-bold transition-all duration-500 ${techStack[activeIndex].color}`}
                >
                    {techStack[activeIndex].name}
                </h3>
                <p className="text-muted-foreground text-center mt-2">
                    Modern technologies for modern solutions
                </p>
            </div>

            {/* Tech stack indicators */}
            <div className="grid grid-cols-3 gap-2 mt-6">
                {techStack.map((tech, index) => (
                    <button
                        key={index}
                        onMouseEnter={() => setHoveredTech(index)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onClick={() => setActiveIndex(index)}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                            activeIndex === index || hoveredTech === index
                                ? "border-primary/50 bg-primary/5 scale-105"
                                : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                        }`}
                    >
                        <div className="text-2xl">{tech.icon}</div>
                        <div className="text-xs font-medium mt-1">
                            {tech.name}
                        </div>
                    </button>
                ))}
            </div>

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-purple-500/50 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}
