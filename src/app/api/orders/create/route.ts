import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { razorpay } from '@/lib/razorpay';
import { PaymentPayload } from '@/lib/types';
import { CONSTANTS } from '@/lib/constants';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body: PaymentPayload = await req.json();
    
    // Validate request
    if (!body.projectId || !body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    // Fetch project to get actual price (never trust client price)
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', body.projectId)
      .single();
      
    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    // Calculate final amount
    let totalAmount = project.price_inr;
    if (body.addPersonalization) totalAmount += CONSTANTS.PRICING.ADDONS.PERSONALIZATION;
    if (body.addPlagiarismCert) totalAmount += CONSTANTS.PRICING.ADDONS.PLAGIARISM_CERT;
    if (body.addVivaCall) totalAmount += CONSTANTS.PRICING.ADDONS.VIVA_CALL;
    
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
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    });
    
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
