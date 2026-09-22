import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { ProjectsCatalog } from "@/components/ui/projects-catalog";
import { ProjectsCatalogSkeleton } from "@/components/ui/project-card-skeleton";
import { Suspense } from "react";
import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { BreadcrumbsSchema, ProductSchema } from "@/components/seo/SeoSchema";
import Link from "next/link";
import { Home } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `Verified Engineering Projects with Source Code & IEEE Report | ${CONSTANTS.APP_NAME}` },
  description: `Browse 9+ instant-download final year engineering project kits (mini ₹${CONSTANTS.PRICING.MINI_PROJECT} / major ₹${CONSTANTS.PRICING.MAJOR_PROJECT}). Full working source code, 60-page IEEE Black Book report (.docx), Viva defense PPT slides, and top 25 Q&A. CSE AIML IoT FullStack Cybersecurity. BE BTech MCA. VTU SPPU Mumbai Anna JNTU GTU. Instant WhatsApp download.`,
  keywords: [
    ...CONSTANTS.SEO_KEYWORDS,
    'buy final year project india',
    'engineering project with source code',
    'ieee project with report and ppt',
    'ready made engineering projects',
    'instant download project kit',
    'major project for cse',
    'mini project kit',
  ],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: `${CONSTANTS.APP_URL}/projects`,
    title: `Verified Engineering Projects with Source Code & IEEE Report (₹${CONSTANTS.PRICING.MINI_PROJECT}) | ${CONSTANTS.APP_NAME}`,
    description: `Browse instant-download engineering final year project kits. Full source code, IEEE Black Book, PPT, Viva Q&A. Mini ₹${CONSTANTS.PRICING.MINI_PROJECT} Major ₹${CONSTANTS.PRICING.MAJOR_PROJECT}.`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Engineering Project Kits with Source Code & IEEE Report (₹${CONSTANTS.PRICING.MINI_PROJECT})`,
    description: `Mini ₹${CONSTANTS.PRICING.MINI_PROJECT} / Major ₹${CONSTANTS.PRICING.MAJOR_PROJECT}. Instant download. Code + IEEE Report + PPT + Viva Q&A.`,
    images: ['/og-image.jpg'],
  },
};

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
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'All Projects' },
      ]} />
      <ProductSchema
        name={`SubmitKit All-in-One Engineering Project Kit (Mini ₹${CONSTANTS.PRICING.MINI_PROJECT} / Major ₹${CONSTANTS.PRICING.MAJOR_PROJECT})`}
        description={`Verified 1-click runnable engineering project kits with full source code, IEEE format Black Book report, Viva PPT, and exam Q&A. Major (Sem 7/8 Final Year) ₹${CONSTANTS.PRICING.MAJOR_PROJECT}. Mini (Sem 5/6) ₹${CONSTANTS.PRICING.MINI_PROJECT}. Blueprint Starter ₹${CONSTANTS.PRICING.BLUEPRINT}.`}
        price={CONSTANTS.PRICING.MAJOR_PROJECT}
        category="Academic / Engineering Project Bundle"
      />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-brand-500/8 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Breadcrumb bar for users + accessibility */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-500">
            <li>
              <Link href="/" className="hover:text-emerald-400 inline-flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-300 font-medium">All Projects</li>
          </ol>
        </nav>

        <Suspense fallback={<ProjectsCatalogSkeleton />}>
          <CatalogLoader />
        </Suspense>
      </div>
    </div>
  );
}
