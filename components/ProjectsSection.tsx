// components/HomeProjectsSection.tsx
import Link from "next/link";
import { projectsData } from "@/lib/data/projects";
import { createTranslator } from "next-intl";

export default async function HomeProjectsSection({
    locale = "en",
}: {
    locale?: "en" | "nl";
}) {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages, namespace: "Projects" });

    // Show 2 featured projects on the homepage (fallback to first 2)
    const items =
        projectsData.filter((p) => p.featured).slice(0, 2).length > 0
            ? projectsData.filter((p) => p.featured).slice(0, 2)
            : projectsData.slice(0, 2);

    return (
        <section id="projects" className="py-16">
            <div className="container">
                {/* Header — same tone as /projects */}
                <header className="mb-12 text-center">
                    <h2 className="text-4xl md:text-4xl font-extrabold mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    {items.map((project, index) => (
                        <article
                            key={project.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 group hover:bg-white/10 transition-colors"
                        >
                            <div className="rounded-2xl bg-muted overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={t("projectScreenshot", {
                                        title: project.title,
                                    })}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading={index < 2 ? "eager" : "lazy"}
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
                                <h3 className="mt-3 text-xl font-semibold">
                                    <Link
                                        href={`/${locale}/projects/${project.id}`}
                                        className="hover:text-primary transition-colors"
                                        aria-describedby={`home-proj-${project.id}`}
                                    >
                                        {project.title}
                                    </Link>
                                </h3>
                            </header>

                            <p
                                id={`home-proj-${project.id}`}
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
                                    aria-label={t("viewDetailed", {
                                        title: project.title,
                                    })}
                                >
                                    {t("viewCaseStudy")}
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

                {/* Big pill CTA */}
                <div className="mt-10 text-center">
                    <Link
                        href={`/${locale}/projects`}
                        className="inline-flex h-11 items-center rounded-full px-6 font-medium text-black
                       bg-gradient-to-r from-primary to-accent hover:brightness-105 transition"
                    >
                        {locale === "nl"
                            ? "Bekijk alle projecten"
                            : "View All Projects"}
                        <svg
                            className="ml-2 w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M5 12h14M13 5l7 7-7 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
