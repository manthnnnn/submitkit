import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const { path, visitorId, referrer, device } = body;

    // Do not track admin portal visits or API endpoints to keep student analytics clean
    if (!path || typeof path !== 'string' || path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ success: true, tracked: false });
    }

    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json({ success: true, tracked: false });
    }

    const supabase = createAdminClient();

    const sanitizedPath = path.slice(0, 255);
    const sanitizedVisitorId = visitorId.slice(0, 100);
    const sanitizedReferrer = typeof referrer === 'string' ? referrer.slice(0, 255) : 'direct';
    const sanitizedDevice = device === 'mobile' ? 'mobile' : 'desktop';

    const { error } = await supabase.from('page_views').insert({
      visitor_id: sanitizedVisitorId,
      path: sanitizedPath,
      referrer: sanitizedReferrer,
      device: sanitizedDevice,
    });

    if (error) {
      // Table may not exist yet or connection blip — fail quietly to protect student UX
      console.warn('[Analytics Tracker] Failed to log pageview:', error.message);
      return NextResponse.json({ success: true, tracked: false });
    }

    return NextResponse.json({ success: true, tracked: true });
  } catch (err: any) {
    console.warn('[Analytics Tracker] Error:', err?.message);
    return NextResponse.json({ success: true, tracked: false });
  }
}
