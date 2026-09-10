import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 2. Update status in Supabase
    const { data: purchase, error } = await supabase
      .from("blueprint_purchases")
      .update({
        status: "PAID",
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single();

    if (error || !purchase) {
      console.error("Failed to update purchase status:", error);
      return NextResponse.json(
        { error: "Payment verified but failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, purchaseId: purchase.id });
  } catch (error) {
    console.error("Blueprint verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
