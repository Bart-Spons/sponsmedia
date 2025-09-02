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
            ? "Cookie Policy - SponsMedia"
            : "Cookiebeleid - SponsMedia";
    const description =
        locale === "en"
            ? "Learn about how SponsMedia uses cookies and tracking technologies."
            : "Leer hoe SponsMedia cookies en tracking-technologieën gebruikt.";

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/cookies`,
            languages: {
                "en-US": "/en/cookies",
                "nl-NL": "/nl/cookies",
            },
        },
    };
}

export default async function CookiePolicyPage({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-space">
            <div className="container py-24 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                    {locale === "en" ? "Cookie Policy" : "Cookiebeleid"}
                </h1>

                <div className="prose prose-lg prose-invert max-w-none space-y-8">
                    <p className="text-gray-300 text-lg">
                        {locale === "en"
                            ? "Last updated: August 20, 2025"
                            : "Laatst bijgewerkt: 20 augustus 2025"}
                    </p>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "What Are Cookies?"
                                : "Wat Zijn Cookies?"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help us make your experience better by remembering your preferences and understanding how you use our site."
                                : "Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden opgeslagen wanneer u een website bezoekt. Ze helpen ons uw ervaring te verbeteren door uw voorkeuren te onthouden en te begrijpen hoe u onze site gebruikt."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "Types of Cookies We Use"
                                : "Soorten Cookies Die We Gebruiken"}
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {locale === "en"
                                        ? "Essential Cookies"
                                        : "Essentiële Cookies"}
                                </h3>
                                <p className="text-gray-300">
                                    {locale === "en"
                                        ? "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website."
                                        : "Deze cookies zijn noodzakelijk voor het goed functioneren van de website. Ze maken basisfuncties mogelijk zoals paginanavigatie en toegang tot beveiligde delen van de website."}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {locale === "en"
                                        ? "Analytics Cookies"
                                        : "Analytics Cookies"}
                                </h3>
                                <p className="text-gray-300">
                                    {locale === "en"
                                        ? "We use Google Analytics to understand how visitors interact with our website. This helps us improve our content and user experience. These cookies collect anonymous information about your visit."
                                        : "We gebruiken Google Analytics om te begrijpen hoe bezoekers omgaan met onze website. Dit helpt ons onze content en gebruikerservaring te verbeteren. Deze cookies verzamelen anonieme informatie over uw bezoek."}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {locale === "en"
                                        ? "Preference Cookies"
                                        : "Voorkeur Cookies"}
                                </h3>
                                <p className="text-gray-300">
                                    {locale === "en"
                                        ? "These cookies remember your preferences, such as language selection, so you don't have to set them again on future visits."
                                        : "Deze cookies onthouden uw voorkeuren, zoals taalkeuze, zodat u ze niet opnieuw hoeft in te stellen bij toekomstige bezoeken."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "Third-Party Services"
                                : "Diensten van Derden"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {locale === "en"
                                ? "We use the following third-party services that may set cookies:"
                                : "We gebruiken de volgende diensten van derden die cookies kunnen plaatsen:"}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <strong>Google Analytics:</strong>{" "}
                                {locale === "en"
                                    ? "Website analytics"
                                    : "Website analyses"}
                            </li>
                            <li>
                                <strong>Hotjar:</strong>{" "}
                                {locale === "en"
                                    ? "User behavior analysis (mentioned in blog posts)"
                                    : "Analyse van gebruikersgedrag (genoemd in blogposts)"}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "Managing Cookies"
                                : "Cookies Beheren"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {locale === "en"
                                ? "You can control and manage cookies in several ways:"
                                : "U kunt cookies op verschillende manieren beheren en controleren:"}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                {locale === "en"
                                    ? "Browser settings: Most browsers allow you to refuse cookies or delete existing ones"
                                    : "Browserinstellingen: De meeste browsers stellen u in staat cookies te weigeren of bestaande te verwijderen"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Opt-out links: Use Google Analytics opt-out browser add-on"
                                    : "Opt-out links: Gebruik Google Analytics opt-out browser add-on"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Privacy settings: Adjust your privacy preferences in your browser"
                                    : "Privacy-instellingen: Pas uw privacy-voorkeuren aan in uw browser"}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en" ? "Contact Us" : "Contact Opnemen"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "If you have any questions about our use of cookies, please contact us at:"
                                : "Als u vragen heeft over ons gebruik van cookies, neem dan contact met ons op via:"}
                        </p>
                        <p className="text-white mt-2">
                            <a
                                href="mailto:contact@sponsmedia.com"
                                className="hover:text-blue-400 transition-colors"
                            >
                                contact@sponsmedia.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
