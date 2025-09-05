// components/Footer.tsx
import Link from "next/link";

type Locale = "en" | "nl";

function Social({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5
                 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
        >
            <span className="sr-only">{label}</span>
            {children}
        </a>
    );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM17.8 6.2a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
    );
}
function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7.5 0H12v2.1h.06c.63-1.2 2.18-2.46 4.49-2.46 4.8 0 5.68 3.16 5.68 7.26V23H17v-6.7c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V23H7.5V8z" />
        </svg>
    );
}
function IconGitHub(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 10 8.2 11.6.6.1.8-.3.8-.6v-2.2c-3.3.8-4-1.4-4-1.4-.6-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1.8 2.1 3.2 1.5.1-.8.4-1.4.8-1.8-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.5 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1.1-.3 3.5 1.3a11.9 11.9 0 0 1 6.3 0c2.4-1.6 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.8 1.3 2 1.3 3.3 0 4.6-2.7 5.6-5.3 5.9.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.8.6A12.2 12.2 0 0 0 24 12.7 12 12 0 0 0 12 .5z" />
        </svg>
    );
}

export default function Footer({ locale }: { locale: Locale }) {
    return (
        <footer
            className="border-t border-white/10 bg-black/20"
            role="contentinfo"
        >
            <div className="container py-12 grid gap-10 md:grid-cols-4">
                {/* Brand / Contact */}
                <div>
                    <h2 className="font-black text-xl">SponsMedia</h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                        KvK: <span className="tabular-nums">97944475</span>
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Mail:{" "}
                        <a
                            href="mailto:contact@sponsmedia.com"
                            className="hover:underline"
                        >
                            contact@sponsmedia.com
                        </a>
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Phone:{" "}
                        <a href="tel:+31683092973" className="hover:underline">
                            +31&nbsp;6&nbsp;83092973
                        </a>
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-3">Links</h3>
                    <nav aria-label="Footer navigation">
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href={`/${locale}/projects`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "nl" ? "Projecten" : "Projects"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/services`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "nl" ? "Diensten" : "Services"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/blog`}
                                    className="hover:text-primary transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "nl" ? "Contact" : "Contact"}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Social icons */}
                <div>
                    <h3 className="font-semibold mb-3">
                        {locale === "nl" ? "Volg" : "Follow"}
                    </h3>
                    <div className="flex items-center gap-3">
                        <Social
                            href="https://www.instagram.com/sponsmedia_/"
                            label="Instagram (opens in new tab)"
                        >
                            <IconInstagram className="h-5 w-5" />
                        </Social>
                        <Social
                            href="https://linkedin.com/company/sponsmedia"
                            label="LinkedIn (opens in new tab)"
                        >
                            <IconLinkedIn className="h-5 w-5" />
                        </Social>
                        <Social
                            href="https://github.com/Bart-Spons"
                            label="GitHub (opens in new tab)"
                        >
                            <IconGitHub className="h-5 w-5" />
                        </Social>
                    </div>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="font-semibold mb-3">Legal</h3>
                    <nav aria-label="Legal navigation">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href={`/${locale}/privacy-policy`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "nl"
                                        ? "Privacybeleid"
                                        : "Privacy Policy"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/terms`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "nl"
                                        ? "Algemene Voorwaarden"
                                        : "Terms of Service"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/cookies`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "nl"
                                        ? "Cookiebeleid"
                                        : "Cookie Policy"}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container py-6 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} SponsMedia — All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}
