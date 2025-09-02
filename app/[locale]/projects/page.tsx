import Link from "next/link";
import { projectsData } from "../../../lib/data/projects";
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
            languages: {
                "en-US": "/en/projects",
                "nl-NL": "/nl/projects",
            },
        },
    };
}

export default async function ProjectsIndex({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;

    // Import messages based on locale
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const tProjects = createTranslator({
        locale,
        messages,
        namespace: "Projects",
    });

    return (
        <div className="container py-16">
            <header className="mb-12">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                    {tProjects("title")}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    {tProjects("subtitle")}
                </p>
            </header>

            <section aria-label="Project portfolio">
                <div className="grid md:grid-cols-2 gap-6">
                    {projectsData.map((project, index) => (
                        <article
                            key={project.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 group hover:bg-white/10 transition-colors"
                        >
                            <div className="rounded-2xl bg-muted overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={tProjects("projectScreenshot", {
                                        title: project.title,
                                    })}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading={index < 4 ? "eager" : "lazy"}
                                />
                            </div>

                            <div className="pt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 rounded-full border border-white/10 bg-white/5"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <header>
                                <h2 className="mt-3 text-xl font-semibold">
                                    <Link
                                        href={`/${locale}/projects/${project.id}`}
                                        className="hover:text-primary transition-colors"
                                        aria-describedby={`project-desc-${project.id}`}
                                    >
                                        {project.title}
                                    </Link>
                                </h2>
                            </header>
                            <p
                                id={`project-desc-${project.id}`}
                                className="text-sm text-muted-foreground mt-2 line-clamp-2"
                            >
                                {locale === "nl" && project.descriptionNl
                                    ? project.descriptionNl
                                    : project.description}
                            </p>
                            <footer className="mt-4">
                                <Link
                                    className="inline-flex items-center text-sm underline hover:no-underline text-primary group-hover:translate-x-1 transition-transform"
                                    href={`/${locale}/projects/${project.id}`}
                                    aria-label={tProjects("viewDetailed", {
                                        title: project.title,
                                    })}
                                >
                                    {tProjects("viewCaseStudy")}
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </footer>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
