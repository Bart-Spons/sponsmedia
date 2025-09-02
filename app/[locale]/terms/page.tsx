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
            ? "Terms of Service - SponsMedia"
            : "Algemene Voorwaarden - SponsMedia";
    const description =
        locale === "en"
            ? "Terms and conditions for using SponsMedia's services and website."
            : "Algemene voorwaarden voor het gebruik van SponsMedia's diensten en website.";

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/terms`,
            languages: {
                "en-US": "/en/terms",
                "nl-NL": "/nl/terms",
            },
        },
    };
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: "en" | "nl" }>;
}) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-space">
            <div className="container py-24 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                    {locale === "en"
                        ? "Terms of Service"
                        : "Algemene Voorwaarden"}
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
                                ? "1. Acceptance of Terms"
                                : "1. Acceptatie van Voorwaarden"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "By accessing and using SponsMedia's website and services, you accept and agree to be bound by the terms and provision of this agreement."
                                : "Door toegang te krijgen tot en gebruik te maken van SponsMedia's website en diensten, accepteert en gaat u akkoord om gebonden te zijn aan de voorwaarden en bepalingen van deze overeenkomst."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en" ? "2. Services" : "2. Diensten"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {locale === "en"
                                ? "SponsMedia provides web development, digital marketing, and related services. Our services include:"
                                : "SponsMedia biedt webontwikkeling, digitale marketing en gerelateerde diensten. Onze diensten omvatten:"}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                {locale === "en"
                                    ? "Website design and development"
                                    : "Website design en ontwikkeling"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "SEO optimization"
                                    : "SEO optimalisatie"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Social media strategy"
                                    : "Social media strategie"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Digital consulting"
                                    : "Digitale consultancy"}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "3. Client Responsibilities"
                                : "3. Verantwoordelijkheden van de Klant"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {locale === "en"
                                ? "As a client, you agree to:"
                                : "Als klant gaat u ermee akkoord om:"}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                {locale === "en"
                                    ? "Provide accurate and complete information"
                                    : "Nauwkeurige en volledige informatie te verstrekken"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Respond promptly to requests for feedback or approval"
                                    : "Snel te reageren op verzoeken om feedback of goedkeuring"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Make timely payments as agreed"
                                    : "Tijdige betalingen te doen zoals overeengekomen"}
                            </li>
                            <li>
                                {locale === "en"
                                    ? "Respect intellectual property rights"
                                    : "Intellectuele eigendomsrechten te respecteren"}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "4. Intellectual Property"
                                : "4. Intellectueel Eigendom"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "Upon full payment, clients receive ownership of the final deliverables. However, SponsMedia retains the right to use project work for portfolio and promotional purposes. Any pre-existing intellectual property remains with SponsMedia."
                                : "Na volledige betaling krijgen klanten eigendom van de eindproducten. SponsMedia behoudt echter het recht om projectwerk te gebruiken voor portfolio- en promotiedoeleinden. Bestaand intellectueel eigendom blijft bij SponsMedia."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "5. Limitation of Liability"
                                : "5. Beperking van Aansprakelijkheid"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "SponsMedia's liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages. While we strive for excellence, we cannot guarantee specific results from SEO or marketing efforts."
                                : "SponsMedia's aansprakelijkheid is beperkt tot het bedrag dat voor diensten is betaald. We zijn niet aansprakelijk voor indirecte, incidentele of gevolgschade. Hoewel we streven naar uitmuntendheid, kunnen we geen specifieke resultaten van SEO of marketinginspanningen garanderen."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "6. Termination"
                                : "6. Beëindiging"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "Either party may terminate services with written notice. Upon termination, payment is due for work completed. Clients may request project files upon full payment of outstanding invoices."
                                : "Beide partijen kunnen de diensten beëindigen met schriftelijke kennisgeving. Bij beëindiging is betaling verschuldigd voor voltooid werk. Klanten kunnen projectbestanden aanvragen na volledige betaling van uitstaande facturen."}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {locale === "en"
                                ? "7. Contact Information"
                                : "7. Contactinformatie"}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {locale === "en"
                                ? "For questions about these terms, please contact us at:"
                                : "Voor vragen over deze voorwaarden kunt u contact met ons opnemen via:"}
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
