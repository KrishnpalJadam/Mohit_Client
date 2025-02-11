// ** Next, React And Locals Imports
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// ** Third Party Imports
import { jwtVerify } from "jose";

// Supported locales and the default locale
const locales = ["en", "jp", "de", "ar"];
const defaultLocale = "en";

// Get the preferred locale
function getLocale(req) {
  // Get locale from cookie
  if (req.cookies.has("myLanguage"))
    return req.cookies.get("myLanguage")?.value;

  // Get accept language from HTTP headers
  const acceptLang = req.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;

  // Get match locale
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

// JWT Authentication Middleware
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname already has a locale, continue to the next step
  if (!pathnameHasLocale) {
    const locale = getLocale(req);

    req.nextUrl.pathname = `/${locale}${pathname}`;
    const response = NextResponse.redirect(req.nextUrl);

    response.cookies.set("myLanguage", locale);

    return response;
  }

  // Protected routes
  const protectedRoutes = ["profile"];

  if (
    protectedRoutes.some((route) => pathname.split("/")[2]?.startsWith(route))
  ) {
    // Jwt Token
    const jwt = req.cookies.get("access_token")?.value;

    req.nextUrl.pathname = "/login";

    // If no token present, redirect to login page
    if (!jwt) {
      return NextResponse.redirect(req.nextUrl);
    }

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    try {
      const { payload } = await jwtVerify(jwt, secret);

      if (payload.role === "customer") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(req.nextUrl);
      }
    } catch (error) {
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}

// Configure the matcher for the middleware
export const config = {
  matcher: [
    // Skip all internal paths (_next and more)
    "/((?!_next|api|favicon.png|assets|static|robots.txt|apple-icon.png|opengraph-image.png|twitter-image.png).*)",
  ],
};
