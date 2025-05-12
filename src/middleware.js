import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/pages/login",
    "/pages/contact",
    "/pages/forgot-password",
    "/pages/admission",
  ];

  // Protected routes and their required roles
  const protectedRoutes = {
    "/pages/success": ["admin", "teacher", "student"], // All roles allowed
    "/dashboard/[id]/admin": ["admin"],
    "/dashboard/[id]/teacher": ["teacher"],
    "/dashboard/[id]/student": ["student"],
  };

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if current route is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) => {
    if (route.includes("[id]")) {
      // Handle dynamic routes
      const basePath = route.split("/[id]")[0];
      return pathname.startsWith(basePath);
    }
    return pathname === route;
  });

  // Allow public routes
  if (isPublicRoute) {
    // If user has token and tries to access public route, redirect to dashboard
    if (token) {
      try {
        const tokenData = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        );
        const { role } = JSON.parse(tokenData);

        // Redirect to appropriate dashboard based on role
        return NextResponse.redirect(
          new URL(`/dashboard/1/${role}`, request.url)
        );
      } catch {
        // If token is invalid, clear it and allow access
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    }
    return NextResponse.next();
  }

  // Block access to protected routes without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  // Verify token for protected routes
  if (isProtectedRoute && token) {
    try {
      // Decode token without verification (not recommended for production)
      const tokenData = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      const { role } = tokenData;

      // Find the required role for the current path
      let requiredRole = [];
      for (const [route, roles] of Object.entries(protectedRoutes)) {
        if (route.includes("[id]")) {
          const basePath = route.split("/[id]")[0];
          if (pathname.startsWith(basePath)) {
            requiredRole = roles;
            break;
          }
        } else if (pathname === route) {
          requiredRole = roles;
          break;
        }
      }

      // Check if user has the required role
      if (!requiredRole.includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Allow access if role matches
      return NextResponse.next();
    } catch {
      // If token is invalid, clear it and redirect to login
      const response = NextResponse.redirect(
        new URL("/pages/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  // Allow all other routes
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
    "/dashboard/:path*",
  ],
};
