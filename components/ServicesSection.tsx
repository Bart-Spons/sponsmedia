// components/ServicesSection.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { servicesData } from "../lib/data/services";
import { createTranslator } from "next-intl";

export default function ServicesSection({ locale }: { locale: "en" | "nl" }) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true); // Start as visible immediately

    // Load messages for translation
    const messages =
        locale === "nl"
            ? require("@/messages/nl.json")
            : require("@/messages/en.json");
    const t = createTranslator({ locale, messages, namespace: "Homepage" });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const getColorClasses = (color: string) => {
        const colors = {
            emerald: {
                bg: "bg-emerald-500/5",
                border: "border-emerald-500/20",
                accent: "bg-emerald-500",
                text: "text-emerald-400",
                glow: "shadow-emerald-500/20",
            },
            purple: {
                bg: "bg-purple-500/5",
                border: "border-purple-500/20",
                accent: "bg-purple-500",
                text: "text-purple-400",
                glow: "shadow-purple-500/20",
            },
            blue: {
                bg: "bg-blue-500/5",
                border: "border-blue-500/20",
                accent: "bg-blue-500",
                text: "text-blue-400",
                glow: "shadow-blue-500/20",
            },
        };
        return colors[color as keyof typeof colors];
    };

    return (
        <section
            id="services"
            className="relative container py-8 sm:py-8 md:py-12 lg:py-16 overflow-hidden"
            aria-labelledby="services-heading"
        >
            {/* Dynamic mouse-following gradient */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.05), rgba(139, 92, 246, 0.03) 40%, transparent 80%)`,
                }}
                aria-hidden="true"
            ></div>

            {/* Animated background elements with enhanced movement */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                aria-hidden="true"
            >
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-500/5 to-green-500/3 rounded-full blur-3xl"></div>
                <div className="absolute top-60 right-32 w-24 h-24 bg-gradient-to-r from-purple-500/5 to-pink-500/3 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-cyan-500/3 rounded-full blur-3xl"></div>
            </div>

            {/* Enhanced header with morphing elements */}
            <header
                className={`text-center mb-8 sm:mb-16 md:mb-20 lg:mb-24 relative z-10 transition-all duration-1000 ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                }`}
            >
                <div className="inline-block mb-6 relative group">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        aria-hidden="true"
                    ></div>
                </div>

                <h2
                    id="services-heading"
                    className="text-4xl md:text-6xl font-black mb-8 relative"
                >
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                        {t("servicesTitle")}
                    </span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                    {t("servicesSubtitle")}
                </p>
            </header>

            {/* Revolutionary 3D-effect service cards */}
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative z-10 perspective-1000">
                {servicesData.map((service, index) => {
                    const colors = getColorClasses(service.color);
                    const isHovered = hoveredCard === index;

                    return (
                        <Link
                            href={`/${locale}/services`}
                            key={service.title}
                            className={`group relative transform-gpu transition-all duration-700 ease-out block ${
                                isHovered
                                    ? "scale-105 -rotate-y-6 z-20"
                                    : hoveredCard !== null
                                    ? "scale-95 blur-sm opacity-60"
                                    : "scale-100"
                            }`}
                            style={{
                                animationDelay: `${index * 300}ms`,
                                transformStyle: "preserve-3d",
                            }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Holographic border effect */}
                            <div
                                className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy`}
                            ></div>

                            <div
                                className={`relative rounded-2xl sm:rounded-3xl border-2 ${colors.border} bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl transition-all duration-500 overflow-hidden group-hover:border-opacity-80 h-[850px]`}
                            >
                                {/* Dynamic mesh gradient overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-all duration-700`}
                                ></div>

                                {/* Animated background pattern with enhanced effects */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                    {service.pattern === "geometric" && (
                                        <div
                                            className="absolute inset-0 animate-slide-diagonal"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='geometric' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m0 60 60-60h30v30z' fill='%23ffffff' fill-opacity='0.15'/%3e%3cpath d='m30 60 30-30v30z' fill='%23ffffff' fill-opacity='0.08'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23geometric)'/%3e%3c/svg%3e")`,
                                            }}
                                        ></div>
                                    )}
                                    {service.pattern === "waves" && (
                                        <div
                                            className="absolute inset-0 animate-slide-wave"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg width='120' height='24' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='waves' x='0' y='0' width='120' height='24' patternUnits='userSpaceOnUse'%3e%3cpath d='M0 12 Q30 0 60 12 Q90 24 120 12 v12 H0 Z' fill='%23ffffff' fill-opacity='0.15'/%3e%3cpath d='M0 18 Q30 6 60 18 Q90 30 120 18 v6 H0 Z' fill='%23ffffff' fill-opacity='0.08'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23waves)'/%3e%3c/svg%3e")`,
                                            }}
                                        ></div>
                                    )}
                                    {service.pattern === "dots" && (
                                        <div
                                            className="absolute inset-0 animate-pulse-slow"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='dots' x='0' y='0' width='30' height='30' patternUnits='userSpaceOnUse'%3e%3ccircle cx='15' cy='15' r='3' fill='%23ffffff' fill-opacity='0.15'/%3e%3ccircle cx='5' cy='5' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3e%3ccircle cx='25' cy='25' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23dots)'/%3e%3c/svg%3e")`,
                                            }}
                                        ></div>
                                    )}
                                </div>

                                <div className="relative p-4 sm:p-6 md:p-8 h-full flex flex-col z-10">
                                    {/* Morphing icon with dual state */}
                                    <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                                        <div
                                            className={`relative text-4xl p-4 rounded-3xl ${colors.accent} shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-${service.color}-500/50`}
                                        >
                                            <div className="absolute inset-0 rounded-3xl bg-white/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <span className="relative transition-all duration-300 group-hover:hidden">
                                                {service.icon}
                                            </span>
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                                {service.altIcon}
                                            </span>
                                        </div>
                                        <div
                                            className={`w-12 h-2 ${colors.accent} rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-700 shadow-lg`}
                                        >
                                            <div
                                                className={`h-full bg-gradient-to-r from-white/50 to-transparent rounded-full animate-slide-right`}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-white transition-colors leading-tight">
                                                {locale === "nl" &&
                                                service.titleNl
                                                    ? service.titleNl
                                                    : service.title}
                                            </h3>
                                            <p
                                                className={`${colors.text} text-sm font-bold mb-6 opacity-90 group-hover:opacity-100 transition-all duration-300`}
                                            >
                                                ✨{" "}
                                                {locale === "nl" &&
                                                service.highlightNl
                                                    ? service.highlightNl
                                                    : service.highlight}
                                            </p>

                                            <p className="text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors">
                                                {locale === "nl" &&
                                                service.descNl
                                                    ? service.descNl
                                                    : service.desc}
                                            </p>
                                        </div>

                                        {/* Stats showcase */}
                                        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-white/10">
                                            {Object.entries(service.stats).map(
                                                ([key, value], statIndex) => (
                                                    <div
                                                        key={key}
                                                        className="text-center group/stat"
                                                    >
                                                        <div
                                                            className={`text-lg font-black ${colors.text} group-hover/stat:scale-110 transition-transform duration-300`}
                                                        >
                                                            {value}
                                                        </div>
                                                        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                                            {key}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Enhanced features with progress animation */}
                                    <div className="mb-8 mt-8">
                                        {/* <h4 className="text-sm font-black text-gray-300 uppercase tracking-wider mb-4 flex items-center">
                                            <span
                                                className={`w-2 h-2 rounded-full ${colors.accent} mr-3 animate-pulse shadow-lg`}
                                            ></span>
                                            Premium Features
                                        </h4> */}
                                        <div className="space-y-3">
                                            {(locale === "nl" &&
                                            service.featuresNl
                                                ? service.featuresNl
                                                : service.features
                                            )
                                                .slice(0, 3)
                                                .map(
                                                    (feature, featureIndex) => (
                                                        <div
                                                            key={featureIndex}
                                                            className="group/feature flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/20"
                                                            style={{
                                                                animationDelay: `${
                                                                    index *
                                                                        300 +
                                                                    featureIndex *
                                                                        150
                                                                }ms`,
                                                            }}
                                                        >
                                                            <div
                                                                className={`flex-shrink-0 w-3 h-3 rounded-full ${colors.accent} mt-1 transform group-hover/feature:scale-125 transition-all duration-300 shadow-lg group-hover/feature:shadow-${service.color}-500/50`}
                                                            ></div>
                                                            <p className="text-sm text-gray-300 group-hover/feature:text-white transition-colors font-medium leading-relaxed">
                                                                {feature}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            <div className="flex items-center justify-between mt-3 px-3">
                                                <p
                                                    className={`text-xs ${colors.text} font-bold`}
                                                >
                                                    +
                                                    {(locale === "nl" &&
                                                    service.featuresNl
                                                        ? service.featuresNl
                                                        : service.features
                                                    ).length - 3}{" "}
                                                    {t("moreFeatures")}
                                                </p>
                                                <div className="flex gap-1">
                                                    {[...Array(3)].map(
                                                        (_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-1 h-1 rounded-full ${colors.accent} animate-pulse`}
                                                                style={{
                                                                    animationDelay: `${
                                                                        i * 200
                                                                    }ms`,
                                                                }}
                                                            ></div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech stack with enhanced interactivity */}
                                    <div className="mt-auto">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {service.technologies.map(
                                                (tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="group/tech relative px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600 hover:border-gray-500 rounded-lg text-xs font-bold text-gray-200 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
                                                    >
                                                        <span className="relative z-10">
                                                            {tech}
                                                        </span>
                                                        <div
                                                            className={`absolute inset-x-0 bottom-0 h-px ${colors.accent} transform scale-x-0 group-hover/tech:scale-x-100 transition-transform origin-left rounded-full`}
                                                        ></div>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-lg opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced glow with particle effects */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} animate-gradient-xy`}
                                    ></div>
                                    {/* Floating particles on hover */}
                                    {isHovered &&
                                        [...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`absolute w-1 h-1 ${colors.accent} rounded-full animate-float-particle`}
                                                style={{
                                                    left: `${
                                                        20 + Math.random() * 60
                                                    }%`,
                                                    top: `${
                                                        20 + Math.random() * 60
                                                    }%`,
                                                    animationDelay: `${
                                                        i * 0.2
                                                    }s`,
                                                    animationDuration: `${
                                                        2 + Math.random() * 2
                                                    }s`,
                                                }}
                                            ></div>
                                        ))}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
