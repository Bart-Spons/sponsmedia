import { projectsData } from "@/lib/data/projects";
import PageHeader from "@/components/PageHeader";
import ClosingCta from "@/components/ClosingCta";
import WorkReel, { type ReelItem } from "@/components/home/WorkReel";
import { createTranslator } from "next-intl";
import type { Metadata } from "next";

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
    const tProjects = createTranslator({
        locale,
        messages,
        namespace: "Projects",
    });

    const title =
        locale === "en"
            ? "Projects - Our Portfolio of Web Development & Design Work"
            : "Projecten - Ons Portfolio van Web Development & Design Werk";
    const description = tProjects("subtitle");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        alternates: {
            canonical: `/${locale}/projects`,
            languages: { "en-US": "/en/projects", "nl-NL": "/nl/projects" },
        },
    };
}

export default async function ProjectsIndex({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;
    const nl = locale === "nl";
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const tProjects = createTranslator({ locale, messages, namespace: "Projects" });
    const t = createTranslator({ locale, messages, namespace: "Home" });

    const items: ReelItem[] = [...projectsData]
        .sort((a, b) => b.completedDate.localeCompare(a.completedDate))
        .map((p) => ({
            id: p.id,
            title: (nl && p.titleNl) || p.title,
            description: (nl && p.descriptionNl) || p.description,
            category: (nl && p.categoryNl) || p.category,
            year: p.completedDate.slice(0, 4),
            image: p.image,
            video: p.video,
            technologies: p.technologies,
        }));

    return (
        <>
            <PageHeader title={tProjects("title")} intro={tProjects("subtitle")} />
            <section aria-label={tProjects("title")} className="container pb-28 md:pb-44">
                <WorkReel locale={locale} items={items} viewCase={t("viewCase")} />
            </section>
            <ClosingCta
                locale={locale}
                title={t("ctaTitle")}
                sub={t("ctaSub")}
                button={t("startProject")}
                orMail={t("orMail")}
            />
        </>
    );
}
