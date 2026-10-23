import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseAdminSession } from '@/lib/rbac';

export async function middleware(request: NextRequest) {
  // Protect all /admin routes except /admin/login
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const adminToken = request.cookies.get('admin_token');
    const session = await parseAdminSession(adminToken?.value);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const { pathname } = request.nextUrl;

    // Strict role-based route boundaries:
    // 1. Team & credential management — SUPER_ADMIN only
    if (pathname.startsWith('/admin/team') && session.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/admin/projects', request.url));
    }

    // 2. Orders & Acquisitions (financial data) — requires orders:view permission
    if (
      (pathname.startsWith('/admin/orders') || pathname.startsWith('/admin/acquisitions')) &&
      session.role === 'CONTENT_ADMIN'
    ) {
      return NextResponse.redirect(new URL('/admin/projects', request.url));
    }

    // 3. Audit logs — CONTENT_ADMIN is forbidden
    if (pathname.startsWith('/admin/audit-log') && session.role === 'CONTENT_ADMIN') {
      return NextResponse.redirect(new URL('/admin/projects', request.url));
    }

    // 4. Default admin root (/admin) displays revenue & financial metrics — redirect Content Admin straight to /admin/projects
    if (pathname === '/admin' && session.role === 'CONTENT_ADMIN') {
      return NextResponse.redirect(new URL('/admin/projects', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
