/**
 * Email delivery via Brevo (formerly Sendinblue) Transactional Email API.
 * No SDK required â€” uses the standard fetch() + Brevo REST API v3.
 *
 * To set up:
 *  1. Go to https://app.brevo.com â†’ SMTP & API â†’ API Keys â†’ Create API Key
 *  2. Add BREVO_API_KEY to your Vercel environment variables
 *  3. In Brevo â†’ Senders & IPs â†’ add and verify team@submitkit.in (or any sender)
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface OrderEmailParams {
  customerName:       string;
  customerEmail:      string;
  projectTitle:       string;
  orderId:            string;
  amountPaid:         number;
  tier:               'MINI' | 'MAJOR';
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
    console.warn('[email] BREVO_API_KEY not set â€” skipping confirmation email');
    return;
  }

  const baseUrl      = (process.env.NEXT_PUBLIC_BASE_URL || 'https://submitkit.in').replace(/\/$/, '');
  const downloadUrl  = `${baseUrl}/order/success?order_id=${orderId}&title=${encodeURIComponent(projectTitle)}`;
  const shortOrderId = orderId.split('-')[0].toUpperCase();
  const pagesCount   = tier === 'MAJOR' ? '60+' : '30+';
  const waMessage    = encodeURIComponent(`Hi! I purchased "${projectTitle}" (Order: ${shortOrderId}). I'd like to schedule my Viva Prep Call.`);
  const waLink       = `https://wa.me/918799814256?text=${waMessage}`;

  // Build add-on section HTML
  const addonRows: string[] = [];
  if (hasPersonalization) {
    addonRows.push(`<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
      <span style="font-size:1rem;">âœï¸</span>
      <strong style="color:#a5b4fc;"> Name Personalisation</strong>
      <p style="margin:4px 0 0;font-size:0.82rem;color:#94a3b8;">Reply to this email with your Roll Number and Guide Name â€” we'll type them on the Black Book cover and send you the updated file.</p>
    </td></tr>`);
  }
  if (hasPlagiarismCert) {
    addonRows.push(`<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
      <span style="font-size:1rem;">ðŸ†</span>
      <strong style="color:#fbbf24;"> Plagiarism-Free Certificate</strong>
      <p style="margin:4px 0 0;font-size:0.82rem;color:#94a3b8;">Your real Turnitin report (&lt;10% similarity) will be emailed to you <strong style="color:#fbbf24;">within 24 hours</strong>. No action needed.</p>
    </td></tr>`);
  }
  if (hasVivaCall) {
    addonRows.push(`<tr><td style="padding:10px 0;">
      <span style="font-size:1rem;">ðŸ“ž</span>
      <strong style="color:#34d399;"> 30-Min Viva Prep Call</strong>
      <p style="margin:4px 0 0;font-size:0.82rem;color:#94a3b8;">
        Book your slot now: <a href="${waLink}" style="color:#34d399;font-weight:600;">Click here to WhatsApp +91 87998 14256</a>
      </p>
    </td></tr>`);
  }

  const addonSection = addonRows.length > 0 ? `
    <tr><td style="padding:20px 0 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:12px;padding:16px;">
        <tr><td style="padding-bottom:10px;">
          <span style="font-size:0.72rem;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:0.06em;">â­ Your Purchased Add-Ons</span>
        </td></tr>
        ${addonRows.join('')}
      </table>
    </td></tr>` : '';

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#f8fafc;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 16px;">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

  <!-- Logo -->
  <tr><td style="padding-bottom:24px;">
    <span style="font-size:1.4rem;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Submit<span style="color:#52525b;font-weight:400;">Kit</span></span>
  </td></tr>

  <!-- Hero -->
  <tr><td style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.35);border-radius:16px;padding:28px;text-align:center;margin-bottom:0;">
    <div style="font-size:2.5rem;">ðŸŽ‰</div>
    <h1 style="margin:8px 0 6px;font-size:1.5rem;font-weight:800;color:#ffffff;">Payment Confirmed!</h1>
    <p style="margin:0;color:#34d399;font-size:0.9rem;">Your bundle is ready â€” download it now</p>
  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:16px;"></td></tr>

  <!-- Order details -->
  <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
    <p style="margin:0 0 4px;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;font-weight:700;">Hi ${customerName}, you purchased</p>
    <p style="margin:0 0 16px;font-size:1.1rem;font-weight:700;color:#ffffff;">${projectTitle}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;">
      <tr>
        <td><p style="margin:0 0 2px;font-size:0.7rem;color:#71717a;text-transform:uppercase;font-weight:700;">Amount Paid</p>
            <p style="margin:0;font-size:1rem;font-weight:800;color:#10b981;">&#8377;${amountPaid}</p></td>
        <td align="right"><p style="margin:0 0 2px;font-size:0.7rem;color:#71717a;text-transform:uppercase;font-weight:700;">Order ID</p>
            <p style="margin:0;font-size:0.8rem;font-family:monospace;color:#a1a1aa;">${shortOrderId}</p></td>
      </tr>
    </table>
  </td></tr>

  <!-- Download CTA -->
  <tr><td style="padding:20px 0;text-align:center;">
    <a href="${downloadUrl}" style="display:inline-block;background:#10b981;color:#09090b;font-weight:800;font-size:1rem;padding:16px 40px;border-radius:12px;text-decoration:none;">
      &#11015;&#65039; Download Your Bundle
    </a>
    <p style="margin:10px 0 0;font-size:0.72rem;color:#52525b;">Link valid for 10 min &bull; 3 downloads included</p>
  </td></tr>

  ${addonSection}

  <!-- Spacer -->
  <tr><td style="height:${addonRows.length > 0 ? '16' : '0'}px;"></td></tr>

  <!-- What's included -->
  <tr><td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;">
    <p style="margin:0 0 14px;font-size:0.78rem;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.04em;">&#128230; What's In Your Bundle</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        ['&#128187;', 'Working Source Code',              '1-click run.bat launcher â€” zero manual setup'],
        ['&#128196;', `${pagesCount}-Page IEEE Black Book`, 'Print-ready .docx â€” your name on the cover'],
        ['&#128421;&#65039;', 'Viva Defense PPT',         '15â€“20 slides with exact speaker notes'],
        ['&#128218;', '25 Viva Q&amp;A Answers',           'Examiner-tested questions with full answers'],
        ['&#9889;',   'Instant ZIP Download',              'Secure Cloudflare R2 CDN delivery'],
      ].map(([icon, title, sub]) => `
      <tr><td style="padding:6px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px;font-size:1rem;vertical-align:top;line-height:1;">${icon}</td>
          <td><p style="margin:0;font-size:0.82rem;font-weight:600;color:#f4f4f5;">${title}</p>
              <p style="margin:0;font-size:0.72rem;color:#71717a;">${sub}</p></td>
        </tr></table>
      </td></tr>`).join('')}
    </table>
  </td></tr>

  <tr><td style="height:16px;"></td></tr>

  <!-- How to run -->
  <tr><td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;">
    <p style="margin:0 0 12px;font-size:0.78rem;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.04em;">&#128640; Run in 5 Minutes</p>
    <ol style="margin:0;padding-left:18px;color:#a1a1aa;font-size:0.8rem;line-height:2;">
      <li>Extract the downloaded ZIP file</li>
      <li><strong style="color:#f4f4f5;">Windows:</strong> Double-click <code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;color:#34d399;font-size:0.75rem;">run.bat</code></li>
      <li><strong style="color:#f4f4f5;">Mac/Linux:</strong> Run <code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;color:#a78bfa;font-size:0.75rem;">bash run.sh</code></li>
      <li>Open <code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;color:#fbbf24;font-size:0.75rem;">localhost:3000</code> in your browser</li>
      <li>Read the PPT speaker notes before your Viva &#127891;</li>
    </ol>
  </td></tr>

  <tr><td style="height:16px;"></td></tr>

  <!-- Support -->
  <tr><td style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:12px;padding:16px;">
    <p style="margin:0;font-size:0.82rem;color:#93c5fd;line-height:1.6;">
      Need help? <strong>Reply to this email</strong> or WhatsApp <a href="https://wa.me/918799814256" style="color:#60a5fa;text-decoration:none;font-weight:600;">+91 87998 14256</a><br/>
      Want a <strong>custom project</strong>? Just reply with your requirements.
    </p>
  </td></tr>

  <tr><td style="height:24px;"></td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;">
    <p style="margin:0 0 3px;font-size:0.72rem;color:#52525b;">&#169; ${new Date().getFullYear()} SubmitKit.in â€” India's Premier Academic Project Marketplace</p>
    <p style="margin:0;font-size:0.68rem;color:#3f3f46;">Sold as educational reference material only.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const payload = {
    sender:  { name: 'SubmitKit', email: 'team@submitkit.in' },
    to:      [{ email: customerEmail, name: customerName }],
    subject: `âœ… Order Confirmed â€” ${projectTitle} | SubmitKit`,
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
      console.log(`[email] Confirmation sent via Brevo to ${customerEmail} for order ${orderId}`);
    }
  } catch (err) {
    // Never block the payment flow for an email failure
    console.error('[email] Brevo fetch failed:', err);
  }
}

