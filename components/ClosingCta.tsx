import Link from "next/link";
import Magnet from "@/components/reactbits/Magnet";

export default function ClosingCta({
    locale,
    title,
    sub,
    button,
    orMail,
}: {
    locale: "en" | "nl";
    title: string;
    sub: string;
    button: string;
    orMail: string;
}) {
    return (
        <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-[40vh] left-1/2 h-[80vh] w-[90vw] -translate-x-1/2 rounded-full"
                style={{
                    background: "radial-gradient(closest-side, rgba(226,183,111,0.16), transparent)",
                }}
            />
            <div className="container relative py-28 md:py-44">
                <h2 id="cta-title" className="display max-w-[13ch] text-[clamp(3rem,9vw,8.5rem)]">
                    {title}
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-center">
                    <p className="max-w-[40ch] text-lg leading-relaxed text-frost/80 md:col-span-5">
                        {sub}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:col-start-7 md:justify-end">
                        <Magnet padding={90} magnetStrength={3} maxOffset={22}>
                            <Link href={`/${locale}/contact`} className="btn btn-primary h-16 px-10 text-lg">
                                {button}
                            </Link>
                        </Magnet>
                        <a href="mailto:contact@sponsmedia.com" className="text-haze transition-colors hover:text-frost">
                            {orMail}: <span className="text-frost">contact@sponsmedia.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
