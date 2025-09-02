// app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}): Promise<Metadata> {
    const { locale } = await params;
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
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages, namespace: "Contact" });

    return (
        <div className="container py-16">
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
        </div>
    );
}
