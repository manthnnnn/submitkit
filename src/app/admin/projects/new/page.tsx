import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProjectForm from '../ProjectForm';

export default function NewProjectPage() {
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
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">New Project Kit</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Create and configure a project kit for the SubmitKit catalog.
          </p>
        </div>
      </div>

      <ProjectForm mode="create" />
    </div>
  );
}
