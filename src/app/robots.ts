import { MetadataRoute } from 'next';
import { CONSTANTS } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${CONSTANTS.APP_URL}/sitemap.xml`,
  };
}
