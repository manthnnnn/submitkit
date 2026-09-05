import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateDownloadUrl } from '@/lib/s3';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const orderId = (await params).orderId;
    
    if (!orderId) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    // 1. Fetch Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, projects(*)')
      .eq('id', orderId)
      .single();
      
    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // 2. Validate Payment Status
    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 403 });
    }
    
    // 3. Check Download Limits
    if (order.download_count >= order.download_limit) {
      return NextResponse.json({ 
        error: `Download limit reached (${order.download_limit}/${order.download_limit}). Please contact support.` 
      }, { status: 403 });
    }
    
    // 4. Log Download Attempt for Anti-Piracy
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    await supabase.from('download_logs').insert({
      order_id: order.id,
      ip_address: ip,
      user_agent: userAgent
    });
    
    // 5. Increment Download Count (Atomic operation to prevent concurrency bypass)
    await supabase.rpc('increment_download_count', { row_id: order.id });

    // 6. Generate Pre-signed S3 URL
    const filename = `${order.projects.slug}-complete-bundle.zip`;
    let downloadUrl: string;
    try {
      downloadUrl = await generateDownloadUrl(order.projects.s3_storage_key, filename);
    } catch (s3Error: any) {
      console.error('S3/R2 URL generation failed:', s3Error);
      return NextResponse.json({
        error: 'File storage is not configured. Please contact support@submitkit.in with your Order ID.',
        orderId: order.id,
      }, { status: 503 });
    }

    // 7. Redirect to the pre-signed URL to start download automatically
    return NextResponse.redirect(downloadUrl);
    
  } catch (error: any) {
    console.error('Download generation error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
