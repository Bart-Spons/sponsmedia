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
            <div className="container relative z-10 py-16">
                {/* Header */}
                <header className="mb-16 grid gap-8 pt-8 md:mb-20 md:grid-cols-12 md:items-end md:pt-16">
                    <h1 className="display text-[clamp(3rem,8vw,7rem)] md:col-span-7">{t("title")}</h1>
                    <p className="max-w-[44ch] text-lg leading-relaxed text-frost/75 md:col-span-5 md:pb-3 md:text-xl">
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
