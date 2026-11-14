import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { ProjectsCatalog } from "@/components/ui/projects-catalog";
import { Suspense } from "react";
import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { BreadcrumbsSchema, ProductSchema } from "@/components/seo/SeoSchema";
import { getAllStaticProjects } from "@/lib/static-catalog";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `Pre-Made College Projects & Production Software Systems (₹299/₹499) | ${CONSTANTS.APP_NAME}` },
  description: `Verified pre-made college projects and production software systems for resume enhancement. Includes 1-click run.bat launcher, 60-page IEEE report (.docx), Viva presentation PPT, and full source code ready to run in 60s.`,
  alternates: { canonical: '/projects' },
  keywords: [
    'pre made college projects',
    'projects for resume',
    'final year cse projects with source code',
    'production software systems',
    'ieee project report docx',
    'viva presentation ppt',
    'software systems 299',
    ...CONSTANTS.SEO_KEYWORDS,
  ],
};

/* ── Skeleton while data loads ── */
function Skeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* fake header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="shimmer-bar" style={{ height: '1.5rem', width: '18rem', borderRadius: '8px', marginBottom: '.875rem' }} />
        <div className="shimmer-bar" style={{ height: '2.5rem', width: '32rem', borderRadius: '8px', marginBottom: '.75rem', maxWidth: '100%' }} />
        <div className="shimmer-bar" style={{ height: '1.125rem', width: '26rem', borderRadius: '6px', maxWidth: '100%' }} />
      </div>
      {/* fake grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))', gap: '1.25rem' }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="card" style={{ borderRadius: '18px', overflow: 'hidden', minHeight: '24rem' }}>
            <div style={{ height: '3px', background: 'var(--line)' }} />
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <div className="shimmer-bar" style={{ height: '.875rem', width: '4rem', borderRadius: '9999px' }} />
                <div className="shimmer-bar" style={{ height: '.875rem', width: '3rem', borderRadius: '9999px' }} />
              </div>
              <div className="shimmer-bar" style={{ height: '1.25rem', width: '85%', borderRadius: '6px' }} />
              <div className="shimmer-bar" style={{ height: '1rem', width: '70%', borderRadius: '6px' }} />
              <div className="shimmer-bar" style={{ height: '5rem', borderRadius: '10px', marginTop: '.25rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginTop: '.5rem' }}>
                {[1,2,3,4].map(j => <div key={j} className="shimmer-bar" style={{ height: '.75rem', borderRadius: '6px' }} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const fetchPromise = (async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as Project[]) || [];
    })();

    // 120ms max timeout so page transitions feel instantaneous without blocking UX
    const timeoutPromise = new Promise<Project[]>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 120)
    );

    const remote = await Promise.race([fetchPromise, timeoutPromise]);
    if (remote && remote.length > 0) return remote;
  } catch {
    // Instant fallback to static catalog
  }

  return getAllStaticProjects();
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <BreadcrumbsSchema items={[{ name: 'Home', url: '/' }, { name: 'All Projects' }]} />
      <ProductSchema
        name={`SubmitKit Engineering Project Kit (Mini ₹${CONSTANTS.PRICING.MINI_PROJECT} / Major ₹${CONSTANTS.PRICING.MAJOR_PROJECT})`}
        description="Verified 1-click runnable engineering project kits with source code, IEEE Black Book, Viva PPT, and Q&A."
        price={CONSTANTS.PRICING.MAJOR_PROJECT}
        category="Academic / Engineering Project Bundle"
      />

      {/* ── Breadcrumb seamlessly on canvas ── */}
      <div className="shell" style={{ paddingTop: '1.25rem', paddingBottom: '.25rem' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', color: 'var(--ink-4)' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', color: 'var(--ink-3)', textDecoration: 'none', fontWeight: 500 }}
            className="breadcrumb-link"
          >
            <Home style={{ width: '.875rem', height: '.875rem' }} />
            Home
          </Link>
          <ChevronRight style={{ width: '.8125rem', height: '.8125rem', flexShrink: 0, opacity: 0.45 }} />
          <span style={{ color: 'var(--navy)', fontWeight: 600 }}>All Projects</span>
        </nav>
      </div>

      <div className="shell" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        <ProjectsCatalog initialProjects={projects} />
      </div>
    </div>
  );
}
