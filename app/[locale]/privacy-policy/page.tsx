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
            ? "Privacy Policy - SponsMedia"
            : "Privacybeleid - SponsMedia";
    const description =
        locale === "en"
            ? "Learn how SponsMedia collects, uses, and protects your personal information."
            : "Leer hoe SponsMedia uw persoonlijke gegevens verzamelt, gebruikt en beschermt.";

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/privacy-policy`,
            languages: {
                "en-US": "/en/privacy-policy",
                "nl-NL": "/nl/privacy-policy",
            },
        },
    };
}

export default async function PrivacyPolicyPage({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-space">
            <div className="container py-24 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                    {locale === "en" ? "Privacy Policy" : "Privacybeleid"}
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
                                ? "1. Information We Collect"
                                : "1. Informatie Die We Verzamelen"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any message you send us."
                                : "We verzamelen informatie die u direct aan ons verstrekt, zoals wanneer u een contactformulier invult, zich abonneert op onze nieuwsbrief, of met ons communiceert. Dit kan uw naam, e-mailadres, telefoonnummer en elk bericht dat u ons stuurt omvatten."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "2. How We Use Your Information"
                                : "2. Hoe We Uw Informatie Gebruiken"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {locale === "en"
                                ? "We use the information we collect to:"
                                : "We gebruiken de informatie die we verzamelen om:"}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                {locale === "en"
                                    ? "Respond to your inquiries and provide customer support"
                                    : "Op uw vragen te reageren en klantenservice te bieden"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Send you updates about our services (with your consent)"
                                    : "U updates over onze diensten te sturen (met uw toestemming)"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Improve our website and services"
                                    : "Onze website en diensten te verbeteren"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Comply with legal obligations"
                                    : "Te voldoen aan wettelijke verplichtingen"}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "3. Information Sharing"
                                : "3. Delen van Informatie"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website and conducting our business."
                                : "We verkopen, verhandelen of dragen uw persoonlijke informatie niet over aan derden zonder uw toestemming, behalve zoals beschreven in dit beleid. We kunnen uw informatie delen met vertrouwde serviceproviders die ons helpen bij het beheren van onze website en het uitvoeren van ons bedrijf."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "4. Cookies and Tracking"
                                : "4. Cookies en Tracking"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "We use cookies and similar tracking technologies to improve your browsing experience. You can control cookies through your browser settings. For more detailed information, please see our Cookie Policy."
                                : "We gebruiken cookies en vergelijkbare tracking-technologieën om uw browse-ervaring te verbeteren. U kunt cookies beheren via uw browserinstellingen. Voor meer gedetailleerde informatie, zie ons Cookiebeleid."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "5. Your Rights"
                                : "5. Uw Rechten"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {locale === "en"
                                ? "You have the right to:"
                                : "U heeft het recht om:"}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                {locale === "en"
                                    ? "Access your personal data"
                                    : "Toegang te krijgen tot uw persoonlijke gegevens"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Correct inaccurate data"
                                    : "Onjuiste gegevens te corrigeren"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Request deletion of your data"
                                    : "Verwijdering van uw gegevens aan te vragen"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Object to processing of your data"
                                    : "Bezwaar te maken tegen de verwerking van uw gegevens"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Withdraw consent at any time"
                                    : "Toestemming op elk moment in te trekken"}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "6. Contact Us"
                                : "6. Contact Opnemen"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "If you have any questions about this Privacy Policy or your personal data, please contact us at:"
                                : "Als u vragen heeft over dit Privacybeleid of uw persoonlijke gegevens, neem dan contact met ons op via:"}
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
