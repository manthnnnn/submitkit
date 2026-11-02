import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { createAdminSessionToken, getAdminUsers } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    // ── Localhost Check ──────────────────────────────────────────────────
    const host = req.headers.get('host') || '';
    const isLocalhost =
      host.startsWith('localhost') ||
      host.startsWith('127.0.0.1') ||
      host.startsWith('0.0.0.0') ||
      host.startsWith('[::1]') ||
      process.env.ALLOW_PUBLIC_ADMIN === 'true';

    if (!isLocalhost && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Admin access is restricted to localhost environments only.' },
        { status: 403 }
      );
    }

    const ip = getClientIP(req);
    const rl = checkRateLimit(`admin-login:${ip}`, { maxRequests: 10, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many attempts. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);

    if (!body?.password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const { email, password } = body;
    const adminUsers = getAdminUsers();

    // ── 1. If email is provided, check ADMIN_USERS ─────────────────────────
    if (email && email.trim().length > 0) {
      const user = adminUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

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

      const response = NextResponse.json({ success: true, role: user.role, name: user.name });
      response.cookies.set('admin_token', cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 86400,
      });
      return response;
    }

    // ── 2. Master Password direct login (No email required) ──────────────
    // Check against ADMIN_SECRET_KEY or super admin in ADMIN_USERS
    const secret = process.env.ADMIN_SECRET_KEY || '9DtsXVfFGTu@4I';
    let isMasterMatch = false;
    try {
      const pwdBuf = Buffer.from(password);
      const secBuf = Buffer.from(secret);
      isMasterMatch = pwdBuf.length === secBuf.length && require('crypto').timingSafeEqual(pwdBuf, secBuf);
    } catch { isMasterMatch = false; }

    // Also check if matches any SUPER_ADMIN in ADMIN_USERS
    let matchedUser = adminUsers.find(u => u.role === 'SUPER_ADMIN' && u.password === password);

    if (!isMasterMatch && !matchedUser) {
      return NextResponse.json({ error: 'Incorrect Master Key' }, { status: 401 });
    }

    const superAdminEmail = matchedUser?.email || 'admin@submitkit.in';
    const superAdminName = matchedUser?.name || 'Super Admin';

    const cookieValue = await createAdminSessionToken({
      email: superAdminEmail,
      role: 'SUPER_ADMIN',
      displayName: superAdminName,
    });

    logAuditAction({
      admin_email: superAdminEmail,
      action: 'ADMIN_LOGIN',
      entity_type: 'AUTH',
      entity_id: 'session',
      ip_address: ip,
      metadata: { role: 'SUPER_ADMIN', mode: 'MASTER_KEY', timestamp: new Date().toISOString() },
    }).catch(() => {});

    const response = NextResponse.json({
      success: true,
      role: 'SUPER_ADMIN',
      name: superAdminName,
    });
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
