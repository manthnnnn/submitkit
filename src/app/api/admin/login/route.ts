import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
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

    // Generate a random session token — never store the raw secret in the cookie
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Store token + hash of secret so middleware can re-verify without storing the secret
    // For this MVP: store HMAC(sessionToken, ADMIN_SECRET_KEY) as the cookie value.
    // Middleware verifies by checking cookie === HMAC(cookie, secret) — but simpler:
    // we hash the secret and store that. The middleware checks hash(cookie) === stored hash.
    // Simplest correct approach: store HMAC of a server-generated nonce with the secret.
    const tokenValue = crypto
      .createHmac('sha256', process.env.ADMIN_SECRET_KEY || '')
      .update(sessionToken)
      .digest('hex');

    // Cookie contains: sessionToken.tokenValue — middleware reconstructs and verifies
    const cookieValue = `${sessionToken}.${tokenValue}`;

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_token', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
