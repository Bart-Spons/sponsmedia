// lib/data/services.ts
export interface Service {
    slug: string; // 👈 nieuw: stabiele URL-sleutel
    title: string;
    titleNl?: string;
    icon: string;
    altIcon: string;
    desc: string;
    descNl?: string;
    features: string[];
    featuresNl?: string[];
    technologies: string[];
    highlight: string;
    highlightNl?: string;
    color: "emerald" | "purple" | "blue";
    pattern: "geometric" | "waves" | "dots";
    stats: Record<string, string>;
    gradient: string;
}

export const servicesData: Service[] = [
    {
        slug: "web-development",
        title: "Web Development",
        titleNl: "Web Development",
        icon: "💻",
        altIcon: "⚡",
        desc: "Fast, modern websites built with the latest technologies for optimal performance and user experience",
        descNl: "Snelle, moderne websites gebouwd met de nieuwste technologieën voor optimale prestaties en gebruikerservaring",
        features: [
            "Website Development",
            "Responsive & Accessible Design (WCAG)",
            "Performance Optimization & SEO",
            "Hosting & Ongoing Maintenance",
        ],
        featuresNl: [
            "Website Development",
            "Responsive & Toegankelijk Design (WCAG)",
            "Prestatie Optimalisatie & SEO",
            "Hosting & Doorlopend Onderhoud",
        ],
        technologies: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "JavaScript",
            "WordPress",
        ],
        highlight: "From concept to launch in weeks, not months",
        highlightNl: "Van concept tot lancering in weken, niet maanden",
        color: "emerald",
        pattern: "geometric",
        stats: { quality: "Premium", speed: "Fast", support: "Daily" },
        gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    },
    {
        slug: "digital-design",
        title: "Digital Design",
        titleNl: "Digital Design",
        icon: "🎨",
        altIcon: "✨",
        desc: "Beautiful, user-centered design that converts visitors into customers through strategic visual storytelling",
        descNl: "Prachtige, gebruikersgerichte designs die bezoekers omzetten naar klanten door strategische visuele verhalen",
        features: [
            "UI/UX Design & User Research",
            "Logo Design & Brand Identity",
            "Wireframing & Interactive Prototyping",
            "Print & Digital Asset Creation",
        ],
        featuresNl: [
            "UI/UX Design & Gebruikersonderzoek",
            "Logo Design & Merkidentiteit",
            "Wireframing & Interactieve Prototyping",
            "Print & Digitale Asset Creatie",
        ],
        technologies: ["Figma", "Adobe Creative Cloud", "Adobe XD"],
        highlight: "Designs that tell your story and drive action",
        highlightNl: "Designs die je verhaal vertellen en actie stimuleren",
        color: "purple",
        pattern: "waves",
        stats: {
            approach: "User-First",
            style: "Modern",
            process: "Iterative",
        },
        gradient: "from-purple-500/20 via-violet-500/10 to-pink-500/20",
    },
    {
        slug: "social-media",
        title: "Social Media",
        titleNl: "Social Media",
        icon: "📱",
        altIcon: "🚀",
        desc: "Social-first content strategy that builds authentic connections and drives measurable engagement",
        descNl: "Social-first content strategie die authentieke verbindingen opbouwt en meetbare betrokkenheid stimuleert",
        features: [
            "Social Media Management & Strategy", // 👈 kleine typo gefixed
            "Content Strategy & Editorial Planning",
            "Platform Optimization (Instagram, TikTok, LinkedIn)",
            "Creative Campaigns & Video Content",
            "Community Management & Engagement",
            "Analytics & Performance Reporting",
        ],
        featuresNl: [
            "Social Media Management & Strategie",
            "Content Strategie & Redactionele Planning",
            "Platform Optimalisatie (Instagram, TikTok, LinkedIn)",
            "Creatieve Campagnes & Video Content",
            "Community Management & Betrokkenheid",
            "Analytics & Prestatie Rapportage",
        ],
        technologies: ["Figma", "TikTok", "After Effects", "Adobe Premiere"],
        highlight: "Platform-native content that actually engages",
        highlightNl: "Platform-native content die daadwerkelijk betrekt",
        color: "blue",
        pattern: "dots",
        stats: { focus: "Trending", content: "Creative", growth: "Fast" },
        gradient: "from-blue-500/20 via-cyan-500/10 to-indigo-500/20",
    },
];
