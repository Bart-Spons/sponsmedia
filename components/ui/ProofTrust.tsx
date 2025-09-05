// components/ui/ProofTrust.tsx
"use client";

type Locale = "en" | "nl";

const T = {
    en: {
        section: "Proof & Trust",
        kvk: "Chamber of Commerce (KvK)",
        years: "years’ experience",
        projects: "projects",
    },
    nl: {
        section: "Bewijs & Vertrouwen",
        kvk: "KvK-nummer",
        years: "jaar ervaring",
        projects: "projecten",
    },
} as const;

export default function ProofTrust({
    locale,
    kvk = "97944475",
    years = 5,
    projects = 15,
}: {
    locale: Locale;
    kvk?: string;
    years?: number;
    projects?: number;
}) {
    const t = T[locale];

    return (
        <section className="container py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {t.section}
            </h2>

            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    icon={<ReceiptIcon />}
                    label={t.kvk}
                    value={kvk}
                    mono
                />
                <StatCard
                    icon={<HourglassIcon />}
                    label={t.years}
                    value={`${years}+`}
                />
                <StatCard
                    icon={<CheckIcon />}
                    label={t.projects}
                    value={`${projects}+`}
                />
            </div>
        </section>
    );
}

function StatCard({
    icon,
    label,
    value,
    mono = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div
            className="
        rounded-2xl border border-white/10
        bg-gradient-to-br from-white/[0.05] to-white/[0.02]
        p-5 md:p-6 shadow-[0_6px_20px_rgba(0,0,0,0.25)]
      "
        >
            <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {icon}
                </span>
                <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                        {label}
                    </p>
                    <p
                        className={[
                            "mt-1 text-2xl md:text-3xl font-extrabold leading-none text-white",
                            mono ? "font-mono tabular-nums tracking-tight" : "",
                        ].join(" ")}
                    >
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* Tiny inline icons to keep it lightweight */
function HourglassIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90">
            <path
                d="M6 3h12M6 21h12M8 3v4a4 4 0 0 0 8 0V3M16 21v-4a4 4 0 0 0-8 0v4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90">
            <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function ReceiptIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90">
            <path
                d="M6 2h12v20l-3-2-3 2-3-2-3 2V2zM9 7h6M9 11h6M9 15h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
