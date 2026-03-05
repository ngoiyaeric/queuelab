import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // If the user is trying to access the dashboard without a valid session,
  // redirect them to the home page (or a dedicated login page).
  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Config to specify the routes where the middleware should run.
export const config = {
  matcher: ['/dashboard/:path*'],
};
