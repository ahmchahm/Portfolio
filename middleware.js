import { NextResponse } from 'next/server';
// optional supabase middleware helper; falls back to noop if not configured
import { createClient as createSupabaseMiddleware } from './src/utils/supabase/middleware';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // run supabase middleware first so cookies/sessions are updated
  let res = createSupabaseMiddleware(req);

  // Allow public and API routes (already early returned by supabase helper)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname === '/favicon.ico'
  ) {
    return res;
  }

  // Protect admin routes except the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};
