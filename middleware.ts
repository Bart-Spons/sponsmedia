// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";

const PUBLIC_FILE = /\.(?:.*)$/; // sla files over: /favicon.ico, /image.png, etc.

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Sla Next internals, API en statische files over
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return;
    }

    // Zit er al een locale in de URL?
    const hasLocale = locales.some(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    );

    // Geen locale? Rewriter naar /en, maar laat de URL hetzelfde
    if (!hasLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|.*\\..*).*)"],
};
