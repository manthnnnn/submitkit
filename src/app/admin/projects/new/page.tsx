import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProjectForm from '../ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Project</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Create the Supabase record. Upload the ZIP separately via the upload script, then paste the storage key in the Edit form.
          </p>
        </div>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
