import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Use Web Crypto API (Edge-compatible) instead of Node.js crypto
async function hmacSHA256(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifyAdminToken(cookieValue: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET_KEY || '';
  if (!secret) return false;

  // Cookie format: sessionToken.hmac
  const dotIndex = cookieValue.lastIndexOf('.');
  if (dotIndex === -1) {
    // Legacy format: direct secret comparison (transition period)
    return constantTimeEqual(cookieValue, secret);
  }

  const sessionToken = cookieValue.substring(0, dotIndex);
  const providedHmac = cookieValue.substring(dotIndex + 1);

  if (!sessionToken || !providedHmac) return false;

  const expectedHmac = await hmacSHA256(secret, sessionToken);

  return constantTimeEqual(expectedHmac, providedHmac);
}

export default async function middleware(request: NextRequest) {
  // Protect all /admin routes except /admin/login
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const adminToken = request.cookies.get('admin_token');

    if (!adminToken || !(await verifyAdminToken(adminToken.value))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
