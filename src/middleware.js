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

  // 🚫 Redirect logged-in users trying to access "/" (homepage)
  if (pathname === "/" && token) {
    // Assuming you want to send them to their dashboard or role-based home
    try {
      const tokenData = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      const { role, id } = tokenData; // make sure `id` is stored in the JWT
      const redirectUrl = `/d/${id}/${role[0]}/home`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } catch {
      const response = NextResponse.redirect(
        new URL("/pages/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  // 🚫 Block access to login page if already logged in
  if (pathname === "/pages/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ✅ Protected route: /pages/noticesboard
  if (pathname === "/pages/noticesboard" && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  // 🔒 Handle protected dashboard routes
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

      const segments = pathname.split("/");
      const userId = segments[2]; // e.g., /d/123/a/home
      const targetSection = segments[3]; // 'a', 't', 's'

      const blockedByRole = {
        admin: ["t", "s"],
        teacher: ["a", "s"],
        student: ["a", "t"],
      };

      if (blockedByRole[role]?.includes(targetSection)) {
        const redirectUrl = `/d/${userId}/${role[0]}/home`;
        return NextResponse.redirect(new URL(redirectUrl, request.url));
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
    "/pages/noticesboard",
    "/d/:path*",
  ],
};
