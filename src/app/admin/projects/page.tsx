import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Project } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const supabase = createAdminClient();
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-error-400">Failed to load projects: {error.message}</div>;
  }

  const typedProjects = projects as Project[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add New Project
        </button>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-sm">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Tier</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {typedProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-medium">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded font-bold ${p.tier === 'MAJOR' ? 'bg-accent-500/20 text-accent-400' : 'bg-brand-500/20 text-brand-400'}`}>
                      {p.tier}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">{p.category}</td>
                  <td className="p-4 text-slate-300">{formatCurrency(p.price_inr)}</td>
                  <td className="p-4">
                    {p.is_active ? 
                      <span className="flex items-center gap-1 text-success-400 text-xs font-medium"><CheckCircle2 className="w-4 h-4"/> Active</span> : 
                      <span className="flex items-center gap-1 text-slate-500 text-xs font-medium"><XCircle className="w-4 h-4"/> Draft</span>
                    }
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-brand-400 hover:text-brand-300 text-sm font-medium mr-3">Edit</button>
                  </td>
                </tr>
              ))}
              {typedProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
