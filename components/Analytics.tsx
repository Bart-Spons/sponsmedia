"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GA_ID, CONSENT_KEY, readConsent, setConsent } from "@/lib/analytics";

type Locale = "en" | "nl";

const copy = {
    nl: {
        text: "We gebruiken analytische cookies om te zien hoe bezoekers de site gebruiken. Mogen we die plaatsen?",
        more: "Cookiebeleid",
        accept: "Accepteren",
        decline: "Weigeren",
    },
    en: {
        text: "We use analytics cookies to understand how visitors use this site. Is that okay?",
        more: "Cookie policy",
        accept: "Accept",
        decline: "Decline",
    },
};

/**
 * Laadt Google Analytics 4 met Consent Mode v2.
 * Standaard staat opslag uit; pas na "Accepteren" plaatst GA cookies.
 */
export default function Analytics({ locale }: { locale: Locale }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!GA_ID) return;
        setShow(readConsent() === null);
        const reopen = () => setShow(true);
        window.addEventListener("sm-consent-open", reopen);
        return () => window.removeEventListener("sm-consent-open", reopen);
    }, []);

    if (!GA_ID) return null;
    const t = copy[locale] ?? copy.en;

    const choose = (v: "granted" | "denied") => {
        setConsent(v);
        setShow(false);
    };

    return (
        <>
            <Script id="ga-consent" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=localStorage.getItem(${JSON.stringify(CONSENT_KEY)});}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='granted'?'granted':'denied'});
gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)},{anonymize_ip:true});`}
            </Script>
            <Script
                id="ga-lib"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />

            {show && (
                <div
                    role="dialog"
                    aria-live="polite"
                    aria-label={t.more}
                    className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-2xl border border-frost/15 bg-night/95 p-4 text-sm text-frost shadow-2xl backdrop-blur md:p-5"
                >
                    <p className="leading-relaxed text-frost/85">
                        {t.text}{" "}
                        <Link href={`/${locale}/cookies/`} className="underline underline-offset-2 hover:text-primary">
                            {t.more}
                        </Link>
                    </p>
                    <div className="mt-3 flex flex-wrap justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => choose("denied")}
                            className="rounded-full border border-frost/25 px-4 py-2 text-frost/85 transition hover:border-frost/60"
                        >
                            {t.decline}
                        </button>
                        <button
                            type="button"
                            onClick={() => choose("granted")}
                            className="rounded-full bg-primary px-4 py-2 font-semibold text-night transition hover:opacity-90"
                        >
                            {t.accept}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
