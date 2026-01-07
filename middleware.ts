
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🛡️ SHADOW GATEKEEPER 🛡️
  // Intercepts any attempt to access /admin
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token');

    // If no token exists, ghost them. 
    // Redirect to Home (/) effectively making /admin appear non-existent.
    if (!adminToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
