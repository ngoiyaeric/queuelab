import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Session check bypassed for UI testing
  // const session = request.cookies.get('session');
  // if (!session) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}

// Config to specify the routes where the middleware should run.
export const config = {
  matcher: ['/dashboard/:path*'],
};