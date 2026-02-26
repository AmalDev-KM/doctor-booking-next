import { NextRequest, NextResponse } from "next/server";

// Define your public routes array (add more as needed)
const publicRoutes = ["/login", "/about", "/contact"]; // Include /login and future routes

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasAccessToken = request.cookies.has("access_token");

  // 1. Check if current path is in public routes → allow it
  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    )
  ) {
    // Special case: if /login and has token → redirect to /dashboard
    if (pathname === "/login" && hasAccessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 2. Not public route → check token
  if (hasAccessToken && pathname === "/login") {
    // Has token → redirect to /dashboard (protect all non-public)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    // No token → redirect to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"], // Match all except static files
};
