import { ProjectsCatalogSkeleton } from "@/components/ui/project-card-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090b]">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/8 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <ProjectsCatalogSkeleton />
      </div>
    </div>
  );
}
