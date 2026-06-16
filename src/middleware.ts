import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "./lib/session";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isAdminPage(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAdminApi(pathname: string) {
  return pathname === "/api/admin" || pathname.startsWith("/api/admin/");
}

function isAdminAuthPage(pathname: string) {
  return pathname === "/admin/login" || pathname === "/admin/register";
}

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isAdminPage(pathname) || isAdminApi(pathname)) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    const isAdmin = session?.role === "admin";

    if (isAdminPage(pathname)) {
      if (isAdminAuthPage(pathname)) {
        return isAdmin
          ? NextResponse.redirect(new URL("/admin", request.url))
          : NextResponse.next();
      }

      if (!isAdmin) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("next", `${pathname}${search}`);

        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.next();
    }

    if (!isAdmin) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(es|en|cat)/:path*", "/admin/:path*", "/api/admin/:path*"], // At this line, define into the matcher all the availables language you have defined into routing.ts
};
