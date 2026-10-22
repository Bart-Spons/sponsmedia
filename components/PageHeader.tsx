import FocusTitle from "@/components/motion/FocusTitle";

/**
 * Shared top of every inner page: a big title behind the autofocus lens,
 * short intro beside it. The intro rises in when the page is wrapped in
 * <Choreography> (data-meta).
 */
export default function PageHeader({
    title,
    intro,
    children,
}: {
    title: string;
    intro?: string;
    children?: React.ReactNode;
}) {
    return (
        <header className="container grid gap-8 pb-16 pt-16 md:grid-cols-12 md:items-end md:pb-24 md:pt-28">
            <div className="md:col-span-7">
                <FocusTitle text={title} className="display text-[clamp(3.25rem,10vw,9rem)]" />
            </div>
            {(intro || children) && (
                <div data-meta className="md:col-span-5 md:pb-3">
                    {intro && (
                        <p className="max-w-[44ch] text-lg leading-relaxed text-frost/75 md:text-xl">
                            {intro}
                        </p>
                    )}
                    {children}
                </div>
            )}
        </header>
    );
}
