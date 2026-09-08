import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendTelegramNotification } from '@/lib/telegram';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

async function sendReservationEmail(email: string, projectName: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[reservation email] BREVO_API_KEY is missing. Skipping email.');
    return;
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#09090b;font-family:system-ui,sans-serif;color:#f8fafc;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="margin-bottom:24px;">
    <span style="font-size:1.3rem;font-weight:800;color:#fff;">Submit<span style="color:#52525b;font-weight:400;">Kit</span></span>
  </div>
  <div style="background:linear-gradient(135deg,rgba(168,85,247,0.15),rgba(168,85,247,0.05));border:1px solid rgba(168,85,247,0.3);border-radius:16px;padding:24px;text-align:center;margin-bottom:20px;">
    <div style="font-size:2rem;margin-bottom:8px;">&#127919;</div>
    <h1 style="margin:0 0 6px;font-size:1.3rem;font-weight:800;color:#fff;">You're on the Early Access List!</h1>
    <p style="margin:0;color:#c4b5fd;font-size:0.9rem;">We'll notify you the moment <strong>${projectName}</strong> drops</p>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;margin-bottom:18px;">
    <p style="margin:0 0 10px;font-size:0.85rem;color:#e2e8f0;line-height:1.6;">
      Hi! You've reserved early access for <strong style="color:#a5b4fc;">${projectName}</strong>.
      When this project drops, you'll be the first to know &mdash; and you'll get it at launch pricing.
    </p>
    <p style="margin:0;font-size:0.82rem;color:#94a3b8;line-height:1.6;">
      In the meantime, check out our <strong>9 available projects</strong> you can download instantly right now.
    </p>
  </div>
  <div style="text-align:center;margin-bottom:20px;">
    <a href="https://submitkit.in/projects" style="display:inline-block;background:#6366f1;color:#fff;font-weight:800;font-size:0.9rem;padding:14px 32px;border-radius:10px;text-decoration:none;">
      Browse Available Projects
    </a>
  </div>
  <div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:10px;padding:14px;">
    <p style="margin:0;font-size:0.8rem;color:#93c5fd;line-height:1.5;">
      Questions? WhatsApp <a href="https://wa.me/918799814256" style="color:#60a5fa;text-decoration:none;font-weight:600;">+91 87998 14256</a> or email <a href="mailto:team@submitkit.in" style="color:#60a5fa;text-decoration:none;">team@submitkit.in</a>
    </p>
  </div>
  <div style="text-align:center;border-top:1px solid rgba(255,255,255,0.05);padding-top:18px;margin-top:20px;">
    <p style="margin:0;font-size:0.7rem;color:#52525b;">© ${new Date().getFullYear()} SubmitKit.in -- Educational reference material</p>
  </div>
</div></body></html>`;

  const adminHtml = `<!DOCTYPE html><html><body style="margin:0;padding:20px;background:#09090b;font-family:monospace;color:#d4d4d8;">
<div style="max-width:480px;background:#111113;border:1px solid #27272a;border-radius:12px;padding:20px;">
  <p style="margin:0 0 6px;color:#a855f7;font-weight:bold;font-size:12px;">NEW PRE-ORDER RESERVATION</p>
  <h2 style="margin:0 0 16px;color:#fff;font-size:18px;">${projectName}</h2>
  <p style="margin:0 0 8px;font-size:14px;"><strong>Student Email:</strong> ${email}</p>
  <p style="margin:0 0 8px;font-size:14px;"><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
  <p style="margin:16px 0 0;font-size:12px;color:#71717a;">View records in Supabase → public.reservations</p>
</div></body></html>`;

  try {
    const adminRecipients = [
      { email: 'mnthnnnn22@gmail.com', name: 'Manthan' },
      { email: 'team@submitkit.in', name: 'SubmitKit Team' },
    ];

    await Promise.all([
      // Student confirmation email
      fetch(BREVO_API_URL, {
        method: 'POST',
        headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'SubmitKit', email: 'team@submitkit.in' },
          to: [{ email }],
          subject: `Reserved: ${projectName} | SubmitKit Early Access`,
          htmlContent: html,
        }),
      }),
      // Admin notification email
      fetch(BREVO_API_URL, {
        method: 'POST',
        headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'SubmitKit', email: 'team@submitkit.in' },
          to: adminRecipients,
          subject: `[Pre-order Reservation] ${projectName} — ${email}`,
          htmlContent: adminHtml,
        }),
      }),
    ]);
    console.log('[reservation email] Confirmation and admin alerts processed for', email);
  } catch (err) {
    console.error('[reservation email] Failed:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, projectName, projectSlug } = await req.json();

    if (!email || !email.includes('@') || !projectName) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Upsert — if same email reserves same project twice, just update timestamp
    const { error } = await supabase
      .from('reservations')
      .upsert(
        { email: email.toLowerCase().trim(), project_slug: projectSlug, project_name: projectName },
        { onConflict: 'email,project_slug' }
      );

    if (error) {
      console.error('[reservation] Supabase upsert failed (table may not exist):', error.message);
    }

    const escape = (s: string = '') =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const telegramText = [
      `<b>🚀 New Pre-Order / Early Access Reservation!</b>`,
      ``,
      `<b>Project:</b> ${escape(projectName)}`,
      projectSlug ? `<b>Slug:</b> <code>${escape(projectSlug)}</code>` : null,
      ``,
      `<b>Student Email:</b> ${escape(email)}`,
      ``,
      `<b>Time:</b> ${time} IST`,
      ``,
      `View all: Supabase → public.reservations`,
    ].filter(Boolean).join('\n');

    // Await both Email and Telegram in parallel so neither is lost by serverless freeze
    await Promise.all([
      sendReservationEmail(email, projectName).catch(err =>
        console.error('[reservation] Email error:', err)
      ),
      sendTelegramNotification(telegramText).catch(err =>
        console.error('[reservation] Telegram error:', err)
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[reservation] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
