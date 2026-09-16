import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["fa", "en", "ar"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/dishes") ||
    pathname.startsWith("/fonts") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  const first = pathname.split("/")[1];
  if (!LOCALES.includes(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/fa${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
