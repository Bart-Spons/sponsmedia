// components/ContactFAQ.tsx
import Script from "next/script";

type Locale = "nl" | "en";

// In ContactFAQ.tsx – vervang alleen de twee arrays hieronder

const FAQ_NL = [
    {
        q: "Is het eerste gesprek vrijblijvend?",
        a: "Ja. We plannen meestal een korte intake van ±15 minuten om doelen, scope en planning te verkennen. Je zit nergens aan vast.",
    },
    {
        q: "Hoe verloopt het traject?",
        a: "Intake → voorstel → kick-off → ontwerp & ontwikkeling → iteraties → livegang → nazorg. We werken transparant en houden je tussentijds op de hoogte.",
    },
    {
        q: "Hoe snel kunnen we live?",
        a: "Vaak binnen 4 weken, afhankelijk van de scope en of content/beeldmateriaal klaarstaat.",
    },
    {
        q: "Werken jullie met ons bestaande CMS of design?",
        a: "Zeker. We werken met Next.js (headless) en ook met WordPress. We sluiten aan op je huisstijl, componenten of bestaande design-systemen.",
    },
    {
        q: "Wie is eigenaar van de code en assets?",
        a: "Jij. We leveren op in een repository met overdrachtsdocumentatie, zodat je alles kunt blijven beheren.",
    },
    {
        q: "Bieden jullie support na livegang?",
        a: "Ja. We helpen met updates, monitoring en kleine verbeteringen. We spreken samen af wat je nodig hebt qua support en frequentie.",
    },
    {
        q: "Hoe borgen jullie toegankelijkheid en performance?",
        a: "We bouwen volgens WCAG-richtlijnen en optimaliseren voor Core Web Vitals (snelheid, stabiliteit, responsiveness).",
    },
];

const FAQ_EN = [
    {
        q: "Is the first call without obligation?",
        a: "Yes. We start with a short ~15-minute intro call to explore goals, scope and timeline. There’s no commitment required.",
    },
    {
        q: "What does the process look like?",
        a: "Intake → proposal → kick-off → design & development → iterations → go-live → aftercare. We work transparently and keep you updated.",
    },
    {
        q: "How fast can we go live?",
        a: "Typically within 4 weeks, depending on scope and content readiness.",
    },
    {
        q: "Can you work with our existing CMS or design?",
        a: "Absolutely. We work with Next.js (headless) and WordPress, and we can adopt your brand guidelines or existing design system.",
    },
    {
        q: "Who owns the code and assets?",
        a: "You do. We deliver in a repository with handover docs so you stay in full control.",
    },
    {
        q: "Do you offer support after launch?",
        a: "Yes. We help with updates, monitoring and small improvements. We’ll agree on the level and cadence that fit your needs.",
    },
    {
        q: "How do you ensure accessibility and performance?",
        a: "We follow WCAG guidelines and optimize for Core Web Vitals (speed, stability, responsiveness).",
    },
];

export default function ContactFAQ({ locale }: { locale: Locale }) {
    const items = locale === "nl" ? FAQ_NL : FAQ_EN;

    // JSON-LD (FAQPage)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
    };

    return (
        <section
            aria-labelledby="faq-heading"
            className="mt-12 sm:mt-16 lg:mt-20"
        >
            <h2
                id="faq-heading"
                className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4"
            >
                {locale === "nl"
                    ? "Veelgestelde vragen"
                    : "Frequently Asked Questions"}
            </h2>

            <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
                {items.map((item, i) => (
                    <details key={i} className="group [&_summary]:list-none">
                        <summary className="w-full cursor-pointer px-5 py-4 flex items-start justify-between">
                            <span className="text-base md:text-lg font-semibold text-white">
                                {item.q}
                            </span>
                            <span
                                aria-hidden
                                className="ml-4 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary transition-transform duration-300 group-open:rotate-45"
                            >
                                +
                            </span>
                        </summary>
                        <div className="px-5 pb-5 pt-0 text-gray-300">
                            <p>{item.a}</p>
                        </div>
                    </details>
                ))}
            </div>

            {/* FAQ schema for SEO */}
            <Script id="contact-faq-schema" type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </Script>
        </section>
    );
}
