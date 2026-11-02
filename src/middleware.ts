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
      background: #060709;
      color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 1.5rem;
    }
    .box {
      background: linear-gradient(165deg, rgba(18, 20, 28, 0.95) 0%, rgba(10, 11, 16, 0.98) 100%);
      border: 1px solid rgba(13, 148, 136, 0.3);
      border-radius: 28px;
      padding: 2.75rem 2.25rem;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(13, 148, 136, 0.1);
      backdrop-filter: blur(24px);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: rgba(13, 148, 136, 0.15);
      color: #2dd4bf;
      border: 1px solid rgba(13, 148, 136, 0.35);
      margin-bottom: 1.25rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #2dd4bf;
      box-shadow: 0 0 8px #2dd4bf;
    }
    h1 {
      font-size: 1.6rem;
      font-weight: 800;
      margin: 0 0 0.875rem;
      letter-spacing: -0.03em;
      color: #ffffff;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 1.75rem;
    }
    .hint {
      background: rgba(255, 255, 255, 0.04);
      border: 1px dashed rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 1rem;
      font-size: 0.8rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      word-break: break-all;
    }
    .btn {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background: #0f172a;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      text-decoration: none;
      font-size: 0.825rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn:hover {
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.3);
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="badge"><span class="pulse-dot"></span> Localhost Secure Enclave</div>
    <h1>Admin Access Isolated</h1>
    <p>For zero-trust security and operational isolation, the SubmitKit Admin Console is configured to execute strictly in your <strong>Localhost Development Environment</strong>.</p>
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
