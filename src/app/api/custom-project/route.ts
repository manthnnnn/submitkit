import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, college, tier, category, topic, techPreference, deadline, specialRequirements } = body;

    // Validate required fields
    if (!name || !email || !phone || !topic || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const supabase = await createClient();

    // Store in Supabase
    const { error: dbError } = await supabase
      .from("custom_project_requests")
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college: college?.trim() || null,
        tier,
        category,
        topic: topic.trim(),
        tech_preference: techPreference,
        deadline: deadline || null,
        special_requirements: specialRequirements?.trim() || null,
        status: "pending",
      }]);

    // Don't fail if table doesn't exist yet — still send Telegram
    if (dbError) {
      console.error("DB insert error:", dbError.message);
    }

    // Telegram notification
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const tierLabels: Record<string, string> = {
        mini: "Mini (₹1,999)",
        major: "Major (₹2,999)",
        enterprise: "Enterprise (₹4,999)",
      };
      const message = `🚀 NEW CUSTOM PROJECT REQUEST\n\n👤 ${name}\n📧 ${email}\n📞 ${phone}\n🏫 ${college || "Not specified"}\n\n📋 Tier: ${tierLabels[tier] || tier}\n🗂️ Category: ${category}\n💡 Topic: ${topic}\n⚙️ Tech: ${techPreference}\n📅 Deadline: ${deadline || "Not specified"}\n\n📝 Notes: ${specialRequirements || "None"}`;

      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Custom project API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
