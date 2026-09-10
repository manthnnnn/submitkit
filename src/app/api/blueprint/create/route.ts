import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { CONSTANTS } from "@/lib/constants";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topicId, topicTitle, email, phone } = body;

    if (!topicId || !topicTitle || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Create Razorpay order for ₹19
    const amount = CONSTANTS.PRICING.BLUEPRINT * 100; // in paise
    const options = {
      amount,
      currency: "INR",
      receipt: `bp_${crypto.randomBytes(8).toString("hex")}`,
      notes: {
        topicId,
        email,
      },
    };

    const order = await razorpay.orders.create(options);

    // 2. Store pending purchase in Supabase
    const { data: purchase, error } = await supabase
      .from("blueprint_purchases")
      .insert([
        {
          topic_id: topicId,
          topic_title: topicTitle,
          customer_email: email,
          customer_phone: phone,
          razorpay_order_id: order.id,
          amount: CONSTANTS.PRICING.BLUEPRINT,
          status: "PENDING",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create record in database" },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Create blueprint order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
