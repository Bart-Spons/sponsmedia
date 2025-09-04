// app/sitemap.ts
import type { MetadataRoute } from "next";
import { blogData } from "../lib/data/blog";
import { projectsData } from "../lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://sponsmedia.com";
    const locales = ["en", "nl"] as const;
    const nowIso = new Date().toISOString();

    // Root (x-default) – handig bij i18n
    const entries: MetadataRoute.Sitemap = [
        {
            url: `${base}/`,
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 1,
            alternates: {
                languages: {
                    "x-default": `${base}/`,
                    en: `${base}/en`,
                    nl: `${base}/nl`,
                },
            },
        },
    ];

    // Statische pagina’s per taal (inclusief /services lijstpagina)
    const staticPages = [
        "",
        "/about",
        "/services",
        "/projects",
        "/blog",
        "/contact",
        "/terms",
        "/privacy-policy",
        "/cookies",
    ];

    for (const locale of locales) {
        for (const page of staticPages) {
            entries.push({
                url: `${base}/${locale}${page}`,
                lastModified: nowIso,
                changeFrequency: page === "" ? "weekly" : "monthly",
                priority: page === "" ? 1 : 0.8,
                alternates: {
                    languages: {
                        en: `${base}/en${page}`,
                        nl: `${base}/nl${page}`,
                    },
                },
            });
        }
    }

    // Blogposts per taal
    for (const locale of locales) {
        for (const post of blogData) {
            const lastMod = new Date(post.publishDate).toISOString();
            entries.push({
                url: `${base}/${locale}/blog/${post.id}`,
                lastModified: lastMod,
                changeFrequency: "monthly",
                priority: 0.6,
                alternates: {
                    languages: {
                        en: `${base}/en/blog/${post.id}`,
                        nl: `${base}/nl/blog/${post.id}`,
                    },
                },
            });
        }
    }

    // Projectdetailpagina’s per taal (laat staan als je die routes hebt)
    for (const locale of locales) {
        for (const project of projectsData) {
            entries.push({
                url: `${base}/${locale}/projects/${project.id}`,
                lastModified: nowIso,
                changeFrequency: "monthly",
                priority: 0.7,
                alternates: {
                    languages: {
                        en: `${base}/en/projects/${project.id}`,
                        nl: `${base}/nl/projects/${project.id}`,
                    },
                },
            });
        }
    }

    return entries;
}
