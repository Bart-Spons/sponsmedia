/**
 * Structured data (schema.org JSON-LD) as a plain <script> in the HTML, so
 * search engines and AI agents read it without running JavaScript.
 * (next/script injects inline scripts only after the page has loaded.)
 */
export default function JsonLd({ data }: { data: unknown }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}
