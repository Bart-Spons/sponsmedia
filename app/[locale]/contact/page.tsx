// app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import CTASection from "@/components/CTASection";
import ContactFAQ from "@/components/ContactFAQ";
import PageHeader from "@/components/PageHeader";
import Choreography from "@/components/motion/Choreography";

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
        <Choreography>
            <PageHeader title={t("title")} intro={t("subtitle")} />
            <CTASection locale={locale} hideHero variant="compact" />
            <div className="container pb-28 md:pb-44">
                <ContactFAQ locale={locale} />
            </div>
        </Choreography>
    );
}
