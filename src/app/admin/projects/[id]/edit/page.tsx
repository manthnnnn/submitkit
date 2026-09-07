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
          className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Edit Project</h1>
          <p className="text-zinc-500 text-sm mt-0.5 font-mono">{project.slug}</p>
        </div>
      </div>

      <ProjectForm mode="edit" projectId={id} initialData={project} />
    </div>
  );
}
