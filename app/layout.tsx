// app/layout.tsx
// <html> en <body> staan in app/[locale]/layout.tsx zodat lang per taal klopt.
// Pagina's buiten [locale] (app/page.tsx, app/not-found.tsx) renderen ze zelf.
import "./globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = { themeColor: "#0c1424" };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
