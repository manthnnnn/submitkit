import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Project } from '@/lib/types';
import ProjectForm from '../../ProjectForm';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return notFound();

  const project = data as Project;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Project</h1>
          <p className="text-slate-400 text-sm mt-0.5 font-mono">{project.slug}</p>
        </div>
      </div>
      <ProjectForm mode="edit" projectId={id} initialData={project} />
    </div>
  );
}
