import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateDownloadUrl } from '@/lib/s3';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const ip = getClientIP(req);
    const rl = checkRateLimit(`download:${ip}`, { maxRequests: 10, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many download attempts. Please wait a minute.' }, { status: 429 });
    }

    const orderId = (await params).orderId;
    if (!orderId) return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });

    const supabase = createAdminClient();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, projects(*)')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Payment not completed for this order.' }, { status: 403 });
    }

    if (order.download_count >= order.download_limit) {
      return NextResponse.json({
        error: `Download limit reached (${order.download_limit}/${order.download_limit}). WhatsApp +91 87998 14256 with your Order ID ${order.id.split('-')[0].toUpperCase()} for a free reset.`,
      }, { status: 403 });
    }

    // ── Validate that the project has a storage key configured ───────────
    const storageKey = order.projects?.s3_storage_key;
    if (!storageKey || storageKey.trim() === '') {
      console.error(`[download] Missing s3_storage_key for project ${order.projects?.slug} (order ${order.id})`);
      return NextResponse.json({
        error: `Your project bundle is being prepared. Please email team@submitkit.in with your Order ID ${order.id.split('-')[0].toUpperCase()} and we will send you the download link within 30 minutes.`,
        code: 'STORAGE_KEY_MISSING',
      }, { status: 503 });
    }

    // Log the download attempt
    const userAgent = req.headers.get('user-agent') || 'unknown';
    await supabase.from('download_logs').insert({
      order_id: order.id,
      ip_address: ip,
      user_agent: userAgent,
    });

    // Increment download count atomically
    await supabase.rpc('increment_download_count', { row_id: order.id });

    // Generate pre-signed R2 URL
    const filename = `${order.projects.slug}-complete-bundle.zip`;
    let downloadUrl: string;
    try {
      downloadUrl = await generateDownloadUrl(storageKey, filename);
    } catch (s3Error: any) {
      console.error('[download] S3/R2 URL generation failed:', s3Error);

      // R2 not configured at all
      if (s3Error.message?.includes('not configured')) {
        return NextResponse.json({
          error: 'File delivery is temporarily unavailable. Please email team@submitkit.in with your Order ID and we will send the file directly.',
          code: 'R2_NOT_CONFIGURED',
        }, { status: 503 });
      }

      // Key exists but other S3 error
      return NextResponse.json({
        error: 'Could not generate download link. Please try again in a moment. If the problem persists, email team@submitkit.in with your Order ID.',
        code: 'S3_ERROR',
      }, { status: 503 });
    }

    return NextResponse.json({ url: downloadUrl });

  } catch (error: any) {
    console.error('[download] Unexpected error:', error);
    return NextResponse.json({
      error: 'An unexpected error occurred. Please try again or email team@submitkit.in.',
    }, { status: 500 });
  }
}

// HEAD is needed for the order lookup page to check if an order is accessible
export async function HEAD(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  // Delegate to GET logic but return only status
  const response = await GET(req, { params });
  return new NextResponse(null, { status: response.status });
}
