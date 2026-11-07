// Google Analytics 4 (meet-ID uit Google Analytics → Beheer → Gegevensstreams).
// Leeg laten = Analytics staat uit en er verschijnt geen cookiemelding.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const CONSENT_KEY = "sm-analytics-consent"; // "granted" | "denied"

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | null {
    if (typeof window === "undefined") return null;
    const w = window as unknown as { gtag?: Gtag };
    return typeof w.gtag === "function" ? w.gtag : null;
}

export function readConsent(): "granted" | "denied" | null {
    try {
        const v = window.localStorage.getItem(CONSENT_KEY);
        return v === "granted" || v === "denied" ? v : null;
    } catch {
        return null;
    }
}

export function setConsent(value: "granted" | "denied") {
    try {
        window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
        /* opslag geblokkeerd: keuze geldt alleen voor dit bezoek */
    }
    gtag()?.("consent", "update", { analytics_storage: value });
    window.dispatchEvent(new CustomEvent("sm-consent", { detail: value }));
}

/** Stuurt een event naar GA (alleen als Analytics aanstaat). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
    if (!GA_ID) return;
    gtag()?.("event", name, params);
}
