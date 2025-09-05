"use client";

import ThreeEarthRotation from "./ThreeEarthRotation";
import ThreeEarthColoring from "./ThreeEarthColoring";

interface CombinedEarthProps {
    animationPhase: number;
    className?: string;
}

export default function CombinedEarth({
    animationPhase,
    className = "",
}: CombinedEarthProps) {
    return (
        <div className={`relative ${className}`} style={{ width: "450px" }}>
            {/* Base rotating Earth - never re-renders */}
            <ThreeEarthRotation className="absolute top-0 left-0" />

            {/* Progressive coloring overlay - updates with animationPhase */}
            <ThreeEarthColoring
                animationPhase={animationPhase}
                className="absolute top-0 left-0"
            />
        </div>
    );
}
