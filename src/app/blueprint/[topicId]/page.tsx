import { getTopicById } from "@/lib/blueprint-engine";
import { notFound } from "next/navigation";
import BlueprintDetailClient from "./BlueprintDetailClient";
import { Metadata } from "next";
import { BlueprintSchema, BreadcrumbsSchema } from "@/components/seo/SeoSchema";
import { CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { Home, ChevronRight, ArrowLeft } from "lucide-react";

const BASE_URL = CONSTANTS.APP_URL.replace(/\/$/, '');

export async function generateMetadata({ params }: { params: Promise<{ topicId: string }> }): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  const title = `${topic.title} Final Year Project Blueprint | ${CONSTANTS.APP_NAME}`;
  const description = `${topic.tagline || topic.whatItDoes} Full step-by-step roadmap, IEEE report outline, system architecture, dataset name, top ${topic.freeVivaQuestions?.length || 10} Viva Q&A. 100% Free Topic Blueprint.`;

  return {
    title: { absolute: title },
    description,
    keywords: [topic.title, `${topic.title} project`, `${topic.title} viva questions`, `${topic.category} final year project`, 'ieee format report', 'viva preparation'],
    alternates: { canonical: `/blueprint/${topic.id}` },
    openGraph: {
      type: "article", locale: "en_IN", title, description,
      url: `${BASE_URL}/blueprint/${topic.id}`,
      siteName: CONSTANTS.APP_NAME,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ['/og-image.jpg'] },
  };
}

export default async function BlueprintTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  return (
    <>
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Project Blueprints', url: '/blueprint' },
        { name: topic.title },
      ]} />
      <BlueprintSchema
        title={topic.title}
        description={topic.tagline || topic.whatItDoes}
        topicId={topic.id}
        category={topic.category}
        keywords={[topic.title, `${topic.title} project`, `${topic.category} final year project`]}
      />

      <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
        {/* Breadcrumb bar — warm glassmorphic blend */}
        <div style={{ background: 'rgba(253, 251, 247, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)', position: 'sticky', top: '64px', zIndex: 40 }}>
          <div className="shell" style={{ padding: '.875rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', color: 'var(--ink-4)', minWidth: 0 }}>
              <Link href="/" style={{ color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '.25rem' }}>
                <Home style={{ width: '.8125rem', height: '.8125rem' }} /> Home
              </Link>
              <ChevronRight style={{ width: '.75rem', height: '.75rem', flexShrink: 0 }} />
              <Link href="/blueprint" style={{ color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500 }}>Blueprints</Link>
              <ChevronRight style={{ width: '.75rem', height: '.75rem', flexShrink: 0 }} />
              <span style={{ color: 'var(--navy)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '16rem' }}>{topic.title}</span>
            </nav>
            <Link href="/blueprint" style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', fontWeight: 600, color: 'var(--teal-dark)', textDecoration: 'none', flexShrink: 0, marginLeft: '1rem' }}>
              <ArrowLeft style={{ width: '.875rem', height: '.875rem' }} /> All Topics
            </Link>
          </div>
        </div>

        <BlueprintDetailClient topic={topic} />
      </div>
    </>
  );
}
