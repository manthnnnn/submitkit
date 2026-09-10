import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST() {
  return NextResponse.json(
    { error: 'GitHub benchmarking has been removed. Use the Blueprint Generator instead.' },
    { status: 410 }
  );
}
