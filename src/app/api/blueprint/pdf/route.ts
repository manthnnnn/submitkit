import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTopicById } from "@/lib/blueprint-engine";
import { generateBlueprintDocx } from "@/lib/blueprint-pdf";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get("topicId");
    const emailParam = searchParams.get("email");
    const format = (searchParams.get("format") || "").toLowerCase();

    if (!topicId) {
      return NextResponse.json({ error: "Missing topicId" }, { status: 400 });
    }

    const email = (!emailParam || emailParam === "free") ? "student@submitkit.in" : emailParam.trim().toLowerCase();

    // 1. Get full blueprint content
    const blueprint = getTopicById(topicId);
    if (!blueprint) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    // 2. Check if a pre-compiled static PDF exists for this topic
    const publicDir = path.join(process.cwd(), "public");
    const staticCandidates = [
      path.join(publicDir, `SubmitKit-Demo-Blueprint-${topicId}.pdf`),
      path.join(publicDir, `SubmitKit-Blueprint-${topicId}.pdf`),
    ];
    if (topicId.includes("face-recognition")) {
      staticCandidates.unshift(path.join(publicDir, "SubmitKit-Demo-Blueprint-Face-Recognition-Attendance.pdf"));
    }

    const matchedStaticPdf = staticCandidates.find((filePath) => fs.existsSync(filePath));

    // If PDF format requested or a static PDF is available (and format is not explicitly docx)
    if (matchedStaticPdf && format !== "docx") {
      const fileBuffer = fs.readFileSync(matchedStaticPdf);
      const downloadFilename = `SubmitKit-Blueprint-${topicId}.pdf`;
      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${downloadFilename}"`,
          "Content-Length": fileBuffer.length.toString(),
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // 3. Otherwise generate the comprehensive DOCX document
    const buffer = await generateBlueprintDocx(blueprint, email);

    // 4. Optionally track download in Supabase in background if purchase/email exists
    try {
      const supabase = createAdminClient();
      const { data: purchases } = await supabase
        .from("blueprint_purchases")
        .select("id, pdf_downloads")
        .eq("topic_id", topicId)
        .eq("customer_email", email)
        .limit(1);

      if (purchases && purchases.length > 0) {
        await supabase
          .from("blueprint_purchases")
          .update({ pdf_downloads: (purchases[0].pdf_downloads || 0) + 1 })
          .eq("id", purchases[0].id);
      }
    } catch {
      // Non-blocking analytics
    }

    // 5. Return the DOCX file
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
    console.error("Blueprint generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blueprint document. Please try again." },
      { status: 500 }
    );
  }
}
