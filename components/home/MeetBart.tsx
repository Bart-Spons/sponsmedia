import Image from "next/image";
import Link from "next/link";
import SplitTitle from "@/components/motion/SplitTitle";

/**
 * A short personal introduction on the homepage: the photo of Bart on the
 * sofa beside a few lines about who is behind SponsMedia, with a link to the
 * About page. Inside <Choreography> the photo and text rise in (data-rise).
 */
export default function MeetBart({
    locale,
    copy,
}: {
    locale: "en" | "nl";
    copy: { kicker: string; title: string; text: string; link: string };
}) {
    return (
        <section aria-labelledby="meet-title" className="container pb-28 md:pb-44">
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                <div
                    data-rise
                    className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line md:col-span-5"
                >
                    <Image
                        src="/images/bart-sofa.webp"
                        alt="Bart Spons on a sofa with his laptop"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                    />
                </div>

                <div className="md:col-span-6 md:col-start-7">
                    <p data-rise className="mb-5 text-base font-medium text-primary md:text-lg">
                        {copy.kicker}
                    </p>
                    <SplitTitle
                        id="meet-title"
                        text={copy.title}
                        className="display text-[clamp(2.5rem,6vw,5rem)]"
                    />
                    <p data-rise className="mt-8 max-w-[44ch] text-lg leading-relaxed text-frost/80 md:text-xl">
                        {copy.text}
                    </p>
                    <Link
                        data-rise
                        href={`/${locale}/about`}
                        className="mt-10 inline-block font-semibold underline decoration-primary decoration-2 underline-offset-[6px] hover:text-primary"
                    >
                        {copy.link}
                    </Link>
                </div>
            </div>
        </section>
    );
}
