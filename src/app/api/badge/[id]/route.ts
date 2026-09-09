import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAdminClient();
  
  const { data } = await supabase
    .from('benchmark_runs')
    .select('score, maturity_level, classification_title, repo_name')
    .eq('id', id)
    .single();

  if (!data) {
    return new NextResponse('Not found', { status: 404 });
  }

  const score = data.score;
  const level = data.maturity_level;
  const label = 'SubmitKit Score';
  
  // Color based on score
  let color = '#ef4444'; // red
  if (score >= 80) color = '#22c55e'; // green
  else if (score >= 60) color = '#3b82f6'; // blue
  else if (score >= 40) color = '#f59e0b'; // amber

  const labelWidth = 110;
  const valueWidth = 70;
  const totalWidth = labelWidth + valueWidth;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${label}: ${score}/100">
  <title>${label}: ${score}/100 (Level ${level})</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r"><rect width="${totalWidth}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text aria-hidden="true" x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${labelWidth / 2}" y="14">${label}</text>
    <text aria-hidden="true" x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${score}/100</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${score}/100</text>
  </g>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
