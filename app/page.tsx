"use client";

import { useEffect } from "react";

export default function HomePage() {
    useEffect(() => {
        window.location.replace("/en");
    }, []);

    return (
        <html lang="en">
            <body className="bg-night text-frost antialiased" />
        </html>
    );
}
