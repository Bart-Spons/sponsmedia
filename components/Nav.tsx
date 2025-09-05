// components/Nav.tsx
"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";

export default function Nav({ locale }: { locale: "en" | "nl" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const L =
        locale === "nl"
            ? {
                  brandAria: "SponsMedia - Home",
                  mainNav: "Hoofdnavigatie",
                  mobileNav: "Mobiele navigatie",
                  openMenu: "Menu openen",
                  closeMenu: "Menu sluiten",
                  projects: "Projecten",
                  services: "Diensten",
                  about: "Over",
                  blog: "Blog",
                  contact: "Contact",
                  cta: "Start een project",
                  ctaAria: "Start een nieuw project met ons",
              }
            : {
                  brandAria: "SponsMedia - Home",
                  mainNav: "Main navigation",
                  mobileNav: "Mobile navigation",
                  openMenu: "Open menu",
                  closeMenu: "Close menu",
                  projects: "Projects",
                  services: "Services",
                  about: "About",
                  blog: "Blog",
                  contact: "Contact",
                  cta: "Start a project",
                  ctaAria: "Start a new project with us",
              };

    const toggleMenu = () => setIsMenuOpen((v) => !v);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10"
            role="banner"
        >
            <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3 flex items-center justify-between">
                <Link
                    href={`/${locale}`}
                    className="font-black text-lg sm:text-xl tracking-tight flex-shrink-0"
                    aria-label={L.brandAria}
                    onClick={closeMenu}
                >
                    Spons<span className="text-primary">Media</span>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    className="hidden md:flex gap-6 text-sm"
                    role="navigation"
                    aria-label={L.mainNav}
                >
                    <Link
                        href={`/${locale}/projects`}
                        className="hover:text-primary transition-colors"
                    >
                        {L.projects}
                    </Link>
                    <Link
                        href={`/${locale}/services`}
                        className="hover:text-primary transition-colors"
                    >
                        {L.services}
                    </Link>
                    <Link
                        href={`/${locale}/about`}
                        className="hover:text-primary transition-colors"
                    >
                        {L.about}
                    </Link>
                    <Link
                        href={`/${locale}/blog`}
                        className="hover:text-primary transition-colors"
                    >
                        {L.blog}
                    </Link>
                    <Link
                        href={`/${locale}/contact`}
                        className="hover:text-primary transition-colors"
                    >
                        {L.contact}
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-2">
                    <LanguageSwitcher locale={locale} />
                    <Link
                        href={`/${locale}/contact`}
                        className="btn btn-primary"
                        aria-label={L.ctaAria}
                    >
                        {L.cta}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? L.closeMenu : L.openMenu}
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
                    aria-label={L.mobileNav}
                >
                    <div className="mx-auto max-w-7xl px-3 sm:px-4 py-4 space-y-3">
                        <Link
                            href={`/${locale}/projects`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            {L.projects}
                        </Link>
                        <Link
                            href={`/${locale}/services`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            {L.services}
                        </Link>
                        <Link
                            href={`/${locale}/about`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            {L.about}
                        </Link>
                        <Link
                            href={`/${locale}/blog`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            {L.blog}
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="block py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                        >
                            {L.contact}
                        </Link>

                        <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                            <LanguageSwitcher locale={locale} />
                            <Link
                                href={`/${locale}/contact`}
                                className="btn btn-primary w-full text-center text-sm"
                                onClick={closeMenu}
                                aria-label={L.ctaAria}
                            >
                                {L.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
