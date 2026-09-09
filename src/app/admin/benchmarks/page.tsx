import { createAdminClient } from '@/lib/supabase/admin';
import { AlertTriangle, ShieldCheck, GitBranch, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

export default async function AdminBenchmarksPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('benchmark_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Benchmarks</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Project benchmark scan logs</p>
        </div>
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ ...cardStyle, borderColor: 'rgba(239,68,68,0.25)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <div>
            <p className="text-red-300 font-semibold text-sm mb-1">Failed to load benchmarks</p>
            <p className="text-zinc-500 text-xs">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const runs = data ?? [];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Benchmark Runs</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Monitor lead generation from the Free AI Audit tool</p>
        </div>
      </div>

      {runs.length === 0 ? (
        <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center" style={cardStyle}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <ShieldCheck className="h-5 w-5 text-zinc-500" />
          </div>
          <p className="text-zinc-300 font-semibold text-sm mb-1">No benchmark runs yet</p>
          <p className="text-zinc-500 text-xs max-w-sm">
            When users scan their repositories using the Free AI Audit tool on the homepage, they will appear here.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={cardStyle}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Repository</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Maturity</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Score</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Scanned At</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {runs.map((run) => (
                  <tr key={run.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <GitBranch className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white flex items-center gap-1.5">
                            {run.repo_owner}/{run.repo_name}
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5 truncate max-w-[200px]">
                            {run.classification_title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {run.category}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        run.maturity_level >= 5 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        run.maturity_level >= 3 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        Level {run.maturity_level}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold">{run.score}</div>
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${run.score > 80 ? 'bg-emerald-500' : run.score > 40 ? 'bg-blue-500' : 'bg-orange-500'}`}
                            style={{ width: `${run.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-400 text-xs">
                      {new Date(run.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link 
                        href={`/benchmark/${run.id}`} 
                        target="_blank"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
