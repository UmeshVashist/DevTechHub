import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/auth/login(.*)",
  "/auth/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If the user is signed in and trying to access an auth page, redirect to dashboard
  // Only redirect if there is no redirect_url in the search params (which indicates satellite sync)
  if (userId && isPublicRoute(req)) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect_url");
    if (redirectUrl) {
      // Let Clerk handle the redirect/sync with the satellite domain
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|xls|pptx?|pdf|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
