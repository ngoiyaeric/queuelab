import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/submit-interest-form',
  '/rd(.*)',
  '/careers(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/lab(.*)',
  '/__clerk/(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // For public routes, let them through
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If user is not logged in and trying to access a protected route
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
  ],
};
