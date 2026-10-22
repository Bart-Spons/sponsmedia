import Image from "next/image";
import Link from "next/link";

/** One blog post as a card: cover, date and tags, title. Used on the homepage and the blog index. */
export default function BlogCard({
    href,
    image,
    title,
    date,
    dateLabel,
    tags,
}: {
    href: string;
    image: string;
    title: string;
    date: string;
    dateLabel: string;
    tags: string[];
}) {
    return (
        <Link href={href} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-deep">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                />
            </div>
            <p className="mt-5 text-sm text-haze">
                <time dateTime={date}>{dateLabel}</time>
                {tags.length > 0 && (
                    <>
                        <span aria-hidden> · </span>
                        {tags.slice(0, 2).join(", ")}
                    </>
                )}
            </p>
            <h3 className="mt-2 text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold leading-snug tracking-[-0.02em] transition-colors group-hover:text-primary">
                {title}
            </h3>
        </Link>
    );
}
