import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getMaintenanceState } from "@/lib/maintenance";

const isPublicRoute = createRouteMatcher([
  "/",
  "/features(.*)",
  "/privacy(.*)",
  "/privacy-policy(.*)",
  "/terms(.*)",
  "/terms-and-conditions(.*)",
  "/about(.*)",
  "/auth/login(.*)",
  "/auth/sign-up(.*)",
  "/maintenance(.*)",
  "/admin12(.*)",
  "/api/maintenance(.*)",
]);

const isAuthRoute = createRouteMatcher([
  "/auth/login(.*)",
  "/auth/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // 1. Always allow admin portal, maintenance screen, maintenance API, and Next.js internals
  if (
    pathname.startsWith("/admin12") ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/api/maintenance")
  ) {
    return NextResponse.next();
  }

  // 2. Check maintenance mode
  try {
    const maintenanceState = await getMaintenanceState();
    if (maintenanceState.isMaintenance) {
      // Redirect all visitors to the 3D maintenance screen
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.redirect(url);
    }
  } catch (err) {
    // Fail-safe: continue if check errors
  }

  // 3. Normal Clerk Authentication routing
  const { userId } = await auth();

  // If the user is signed in and trying to access an auth page (login/signup) without redirect_url, send to dashboard
  if (userId && isAuthRoute(req)) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect_url");
    if (!redirectUrl) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|xls|pptx?|pdf|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
