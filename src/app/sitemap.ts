import { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import { TOPICS_555 } from '@/lib/blueprint-catalog-555';
import { TOPICS_EXTRA } from '@/lib/blueprint-catalog-extra';
import { TOPICS_EXTRA2 } from '@/lib/blueprint-catalog-extra2';
import { TOPICS_EXTRA3 } from '@/lib/blueprint-catalog-extra3';
import { TOPICS_EXTRA4 } from '@/lib/blueprint-catalog-extra4';
import { TOPICS_MODERN_2025 } from '@/lib/blueprint-catalog-modern2025';
import type { TopicCard } from '@/lib/blueprint-engine';

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://submitkit.in').replace(/\/$/, '');

const ALL_BLUEPRINT_TOPICS: TopicCard[] = [
  ...TOPICS_555,
  ...TOPICS_EXTRA,
  ...TOPICS_EXTRA2,
  ...TOPICS_EXTRA3,
  ...TOPICS_EXTRA4,
  ...TOPICS_MODERN_2025,
];

const BLOG_POST_SLUGS = [
  '500-final-year-project-ideas-2026-cse-aiml-iot',
  'face-recognition-attendance-system-project-report',
  'plant-disease-detection-using-cnn-python-tensorflow',
  'credit-card-fraud-detection-machine-learning-project',
  'ieee-black-book-report-format-final-year-template',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                  lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/projects`,    lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
    { url: `${BASE_URL}/blueprint`,   lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
    { url: `${BASE_URL}/terms`,       lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`,     lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/refund`,      lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/order/lookup`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POST_SLUGS.map(slug => ({
    url:             `${BASE_URL}/blog/${slug}`,
    lastModified:    now,
    changeFrequency: 'weekly' as const,
    priority:        0.85,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('projects')
      .select('slug, created_at')
      .eq('is_active', true);

    if (data) {
      projectRoutes = data.map(p => ({
        url:             `${BASE_URL}/projects/${p.slug}`,
        lastModified:    new Date(p.created_at),
        changeFrequency: 'weekly' as const,
        priority:        0.85,
      }));
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch projects:', err);
  }

  const seen = new Set<string>();
  const blueprintRoutes: MetadataRoute.Sitemap = ALL_BLUEPRINT_TOPICS
    .filter(t => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    })
    .map(topic => ({
      url:             `${BASE_URL}/blueprint/${topic.id}`,
      lastModified:    now,
      changeFrequency: 'weekly' as const,
      priority:        topic.trending ? 0.8 : 0.65,
    }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...blueprintRoutes,
  ];
}
