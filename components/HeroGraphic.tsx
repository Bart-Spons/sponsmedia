"use client";
import { useState, useEffect } from "react";
import SimpleThreeEarth from "./SimpleThreeEarth";

export default function HeroGraphic() {
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        console.log("🎭 HeroGraphic component mounted!");

        // Animation phase progression
        const phaseTimer = setInterval(() => {
            setAnimationPhase((prev) => {
                const newPhase = (prev + 1) % 3;
                console.log(
                    "📊 Animation phase changing from",
                    prev,
                    "to",
                    newPhase
                );
                return newPhase;
            });
        }, 4000); // Change phase every 4 seconds

        return () => {
            console.log("🧹 HeroGraphic cleanup");
            clearInterval(phaseTimer);
        };
    }, []);

    const phaseTexts = [
        {
            title: "Netherlands Focus",
            subtitle: "Starting Local 🇳🇱",
        },
        {
            title: "European Network",
            subtitle: "Expanding Across Europe",
        },
        {
            title: "Global Network",
            subtitle: "Web Experiences. Worldwide. 🌍",
        },
    ];

    return (
        <div className="text-center flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-16">
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex items-center justify-center">
                <SimpleThreeEarth
                    key="earth-globe" // Static key for stability
                    animationPhase={animationPhase}
                    className="mx-auto"
                />
            </div>

            {/* Phase Indicator Dots */}
            <div className="flex justify-center space-x-2 mb-6 sm:mb-8 md:mb-10">
                {[0, 1, 2].map((phase) => (
                    <div
                        key={phase}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            animationPhase >= phase
                                ? "bg-red-400 scale-125"
                                : "bg-gray-400/30 scale-100"
                        }`}
                    />
                ))}
            </div>

            {/* Phase Text */}
            <div className="transition-all duration-1000 px-4 max-w-md mx-auto">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 sm:mb-3 md:mb-4 break-words hyphens-auto text-center">
                    {phaseTexts[animationPhase].title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground break-words text-center">
                    {phaseTexts[animationPhase].subtitle}
                </p>
            </div>
        </div>
    );
}
