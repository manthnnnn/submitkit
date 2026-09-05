import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generatePersonalizedDocx } from '@/lib/docx-injector';
import { generateDownloadUrl } from '@/lib/s3';

export async function POST(req: NextRequest) {
  try {
    const { orderId, rollNumber, guideName, submissionDate } = await req.json();
    
    if (!orderId) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    // 1. Fetch Order and Project
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, projects(*)')
      .eq('id', orderId)
      .single();
      
    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // 2. Validate Payment and Upsell
    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 403 });
    }
    if (!order.has_personalization) {
      return NextResponse.json({ error: 'Personalization add-on not purchased' }, { status: 403 });
    }
    
    // 3. Generate Personalized Docx
    const outputKey = `personalized/${order.id}/${order.projects.slug}-report.docx`;
    
    await generatePersonalizedDocx(
      order.projects.report_template_key,
      {
        studentName: order.customer_name,
        rollNumber: rollNumber,
        guideName: guideName,
        collegeName: order.college_name || '',
        projectTitle: order.projects.title,
        submissionDate: submissionDate || new Date().toISOString().split('T')[0]
      },
      outputKey
    );
    
    // 4. Generate Pre-signed URL
    const downloadUrl = await generateDownloadUrl(outputKey, `${order.projects.slug}-personalized-report.docx`);
    
    return NextResponse.json({
      success: true,
      downloadUrl
    });
    
  } catch (error: any) {
    console.error('Personalization error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
