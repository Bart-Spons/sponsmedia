import BlurText from "@/components/reactbits/BlurText";

/** Shared top of every inner page: big title that comes into focus, short intro beside it. */
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
            <BlurText
                as="h1"
                text={title}
                trigger="load"
                effect="focus"
                blur={16}
                delay={90}
                className="display text-[clamp(3.25rem,10vw,9rem)] md:col-span-7"
            />
            {(intro || children) && (
                <div className="md:col-span-5 md:pb-3">
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
