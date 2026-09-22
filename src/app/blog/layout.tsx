import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Final Year Project Guides & Project Idea Blog | SubmitKit',
  description: 'Free final year project guides for CSE, AIML, IoT, MCA & BE students. IEEE Black Book format templates, 500+ project ideas, 25 Viva Q&A per topic, top project reports 2026.',
  keywords: [
    ...CONSTANTS.SEO_KEYWORDS,
    'final year project blog',
    'ieee report template',
    'project idea blog',
    'viva questions answers',
    'free final year project guide',
    'cse project report sample',
    'aiml project tutorial',
    'ieee black book guide',
    'project report writing tips',
    'sem 5 sem 6 sem 7 sem 8 projects',
    'vtu project report format',
    'sppu project report template',
    'mumbai university final year report',
    'anna university project format',
    'jntu black book report',
    'gtu final year project guide',
  ],
  alternates: { canonical: '/blog' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true, follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Final Year Project Guides & Project Idea Blog | SubmitKit',
    description: '500+ project ideas, IEEE Black Book templates, 25+ Viva Q&A per topic & complete project guides for CSE, AIML, IoT, MCA, BE/BTech 2026.',
    type: 'website',
    locale: 'en_IN',
    url: '/blog',
    siteName: CONSTANTS.APP_NAME,
    images: [{
      url: `${CONSTANTS.APP_URL}/og-image.jpg`,
      width: 1200, height: 630,
      alt: 'SubmitKit Blog — Final Year Project Guides & IEEE Report Templates',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Final Year Project Guides & Project Idea Blog | SubmitKit',
    description: '500+ project ideas, IEEE Black Book templates, 25+ Viva Q&A per topic & complete project guides for CSE, AIML, IoT, MCA, BE/BTech 2026.',
    creator: '@submitkit.in',
    images: [`${CONSTANTS.APP_URL}/og-image.jpg`],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
