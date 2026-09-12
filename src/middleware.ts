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
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: '/admin/:path*',
};
