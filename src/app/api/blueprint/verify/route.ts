import { NextRequest, NextResponse } from "next/server";
import { verifySignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Verify signature safely
    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 2. Update status in Supabase
    const supabase = createAdminClient();
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
