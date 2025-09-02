// components/HeroServices.tsx
"use client";
import { useState, useEffect } from "react";

const services = [
    {
        icon: "💻",
        title: "Web Development",
        desc: "Fast & modern websites",
        gradient: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-500/10",
    },
    {
        icon: "🎨",
        title: "Digital Design",
        desc: "Beautiful UI/UX design",
        gradient: "from-purple-500 to-pink-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: "📱",
        title: "Social Media",
        desc: "Engaging content strategy",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-500/10",
    },
];

export default function HeroServices() {
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % services.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative max-w-sm mx-auto">
            {/* Main card stack */}
            <div className="relative h-80">
                {services.map((service, index) => {
                    const isActive = index === activeCard;
                    const isNext = index === (activeCard + 1) % services.length;
                    const isPrev =
                        index ===
                        (activeCard - 1 + services.length) % services.length;

                    let transform =
                        "translate-x-0 translate-y-0 scale-100 rotate-0";
                    let zIndex = 1;
                    let opacity = 0.3;

                    if (isActive) {
                        transform =
                            "translate-x-0 translate-y-0 scale-100 rotate-0";
                        zIndex = 30;
                        opacity = 1;
                    } else if (isNext) {
                        transform =
                            "translate-x-4 translate-y-4 scale-95 rotate-2";
                        zIndex = 20;
                        opacity = 0.7;
                    } else if (isPrev) {
                        transform =
                            "translate-x-[-16px] translate-y-4 scale-95 rotate-[-2deg]";
                        zIndex = 10;
                        opacity = 0.5;
                    }

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out cursor-pointer ${service.bg}`}
                            style={{
                                transform,
                                zIndex,
                                opacity,
                            }}
                            onClick={() => setActiveCard(index)}
                        >
                            <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center justify-center text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                                <div className="text-5xl mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {service.desc}
                                </p>

                                {/* Gradient accent */}
                                <div
                                    className={`mt-4 h-1 w-12 rounded-full bg-gradient-to-r ${service.gradient}`}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 gap-2">
                {services.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCard(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === activeCard
                                ? "bg-primary scale-125"
                                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
