import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx,md,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#000000",
                foreground: "#ffffff",
                muted: "#141414",
                "muted-foreground": "#b3b3b3",
                primary: { DEFAULT: "#e2b76f", foreground: "#000000" }, // gold
                accent: { DEFAULT: "#ffc861", foreground: "#000000" }, // lighter hover gold
            },
            borderRadius: { "2xl": "1rem" },

            // Tailwind Typography – donker thema afgestemd op je palette
            typography: ({ theme }: { theme: (key: string) => any }) => ({
                DEFAULT: {
                    css: {
                        // color tokens
                        "--tw-prose-body": theme("colors.gray.200"),
                        "--tw-prose-headings": theme("colors.white"),
                        "--tw-prose-links": theme("colors.primary.DEFAULT"),
                        "--tw-prose-bold": theme("colors.white"),
                        "--tw-prose-quotes": theme("colors.gray.100"),
                        "--tw-prose-code": theme("colors.blue.300"),
                        "--tw-prose-th-borders": "rgba(255,255,255,0.08)",
                        "--tw-prose-td-borders": "rgba(255,255,255,0.08)",

                        a: { textDecoration: "none" },
                        "a:hover": { color: theme("colors.accent.DEFAULT") },

                        h2: { scrollMarginTop: "100px" },
                        h3: { scrollMarginTop: "100px" },

                        // lead paragraph (gebruik <p class="lead"> in je content)
                        "p.lead": {
                            fontSize: theme("fontSize.xl")[0],
                            lineHeight: "1.8",
                            color: theme("colors.gray.200"),
                            marginBottom: theme("spacing.6"),
                        },

                        // code & pre
                        code: {
                            backgroundColor: "rgba(17,24,39,0.6)",
                            padding: "0.125rem 0.4rem",
                            borderRadius: "0.375rem",
                            fontWeight: "500",
                        },
                        "code::before": { content: "none" },
                        "code::after": { content: "none" },
                        pre: {
                            backgroundColor: "rgba(2,6,23,0.6)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "0.75rem",
                        },

                        // blockquote
                        blockquote: {
                            borderLeftColor: theme("colors.primary.DEFAULT"),
                            backgroundColor: "rgba(226,183,111,0.06)",
                            padding: "1rem",
                            borderRadius: "0.75rem",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)",
                        },

                        // images – groot op mobiel, compacter op desktop
                        img: {
                            display: "block",
                            borderRadius: theme("borderRadius.xl"),
                            boxShadow:
                                "0 20px 60px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.06) inset",
                            marginTop: theme("spacing.5"),
                            marginBottom: theme("spacing.5"),
                            marginLeft: "auto",
                            marginRight: "auto",
                            height: "auto",
                            maxWidth: "90%", // mobile
                        },

                        // figures & captions
                        figure: {
                            marginTop: theme("spacing.6"),
                            marginBottom: theme("spacing.6"),
                            textAlign: "center",
                        },
                        figcaption: {
                            marginTop: theme("spacing.3"),
                            fontSize: theme("fontSize.sm")[0],
                            color: theme("colors.gray.400"),
                        },

                        // lists
                        "ul, ol": {
                            marginTop: theme("spacing.4"),
                            marginBottom: theme("spacing.6"),
                        },
                        "ul > li, ol > li": {
                            marginTop: theme("spacing.2"),
                            marginBottom: theme("spacing.2"),
                        },
                        "ul > li::marker": {
                            color: theme("colors.primary.DEFAULT"),
                        },
                        "ol > li::marker": {
                            color: theme("colors.primary.DEFAULT"),
                        },

                        table: { overflow: "hidden", borderRadius: "0.75rem" },

                        // responsive tuning binnen typography
                        "@screen md": {
                            img: { maxWidth: "72%" },
                        },
                        "@screen lg": {
                            img: {
                                maxWidth: "58%",
                                border: `1px solid ${theme("colors.white")}20`,
                                boxShadow: "0 20px 60px rgba(0,0,0,.45)",
                            },
                        },
                    },
                },

                // expliciete dark variant (werkt met class "prose-invert")
                invert: {
                    css: {
                        "--tw-prose-body": theme("colors.gray.300"),
                        "--tw-prose-headings": theme("colors.white"),
                        "--tw-prose-links": theme("colors.primary.DEFAULT"),
                        "--tw-prose-bold": theme("colors.white"),
                        "--tw-prose-quotes": theme("colors.gray.100"),
                        "--tw-prose-code": theme("colors.blue.300"),
                        "--tw-prose-th-borders": "rgba(255,255,255,0.08)",
                        "--tw-prose-td-borders": "rgba(255,255,255,0.08)",
                        "a:hover": { color: theme("colors.accent.DEFAULT") },
                    },
                },
            }),
        },
    },
    plugins: [
    typography,
    function ({ addBase, theme }: { addBase: (base: any) => void; theme: (key: string) => any }) {
        addBase({
            "::selection": {
                background: theme("colors.primary.DEFAULT"),
                color: theme("colors.primary.foreground"),
            },
            hr: { borderColor: "rgba(255,255,255,0.1)" },
        });
    },
],
} satisfies Config;
