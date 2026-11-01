import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { razorpay } from '@/lib/razorpay';
import { PaymentPayload } from '@/lib/types';
import { CONSTANTS } from '@/lib/constants';
import { checkRateLimit, getClientIP, checkOrigin } from '@/lib/rate-limit';
import { getAllStaticProjects } from '@/lib/static-catalog';
import { isProjectAvailable } from '@/lib/available-projects';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 order creations per minute per IP
    const ip = getClientIP(req);
    const rl = checkRateLimit(`order-create:${ip}`, { maxRequests: 5, windowSeconds: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please wait and try again.' }, { status: 429 });
    }

    // CSRF origin check
    if (!checkOrigin(req)) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    const body: PaymentPayload = await req.json();
    
    // Validate request
    if (!body.projectId || !body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    // Fetch project (check Supabase or fall back to static catalog)
    let project: any = null;
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .or(`id.eq.${body.projectId},slug.eq.${body.projectId}`)
        .maybeSingle();
      if (data) project = data;
    } catch { /* ignore */ }

    if (!project) {
      const allStatic = getAllStaticProjects();
      project = allStatic.find(p => p.id === body.projectId || p.slug === body.projectId);
    }
      
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Safety check: Only genuinely ready-to-ship projects can be purchased for instant delivery
    if (!isProjectAvailable(project.slug)) {
      return NextResponse.json({
        error: 'This project is in QA verification and available for Pre-Book only. No payment is charged yet — please use the Pre-Book form on the project page.'
      }, { status: 400 });
    }
    
    // Standard pricing: Mini ₹299 / Major ₹499
    const basePrice = project.tier === 'MAJOR' ? CONSTANTS.PRICING.MAJOR_PROJECT : CONSTANTS.PRICING.MINI_PROJECT;
    let totalAmount = basePrice;
    if (body.addPersonalization) totalAmount += CONSTANTS.PRICING.ADDONS.PERSONALIZATION;
    if (body.addPlagiarismCert) totalAmount += CONSTANTS.PRICING.ADDONS.PLAGIARISM_CERT;
    if (body.addVivaCall) totalAmount += CONSTANTS.PRICING.ADDONS.VIVA_CALL;

    // Always charge the real price — never override with ₹1
    // (test email and dev shortcuts removed to ensure consistent real-money transactions)
    
    // Create Razorpay Order
    const receiptId = `rcpt_${crypto.randomBytes(8).toString('hex')}`;
    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Amount in paise, rounded to prevent floating-point crash
      currency: 'INR',
      receipt: receiptId,
    });
    
    if (!rzpOrder) {
      throw new Error('Failed to create Razorpay order');
    }
    
    // Store Pending Order in Database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_id: rzpOrder.id,
        customer_email: body.customerEmail.substring(0, 255),
        customer_phone: body.customerPhone.substring(0, 20),
        customer_name: body.customerName.substring(0, 255),
        college_name: body.collegeName ? body.collegeName.substring(0, 255) : null,
        project_id: project.id,
        amount_paid: totalAmount,
        status: 'PENDING',
        has_personalization: !!body.addPersonalization,
        has_plagiarism_cert: !!body.addPlagiarismCert,
        has_viva_call: !!body.addVivaCall,
      })
      .select()
      .single();
      
    if (orderError) {
      console.error('Database insertion error:', orderError);
      throw new Error('Failed to create order record');
    }
    
    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      key: (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').trim()
    });
    
  } catch (error: any) {
    console.error('Order creation error:', error);
    const errorMsg = error?.error?.description 
      || error?.description 
      || error?.message 
      || (typeof error === 'string' ? error : JSON.stringify(error))
      || 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
