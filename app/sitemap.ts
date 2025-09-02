import { MetadataRoute } from "next";
import { blogData } from "../lib/data/blog";
import { projectsData } from "../lib/data/projects";
import { servicesData } from "../lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://sponsmedia.com";
    const locales = ["en", "nl"];

    // Static pages
    const staticPages = ["", "/blog", "/projects", "/services"];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add static pages for each locale
    for (const locale of locales) {
        for (const page of staticPages) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === "" ? "weekly" : "monthly",
                priority: page === "" ? 1 : 0.8,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${page}`,
                        nl: `${baseUrl}/nl${page}`,
                    },
                },
            });
        }
    }

    // Add blog posts for each locale
    for (const locale of locales) {
        for (const post of blogData) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/blog/${post.id}`,
                lastModified: new Date(post.publishDate),
                changeFrequency: "monthly",
                priority: 0.6,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/blog/${post.id}`,
                        nl: `${baseUrl}/nl/blog/${post.id}`,
                    },
                },
            });
        }
    }

    // Add project pages for each locale
    for (const locale of locales) {
        for (const project of projectsData) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/projects/${project.id}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.7,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/projects/${project.id}`,
                        nl: `${baseUrl}/nl/projects/${project.id}`,
                    },
                },
            });
        }
    }

    return sitemapEntries;
}
