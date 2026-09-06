import { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://submitkit.in').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/terms`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/refund`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Dynamic project pages from Supabase
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
        priority:        0.8,
      }));
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch projects:', err);
  }

  return [...staticRoutes, ...projectRoutes];
}
