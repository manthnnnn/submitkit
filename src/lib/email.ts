/**
 * Email delivery via Brevo (formerly Sendinblue) Transactional Email API.
 * No SDK required -- uses the standard fetch() + Brevo REST API v3.
 *
 * Setup:
 *  1. https://app.brevo.com -> SMTP & API -> API Keys -> Create API Key
 *  2. Add BREVO_API_KEY to Vercel environment variables
 *  3. Brevo -> Senders & IPs -> verify team@submitkit.in as sender
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface OrderEmailParams {
  customerName:        string;
  customerEmail:       string;
  projectTitle:        string;
  orderId:             string;
  amountPaid:          number;
  tier:                'MINI' | 'MAJOR';
  hasPersonalization?: boolean;
  hasPlagiarismCert?:  boolean;
  hasVivaCall?:        boolean;
}

export async function sendOrderConfirmationEmail(params: OrderEmailParams): Promise<void> {
  const {
    customerName, customerEmail, projectTitle,
    orderId, amountPaid, tier,
    hasPersonalization, hasPlagiarismCert, hasVivaCall,
  } = params;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[email] BREVO_API_KEY not set -- skipping confirmation email');
    return;
  }

  const baseUrl      = (process.env.NEXT_PUBLIC_BASE_URL || 'https://submitkit.in').replace(/\/$/, '');
  const downloadUrl  = `${baseUrl}/order/success?order_id=${orderId}&title=${encodeURIComponent(projectTitle)}`;
  const shortOrderId = orderId.split('-')[0].toUpperCase();
  const pagesCount   = tier === 'MAJOR' ? '60+' : '30+';
  const waText       = `Hi! I purchased "${projectTitle}" (Order: ${shortOrderId}). I would like to schedule my Viva Prep Call.`;
  const waLink       = `https://wa.me/918799814256?text=${encodeURIComponent(waText)}`;

  // ── Add-on rows ───────────────────────────────────────────────────
  const addonRows: string[] = [];
  if (hasPersonalization) {
    addonRows.push(`
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
      <p style="margin:0;font-size:0.85rem;color:#ffffff;font-weight:700;">&#9999;&#65039; Name Personalisation</p>
      <p style="margin:4px 0 0;font-size:0.8rem;color:#94a3b8;line-height:1.5;">
        Reply to this email with your <strong>Roll Number</strong> and <strong>Guide Name</strong>.
        We will type them on the Black Book cover and send you the personalised file.
      </p>
    </td></tr>`);
  }
  if (hasPlagiarismCert) {
    addonRows.push(`
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
      <p style="margin:0;font-size:0.85rem;color:#ffffff;font-weight:700;">&#127942; SubmitKit Official Plagiarism Certificate</p>
      <p style="margin:4px 0 0;font-size:0.8rem;color:#94a3b8;line-height:1.5;">
        You can instantly generate your certificate from your order success page!
      </p>
    </td></tr>`);
  }
  if (hasVivaCall) {
    addonRows.push(`
    <tr><td style="padding:10px 0;">
      <p style="margin:0;font-size:0.85rem;color:#ffffff;font-weight:700;">&#128222; Custom Changes Request</p>
      <p style="margin:4px 0 0;font-size:0.8rem;color:#94a3b8;line-height:1.5;">
        Contact our developers for custom code tweaks: <a href="${waLink}" style="color:#34d399;font-weight:600;text-decoration:none;">WhatsApp +91 87998 14256</a>
      </p>
    </td></tr>`);
  }

  const addonSection = addonRows.length > 0 ? `
  <tr><td style="padding:16px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:12px;padding:16px;">
      <tr><td style="padding-bottom:8px;">
        <span style="font-size:0.72rem;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:0.06em;">
          &#11088; Your Purchased Add-Ons
        </span>
      </td></tr>
      ${addonRows.join('')}
    </table>
  </td></tr>` : '';

  // ── HTML email body ───────────────────────────────────────────────
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#f8fafc;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

  <!-- Logo -->
  <tr><td style="padding-bottom:24px;">
    <span style="font-size:1.4rem;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
      Submit<span style="color:#52525b;font-weight:400;">Kit</span>
    </span>
  </td></tr>

  <!-- Hero -->
  <tr><td style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.35);border-radius:16px;padding:28px;text-align:center;">
    <div style="font-size:2.5rem;margin-bottom:6px;">&#127881;</div>
    <h1 style="margin:0 0 6px;font-size:1.5rem;font-weight:800;color:#ffffff;">Payment Confirmed!</h1>
    <p style="margin:0;color:#34d399;font-size:0.9rem;">Your bundle is ready -- download it now</p>
  </td></tr>

  <tr><td style="height:16px;"></td></tr>

  <!-- Order details -->
  <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
    <p style="margin:0 0 4px;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;font-weight:700;">
      Hi ${customerName}, you purchased
    </p>
    <p style="margin:0 0 16px;font-size:1.1rem;font-weight:700;color:#ffffff;">${projectTitle}</p>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;">
      <tr>
        <td>
          <p style="margin:0 0 2px;font-size:0.7rem;color:#71717a;text-transform:uppercase;font-weight:700;">Amount Paid</p>
          <p style="margin:0;font-size:1rem;font-weight:800;color:#10b981;">&#8377;${amountPaid}</p>
        </td>
      </tr>
    </table>

    <!-- Prominent Order ID Block -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.35);border-radius:10px;padding:14px;margin-top:14px;">
      <tr><td>
        <p style="margin:0 0 6px;font-size:0.65rem;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:0.07em;">
          &#128273; Your Order ID — Save This
        </p>
        <p style="margin:0 0 6px;font-size:1.4rem;font-weight:800;font-family:monospace;color:#ffffff;letter-spacing:0.06em;">
          ${shortOrderId}
        </p>
        <p style="margin:0;font-size:0.72rem;color:#818cf8;line-height:1.5;">
          Download link expired? Re-access your order at:
          <a href="${baseUrl}/order/lookup" style="color:#818cf8;font-weight:700;text-decoration:underline;">${baseUrl.replace('https://', '')}/order/lookup</a>
        </p>
      </td></tr>
    </table>
  </td></tr>

  <!-- Download CTA -->
  <tr><td style="padding:20px 0;text-align:center;">
    <a href="${downloadUrl}"
      style="display:inline-block;background:#10b981;color:#09090b;font-weight:800;font-size:1rem;padding:16px 40px;border-radius:12px;text-decoration:none;">
      Download Your Bundle
    </a>
    <p style="margin:10px 0 0;font-size:0.72rem;color:#52525b;">
      Link valid for 10 min &bull; Up to 3 downloads included
    </p>
    <p style="margin:8px 0 0;font-size:0.72rem;color:#3f3f46;">
      Download link expired? Visit
      <a href="${baseUrl}/order/lookup" style="color:#6366f1;text-decoration:none;font-weight:600;">${baseUrl.replace('https://', '')}/order/lookup</a>
      and enter your Order ID: <span style="font-family:monospace;color:#818cf8;font-weight:700;">${shortOrderId}</span>
    </p>
  </td></tr>

  ${addonSection}
  <tr><td style="height:${addonRows.length > 0 ? 16 : 0}px;"></td></tr>

  <!-- What's included -->
  <tr><td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;">
    <p style="margin:0 0 14px;font-size:0.78rem;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.04em;">
      &#128230; What's In Your Bundle
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:5px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;font-size:0.9rem;vertical-align:top;">&#128187;</td>
          <td><p style="margin:0;font-size:0.82rem;font-weight:600;color:#f4f4f5;">Working Source Code</p>
              <p style="margin:0;font-size:0.72rem;color:#71717a;">1-click run.bat launcher -- zero manual setup</p></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:5px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;font-size:0.9rem;vertical-align:top;">&#128196;</td>
          <td><p style="margin:0;font-size:0.82rem;font-weight:600;color:#f4f4f5;">${pagesCount}-Page IEEE Black Book</p>
              <p style="margin:0;font-size:0.72rem;color:#71717a;">Print-ready .docx -- your name on the cover</p></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:5px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;font-size:0.9rem;vertical-align:top;">&#128421;</td>
          <td><p style="margin:0;font-size:0.82rem;font-weight:600;color:#f4f4f5;">Viva Defense PPT</p>
              <p style="margin:0;font-size:0.72rem;color:#71717a;">15-20 slides with exact speaker notes</p></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:5px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;font-size:0.9rem;vertical-align:top;">&#128218;</td>
          <td><p style="margin:0;font-size:0.82rem;font-weight:600;color:#f4f4f5;">25 Viva Q&amp;A Answers</p>
              <p style="margin:0;font-size:0.72rem;color:#71717a;">Examiner-tested questions with full answers</p></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:5px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;font-size:0.9rem;vertical-align:top;">&#9889;</td>
          <td><p style="margin:0;font-size:0.82rem;font-weight:600;color:#f4f4f5;">Instant ZIP Download</p>
              <p style="margin:0;font-size:0.72rem;color:#71717a;">Secure Cloudflare R2 CDN delivery</p></td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="height:16px;"></td></tr>

  <!-- How to run -->
  <tr><td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;">
    <p style="margin:0 0 12px;font-size:0.78rem;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.04em;">
      &#128640; Run in 5 Minutes
    </p>
    <ol style="margin:0;padding-left:18px;color:#a1a1aa;font-size:0.8rem;line-height:2.2;">
      <li>Extract the downloaded ZIP file</li>
      <li>
        <strong style="color:#f4f4f5;">Windows:</strong>
        Double-click <code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;color:#34d399;">run.bat</code>
      </li>
      <li>
        <strong style="color:#f4f4f5;">Mac / Linux:</strong>
        Run <code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;color:#a78bfa;">bash run.sh</code>
      </li>
      <li>Open <code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;color:#fbbf24;">localhost:3000</code> in your browser</li>
      <li>Read the PPT speaker notes before your Viva! &#127891;</li>
    </ol>
  </td></tr>

  <tr><td style="height:16px;"></td></tr>

  <!-- Support -->
  <tr><td style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:12px;padding:16px;">
    <p style="margin:0;font-size:0.82rem;color:#93c5fd;line-height:1.6;">
      Need help? <strong>Reply to this email</strong> or WhatsApp
      <a href="https://wa.me/918799814256" style="color:#60a5fa;text-decoration:none;font-weight:600;">+91 87998 14256</a><br/>
      Want a <strong>custom project</strong>? Just reply with your requirements.
    </p>
  </td></tr>

  <tr><td style="height:24px;"></td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;">
    <p style="margin:0 0 3px;font-size:0.72rem;color:#52525b;">
      &#169; ${new Date().getFullYear()} SubmitKit.in -- India's Premier Academic Project Marketplace
    </p>
    <p style="margin:0;font-size:0.68rem;color:#3f3f46;">Sold as educational reference material only.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const subject = `Order Confirmed -- ${projectTitle} | SubmitKit`;

  const payload = {
    sender:      { name: 'SubmitKit', email: 'team@submitkit.in' },
    to:          [{ email: customerEmail, name: customerName }],
    subject,
    htmlContent,
  };

  try {
    const res = await fetch(BREVO_API_URL, {
      method:  'POST',
      headers: {
        'accept':       'application/json',
        'api-key':      apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.error(`[email] Brevo API error ${res.status}:`, errBody);
    } else {
      console.log(`[email] Sent to ${customerEmail} for order ${orderId}`);
    }
  } catch (err) {
    console.error('[email] Brevo fetch failed:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Pre-order Emails
// ─────────────────────────────────────────────────────────────────────────────

interface PreOrderEmailParams {
  name: string;
  email: string;
  phone: string;
  college?: string | null;
  projectTitle: string;
  projectSlug: string;
}

export async function sendPreOrderEmails(params: PreOrderEmailParams): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[email] BREVO_API_KEY not set — skipping pre-order emails');
    return;
  }

  const { name, email, phone, college, projectTitle, projectSlug } = params;
  const ownerEmail = process.env.ADMIN_NOTIFY_EMAIL || 'team@submitkit.in';
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://submitkit.in').replace(/\/$/, '');
  const firstName = name?.trim() ? name.trim().split(/\s+/)[0] : 'there';

  // ── 1. Confirmation email to student ──────────────────────────────────────
  const studentHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:32px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:560px;background:#111113;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1c1917,#111113);padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 4px;font-size:0.7rem;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:0.1em;">Pre-order Confirmed</p>
    <h1 style="margin:0;font-size:1.5rem;font-weight:800;color:#ffffff;line-height:1.3;">You&apos;re on the list, ${firstName}!</h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:28px 32px;">
    <p style="margin:0 0 20px;font-size:0.9rem;color:#a1a1aa;line-height:1.7;">
      We have received your pre-order for <strong style="color:#ffffff;">${projectTitle}</strong>.
      The moment your bundle is ready, you will be the <strong style="color:#f59e0b;">first to receive the download link</strong> — before it goes on sale publicly.
    </p>

    <!-- Project card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(245,158,11,0.07);border:1px solid rgba(245,158,11,0.25);border-radius:14px;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:0.7rem;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:0.08em;">Your Pre-order</p>
        <p style="margin:0 0 12px;font-size:1.05rem;font-weight:700;color:#ffffff;">${projectTitle}</p>
        <p style="margin:0;font-size:0.8rem;color:#78716c;">Estimated delivery: <strong style="color:#d4d4d8;">7–10 days</strong></p>
      </td></tr>
    </table>

    <!-- What happens next -->
    <p style="margin:0 0 12px;font-size:0.75rem;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.06em;">What happens next</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${[
        ['Our team is building and testing your bundle.', '#a1a1aa'],
        ['You will receive an email with your download link the day it is ready.', '#a1a1aa'],
        ['Payment is collected only after delivery — you are not charged now.', '#d4d4d8'],
      ].map(([text]) => `
      <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <p style="margin:0;font-size:0.85rem;color:#a1a1aa;line-height:1.6;">${text}</p>
      </td></tr>`).join('')}
    </table>

    <!-- Support -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:12px;padding:16px 20px;">
        <p style="margin:0;font-size:0.82rem;color:#93c5fd;line-height:1.7;">
          Questions? Reply to this email or WhatsApp us at
          <a href="https://wa.me/918799814256" style="color:#60a5fa;text-decoration:none;font-weight:600;">+91 87998 14256</a>
        </p>
      </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;border-top:1px solid rgba(255,255,255,0.05);padding:20px 32px;">
    <p style="margin:0 0 3px;font-size:0.72rem;color:#52525b;">© ${new Date().getFullYear()} SubmitKit.in — India's Premier Academic Project Marketplace</p>
    <a href="${baseUrl}/projects/${projectSlug}" style="font-size:0.72rem;color:#3f3f46;">View project page</a>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  // ── 2. Owner notification email ────────────────────────────────────────────
  const ownerHtml = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#09090b;font-family:monospace;color:#d4d4d8;">
<div style="max-width:500px;background:#111113;border:1px solid #27272a;border-radius:12px;padding:24px;">
  <p style="margin:0 0 4px;font-size:0.7rem;color:#f59e0b;font-weight:700;text-transform:uppercase;">New Pre-order</p>
  <h2 style="margin:0 0 20px;color:#ffffff;font-size:1.2rem;">${projectTitle}</h2>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${[
      ['Name', name],
      ['Email', email],
      ['Phone', phone],
      ['College', college || '—'],
      ['Project', projectTitle],
      ['Slug', projectSlug],
      ['Time', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
    ].map(([label, value]) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #27272a;color:#71717a;font-size:0.82rem;width:80px;">${label}</td>
      <td style="padding:8px 0 8px 16px;border-bottom:1px solid #27272a;color:#f4f4f5;font-size:0.82rem;">${value}</td>
    </tr>`).join('')}
  </table>
  <p style="margin:20px 0 0;font-size:0.78rem;color:#52525b;">
    View all pre-orders in your Supabase dashboard → public.pre_orders table
  </p>
</div>
</body>
</html>`;

  const sendEmail = async (to: { email: string; name: string }, subject: string, html: string) => {
    try {
      const res = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'SubmitKit', email: 'team@submitkit.in' },
          to: [to],
          subject,
          htmlContent: html,
        }),
      });
      if (!res.ok) {
        const errorDetail = await res.text().catch(() => '');
        console.error(`[email] Brevo error sending to ${to.email}:`, res.status, errorDetail);
      } else {
        console.log(`[email] Successfully delivered pre-order email to ${to.email}`);
      }
    } catch (e) {
      console.error(`[email] Network exception sending to ${to.email}:`, e);
    }
  };

  const emailTasks = [
    sendEmail({ email, name: name || 'Student' }, `Pre-order Confirmed — ${projectTitle} | SubmitKit`, studentHtml),
    sendEmail({ email: ownerEmail, name: 'SubmitKit Admin' }, `[Pre-order] ${name} — ${projectTitle}`, ownerHtml),
  ];

  await Promise.all(emailTasks);
  console.log(`[email] Pre-order email queue processed for ${projectSlug} by ${email}`);
}
