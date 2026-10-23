import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { createAdminSessionToken, getAdminUsers } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = checkRateLimit(`admin-login:${ip}`, { maxRequests: 5, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);

    if (!body?.password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const { email, password } = body;

    // ── Multi-user login via ADMIN_USERS env var ──────────────────────────
    const adminUsers = getAdminUsers();

    if (adminUsers.length > 0) {
      // Email+password login
      if (!email) {
        return NextResponse.json({ error: 'Email required' }, { status: 400 });
      }

      const user = adminUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      // Constant-time comparison
      const pwdBuf = Buffer.from(password);
      const expBuf = Buffer.from(user.password);
      let match = false;
      try {
        match = pwdBuf.length === expBuf.length && require('crypto').timingSafeEqual(pwdBuf, expBuf);
      } catch { match = false; }

      if (!match) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const cookieValue = await createAdminSessionToken({
        email: user.email,
        role: user.role,
        displayName: user.name,
      });

      logAuditAction({
        admin_email: user.email,
        action: 'ADMIN_LOGIN',
        entity_type: 'AUTH',
        entity_id: 'session',
        ip_address: ip,
        metadata: { role: user.role, timestamp: new Date().toISOString() },
      }).catch(() => {});

      const response = NextResponse.json({ success: true, role: user.role });
      response.cookies.set('admin_token', cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 86400,
      });
      return response;
    }

    // ── Legacy single-password fallback (SUPER_ADMIN) ────────────────────
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

    const cookieValue = await createAdminSessionToken({
      email: 'admin@submitkit.in',
      role: 'SUPER_ADMIN',
      displayName: 'Super Admin',
    });

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
      maxAge: 86400,
    });
    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
