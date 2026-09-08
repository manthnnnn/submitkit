import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendTelegramNotification, buildPreOrderMessage } from '@/lib/telegram';
import { sendPreOrderEmails } from '@/lib/email';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 reservations per minute per IP
    const ip = getClientIP(req);
    const rl = checkRateLimit(`reserve:${ip}`, { maxRequests: 5, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    const { email, projectName, projectSlug } = await req.json();

    if (!email || !email.includes('@') || !projectName) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanSlug = projectSlug || projectName.toLowerCase().replace(/\s+/g, '-');
    const studentName = cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

    const supabase = createAdminClient();

    // 1. Save to reservations table (historical compatibility)
    try {
      await supabase
        .from('reservations')
        .upsert(
          { email: cleanEmail, project_slug: cleanSlug, project_name: projectName },
          { onConflict: 'email,project_slug' }
        );
    } catch (err: any) {
      console.warn('[reservations] Upsert to reservations warning:', err?.message);
    }

    // 2. Also save to pre_orders table so student appears in Admin Pre-orders dashboard
    try {
      const { data: existing } = await supabase
        .from('pre_orders')
        .select('id')
        .eq('email', cleanEmail)
        .eq('project_slug', cleanSlug)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('pre_orders')
          .update({
            name: studentName,
            project_title: projectName,
            created_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('pre_orders')
          .insert({
            project_slug: cleanSlug,
            project_title: projectName,
            name: studentName,
            email: cleanEmail,
            phone: 'Email-Only Waitlist',
            college: 'Early Access Reservee',
          });
      }
    } catch (err: any) {
      console.warn('[reservations] Sync to pre_orders warning:', err?.message);
    }

    // 3. Prepare Telegram notification
    const telegramText = buildPreOrderMessage({
      name: `${studentName} (⚡ Email Waitlist)`,
      email: cleanEmail,
      phone: 'Email-Only Reservee',
      college: 'Early Access Reservee',
      projectTitle: projectName,
      projectSlug: cleanSlug,
    });

    // 4. Send Confirmation Email & Telegram Alert in parallel
    await Promise.all([
      sendPreOrderEmails({
        name: studentName,
        email: cleanEmail,
        phone: 'Email-Only Reservee',
        college: 'Early Access Reservee',
        projectTitle: projectName,
        projectSlug: cleanSlug,
      }).catch(err => console.error('[reservations] Email error:', err)),
      sendTelegramNotification(telegramText).catch(err =>
        console.error('[reservations] Telegram error:', err)
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[reservations] POST error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
