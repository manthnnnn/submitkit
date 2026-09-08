import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';
import { sendTelegramNotification } from '@/lib/telegram';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

async function hmacSHA256(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function verifyAdminCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const secret = process.env.ADMIN_SECRET_KEY || '';
  if (!token || !secret) return false;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return constantTimeEqual(token, secret);
  const sess = token.substring(0, dot);
  const hmac = token.substring(dot + 1);
  if (!sess || !hmac) return false;
  return constantTimeEqual(await hmacSHA256(secret, sess), hmac);
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { projectSlug, projectTitle } = await req.json();

    if (!projectSlug) {
      return NextResponse.json({ error: 'Missing projectSlug' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 1. Fetch from pre_orders
    const { data: preOrders } = await supabase
      .from('pre_orders')
      .select('name, email')
      .eq('project_slug', projectSlug);

    // 2. Fetch from reservations
    const { data: reservations } = await supabase
      .from('reservations')
      .select('email')
      .eq('project_slug', projectSlug);

    // Deduplicate by email
    const recipientMap = new Map<string, string>();
    (preOrders || []).forEach(p => {
      if (p.email) recipientMap.set(p.email.toLowerCase().trim(), p.name || 'Student');
    });
    (reservations || []).forEach(r => {
      if (r.email && !recipientMap.has(r.email.toLowerCase().trim())) {
        recipientMap.set(r.email.toLowerCase().trim(), 'Student');
      }
    });

    const recipients = Array.from(recipientMap.entries()).map(([email, name]) => ({ email, name }));

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No waitlisted students found for this project.' }, { status: 404 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const title = projectTitle || projectSlug.replace(/-/g, ' ');
    const projectUrl = `https://submitkit.in/projects/${projectSlug}`;

    // Send emails in batches via Brevo
    if (apiKey) {
      for (const recipient of recipients) {
        const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#09090b;font-family:system-ui,sans-serif;color:#f8fafc;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.3);border-radius:16px;padding:24px;text-align:center;margin-bottom:20px;">
    <div style="font-size:2rem;margin-bottom:8px;">🚀</div>
    <h1 style="margin:0 0 6px;font-size:1.3rem;font-weight:800;color:#fff;">Good news! ${title} is Ready!</h1>
    <p style="margin:0;color:#6ee7b7;font-size:0.9rem;">Your pre-ordered project bundle has officially launched on SubmitKit.</p>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;margin-bottom:18px;">
    <p style="margin:0 0 10px;font-size:0.88rem;color:#e2e8f0;line-height:1.6;">
      Hi ${recipient.name}, thank you for waiting! You previously registered for early access to <strong>${title}</strong>.
    </p>
    <p style="margin:0 0 10px;font-size:0.85rem;color:#a1a1aa;line-height:1.6;">
      The complete package including tested source code, documentation, reports, and Viva prep materials is now live for instant download.
    </p>
  </div>
  <div style="text-align:center;margin-bottom:24px;">
    <a href="${projectUrl}" style="display:inline-block;background:#10b981;color:#fff;font-weight:800;font-size:0.95rem;padding:14px 32px;border-radius:10px;text-decoration:none;">
      Download ${title} Now →
    </a>
  </div>
  <p style="text-align:center;font-size:0.75rem;color:#71717a;">SubmitKit.in — Verified Academic Project Bundles</p>
</div>
</body>
</html>`;

        await fetch(BREVO_API_URL, {
          method: 'POST',
          headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
          body: JSON.stringify({
            sender: { name: 'SubmitKit', email: 'team@submitkit.in' },
            to: [{ email: recipient.email, name: recipient.name }],
            subject: `🎉 ${title} is Live! Your Early Access Download Link | SubmitKit`,
            htmlContent: html,
          }),
        }).catch(e => console.error(`[broadcast] failed sending to ${recipient.email}:`, e));
      }
    }

    // Telegram notification to admin
    await sendTelegramNotification(
      `<b>📢 Waitlist Launch Broadcast Sent!</b>\n\n` +
      `<b>Project:</b> ${title}\n` +
      `<b>Students Notified:</b> ${recipients.length}\n` +
      `<b>Status:</b> Launch emails dispatched via Brevo.`
    ).catch(e => console.error('[broadcast] Telegram alert failed:', e));

    return NextResponse.json({
      success: true,
      recipientsCount: recipients.length,
      projectTitle: title,
    });
  } catch (err: any) {
    console.error('[broadcast] Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
