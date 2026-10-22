import ScrollReveal from "@/components/reactbits/ScrollReveal";
import ServiceIcon from "@/components/services/ServiceIcon";
import type { ServiceRow } from "@/components/home/ServicesList";

/**
 * Services one below the other, no cards. On desktop the left column (icon,
 * number, title) stays put while you scroll through the details beside it.
 * The motion comes from <Choreography>: the icon draws itself (data-draw),
 * the key sentence sharpens word by word, and the features slide in (data-row).
 */
export default function ServiceScroll({
    items,
    labels,
}: {
    items: ServiceRow[];
    labels: { included: string; tools: string };
}) {
    return (
        <ol className="border-b border-line">
            {items.map((s, i) => (
                <li
                    key={s.slug}
                    id={s.slug}
                    className="grid scroll-mt-24 gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-12 md:py-28"
                >
                    <div className="self-start md:sticky md:top-28 md:col-span-5">
                        <ServiceIcon name={s.slug} className="h-16 w-16 md:h-24 md:w-24" />
                        <p className="mt-8 text-sm tabular-nums text-primary">
                            {String(i + 1).padStart(2, "0")}
                            <span className="text-haze"> / {String(items.length).padStart(2, "0")}</span>
                        </p>
                        <h2 className="display mt-3 text-[clamp(2.75rem,5.5vw,5rem)]">{s.title}</h2>
                        <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-frost/75">{s.desc}</p>
                    </div>

                    <div className="md:col-span-6 md:col-start-7 md:pt-24">
                        <ScrollReveal
                            as="p"
                            baseOpacity={0.15}
                            enableBlur
                            blurStrength={5}
                            baseRotation={0}
                            textClassName="text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.025em]"
                            wordAnimationEnd="bottom 65%"
                        >
                            {s.highlight}
                        </ScrollReveal>

                        <p className="mb-2 mt-14 text-sm text-haze">{labels.included}</p>
                        <ul className="border-b border-line">
                            {s.features.map((f) => (
                                <li key={f} data-row className="relative">
                                    <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                                    <span className="block overflow-hidden py-4">
                                        <span data-row-text className="flex items-baseline gap-4 text-lg">
                                            <span aria-hidden className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-primary" />
                                            {f}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <p className="mb-3 mt-10 text-sm text-haze">{labels.tools}</p>
                        <ul data-stagger className="flex flex-wrap gap-2">
                            {s.technologies.map((t) => (
                                <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-frost/80">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            ))}
        </ol>
    );
}
