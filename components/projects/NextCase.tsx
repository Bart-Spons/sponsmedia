import Image from "next/image";
import Link from "next/link";
import SplitTitle from "@/components/motion/SplitTitle";

/** Full-width link to the next project; its image opens up behind the title on hover. */
export default function NextCase({
    href,
    label,
    title,
    image,
    long = false,
}: {
    href: string;
    label: string;
    title: string;
    image: string;
    /** Long titles (articles) get smaller type and animate word by word. */
    long?: boolean;
}) {
    return (
        <section aria-label={label} className="border-t border-line">
            <Link href={href} className="group relative block overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 [clip-path:inset(50%_0_50%_0)] transition-[clip-path] duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
                >
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="scale-110 object-cover opacity-40 transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100"
                    />
                </div>
                <div className="container relative py-24 md:py-40">
                    <p className="text-haze">{label} →</p>
                    <SplitTitle
                        text={title}
                        by={long ? "words" : "chars"}
                        className={`display mt-4 transition-colors duration-500 group-hover:text-primary ${
                            long ? "max-w-[20ch] text-[clamp(2.5rem,6vw,6rem)]" : "text-[clamp(3.5rem,13vw,13rem)]"
                        }`}
                    />
                </div>
            </Link>
        </section>
    );
}
