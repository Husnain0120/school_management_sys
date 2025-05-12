import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const publicRoutes = [
    "/",
    "/pages/login",
    "/pages/contact",
    "/pages/forgot-password",
    "/pages/admission",
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  // 🚫 Block access to login page if already logged in
  if (pathname === "/pages/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 🔒 Handle protected routes
  const isDashboardPath = pathname.startsWith("/d/");

  if (isDashboardPath && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  if (isDashboardPath && token) {
    try {
      const tokenData = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      const { role } = tokenData;

      // Extract route section like "a", "t", or "s"
      const segments = pathname.split("/");
      const targetSection = segments[3]; // after /d/:id/

      // Role-based restrictions
      const blockedByRole = {
        admin: ["t", "s"],
        teacher: ["a", "s"],
        student: ["a", "t"],
      };

      if (blockedByRole[role]?.includes(targetSection)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(
        new URL("/pages/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/pages/login",
    "/pages/contact",
    "/pages/forgot-password",
    "/pages/admission",
    "/pages/success",
    "/d/:path*",
  ],
};
