import { NextRequest, NextResponse } from "next/server";
import { searchTopics } from "@/lib/blueprint-engine";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || 4), 1), 20);

    if (!q.trim()) {
      return NextResponse.json({ results: [], total: 0 });
    }

    const matches = searchTopics(q);
    const results = matches.slice(0, limit).map((t) => ({
      id: t.id,
      title: t.title,
      category: t.category,
      tagline: t.tagline,
      difficulty: t.difficulty,
      buildTimeDays: t.buildTimeDays,
    }));

    return NextResponse.json({ results, total: matches.length });
  } catch (error) {
    console.error("Blueprint search error:", error);
    return NextResponse.json({ results: [], total: 0 }, { status: 500 });
  }
}
