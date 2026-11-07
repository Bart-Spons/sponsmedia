"use client";

import { GA_ID } from "@/lib/analytics";

/** Opent de cookiemelding opnieuw, zodat bezoekers hun keuze kunnen wijzigen. */
export default function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
    if (!GA_ID) return null;
    return (
        <button
            type="button"
            className={className}
            onClick={() => window.dispatchEvent(new Event("sm-consent-open"))}
        >
            {label}
        </button>
    );
}
