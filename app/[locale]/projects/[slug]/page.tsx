import Link from "next/link";
import Image from "next/image";
import { createTranslator } from "next-intl";
import { projectsData } from "../../../../lib/data/projects";

export async function generateStaticParams() {
    const locales = ["en", "nl"];
    const params = [];

    for (const locale of locales) {
        for (const project of projectsData) {
            params.push({
                locale,
                slug: project.id,
            });
        }
    }

    return params;
}

export default async function Project({
    params,
}: {
    params: Promise<{ locale: "en" | "nl"; slug: string }>;
}) {
    const { locale, slug } = await params;

    // Load messages for translation
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages, namespace: "Projects" });

    // Find the project by slug/id
    const project = projectsData.find((p) => p.id === slug);

    // If project not found, you might want to return a 404 page
    if (!project) {
        return (
            <div className="min-h-screen bg-space flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {t("projectNotFound")}
                    </h1>
                    <Link
                        href={`/${locale}/projects`}
                        className="text-emerald-400 hover:text-emerald-300"
                    >
                        {t("backToProjects")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-space">
            <div className="container py-16">
                {/* Navigation */}
                <Link
                    href={`/${locale}/projects`}
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
                >
                    {t("backToProjects")}
                </Link>

                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        {locale === "nl" && project.titleNl
                            ? project.titleNl
                            : project.title}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl">
                        {locale === "nl" && project.descriptionNl
                            ? project.descriptionNl
                            : project.description}
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-12 mb-16">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Hero Media (Video or Image) */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="aspect-video relative rounded-xl overflow-hidden bg-gray-800">
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        controls
                                        className="w-full h-full object-cover"
                                        poster={project.image}
                                    >
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                ) : (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Challenge Section */}
                        {(project.challenge ||
                            (locale === "nl" && project.challengeNl)) && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {t("theChallenge")}
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    {locale === "nl" && project.challengeNl
                                        ? project.challengeNl
                                        : project.challenge}
                                </p>
                            </div>
                        )}

                        {/* Solution Section */}
                        {(project.solution ||
                            (locale === "nl" && project.solutionNl)) && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {t("theSolution")}
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    {locale === "nl" && project.solutionNl
                                        ? project.solutionNl
                                        : project.solution}
                                </p>
                            </div>
                        )}

                        {/* Additional Images */}
                        {project.additionalImages &&
                            project.additionalImages.length > 0 && (
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">
                                        {t("projectGallery")}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {project.additionalImages.map(
                                            (image, index) => (
                                                <div
                                                    key={index}
                                                    className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-800"
                                                >
                                                    <Image
                                                        src={image}
                                                        alt={`${
                                                            project.title
                                                        } - Image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* Results Section */}
                        {((project.results && project.results.length > 0) ||
                            (locale === "nl" &&
                                project.resultsNl &&
                                project.resultsNl.length > 0)) && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {t("resultsImpact")}
                                </h2>
                                <div className="grid md:grid-cols-1 gap-4">
                                    {(locale === "nl" && project.resultsNl
                                        ? project.resultsNl
                                        : project.results || []
                                    ).map((result, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-300">
                                                {result}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Testimonial */}
                        {project.testimonial && (
                            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-8">
                                <div className="text-emerald-400 text-6xl mb-4">
                                    "
                                </div>
                                <blockquote className="text-lg text-gray-300 italic mb-6">
                                    {project.testimonial.text}
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-emerald-400 font-bold">
                                            {project.testimonial.author
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">
                                            {project.testimonial.author}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {project.testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Details */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {t("projectDetails")}
                            </h3>

                            {project.client && (
                                <div className="mb-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {t("client")}
                                    </div>
                                    <div className="text-white">
                                        {locale === "nl" && project.clientNl
                                            ? project.clientNl
                                            : project.client}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                <div className="text-sm font-medium text-gray-400">
                                    {t("category")}
                                </div>
                                <div className="text-white">
                                    {locale === "nl" && project.categoryNl
                                        ? project.categoryNl
                                        : project.category}
                                </div>
                            </div>

                            {project.duration && (
                                <div className="mb-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {t("duration")}
                                    </div>
                                    <div className="text-white">
                                        {project.duration}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                <div className="text-sm font-medium text-gray-400">
                                    {t("completed")}
                                </div>
                                <div className="text-white">
                                    {project.completedDate}
                                </div>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {t("technologiesUsed")}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Team */}
                        {project.team && project.team.length > 0 && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    {t("team")}
                                </h3>
                                <div className="space-y-2">
                                    {project.team.map((role, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            <span className="text-gray-300">
                                                {role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {t("links")}
                            </h3>
                            <div className="space-y-3">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                                    >
                                        <span>🌐</span> {t("viewLiveSite")}
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                                    >
                                        <span>💻</span> {t("viewCode")}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {/* <div className="text-center">
                    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-900/10 p-8 lg:p-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            Let's discuss how I can help bring your vision to
                            life with the same attention to detail and quality.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/contact`}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors"
                            >
                                Start a Project
                            </Link>
                            <Link
                                href={`/${locale}/projects`}
                                className="px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-colors"
                            >
                                View More Projects
                            </Link>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
