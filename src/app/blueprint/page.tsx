import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { BreadcrumbsSchema, ProductSchema } from "@/components/seo/SeoSchema";
import BlueprintClient from "./BlueprintClient";
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `1,000+ Final Year Project Blueprint Topics (₹${CONSTANTS.PRICING.BLUEPRINT}) | ${CONSTANTS.APP_NAME}` },
  description: `Browse 1,000+ verified final year engineering project topic blueprints for just ₹${CONSTANTS.PRICING.BLUEPRINT} each. Full IEEE roadmap, system architecture, 1-prompt AI build guide, dataset link, and top 10 Viva Q&A. AIML IoT RAG GenAI FullStack Cybersecurity DataScience. CSE BE BTech MCA VTU SPPU Mumbai Anna JNTU GTU. Topic approval in 30 minutes.`,
  keywords: [
    ...CONSTANTS.SEO_KEYWORDS,
    'project topic ideas',
    'final year project topic selection',
    'engineering project roadmap',
    'ieee project blueprint',
    'viva questions and answers',
    'ai build prompt',
    'project topic approval',
    'mini project ideas for cse',
    'major project topics',
    'startup ideas engineering',
    'rag project ideas',
    'iot project topics',
    'full stack project ideas',
    'cybersecurity final year projects',
  ],
  alternates: {
    canonical: '/blueprint',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: `${CONSTANTS.APP_URL}/blueprint`,
    title: `1,000+ Final Year Project Blueprint Topics (₹${CONSTANTS.PRICING.BLUEPRINT}) | ${CONSTANTS.APP_NAME}`,
    description: `1,000+ verified engineering project topic roadmaps. IEEE format roadmap, 1-prompt AI build guide, dataset, Viva Q&A. Just ₹${CONSTANTS.PRICING.BLUEPRINT}.`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `1,000+ Project Blueprint Topics for Final Year (₹${CONSTANTS.PRICING.BLUEPRINT})`,
    description: `Full topic roadmaps with system architecture, 1-prompt AI build guide, dataset link, and top 10 Viva Q&A. Topic approval guaranteed.`,
    images: ['/og-image.jpg'],
  },
};

export default function BlueprintPage() {
  return (
    <>
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Project Blueprints' },
      ]} />
      <ProductSchema
        name={`SubmitKit Topic Blueprint Starter (₹${CONSTANTS.PRICING.BLUEPRINT}) - 1,000+ Engineering Topics`}
        description={`Any final year engineering topic roadmap: complete IEEE format outline, system architecture diagram guide, 1-prompt AI build guide, mock dataset reference, and top 10 Viva Q&A with examiner answers. Just ₹${CONSTANTS.PRICING.BLUEPRINT}. Instant WhatsApp & email delivery. Perfect for students seeking topic approval before committing to full source code.`}
        price={CONSTANTS.PRICING.BLUEPRINT}
        category="Project Blueprint / Topic Roadmap / Exam Preparation"
      />
      <div className="min-h-screen relative">
        <div className="container mx-auto px-4 py-6 relative z-10 max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-2 mt-2">
            <ol className="flex items-center gap-2 text-xs text-zinc-500">
              <li>
                <Link href="/" className="hover:text-emerald-400 inline-flex items-center gap-1">
                  <Home className="w-3 h-3" /> Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-zinc-300 font-medium">Project Blueprints</li>
            </ol>
          </nav>
        </div>
        <BlueprintClient />
      </div>
    </>
  );
}
