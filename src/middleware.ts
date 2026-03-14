import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication bypass: Allow access to /dashboard without a session cookie
  return NextResponse.next();
}

// Config to specify the routes where the middleware should run.
export const config = {
  matcher: ['/dashboard/:path*'],
};
