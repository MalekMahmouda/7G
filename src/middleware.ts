import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/auth/verify-email'
  ];

  // Auth routes that should redirect authenticated users
  const authRoutes = ['/login', '/register'];

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile'];

  // Check if the path is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes(':')) {
      return pathname.startsWith(route.split(':')[0]);
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  // Check if the path is an auth route
  const isAuthRoute = authRoutes.some(route => pathname === route);

  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );

  // Get the access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // Verify the token
  let isAuthenticated = false;
  if (accessToken) {
    try {
      const decoded = verifyToken(accessToken);
      isAuthenticated = !!decoded;
    } catch (error) {
      // Token is invalid
      isAuthenticated = false;
    }
  }

  // Redirect logic
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login for protected routes when not authenticated
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect to dashboard for auth routes when already authenticated
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For API routes that require authentication (except auth routes)
  if (pathname.startsWith('/api/') && !isPublicRoute && !isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};