import { projectsData } from "@/lib/data/projects";
import PageHeader from "@/components/PageHeader";
import ClosingCta from "@/components/ClosingCta";
import type { ReelItem } from "@/components/home/WorkReel";
import ProjectIndex from "@/components/projects/ProjectIndex";
import ProjectsReel from "@/components/projects/ProjectsReel";
import Marquee from "@/components/motion/Marquee";
import Choreography from "@/components/motion/Choreography";
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
        <Choreography>
            <PageHeader title={tProjects("title")} intro={tProjects("subtitle")} />

            {/* Index: every project as one big row */}
            <section aria-label={tProjects("index")} className="container pb-24 md:pb-36">
                <ProjectIndex locale={locale} items={items} />
            </section>

            {/* Showcase: pinned, slides sideways on desktop */}
            <ProjectsReel
                locale={locale}
                items={items}
                label={tProjects("showcase")}
                viewCase={t("viewCase")}
                nextTitle={tProjects("yourProject")}
                nextButton={t("startProject")}
            />

            <Marquee
                items={[...new Set(items.flatMap((p) => p.technologies))]}
                className="display mt-24 py-6 text-[clamp(3rem,9vw,8rem)] text-outline md:mt-36"
            />

            <ClosingCta
                locale={locale}
                title={t("ctaTitle")}
                sub={t("ctaSub")}
                button={t("startProject")}
                orMail={t("orMail")}
            />
        </Choreography>
    );
}
