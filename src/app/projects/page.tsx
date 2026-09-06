import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { ProjectsCatalog } from "@/components/ui/projects-catalog";
import { ProjectsCatalogSkeleton } from "@/components/ui/project-card-skeleton";
import { Suspense } from "react";

// Revalidate once per hour; tab switching is instant (client-side useState)
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

async function CatalogLoader() {
  let projects: Project[] = [];
  try {
    projects = await fetchProjects();
  } catch {
    try { projects = await fetchProjects(); } catch { projects = []; }
  }
  return <ProjectsCatalog initialProjects={projects} />;
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090b]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-brand-500/8 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/*
          Suspense boundary: shows premium skeleton while the server component
          fetches from Supabase, then streams in the real catalog.
          No more "blank white flash" or spinner — content-shaped skeleton instead.
        */}
        <Suspense fallback={<ProjectsCatalogSkeleton />}>
          <CatalogLoader />
        </Suspense>
      </div>
    </div>
  );
}
