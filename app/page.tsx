import type { Metadata } from "next";

// The bare domain. On Hostinger, .htaccess already sends visitors to /en/ or
// /nl/ (by browser language) before this page loads. This page is the
// fallback: real HTML (no JavaScript needed) that redirects and links on.
export const metadata: Metadata = {
    metadataBase: new URL("https://sponsmedia.com"),
    title: "SponsMedia — Be more visible online",
    description:
        "SponsMedia helps brands get seen online with websites, design, video and social media.",
    alternates: {
        canonical: "/en/",
        languages: { en: "/en/", nl: "/nl/", "x-default": "/" },
    },
};

export default function HomePage() {
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="refresh" content="0; url=/en/" />
            </head>
            <body className="bg-night text-frost antialiased">
                <main className="mx-auto max-w-xl px-6 py-24">
                    <h1 className="text-4xl font-extrabold">SponsMedia</h1>
                    <p className="mt-4 text-lg text-frost/80">
                        Websites, design, video and social media that help brands get seen online.
                    </p>
                    <p className="mt-8 flex gap-6 text-lg">
                        <a className="underline" href="/en/">English</a>
                        <a className="underline" href="/nl/">Nederlands</a>
                    </p>
                </main>
            </body>
        </html>
    );
}
