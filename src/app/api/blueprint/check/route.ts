import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAccessToken, createAccessToken } from "@/lib/blueprint-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topicId, email, phone, accessToken } = body;

    if (!topicId) {
      return NextResponse.json({ error: "Missing topic ID" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 1. Device Token check (instant automatic unlock on previously verified device)
    if (accessToken) {
      const verified = verifyAccessToken(accessToken, topicId);
      if (verified.valid && verified.email) {
        const { data: purchases, error } = await supabase
          .from("blueprint_purchases")
          .select("id, status, pdf_downloads")
          .eq("topic_id", topicId)
          .eq("customer_email", verified.email)
          .eq("status", "PAID")
          .limit(1);

        if (!error && purchases && purchases.length > 0) {
          return NextResponse.json({
            hasPaid: true,
            email: verified.email,
            purchaseId: purchases[0].id,
            downloads: purchases[0].pdf_downloads || 0,
            maxDownloads: 5,
          });
        }
      }
    }

    // 2. Dual-Key Re-access: Email + Registered Phone Number match
    if (email && phone) {
      const cleanEmail = email.trim().toLowerCase();
      const cleanEnteredPhone = phone.replace(/\D/g, "").slice(-10);

      if (cleanEnteredPhone.length !== 10) {
        return NextResponse.json({
          hasPaid: false,
          error: "Please enter a valid 10-digit phone number.",
        }, { status: 400 });
      }

      const { data: purchases, error } = await supabase
        .from("blueprint_purchases")
        .select("id, status, customer_phone, pdf_downloads")
        .eq("topic_id", topicId)
        .eq("customer_email", cleanEmail)
        .eq("status", "PAID")
        .limit(1);

      if (error) {
        console.error("Check purchase error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      if (!purchases || purchases.length === 0) {
        return NextResponse.json({
          hasPaid: false,
          error: "No purchase found for this email address. Please check your spelling.",
        }, { status: 404 });
      }

      const purchase = purchases[0];
      const cleanDbPhone = (purchase.customer_phone || "").replace(/\D/g, "").slice(-10);

      if (cleanDbPhone && cleanDbPhone !== cleanEnteredPhone) {
        return NextResponse.json({
          hasPaid: false,
          error: "The phone number does not match the registered phone for this purchase.",
        }, { status: 401 });
      }

      // Both Email and Phone match! Issue a 90-day device token so this browser stays unlocked
      const newAccessToken = createAccessToken(cleanEmail, topicId);

      return NextResponse.json({
        hasPaid: true,
        accessToken: newAccessToken,
        email: cleanEmail,
        purchaseId: purchase.id,
        downloads: purchase.pdf_downloads || 0,
        maxDownloads: 5,
      });
    }

    if (email && !phone) {
      return NextResponse.json({
        hasPaid: false,
        error: "Please also enter your 10-digit phone number to restore access.",
      }, { status: 400 });
    }

    return NextResponse.json({ hasPaid: false });

  } catch (error) {
    console.error("Check blueprint access error:", error);
    return NextResponse.json(
      { error: "Failed to check access" },
      { status: 500 }
    );
  }
}
