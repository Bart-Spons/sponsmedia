import Link from "next/link";

export default function Footer({ locale }: { locale: "en" | "nl" }) {
    return (
        <footer className="border-t border-white/10" role="contentinfo">
            <div className="container py-10 grid md:grid-cols-4 gap-8">
                <div>
                    <h2 className="font-black text-xl">SponsMedia</h2>
                    {/* <p className="text-sm text-muted-foreground mt-2">
                        Be more visible online.
                    </p> */}
                    <p className="text-sm text-muted-foreground mt-2">
                        KvK nummer: 97944475
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Mail:{" "}
                        <a
                            href="mailto:contact@sponsmedia.com"
                            className="hover:underline"
                        >
                            contact@sponsmedia.com
                        </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Phone:{" "}
                        <a href="tel:+31683092973" className="hover:underline">
                            +31 6 83092973
                        </a>
                    </p>

                    {/* <address className="text-sm text-muted-foreground mt-4 not-italic">
                        <p>
                            <a
                                href="mailto:hello@sponsmedia.com"
                                className="hover:text-primary transition-colors"
                                aria-label="Send email to SponsMedia"
                            >
                                contact@sponsmedia.com
                            </a>
                        </p>
                    </address> */}
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Links</h3>
                    <nav role="navigation" aria-label="Footer navigation">
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link
                                    href={`/${locale}/projects`}
                                    className="hover:text-primary transition-colors"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/services`}
                                    className="hover:text-primary transition-colors"
                                >
                                    Services
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
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Follow</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a
                                href="https://www.instagram.com/sponsmedia_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                                aria-label="Visit Instagram (opens in new tab)"
                            >
                                Instagram — @sponsmedia_
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/company/sponsmedia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                                aria-label="Follow SponsMedia on LinkedIn (opens in new tab)"
                            >
                                LinkedIn — SponsMedia
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Legal</h3>
                    <nav role="navigation" aria-label="Legal navigation">
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href={`/${locale}/privacy-policy`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "en"
                                        ? "Privacy Policy"
                                        : "Privacybeleid"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/terms`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "en"
                                        ? "Terms of Service"
                                        : "Algemene Voorwaarden"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/cookies`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {locale === "en"
                                        ? "Cookie Policy"
                                        : "Cookiebeleid"}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="text-center text-xs text-muted-foreground pb-8 border-t border-white/10 pt-8">
                <p>
                    © {new Date().getFullYear()} SponsMedia. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
