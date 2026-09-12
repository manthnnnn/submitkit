import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 login attempts per minute per IP to prevent brute force
    const ip = getClientIP(req);
    const rl = checkRateLimit(`admin-login:${ip}`, { maxRequests: 5, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);

    if (!body?.password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const { password } = body;

    // Constant-time comparison to prevent timing attacks
    const secret = process.env.ADMIN_SECRET_KEY || '';
    const passwordBuf = Buffer.from(password.padEnd(secret.length, '\0'));
    const secretBuf   = Buffer.from(secret.padEnd(password.length, '\0'));
    let match = false;
    try {
      match = passwordBuf.length === secretBuf.length &&
        require('crypto').timingSafeEqual(
          Buffer.from(password),
          Buffer.from(secret)
        );
    } catch { match = false; }

    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Issue signed RBAC token
    const { createAdminSessionToken } = await import('@/lib/rbac');
    const { logAuditAction } = await import('@/lib/audit');

    const cookieValue = await createAdminSessionToken({
      email: 'admin@submitkit.in',
      role: 'SUPER_ADMIN',
      displayName: 'Super Admin',
    });

    // Fire audit log asynchronously (never block authentication)
    logAuditAction({
      admin_email: 'admin@submitkit.in',
      action: 'ADMIN_LOGIN',
      entity_type: 'AUTH',
      entity_id: 'session',
      ip_address: ip,
      metadata: { timestamp: new Date().toISOString() },
    }).catch(() => {});

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_token', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
