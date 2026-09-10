import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getTopicById } from "@/lib/blueprint-engine";
import { generateBlueprintDocx } from "@/lib/blueprint-pdf";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get("topicId");
    const email = searchParams.get("email");

    if (!topicId || !email) {
      return NextResponse.json({ error: "Missing topicId or email" }, { status: 400 });
    }

    // 1. Verify purchase exists and is paid
    const { data: purchases, error } = await supabase
      .from("blueprint_purchases")
      .select("id, status")
      .eq("topic_id", topicId)
      .eq("customer_email", email)
      .eq("status", "PAID")
      .limit(1);

    if (error || !purchases || purchases.length === 0) {
      return NextResponse.json(
        { error: "No valid purchase found for this email and topic." },
        { status: 403 }
      );
    }

    // 2. Get full blueprint content
    const blueprint = getTopicById(topicId);
    if (!blueprint) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    // 3. Check if this is a stub topic (no full blueprint data)
    if (!blueprint.buildSteps || blueprint.buildSteps.length === 0) {
      return NextResponse.json(
        { error: "Full blueprint for this topic is coming soon. Please contact support." },
        { status: 503 }
      );
    }

    // 4. Generate docx buffer
    const buffer = await generateBlueprintDocx(blueprint, email);

    // 5. Increment download count
    await supabase
      .from("blueprint_purchases")
      .update({ pdf_downloads: supabase.rpc("increment", { x: 1 }) as any })
      .eq("id", purchases[0].id);

    // 6. Return the file
    const filename = `SubmitKit-Blueprint-${topicId}.docx`;
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF. Please try again." },
      { status: 500 }
    );
  }
}
