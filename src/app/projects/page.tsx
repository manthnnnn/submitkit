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
  title: { absolute: `Verified Engineering Projects with Source Code & IEEE Report | ${CONSTANTS.APP_NAME}` },
  description: `Browse 9+ instant-download final year engineering project kits. Full working source code, 60-page IEEE Black Book, defense PPT, and top 25 Viva Q&A. Mini ₹${CONSTANTS.PRICING.MINI_PROJECT} / Major ₹${CONSTANTS.PRICING.MAJOR_PROJECT}.`,
  alternates: { canonical: '/projects' },
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

    // 500ms timeout prevents DNS or cold-start hangs from degrading UX
    const timeoutPromise = new Promise<Project[]>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 500)
    );

    const remote = await Promise.race([fetchPromise, timeoutPromise]);
    if (remote && remote.length > 0) return remote;
  } catch {
    // Graceful fallback to static master catalog
  }

  return getAllStaticProjects();
}

async function CatalogLoader() {
  const projects = await fetchProjects();
  return <ProjectsCatalog initialProjects={projects} />;
}

export default function ProjectsPage() {
  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
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
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500 }}
            className="breadcrumb-link"
          >
            <Home style={{ width: '.875rem', height: '.875rem' }} />
            Home
          </Link>
          <ChevronRight style={{ width: '.8125rem', height: '.8125rem', flexShrink: 0 }} />
          <span style={{ color: 'var(--navy)', fontWeight: 600 }}>All Projects</span>
        </nav>
      </div>

      <div className="shell" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <Suspense fallback={<Skeleton />}>
          <CatalogLoader />
        </Suspense>
      </div>
    </div>
  );
}
