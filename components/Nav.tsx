"use client";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";

export default function Nav({ locale }: { locale: "en" | "nl" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10"
            role="banner"
        >
            <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3 flex items-center justify-between">
                <Link
                    href={`/${locale}`}
                    className="font-black text-lg sm:text-xl tracking-tight flex-shrink-0"
                    aria-label="SponsMedia - Home"
                    onClick={closeMenu}
                >
                    Spons<span className="text-primary">Media</span>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    className="hidden md:flex gap-6 text-sm"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    <Link
                        href={`/${locale}/projects`}
                        className="hover:text-primary transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href={`/${locale}/services`}
                        className="hover:text-primary transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href={`/${locale}/about`}
                        className="hover:text-primary transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href={`/${locale}/blog`}
                        className="hover:text-primary transition-colors"
                    >
                        Blog
                    </Link>
                    <Link
                        href={`/${locale}/contact`}
                        className="hover:text-primary transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-2">
                    <LanguageSwitcher locale={locale} />
                    <Link
                        href={`/${locale}/contact`}
                        className="btn btn-primary"
                        aria-label="Start a new project with us"
                    >
                        Start a project
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur"
                    role="navigation"
                    aria-label="Mobile navigation"
                >
                    <div className="mx-auto max-w-7xl px-3 sm:px-4 py-4 space-y-3">
                        <Link
                            href={`/${locale}/projects`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            Projects
                        </Link>
                        <Link
                            href={`/${locale}/services`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            Services
                        </Link>
                        <Link
                            href={`/${locale}/about`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            About
                        </Link>
                        <Link
                            href={`/${locale}/blog`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            Blog
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>

                        <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                            <LanguageSwitcher locale={locale} />
                            <Link
                                href={`/${locale}/contact`}
                                className="btn btn-primary w-full text-center text-sm"
                                onClick={closeMenu}
                                aria-label="Start a new project with us"
                            >
                                Start a project
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
