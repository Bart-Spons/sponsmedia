/**
 * Line icons for the three services, drawn in the brand gold. Every stroke
 * has pathLength 1, so <Choreography> can draw them on scroll (data-draw);
 * without that they simply show fully drawn.
 */
const icons: Record<string, React.ReactNode> = {
    // A browser window with code brackets
    "web-development": (
        <>
            <rect pathLength={1} x="6" y="10" width="52" height="40" rx="6" />
            <line pathLength={1} x1="6" y1="20" x2="58" y2="20" />
            <circle pathLength={1} cx="13" cy="15" r="1.6" />
            <circle pathLength={1} cx="19" cy="15" r="1.6" />
            <circle pathLength={1} cx="25" cy="15" r="1.6" />
            <polyline pathLength={1} points="24,29 17,35 24,41" />
            <polyline pathLength={1} points="40,29 47,35 40,41" />
            <line pathLength={1} x1="35" y1="27" x2="29" y2="43" />
        </>
    ),
    // A vector pen drawing a curve between two anchor points
    "digital-design": (
        <>
            <path pathLength={1} d="M8 50 C 20 20, 40 58, 56 22" />
            <rect pathLength={1} x="5" y="47" width="6" height="6" rx="1" />
            <rect pathLength={1} x="53" y="19" width="6" height="6" rx="1" />
            <line pathLength={1} x1="11" y1="50" x2="22" y2="40" />
            <circle pathLength={1} cx="22" cy="40" r="2" />
            <path pathLength={1} d="M30 8 L42 20 L34 34 L22 22 Z" />
            <line pathLength={1} x1="32" y1="21" x2="34" y2="34" />
        </>
    ),
    // A speech bubble with a heart, and a notification dot
    "social-media": (
        <>
            <path
                pathLength={1}
                d="M10 14 h36 a6 6 0 0 1 6 6 v18 a6 6 0 0 1 -6 6 H26 l-10 8 v-8 h-6 a6 6 0 0 1 -6 -6 V20 a6 6 0 0 1 6 -6 Z"
            />
            <path
                pathLength={1}
                d="M28 37 C 20 31, 17 26, 21 22.5 C 24 20, 27 21.5, 28 24 C 29 21.5, 32 20, 35 22.5 C 39 26, 36 31, 28 37 Z"
            />
            <circle pathLength={1} cx="53" cy="12" r="5" />
        </>
    ),
};

export default function ServiceIcon({ name, className = "" }: { name: string; className?: string }) {
    if (!icons[name]) return null;
    return (
        <svg
            data-draw
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`text-primary [&>*]:[stroke-dasharray:1] ${className}`}
        >
            {icons[name]}
        </svg>
    );
}
