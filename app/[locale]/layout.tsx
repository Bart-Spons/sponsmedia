// app/[locale]/layout.tsx
import "../globals.css";
import Nav from "@/components/Nav";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

type Locale = "en" | "nl";

export const dynamicParams = false; // alleen params uit generateStaticParams zijn geldig
export function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

// themeColor hoort in viewport (niet in metadata)
export const viewport: Viewport = {
    themeColor: "#000000",
};

export async function generateMetadata({
    params,
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const isNL = params.locale === "nl";
    const base = new URL("https://sponsmedia.com");
    const path = params.locale === "nl" ? "/nl" : "/en";

    const description = isNL
        ? "SponsMedia helpt merken groeien met webdevelopment, digital design en social-first strategieën. Be more visible online."
        : "SponsMedia helps brands grow with web development, digital design, and social-first strategies. Be more visible online.";

    return {
        metadataBase: base,
        title: {
            default: "SponsMedia — Be more visible online",
            template: "%s | SponsMedia",
        },
        description,
        alternates: {
            // canonical per taal
            canonical: path,
            languages: {
                en: "/en",
                nl: "/nl",
                "x-default": "/", // handig voor gebruikers/engines zonder voorkeur
            },
        },
        openGraph: {
            type: "website",
            url: path, // locale-URL
            siteName: "SponsMedia",
            title: "SponsMedia — Be more visible online",
            description,
            images: [
                { url: "/og.jpg", width: 1200, height: 630, alt: "SponsMedia" },
            ],
            locale: isNL ? "nl_NL" : "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: "SponsMedia — Be more visible online",
            description,
            images: ["/og.jpg"],
        },
        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/icon.png", type: "image/png", sizes: "192x192" },
            ],
            apple: [
                { url: "/apple-touch-icon.png", sizes: "180x180" },
                { url: "/logo.png", sizes: "512x512", type: "image/png" },
            ],
        },
        // Optioneel: GSC verificatie direct hier
        // verification: { google: "PLAATS_HIER_JE_CODE" },
    };
}

export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: Locale };
}) {
    return (
        <html lang={params.locale}>
            <body className="bg-space text-white">
                <Nav locale={params.locale} />

                {/* Organization schema (E-E-A-T) */}
                <Script id="org-schema" type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "SponsMedia",
                        url: "https://sponsmedia.com",
                        logo: "https://sponsmedia.com/logo.png",
                        sameAs: [
                            "https://www.linkedin.com/in/bartspons",
                            "https://codepen.io/LuckyBart",
                            // voeg hier je GitHub/Dribbble/Instagram toe indien relevant
                        ],
                    })}
                </Script>

                {children}

                <footer>
                    {/* Als Footer een server component is kun je 'm direct importeren i.p.v. require */}
                    {/* @ts-ignore */}
                    {require("@/components/Footer").default({
                        locale: params.locale,
                    })}
                </footer>
            </body>
        </html>
    );
}
