// app/[locale]/services/page.tsx
import { servicesData } from "@/lib/data/services";
import PageHeader from "@/components/PageHeader";
import ClosingCta from "@/components/ClosingCta";
import type { ServiceRow } from "@/components/home/ServicesList";
import ServiceScroll from "@/components/services/ServiceScroll";
import Choreography from "@/components/motion/Choreography";
import { createTranslator } from "next-intl";
import type { Metadata } from "next";

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
    const tServices = createTranslator({
        locale,
        messages,
        namespace: "Services",
    });

    const title =
        locale === "en"
            ? "Services - Web Development, Design & Digital Marketing"
            : "Diensten - Web Development, Design & Digital Marketing";
    const description =
        locale === "en"
            ? "Comprehensive digital services including web development, UI/UX design, branding, and social media marketing. Transform your online presence with our expert team."
            : "Uitgebreide digitale diensten waaronder web development, UI/UX design, branding en social media marketing. Transformeer je online aanwezigheid met ons expert team.";

    return {
        title,
        description,
        keywords: [
            "web development",
            "UI/UX design",
            "branding",
            "social media marketing",
            "digital services",
            "Next.js",
            "React",
            "Figma",
        ],
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
            // optioneel: zet url voor rijkere OG
            url: `https://sponsmedia.com/${locale}/services`,
        },
        alternates: {
            canonical: `/${locale}/services`,
            languages: {
                "en-US": "/en/services",
                "nl-NL": "/nl/services",
            },
        },
    };
}

export default async function ServicesPage({
    params,
}: {
    params: { locale: "en" | "nl" };
}) {
    const { locale } = params;
    const nl = locale === "nl";
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const tServices = createTranslator({ locale, messages, namespace: "Services" });
    const t = createTranslator({ locale, messages, namespace: "Home" });

    const services: ServiceRow[] = servicesData.map((s) => ({
        slug: s.slug,
        title: (nl && s.titleNl) || s.title,
        desc: (nl && s.descNl) || s.desc,
        highlight: (nl && s.highlightNl) || s.highlight,
        features: (nl && s.featuresNl) || s.features,
        technologies: s.technologies,
    }));

    return (
        <Choreography>
            <PageHeader title={tServices("title")} intro={tServices("subtitle")} lens={false} />
            <section aria-label={tServices("title")} className="container pb-24 md:pb-36">
                <ServiceScroll
                    items={services}
                    labels={{ included: tServices("whatsIncluded"), tools: tServices("technologiesLabel") }}
                />
            </section>
            <ClosingCta
                locale={locale}
                title={tServices("readyTitle")}
                sub={tServices("readySubtitle")}
                button={tServices("startProject")}
                orMail={t("orMail")}
            />
        </Choreography>
    );
}
