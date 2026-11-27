/** The link preview image (Open Graph / X) for a language, 1200×630. */
export function ogImage(locale: string) {
    return {
        url: locale === "nl" ? "/og-nl.jpg" : "/og.jpg",
        width: 1200,
        height: 630,
        alt: locale === "nl" ? "SponsMedia — Word online gezien." : "SponsMedia — Be more visible online.",
    };
}
