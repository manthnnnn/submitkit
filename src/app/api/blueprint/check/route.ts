import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topicId, email, phone } = body;

    if (!topicId || !email) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Check if there is a successful payment for this email/phone and topic
    const { data: purchases, error } = await supabase
      .from("blueprint_purchases")
      .select("id, status")
      .eq("topic_id", topicId)
      .eq("customer_email", email)
      .eq("status", "PAID")
      .limit(1);

    if (error) {
      console.error("Check purchase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const hasPaid = purchases && purchases.length > 0;
    
    return NextResponse.json({ 
      hasPaid, 
      purchaseId: hasPaid ? purchases[0].id : null 
    });

  } catch (error) {
    console.error("Check blueprint access error:", error);
    return NextResponse.json(
      { error: "Failed to check access" },
      { status: 500 }
    );
  }
}
