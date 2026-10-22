import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createTranslator } from "next-intl";
import { projectsData } from "@/lib/data/projects";
import { ReelMedia } from "@/components/home/WorkReel";
import SplitTitle from "@/components/motion/SplitTitle";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import Magnet from "@/components/reactbits/Magnet";
import Choreography from "@/components/motion/Choreography";
import NextCase from "@/components/projects/NextCase";

type Locale = "en" | "nl";

export async function generateStaticParams() {
    return (["en", "nl"] as const).flatMap((locale) =>
        projectsData.map((project) => ({ locale, slug: project.id }))
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = projectsData.find((p) => p.id === slug);
    if (!project) return {};
    const nl = locale === "nl";
    const title = (nl && project.titleNl) || project.title;
    const description = (nl && project.descriptionNl) || project.description;
    return {
        title,
        description,
        openGraph: { title, description, images: [{ url: project.image }] },
        alternates: {
            canonical: `/${locale}/projects/${slug}`,
            languages: { "en-US": `/en/projects/${slug}`, "nl-NL": `/nl/projects/${slug}` },
        },
    };
}

export default async function Project({
    params,
}: {
    params: Promise<{ locale: Locale; slug: string }>;
}) {
    const { locale, slug } = await params;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages, namespace: "Projects" });

    const index = projectsData.findIndex((p) => p.id === slug);
    if (index === -1) notFound();
    const project = projectsData[index];
    const next = projectsData[(index + 1) % projectsData.length];

    const nl = locale === "nl";
    const pick = <T,>(en: T, nlValue?: T) => (nl && nlValue) || en;

    const title = pick(project.title, project.titleNl);
    const category = pick(project.category, project.categoryNl);
    const results = pick(project.results ?? [], project.resultsNl);

    const meta = [
        project.client && { label: t("client"), value: pick(project.client, project.clientNl) },
        project.duration && { label: t("duration"), value: project.duration },
        { label: t("year"), value: project.completedDate.slice(0, 4) },
        project.team?.length && { label: t("team"), value: project.team.join(", ") },
    ].filter(Boolean) as { label: string; value: string }[];

    const story = [
        { label: t("theChallenge"), text: pick(project.challenge, project.challengeNl) },
        { label: t("theSolution"), text: pick(project.solution, project.solutionNl) },
    ].filter((s): s is { label: string; text: string } => Boolean(s.text));

    return (
        <Choreography>
            <article>
                {/* Hero */}
                <header className="container pt-10 md:pt-16">
                    <Link
                        href={`/${locale}/projects`}
                        className="text-sm text-haze transition-colors hover:text-frost"
                    >
                        {t("backToProjects")}
                    </Link>
                    <p className="mt-12 text-haze md:mt-20">
                        {category}, {project.completedDate.slice(0, 4)}
                    </p>
                    <SplitTitle
                        as="h1"
                        trigger="load"
                        text={title}
                        className="display mt-4 text-[clamp(3.5rem,13vw,13rem)]"
                    />
                    <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
                        <p data-meta className="max-w-[44ch] text-xl leading-relaxed text-frost/80 md:col-span-7 md:text-2xl">
                            <span className="block">{pick(project.description, project.descriptionNl)}</span>
                        </p>
                        {project.liveUrl && (
                            <div className="md:col-span-5 md:justify-self-end">
                                <Magnet padding={80} magnetStrength={3} maxOffset={20}>
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-ghost h-14 px-8 text-base"
                                    >
                                        {t("viewLiveSite")} ↗
                                    </a>
                                </Magnet>
                            </div>
                        )}
                    </div>
                    <dl data-meta className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 md:grid-cols-4">
                        {meta.map((m) => (
                            <div key={m.label} className="relative pt-5">
                                <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                                <dt className="text-sm text-haze">{m.label}</dt>
                                <dd className="mt-2 text-lg">{m.value}</dd>
                            </div>
                        ))}
                    </dl>
                </header>

                {/* Key visual: opens up to full width as you scroll */}
                <div
                    data-case-media
                    className="relative mt-20 aspect-[4/3] w-full overflow-hidden bg-deep md:mt-28 md:aspect-video md:max-h-[100svh]"
                >
                    <div data-case-media-inner className="absolute inset-0">
                        <ReelMedia item={project} priority sizes="100vw" />
                    </div>
                </div>


                {/* Challenge and solution: words sharpen as you read */}
                {story.map((s, i) => (
                    <section key={s.label} className="container grid gap-6 py-16 md:grid-cols-12 md:gap-10 md:py-28">
                        <h2 className="self-start text-haze md:sticky md:top-28 md:col-span-3">
                            <span className="tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>{" "}
                            {s.label}
                        </h2>
                        <div className="md:col-span-9">
                            <ScrollReveal
                                as="p"
                                baseOpacity={0.12}
                                enableBlur
                                blurStrength={6}
                                baseRotation={0}
                                textClassName="text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.025em]"
                                wordAnimationEnd="bottom 60%"
                            >
                                {s.text}
                            </ScrollReveal>
                        </div>
                    </section>
                ))}

                {/* Gallery: pinned and sliding sideways on desktop */}
                {project.additionalImages && project.additionalImages.length > 0 && (
                    <section
                        data-hscroll
                        aria-label={t("projectGallery")}
                        className="h-reel relative overflow-hidden py-16 md:py-0"
                    >
                        <div className="h-reel-track flex flex-col gap-8 px-4 sm:px-6 md:gap-[4vw] md:px-[6vw]">
                            <h2 className="display shrink-0 text-[clamp(2.75rem,6vw,6rem)] md:w-[26vw]">
                                {t("projectGallery")}
                            </h2>
                            {project.additionalImages.map((src, i) => (
                                <figure
                                    key={src}
                                    data-hscroll-item
                                    className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-deep md:w-[min(56vw,calc((100svh_-_10rem)*1.333))]"
                                >
                                    <Image
                                        src={src}
                                        alt={`${title}, ${i + 1}`}
                                        fill
                                        sizes="(min-width: 768px) 56vw, 100vw"
                                        className="object-cover"
                                    />
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <section className="container py-16 md:py-28">
                        <SplitTitle
                            text={t("resultsImpact")}
                            className="display text-[clamp(2.75rem,6vw,6rem)]"
                        />
                        <ol className="mt-12 md:mt-16">
                            {results.map((r, i) => (
                                <li
                                    key={r}
                                    data-row
                                    className="relative grid grid-cols-[3.5rem_1fr] gap-4 py-8 md:grid-cols-12 md:gap-10 md:py-10"
                                >
                                    <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                                    <span className="overflow-hidden md:col-span-2">
                                        <span data-row-text className="display block text-[clamp(2rem,4vw,3.5rem)] tabular-nums text-primary">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </span>
                                    <span className="overflow-hidden md:col-span-9">
                                        <span data-row-text className="block text-[clamp(1.25rem,2.4vw,2rem)] leading-snug">
                                            {r}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </section>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                    <section className="container py-16 md:py-28">
                        <figure className="md:ml-[16.66%]">
                            <span aria-hidden className="display block text-[clamp(6rem,12vw,10rem)] leading-[0.6] text-primary">
                                “
                            </span>
                            <blockquote className="mt-6">
                                <ScrollReveal
                                    as="p"
                                    baseOpacity={0.12}
                                    enableBlur
                                    blurStrength={6}
                                    baseRotation={0}
                                    textClassName="text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.025em]"
                                    wordAnimationEnd="bottom 60%"
                                >
                                    {pick(project.testimonial.text, project.testimonial.textNl)}
                                </ScrollReveal>
                            </blockquote>
                            <figcaption data-rise className="mt-10 text-lg">
                                <span className="font-semibold">{project.testimonial.author}</span>
                                <span className="text-haze">
                                    , {pick(project.testimonial.role, project.testimonial.roleNl)}
                                </span>
                            </figcaption>
                        </figure>
                    </section>
                )}

                {next.id !== project.id && (
                    <NextCase
                        href={`/${locale}/projects/${next.id}`}
                        label={t("nextCase")}
                        title={pick(next.title, next.titleNl)}
                        image={next.image}
                    />
                )}
            </article>
        </Choreography>
    );
}
