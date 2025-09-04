// app/layout.tsx
import "./globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-space text-white antialiased">{children}</body>
        </html>
    );
}
