import { MetadataRoute } from 'next';
import { CONSTANTS } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Amazonbot',
          'Applebot-Extended',
          'cohere-ai',
        ],
        allow: ['/', '/custom', '/projects', '/blueprint', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${CONSTANTS.APP_URL}/sitemap.xml`,
  };
}
