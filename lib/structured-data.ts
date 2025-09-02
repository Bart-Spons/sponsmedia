// lib/structured-data.ts

export function getOrganizationStructuredData() {
    return {
        "@type": "Organization",
        "@context": "https://schema.org",
        name: "SponsMedia",
        description:
            "Professional web development, digital design, and social media services that make brands more visible online.",
        url: "https://sponsmedia.com",
        logo: "https://sponsmedia.com/logo.png",
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+31-6-0000-0000",
            contactType: "customer service",
            email: "hello@sponsmedia.com",
            availableLanguage: ["English", "Dutch"],
        },
        address: {
            "@type": "PostalAddress",
            addressCountry: "NL",
        },
        sameAs: [
            "https://linkedin.com/company/sponsmedia",
            "https://kraftr.io",
        ],
    };
}

export function getWebsiteStructuredData() {
    return {
        "@type": "WebSite",
        "@context": "https://schema.org",
        name: "SponsMedia",
        description:
            "Be more visible online with professional web development and digital marketing services.",
        url: "https://sponsmedia.com",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://sponsmedia.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };
}

export function getBlogPostingStructuredData(post: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishDate: string;
    category: string;
    tags: string[];
    id: string;
}) {
    return {
        "@type": "BlogPosting",
        "@context": "https://schema.org",
        headline: post.title,
        description: post.excerpt,
        articleBody: post.content,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "SponsMedia",
            logo: {
                "@type": "ImageObject",
                url: "https://sponsmedia.com/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://sponsmedia.com/blog/${post.id}`,
        },
        keywords: post.tags,
        articleSection: post.category,
    };
}

export function getServiceStructuredData(service: {
    title: string;
    desc: string;
    features: string[];
}) {
    return {
        "@type": "Service",
        "@context": "https://schema.org",
        name: service.title,
        description: service.desc,
        serviceType: service.title,
        provider: {
            "@type": "Organization",
            name: "SponsMedia",
        },
        areaServed: {
            "@type": "Country",
            name: "Netherlands",
        },
    };
}
