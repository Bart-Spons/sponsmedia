// app/layout.tsx
import "./globals.css";
import type { Viewport } from "next";
import Script from "next/script";

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-space text-white antialiased">
                {children}

                {/* Sitelinks Search Box */}
                <Script id="sitelinks-schema" type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        url: "https://sponsmedia.com",
                        potentialAction: {
                            "@type": "SearchAction",
                            target: "https://sponsmedia.com/en/search?q={search_term_string}",
                            "query-input": "required name=search_term_string",
                        },
                    })}
                </Script>
            </body>
        </html>
    );
}
