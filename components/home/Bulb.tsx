import { forwardRef } from "react";

/**
 * The SponsMedia light bulb as a vector drawing, so it stays crisp at any
 * size. It starts switched off; the parts that light up carry data
 * attributes for the hero to animate:
 * - data-halo     warm light filling the lens
 * - data-rays     thin rays around the bulb
 * - data-glass    the lit glass
 * - data-core     the bright heart around the filament
 * - data-filament the glowing wire
 */
const Bulb = forwardRef<SVGSVGElement>(function Bulb(_, ref) {
    return (
        <svg ref={ref} viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
            <defs>
                <radialGradient id="bulb-bg" cx="50%" cy="42%" r="65%">
                    <stop offset="0" stopColor="#141c2e" />
                    <stop offset="1" stopColor="#070b14" />
                </radialGradient>
                <radialGradient id="bulb-halo" cx="50%" cy="41%" r="50%">
                    <stop offset="0" stopColor="#ffd98a" stopOpacity="0.85" />
                    <stop offset="0.35" stopColor="#e2b76f" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#e2b76f" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="bulb-glass" cx="46%" cy="36%" r="62%">
                    <stop offset="0" stopColor="#fffaf0" />
                    <stop offset="0.3" stopColor="#ffe3a3" />
                    <stop offset="0.7" stopColor="#f0bf62" />
                    <stop offset="1" stopColor="#b9822a" />
                </radialGradient>
                <linearGradient id="bulb-off" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2a3346" />
                    <stop offset="1" stopColor="#1a2132" />
                </linearGradient>
                <linearGradient id="bulb-metal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#4a4f5c" />
                    <stop offset="0.45" stopColor="#c9ccd4" />
                    <stop offset="0.6" stopColor="#8d929e" />
                    <stop offset="1" stopColor="#3b404c" />
                </linearGradient>
                <filter id="bulb-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="7" />
                </filter>
                <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.2" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <rect width="200" height="200" fill="url(#bulb-bg)" />

            {/* Light in the room */}
            <circle data-halo cx="100" cy="82" r="100" fill="url(#bulb-halo)" opacity="0" />
            <g data-rays opacity="0" stroke="#ffd98a" strokeWidth="1.4" strokeLinecap="round">
                {Array.from({ length: 12 }, (_, i) => {
                    const a = (i / 12) * Math.PI * 2;
                    const r1 = 58;
                    const r2 = i % 2 ? 70 : 78;
                    return (
                        <line
                            key={i}
                            x1={(100 + Math.cos(a) * r1).toFixed(2)}
                            y1={(82 + Math.sin(a) * r1).toFixed(2)}
                            x2={(100 + Math.cos(a) * r2).toFixed(2)}
                            y2={(82 + Math.sin(a) * r2).toFixed(2)}
                        />
                    );
                })}
            </g>

            {/* Glass: dark when off, the lit version fades in on top */}
            <path
                d="M78 116 C70 106 60 96 60 80 A40 40 0 1 1 140 80 C140 96 130 106 122 116 L120 126 L80 126 Z"
                fill="url(#bulb-off)"
                stroke="#3a4458"
                strokeWidth="1.5"
            />
            <path
                data-glass
                d="M78 116 C70 106 60 96 60 80 A40 40 0 1 1 140 80 C140 96 130 106 122 116 L120 126 L80 126 Z"
                fill="url(#bulb-glass)"
                stroke="#ffe3a3"
                strokeWidth="1.5"
                opacity="0"
            />
            <ellipse data-core cx="100" cy="88" rx="22" ry="26" fill="#fff6dc" filter="url(#bulb-blur)" opacity="0" />

            {/* Filament on its two supports */}
            <path d="M90 126 L90 108 M110 126 L110 108" stroke="#6b7385" strokeWidth="1.6" fill="none" />
            <path
                data-filament
                d="M90 108 L90 96 L94.5 88 L100 96 L105.5 88 L110 96 L110 108"
                stroke="#fff3c4"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                filter="url(#bulb-glow)"
                opacity="0.25"
            />

            {/* Reflection on the glass */}
            <path d="M76 66 A28 28 0 0 1 92 50" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Screw base */}
            <rect x="80" y="126" width="40" height="7" rx="2.5" fill="url(#bulb-metal)" />
            <rect x="81.5" y="134" width="37" height="7" rx="2.5" fill="url(#bulb-metal)" />
            <rect x="83" y="142" width="34" height="7" rx="2.5" fill="url(#bulb-metal)" />
            <path d="M88 150 L112 150 L106 158 L94 158 Z" fill="#2b303b" />
        </svg>
    );
});

export default Bulb;
