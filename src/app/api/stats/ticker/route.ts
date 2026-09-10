import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    
    // Get latest 5 benchmarks
    const { data: runs, error: runError } = await supabase
      .from('benchmark_runs')
      .select('score, maturity_level, classification_title, created_at, category')
      .order('created_at', { ascending: false })
      .limit(5);

    const names = ['Aakash', 'Priya', 'Rohan', 'Sneha', 'Rahul', 'Anjali', 'Vikram', 'Neha', 'Karan', 'Tanvi'];

    const activities = [
      'unlocked "AI Medical Diagnostics" (Code + Black Book) 📦',
      'downloaded 60-Page IEEE Report & Viva Defense PPT 📑',
      'unlocked "Real-Time Fraud Detection" Full-Stack Bundle 🚀',
      'downloaded "Face Recognition Attendance" (1-Click Run) ⚡',
      'generated 1-Prompt Blueprint for "RAG Search Agent" 🎯',
      'unlocked "IoT Smart Agriculture System" Project Bundle 📦',
      'received Verified Source Code & Examiner Q&A Guide 🛡️',
      'unlocked "Autonomous Drone Navigation" Project 💎',
    ];
    
    const tickerItems: string[] = [];

    // 1. Try to fetch recent real orders
    try {
      const { data: orders } = await supabase
        .from('orders')
        .select('created_at, amount, projects(title)')
        .eq('status', 'PAID')
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders && orders.length > 0) {
        orders.forEach((o: any) => {
          const randomName = names[Math.floor(Math.random() * names.length)];
          const title = o.projects?.title || 'Project Bundle';
          tickerItems.push(`${randomName} unlocked "${title}" (Code + Report + PPT) 📦`);
        });
      }
    } catch (e) {
      // Ignore
    }

    // 2. Fill in with realistic product delivery events
    while (tickerItems.length < 6) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const act = activities[tickerItems.length % activities.length];
      tickerItems.push(`${randomName} ${act}`);
    }

    // Shuffle array
    const shuffled = tickerItems.sort(() => 0.5 - Math.random());

    return NextResponse.json({ tickerItems: shuffled });
  } catch (err) {
    return NextResponse.json({ 
      tickerItems: [
        'Aakash unlocked "AI Medical Diagnostics" (Code + Black Book) 📦',
        'Priya downloaded 60-Page IEEE Report & Defense PPT 📑',
        'Rohan unlocked "Face Recognition Attendance" (1-Click Run) ⚡',
        'Sneha received Verified Source Code & Examiner Q&A Guide 🛡️',
      ] 
    });
  }
}
