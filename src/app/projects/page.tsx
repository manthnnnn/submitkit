import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { ProjectsCatalog } from "@/components/ui/projects-catalog";
import { Suspense } from "react";

// Revalidate every hour; switching tabs is now instant (client-side useState)
export const revalidate = 3600;

async function fetchProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as Project[]) || [];
}

export default async function ProjectsPage() {
  let allProjects: Project[] = [];

  try {
    allProjects = await fetchProjects();
  } catch (err) {
    // One retry before giving up gracefully
    try {
      allProjects = await fetchProjects();
    } catch {
      allProjects = [];
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090b]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/8 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <ProjectsCatalog initialProjects={allProjects} />
      </div>
    </div>
  );
}
