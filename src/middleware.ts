import { clerkMiddleware, createRouteMatcher, clerkClient as getClerkClient } from "@clerk/nextjs/server";
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
  const url = req.nextUrl;

  // Intercept requests matching /api/py/* before they are proxied
  if (url.pathname.startsWith('/api/py/')) {
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required for API access" },
        { status: 401 }
      );
    }

    try {
      const client = await getClerkClient();
      const user = await client.users.getUser(userId);
      const email = user.primaryEmailAddress?.emailAddress ?? "";

      const headers = new Headers(req.headers);
      headers.set("X-User-Id", userId);
      headers.set("X-User-Email", email);

      return NextResponse.next({
        request: {
          headers,
        },
      });
    } catch (error) {
      console.error("Clerk service error in middleware:", error);
      return NextResponse.json(
        { error: "Service Unavailable", message: "Failed to fetch user context from Clerk" },
        { status: 503 }
      );
    }
  }

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
