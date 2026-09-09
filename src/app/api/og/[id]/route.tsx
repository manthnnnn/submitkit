import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAdminClient();
  
  const { data } = await supabase
    .from('benchmark_runs')
    .select('score, maturity_level, classification_title, repo_name, repo_owner, category')
    .eq('id', id)
    .single();

  if (!data) {
    return new Response('Not found', { status: 404 });
  }

  const score = data.score;
  const level = data.maturity_level;

  let scoreColor = '#ef4444';
  if (score >= 80) scoreColor = '#22c55e';
  else if (score >= 60) scoreColor = '#3b82f6';
  else if (score >= 40) scoreColor = '#f59e0b';

  let levelLabel = 'Prototype';
  if (level >= 5) levelLabel = 'Production Ready';
  else if (level >= 4) levelLabel = 'Scalable';
  else if (level >= 3) levelLabel = 'Functional';
  else if (level >= 2) levelLabel = 'MVP';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top gradient line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)', display: 'flex' }} />
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ fontSize: '24px', color: '#71717a', fontWeight: 600, display: 'flex' }}>
            SubmitKit Benchmark Report
          </div>
        </div>

        {/* Score Circle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: `8px solid ${scoreColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontSize: '64px', fontWeight: 800, color: 'white', display: 'flex' }}>{score}</div>
            <div style={{ fontSize: '18px', color: '#71717a', display: 'flex' }}>/100</div>
          </div>
        </div>

        {/* Repo name */}
        <div style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginTop: '28px', display: 'flex' }}>
          {data.repo_owner}/{data.repo_name}
        </div>

        {/* Classification + Level */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          <div style={{ padding: '8px 20px', borderRadius: '999px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', fontSize: '18px', fontWeight: 600, display: 'flex' }}>
            {data.classification_title}
          </div>
          <div style={{ padding: '8px 20px', borderRadius: '999px', background: `${scoreColor}20`, border: `1px solid ${scoreColor}50`, color: scoreColor, fontSize: '18px', fontWeight: 600, display: 'flex' }}>
            Level {level} — {levelLabel}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: 'absolute', bottom: '28px', color: '#52525b', fontSize: '16px', display: 'flex' }}>
          submitkit.in/benchmark — Free AI-Powered Code Audit
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
