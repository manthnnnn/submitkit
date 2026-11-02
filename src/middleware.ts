import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseAdminSession } from '@/lib/rbac';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // ── 1. STRICT LOCALHOST-ONLY SECURITY BOUNDARY ────────────────────────
    // As per user specification, admin panel only runs on localhost.
    const host = request.headers.get('host') || '';
    const isLocalhost =
      host.startsWith('localhost') ||
      host.startsWith('127.0.0.1') ||
      host.startsWith('0.0.0.0') ||
      host.startsWith('[::1]') ||
      process.env.ALLOW_PUBLIC_ADMIN === 'true';

    if (!isLocalhost && process.env.NODE_ENV === 'production') {
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Admin Enclave - Localhost Only</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; }
    body {
      background: linear-gradient(180deg, #FAF6EE 0%, #F5EFE6 50%, #FAF6EE 100%);
      color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 1.5rem;
    }
    .box {
      background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%);
      border: 1px solid #E8E1D5;
      border-radius: 28px;
      padding: 2.75rem 2.25rem;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 20px 50px -12px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: #F0FDFA;
      color: #0F766E;
      border: 1px solid #99F6E4;
      margin-bottom: 1.25rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #0D9488;
      box-shadow: 0 0 8px #0D9488;
    }
    h1 {
      font-size: 1.6rem;
      font-weight: 900;
      margin: 0 0 0.875rem;
      letter-spacing: -0.03em;
      color: #0F172A;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 1.75rem;
    }
    .hint {
      background: #FAF6EE;
      border: 1px dashed #0D9488;
      border-radius: 14px;
      padding: 1rem;
      font-size: 0.85rem;
      color: #0A7C72;
      font-weight: 600;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      word-break: break-all;
    }
    .btn {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background: #0F172A;
      color: #ffffff;
      border: 1px solid rgba(15, 23, 42, 0.2);
      border-radius: 12px;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
      transition: all 0.2s;
    }
    .btn:hover {
      background: #1E293B;
      transform: translateY(-1px);
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="badge"><span class="pulse-dot"></span> Localhost Secure Enclave</div>
    <h1>Admin Access Isolated</h1>
    <p>For zero-trust security and operational safety, the SubmitKit Admin Console is configured to execute strictly in your <strong>Localhost Development Environment</strong>.</p>
    <div class="hint">Local Enclave Endpoint:<br>http://localhost:3000/admin</div>
    <a href="/" class="btn">Return to Storefront &rarr;</a>
  </div>
</body>
</html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }

    // ── 2. LOGIN PAGE EXEMPTION ──────────────────────────────────────────
    if (pathname.startsWith('/admin/login')) {
      return NextResponse.next();
    }

    // ── 3. AUTHENTICATION & SESSION VERIFICATION ──────────────────────────
    const adminToken = request.cookies.get('admin_token');
    const session = await parseAdminSession(adminToken?.value);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

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
