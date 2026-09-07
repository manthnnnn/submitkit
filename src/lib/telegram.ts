/**
 * Telegram Bot Notifications
 *
 * Setup (takes 60 seconds):
 * 1. Open Telegram → search @BotFather → /newbot → follow prompts → copy token
 * 2. Start a chat with your new bot OR create a private channel and add the bot as admin
 * 3. Send a message to the bot, then visit:
 *    https://api.telegram.org/bot<TOKEN>/getUpdates
 *    and note your "chat_id" from the response
 * 4. Add to Vercel env vars:
 *    TELEGRAM_BOT_TOKEN = your token
 *    TELEGRAM_CHAT_ID   = your chat id (can be negative for channels)
 */

const TELEGRAM_API = 'https://api.telegram.org';

export async function sendTelegramNotification(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping');
    return;
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[telegram] API error:', body);
    } else {
      console.log('[telegram] Notification sent');
    }
  } catch (err) {
    console.error('[telegram] fetch failed:', err);
  }
}

export function buildOrderNotificationMessage(params: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectTitle: string;
  amountPaid: number;
  orderId: string;
  hasPersonalization: boolean;
  hasPlagiarismCert: boolean;
  hasVivaCall: boolean;
}): string {
  const {
    customerName, customerEmail, customerPhone,
    projectTitle, amountPaid, orderId,
    hasPersonalization, hasPlagiarismCert, hasVivaCall,
  } = params;

  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const shortId = orderId.split('-')[0].toUpperCase();

  const addons: string[] = [];
  if (hasPersonalization) addons.push('Name Personalisation');
  if (hasPlagiarismCert)  addons.push('Plagiarism Cert');
  if (hasVivaCall)        addons.push('Custom Changes / Viva Call');

  return [
    `<b>💰 New Sale!</b>`,
    ``,
    `<b>Project:</b> ${projectTitle}`,
    `<b>Student:</b> ${customerName}`,
    `<b>Amount:</b> ₹${amountPaid}`,
    addons.length > 0 ? `<b>Add-ons:</b> ${addons.join(', ')}` : null,
    ``,
    `<b>Email:</b> ${customerEmail}`,
    `<b>Phone:</b> ${customerPhone}`,
    ``,
    `<b>Order ID:</b> <code>${shortId}</code>`,
    `<b>Time:</b> ${time} IST`,
  ].filter(l => l !== null).join('\n');
}

export function buildPreOrderMessage(params: {
  name: string;
  email: string;
  phone: string;
  college?: string | null;
  projectTitle: string;
  projectSlug: string;
}): string {
  const { name, email, phone, college, projectTitle, projectSlug } = params;
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return [
    `<b>New Pre-order</b>`,
    ``,
    `<b>Project:</b> ${projectTitle}`,
    `<b>Slug:</b> <code>${projectSlug}</code>`,
    ``,
    `<b>Name:</b> ${name}`,
    `<b>Email:</b> ${email}`,
    `<b>Phone:</b> ${phone}`,
    college ? `<b>College:</b> ${college}` : null,
    ``,
    `<b>Time:</b> ${time} IST`,
    ``,
    `View all: Supabase → public.pre_orders`,
  ].filter(l => l !== null).join('\n');
}
