import type { Metadata } from "next";

export async function generateStaticParams() {
    return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const title =
        locale === "en"
            ? "About - SponsMedia | Web Development & Digital Strategy"
            : "Over Ons - SponsMedia | Webontwikkeling & Digitale Strategie";
    const description =
        locale === "en"
            ? "Meet the team behind SponsMedia. We're passionate about creating digital experiences that matter, combining technical expertise with creative vision to help brands thrive online."
            : "Maak kennis met het team achter SponsMedia. We zijn gepassioneerd over het creëren van digitale ervaringen die ertoe doen, waarbij we technische expertise combineren met creatieve visie om merken online te laten floreren.";

    return {
        title,
        description,
        keywords:
            locale === "en"
                ? [
                      "about SponsMedia",
                      "web development team",
                      "digital agency",
                      "Bart Spons",
                      "web developer",
                      "digital strategy",
                      "creative team",
                  ]
                : [
                      "over SponsMedia",
                      "webontwikkeling team",
                      "digitaal bureau",
                      "Bart Spons",
                      "webontwikkelaar",
                      "digitale strategie",
                      "creatief team",
                  ],
        openGraph: {
            title,
            description,
            locale: locale === "en" ? "en_US" : "nl_NL",
        },
        alternates: {
            canonical: `/${locale}/about`,
            languages: {
                "en-US": "/en/about",
                "nl-NL": "/nl/about",
            },
        },
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-space">
            <div className="container py-24">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {locale === "en"
                            ? "Hey, I'm Bart 👋"
                            : "Hey, ik ben Bart 👋"}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {locale === "en"
                            ? "I craft websites and digital experiences that actually perform. Trying to break through the algorithm on social media and getting your ranking in Google better."
                            : "Ik creëer websites en digitale ervaringen die daadwerkelijk presteren. Ik probeer door de algoritmes op sociale media heen te breken en de ranking op Google te verbeteren."}
                    </p>
                </div>

                {/* Personal Story Section */}
                <div className="max-w-5xl mx-auto mb-20">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12">
                        <div className="grid lg:grid-cols-5 gap-12 items-center">
                            {/* Photo */}
                            <div className="lg:col-span-2 order-2 lg:order-1">
                                <div className="relative mx-auto max-w-sm">
                                    <div className="aspect-square rounded-3xl overflow-hidden border border-white/20">
                                        <img
                                            src="/placeholders/jp.png"
                                            alt="Bart Spons - Web Developer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Story */}
                            <div className="lg:col-span-3 order-1 lg:order-2">
                                <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                                    <p>
                                        <strong className="text-white">
                                            {locale === "en"
                                                ? "Here's what I noticed:"
                                                : "Dit is wat mij opviel:"}
                                        </strong>{" "}
                                        {locale === "en"
                                            ? "Too many websites and social media accounts just... exist. Beautiful designs that don't convert. Social profiles that don't engage. Websites that look impressive but don't drive business growth."
                                            : "Te veel websites en social media accounts bestaan gewoon... zonder doel. Mooie ontwerpen die niet converteren. Sociale profielen die niet betrekken. Websites die indrukwekkend lijken maar geen bedrijfsgroei stimuleren."}
                                    </p>
                                    <p>
                                        {locale === "en"
                                            ? "That's where I come in. I'm a developer who likes to make things actually work. I started coding as a teenager and spent years studying and working around the world to learn the differences in digital marketing across cultures."
                                            : "Daar kom ik in beeld. Ik ben een developer die graag dingen laat werken. Ik begon als tiener met programmeren en heb jaren gestudeerd en gewerkt over de hele wereld om de verschillen in digitale marketing tussen culturen te leren kennen. Nu focus ik op één ding:"}
                                    </p>
                                    <p>
                                        {locale === "en"
                                            ? "My main focus:"
                                            : "Nu focus ik op:"}
                                        <strong className="text-white">
                                            {locale === "en"
                                                ? " making your digital presence better."
                                                : " je digitale aanwezigheid beter maken."}
                                        </strong>
                                    </p>
                                    {/* linkedin icon and personal website link */}
                                    <p>
                                        {locale === "en"
                                            ? "Let's connect and see my work:"
                                            : "Let's connect en bekijk mijn werk:"}
                                    </p>
                                    <div className="flex justify-start space-x-6 mt-4">
                                        <a
                                            href="https://www.linkedin.com/in/bartspons/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            LinkedIn
                                        </a>
                                        <a
                                            href="https://bartspons.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Personal Website
                                        </a>
                                        <a
                                            href="https://github.com/Bart-Spons"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What I Do Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "What I Actually Do"
                                : "Wat Ik Daadwerkelijk Doe"}
                        </h2>
                        <p className="text-gray-300">
                            {locale === "en"
                                ? "Let me break it down without the marketing fluff."
                                : "Laat me het uitleggen zonder marketingpraat."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                            <div className="text-3xl mb-4">💻</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {locale === "en"
                                    ? "Web Development"
                                    : "Webontwikkeling"}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {locale === "en"
                                    ? "Fast, secure websites that convert visitors into customers. Built with modern frameworks and optimized for performance and search rankings."
                                    : "Snelle, veilige websites die bezoekers omzetten naar klanten. Gebouwd met de nieuwste technieken en geoptimaliseerd voor prestaties en zoekresultaten."}
                            </p>
                            <div className="text-sm text-gray-400">
                                Next.js • React • WordPress • Tailwind CSS
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {locale === "en"
                                    ? "Digital Strategy"
                                    : "Digitale Strategie"}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {locale === "en"
                                    ? "Data-driven strategies that turn your digital presence into a revenue engine. SEO that ranks and social media that gets more views."
                                    : "Data-gedreven strategieën die je digitale aanwezigheid omzetten in meer bezoekers. SEO die rankt en sociale media die meer weergaven krijgen."}
                            </p>
                            <div className="text-sm text-gray-400">
                                {locale === "en"
                                    ? "SEO • Social Media • Analytics • Content Strategy"
                                    : "SEO • Social Media • Analytics • Content Strategie"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* How I Work Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            {locale === "en"
                                ? "How We'll Work Together"
                                : "Hoe We Samen Gaan Werken"}
                        </h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <div className="flex items-start gap-4">
                                <div className="text-emerald-400 font-bold text-xl">
                                    1.
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">
                                        {locale === "en"
                                            ? "We Talk (For Real)"
                                            : "We Praten (Echt)"}
                                    </h3>
                                    <p>
                                        {locale === "en"
                                            ? "I'll actually listen to what you need, not what I think you need. We'll figure out your goals and what success looks like for you."
                                            : "Ik luister daadwerkelijk naar wat je nodig hebt, niet naar wat ik denk dat je nodig hebt. We gaan je doelen en hoe succes eruit ziet voor jou uitzoeken."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-emerald-400 font-bold text-xl">
                                    2.
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">
                                        {locale === "en"
                                            ? "I Build It Right"
                                            : "Ik Bouw Het Goed"}
                                    </h3>
                                    <p>
                                        {locale === "en"
                                            ? "Clean code, fast loading times, mobile-friendly, secure. I'll keep you updated along the way — no disappearing for weeks at a time."
                                            : "Schone code, snelle laadtijden, mobiel-vriendelijk, veilig. Ik houd je onderweg op de hoogte — ik probeer zo veel mogelijk bereikbaar te zijn."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-emerald-400 font-bold text-xl">
                                    3.
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">
                                        {locale === "en"
                                            ? "You Can Own Everything"
                                            : "Jij Kunt Alles Bezitten"}
                                    </h3>
                                    <p>
                                        {locale === "en"
                                            ? "Your website, your code, your data. I can teach you how to update things yourself, or stick around if you want me to handle it."
                                            : "Jouw website, jouw code, jouw data. Ik kan je leren hoe je zelf dingen kunt updaten, of blijf in de buurt als je wilt dat ik het afhandel."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Touch */}
                {/* <div className="max-w-3xl mx-auto mb-20 text-center">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                        <div className="text-4xl mb-4">🎯</div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            What Drives Me
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            There's something deeply satisfying about solving
                            complex problems with elegant code and watching
                            businesses transform their online presence. Every
                            project is a puzzle— finding the perfect
                            intersection between user experience, business
                            goals, and technical excellence. Plus, working with
                            ambitious entrepreneurs and learning different
                            industries beats the corporate grind any day.
                        </p>
                    </div>
                </div> */}

                {/* CTA Section */}
                {/* <div className="text-center max-w-3xl mx-auto">
                    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-900/10 p-8 lg:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Let's Build Something Together
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            Got a project in mind? Want to chat about your
                            digital strategy? Or just curious about whether we'd
                            be a good fit? Drop me a line. I promise to give you
                            a straight answer, even if that means I'm not the
                            right person for your project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`/${locale}/projects`}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors"
                            >
                                See My Work
                            </a>
                            <a
                                href={`/${locale}/services`}
                                className="px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-colors"
                            >
                                What I Offer
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
