// app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import CTASection from "@/components/CTASection";
import ContactFAQ from "@/components/ContactFAQ";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
    params,
}: {
    params: { locale: "en" | "nl" };
}): Promise<Metadata> {
    const { locale } = params;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages, namespace: "Contact" });

    const title = t("metaTitle");
    const description = t("metaDescription");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
            url: `https://sponsmedia.com/${locale}/contact`,
        },
        alternates: {
            canonical: `/${locale}/contact`,
            languages: {
                "en-US": "/en/contact",
                "nl-NL": "/nl/contact",
            },
        },
    };
}

export default async function ContactPage({
    params,
}: {
    params: { locale: "en" | "nl" };
}) {
    const { locale } = params;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages, namespace: "Contact" });

    return (
        <div className="relative min-h-screen bg-space">
            {/* Subtiele gouden achtergrondaccenten */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(226,183,111,0.18),transparent)] blur-2xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,97,0.14),transparent)] blur-2xl" />
            </div>

            <div className="container relative z-10 py-16">
                {/* Header */}
                <header className="mb-10 text-center">
                    <p className="text-ms font-semibold tracking-widest text-primary">
                        {t("eyebrow")}
                    </p>
                    <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">
                        {t("title")}
                    </h1>
                    <div className="mx-auto mt-5 mb-6 h-1.5 w-24 rounded-full bg-primary/80 shadow-[0_0_28px] shadow-primary/50" />
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </header>

                {/* CTA – compact (zelfde component als op de homepage) */}
                <CTASection locale={locale} hideHero variant="compact" />

                {/* FAQ onderaan contact */}
                <ContactFAQ locale={locale} />
            </div>
        </div>
    );
}
