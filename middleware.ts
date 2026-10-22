import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";

const PUBLIC_FILE = /\.[^/]+$/; // matcht alleen echte extensies

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const hasLocale = locales.some(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
    );

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


