import { getTopicById } from "@/lib/blueprint-engine";
import { notFound } from "next/navigation";
import BlueprintDetailClient from "./BlueprintDetailClient";
import { Metadata } from "next";
import { BlueprintSchema, BreadcrumbsSchema } from "@/components/seo/SeoSchema";
import { CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { Home } from "lucide-react";

const BASE_URL = CONSTANTS.APP_URL.replace(/\/$/, '');

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  if (!topic) return { title: 'Topic Not Found', robots: { index: false, follow: false } };

  const title = `${topic.title} Final Year Project Blueprint (Roadmap, PPT & Viva) | ${CONSTANTS.APP_NAME}`;
  const description = `${topic.tagline || topic.whatItDoes} Full step-by-step roadmap, IEEE report outline, system architecture, dataset name, top ${topic.freeVivaQuestions?.length || 10} external examiner Viva questions & answers. Mini/Mid/Major final year project for CSE BE BTech MCA VTU SPPU Mumbai Anna JNTU GTU. Blueprint only ₹${CONSTANTS.PRICING.BLUEPRINT}.`;
  const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  const extraKeywords: string[] = [];
  if (topic.difficulty >= 4) extraKeywords.push('major project', 'capstone project', 'final year major');
  else if (topic.difficulty <= 2) extraKeywords.push('mini project', 'sem 5 project', 'sem 6 project', 'beginner project');
  else extraKeywords.push('sem 7 project', 'sem 8 project', 'mid-level project');
  if (topic.trending) extraKeywords.push('trending project', 'high demand project');

  return {
    title: { absolute: title },
    description,
    keywords: [
      topic.title,
      `${topic.title} project report`,
      `${topic.title} source code`,
      `${topic.title} viva questions`,
      `${topic.title} ppt`,
      `${topic.title} roadmap`,
      `${topic.title} for final year`,
      `${topic.category.toLowerCase()} final year project`,
      `${topic.title.toLowerCase()} project`,
      `ieee ${topic.title.toLowerCase().split(' ').slice(0, 3).join(' ')}`,
      ...extraKeywords,
      'ieee format report',
      'black book report',
      'viva preparation',
      'cse btech be mca project',
      'vtu sppu mumbai anna jntu gtu',
      'engineering project blueprint',
    ],
    alternates: {
      canonical: `/blueprint/${topic.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      title,
      description,
      url: `${BASE_URL}/blueprint/${topic.id}`,
      siteName: CONSTANTS.APP_NAME,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${topic.title} project blueprint` }],
      publishedTime: "2026-01-01T00:00:00Z",
      modifiedTime: new Date().toISOString(),
      tags: [
        topic.title,
        topic.category,
        "Engineering Projects",
        "Final Year Project",
        "IEEE Report",
        "Viva Preparation",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function BlueprintTopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  if (!topic) {
    notFound();
  }

  const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const pageKeywords = [
    topic.title,
    `${topic.title} project report`,
    `${topic.title} source code`,
    `${topic.title} viva questions`,
    `${topic.category} final year project`,
  ];

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
        keywords={pageKeywords}
      />
      <div className="min-h-screen relative">
        <div className="container mx-auto px-4 py-4 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-2 mt-2">
            <ol className="flex items-center gap-2 text-xs text-zinc-500">
              <li>
                <Link href="/" className="hover:text-emerald-400 inline-flex items-center gap-1">
                  <Home className="w-3 h-3" /> Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blueprint" className="hover:text-emerald-400">
                  Project Blueprints
                </Link>
              </li>
              <li>/</li>
              <li className="text-zinc-300 font-medium truncate max-w-[320px]" title={topic.title}>
                {topic.title}
              </li>
            </ol>
          </nav>
        </div>
        <BlueprintDetailClient topic={topic} />
      </div>
    </>
  );
}
