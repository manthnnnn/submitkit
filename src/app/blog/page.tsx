import { BLOG_POSTS } from '@/lib/blog-posts';
import type { Metadata } from 'next';
import { BreadcrumbsSchema, FAQSchema } from '@/components/seo/SeoSchema';
import { BlogClient } from './BlogClient';

export const dynamic = 'force-static';
export const revalidate = 3600;

const HOME_FAQ = [
  {
    question: 'How do I choose a unique final year CSE project that gets approved?',
    answer: 'Pick a domain with clear societal or enterprise utility (e.g. Healthcare AI, Fraud Detection, IoT Smart Energy). Ensure you have a clear dataset or sensor source, and choose a project where you can benchmark at least two algorithms (e.g. Random Forest vs XGBoost) to prove academic rigor.',
  },
  {
    question: 'What is the standard IEEE Black Book format for final year submissions?',
    answer: 'The standard IEEE Black Book has 7 core chapters: 1. Introduction, 2. Literature Survey (with summary matrix of 10+ papers), 3. System Architecture & UML, 4. Methodology / Algorithm, 5. Results & Comparative Accuracy, 6. Conclusion & Future Scope, 7. References in IEEE numbered format [1], [2]. SubmitKit templates follow this exact structure.',
  },
  {
    question: 'Can I get complete source code and Black Book report from SubmitKit?',
    answer: 'Yes! SubmitKit offers verified, runnable project kits (Mini ₹299 / Major ₹499) that include 100% working source code, a 60-page IEEE format Black Book (.docx), defense PPT slides, and top 25 Viva Q&A with answers. Instant delivery via WhatsApp & Email.',
  },
  {
    question: 'How can I prepare for external examiner Viva defense?',
    answer: 'Examiners focus on three core questions: Why did you pick this algorithm? What are the limitations of your system? Can you walk me through this specific function in the code? SubmitKit includes 25 pre-written Viva answers specifically mapped to each project so you never get caught off guard.',
  },
];

export const metadata: Metadata = {
  title: 'Engineering Project Guides, 500+ Ideas & IEEE Black Book Templates | SubmitKit',
  description: 'Free engineering final year guides, CSE / AIML / IoT project ideas, IEEE Black Book report templates (.docx), and Viva defense tips. Written by verified engineers for VTU, SPPU, Mumbai, Anna, JNTU, GTU students.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbsSchema items={[{ name: 'Home', url: '/' }, { name: 'Project Guides', url: '/blog' }]} />
      <FAQSchema faqs={HOME_FAQ} />
      <BlogClient posts={BLOG_POSTS} faqs={HOME_FAQ} />
    </>
  );
}
