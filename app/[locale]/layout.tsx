// app/[locale]/layout.tsx
import "../globals.css";
import Nav from "@/components/Nav";
import type { Metadata, Viewport } from "next";

type Locale = "en" | "nl";

// Verplicht voor statische export met i18n
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

    const description = isNL
        ? "SponsMedia helpt merken groeien met webdevelopment, digital design en social-first strategieën. Be more visible online."
        : "SponsMedia helps brands grow with web development, digital design, and social-first strategies. Be more visible online.";

    return {
        metadataBase: new URL("https://sponsmedia.com"),
        title: {
            default: "SponsMedia — Be more visible online",
            template: "%s | SponsMedia",
        },
        description,
        alternates: {
            canonical: "/",
            languages: {
                en: "/en",
                nl: "/nl",
            },
        },
        openGraph: {
            type: "website",
            url: "https://sponsmedia.com",
            siteName: "SponsMedia",
            title: "SponsMedia — Be more visible online",
            description,
            images: [
                { url: "/og.jpg", width: 1200, height: 630, alt: "SponsMedia" },
            ],
            locale: params.locale,
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
                { url: "/icon.png", type: "image/png", sizes: "192x192" }, // je icon.png
            ],
            apple: [
                { url: "/apple-touch-icon.png", sizes: "180x180" },
                { url: "/logo.png", sizes: "512x512", type: "image/png" }, // fallback
            ],
        },
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
                <div id="__next">{children}</div>
                <footer>
                    {/* @ts-ignore */}
                    {require("@/components/Footer").default({
                        locale: params.locale,
                    })}
                </footer>
            </body>
        </html>
    );
}
