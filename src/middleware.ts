import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

function verifyAdminToken(cookieValue: string): boolean {
  const secret = process.env.ADMIN_SECRET_KEY || '';
  if (!secret) return false;

  // Cookie format: sessionToken.hmac
  const dotIndex = cookieValue.lastIndexOf('.');
  if (dotIndex === -1) {
    // Legacy format: direct secret comparison (transition period)
    return cookieValue === secret;
  }

  const sessionToken = cookieValue.substring(0, dotIndex);
  const providedHmac = cookieValue.substring(dotIndex + 1);

  if (!sessionToken || !providedHmac) return false;

  const expectedHmac = crypto
    .createHmac('sha256', secret)
    .update(sessionToken)
    .digest('hex');

  // Constant-time comparison
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedHmac, 'hex'),
      Buffer.from(providedHmac, 'hex')
    );
  } catch {
    return false;
  }
}

export default function middleware(request: NextRequest) {
  // Protect all /admin routes except /admin/login
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const adminToken = request.cookies.get('admin_token');

    if (!adminToken || !verifyAdminToken(adminToken.value)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
