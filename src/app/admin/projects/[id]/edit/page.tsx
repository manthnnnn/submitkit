import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Project } from '@/lib/types';
import ProjectForm from '../../ProjectForm';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error || !data) return notFound();
  const project = data as Project;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 bg-white border border-slate-200 shadow-xs transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Edit Project Kit</h1>
          <p className="text-slate-500 text-sm mt-0.5 font-mono">{project.slug}</p>
        </div>
      </div>

      <ProjectForm mode="edit" projectId={id} initialData={project} />
    </div>
  );
}
