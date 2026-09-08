import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendPreOrderEmails } from '@/lib/email';
import { sendTelegramNotification, buildPreOrderMessage } from '@/lib/telegram';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 pre-orders per minute per IP
    const ip = getClientIP(req);
    const rl = checkRateLimit(`preorder:${ip}`, { maxRequests: 5, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please wait and try again.' }, { status: 429 });
    }

    const body = await req.json();
    const { projectSlug, projectTitle, name, email, phone, college } = body;

    if (!projectSlug || !projectTitle || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check for duplicate pre-order from same email for same project
    const { data: existing } = await supabase
      .from('pre_orders')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .eq('project_slug', projectSlug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'You have already pre-ordered this project. Check your email for confirmation.' },
        { status: 409 }
      );
    }

    // Save to database
    const { data: preOrder, error: dbError } = await supabase
      .from('pre_orders')
      .insert({
        project_slug: projectSlug,
        project_title: projectTitle,
        name: name.trim().substring(0, 100),
        email: email.toLowerCase().trim().substring(0, 255),
        phone: phone.trim().substring(0, 20),
        college: college ? college.trim().substring(0, 200) : null,
      })
      .select()
      .single();

    if (dbError) {
      console.error('[preorder] DB error:', dbError);
      return NextResponse.json({ error: 'Failed to save pre-order' }, { status: 500 });
    }

    const notifParams = { name, email, phone, college, projectTitle, projectSlug };

    // Fire all notifications in parallel and wait for them to finish before responding
    await Promise.all([
      // 1. Confirmation email to student
      sendPreOrderEmails(notifParams).catch(err => console.error('[preorder] Email error:', err)),
      // 2. Instant Telegram message to you
      sendTelegramNotification(buildPreOrderMessage(notifParams)).catch(err => console.error('[preorder] Telegram error:', err)),
    ]);

    return NextResponse.json({ success: true, id: preOrder.id });
  } catch (err: any) {
    console.error('[preorder] Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
