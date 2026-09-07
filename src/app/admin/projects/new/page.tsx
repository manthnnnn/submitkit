import Link from 'next/link';
import { ChevronLeft, Plus } from 'lucide-react';
import ProjectForm from '../ProjectForm';

export default function NewProjectPage() {
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
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">New Project</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Create the catalog record — upload the ZIP separately via the upload script, then paste the storage key in Edit
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs max-w-2xl"
        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <span className="text-brand-400 text-base">💡</span>
        <span className="text-zinc-400">
          Set <span className="text-zinc-200 font-medium">is_active = Draft</span> until you&apos;ve uploaded the ZIP and filled in the R2 storage key.
        </span>
      </div>

      <ProjectForm mode="create" />
    </div>
  );
}
