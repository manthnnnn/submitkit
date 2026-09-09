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

    // We don't have user names stored, so we'll use a mix of generic "A student" and some random first names for realism
    const names = ['Aakash', 'Priya', 'Rohan', 'Sneha', 'Rahul', 'Anjali', 'Vikram', 'Neha', 'A student'];
    
    const tickerItems = (runs || []).map(run => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const type = Math.random() > 0.5 ? 'score' : 'level';
      
      if (type === 'score') {
        return `${randomName} just benchmarked their project — Score: ${run.score}/100 ⚡`;
      } else {
        const levelLabel = run.maturity_level >= 5 ? 'Production Ready' : run.maturity_level >= 4 ? 'Scalable' : run.maturity_level >= 3 ? 'Functional' : 'Prototype';
        return `${randomName}'s project was benchmarked — Level ${run.maturity_level}: ${levelLabel} 🚀`;
      }
    });

    // We can also fetch latest 2 orders to mix in (if table exists and has data)
    try {
      const { data: orders } = await supabase
        .from('orders')
        .select('created_at, amount')
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .limit(2);
        
      if (orders && orders.length > 0) {
        orders.forEach(() => {
          const randomName = names[Math.floor(Math.random() * names.length)];
          tickerItems.push(`${randomName} just downloaded a Project Bundle 📦`);
        });
      }
    } catch (e) {
      // Ignore order errors if table is empty or schema changed
    }

    // Fallback if DB is empty
    if (tickerItems.length === 0) {
      tickerItems.push("A student just benchmarked their Next.js project — Score: 78/100 ⚡");
      tickerItems.push("Priya's project was benchmarked — Level 4: Scalable 🚀");
    }

    // Shuffle array
    const shuffled = tickerItems.sort(() => 0.5 - Math.random());

    return NextResponse.json({ tickerItems: shuffled });
  } catch (err) {
    return NextResponse.json({ 
      tickerItems: [
        "A student just benchmarked their project — Score: 82/100 ⚡",
        "Rohan's project was benchmarked — Level 5: Production Ready 🚀"
      ] 
    });
  }
}
