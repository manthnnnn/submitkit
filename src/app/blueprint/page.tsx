import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { BreadcrumbsSchema } from "@/components/seo/SeoSchema";
import BlueprintClient from "./BlueprintClient";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `1,078 Free Project Blueprint Topics | ${CONSTANTS.APP_NAME}` },
  description: `Browse 1,078 verified final year engineering project topic blueprints. Full IEEE roadmap, system architecture, 1-prompt AI build guide, dataset link, and top 10 Viva Q&A. AIML IoT RAG GenAI FullStack Cybersecurity.`,
  alternates: { canonical: '/blueprint' },
};

export default function BlueprintPage() {
  return (
    <>
      <BreadcrumbsSchema items={[{ name: 'Home', url: '/' }, { name: 'Project Blueprints' }]} />

      <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
        {/* Breadcrumb seamlessly on canvas */}
        <div className="shell" style={{ paddingTop: '1.25rem', paddingBottom: '.25rem' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', color: 'var(--ink-4)' }}>
            <Link href="/" className="breadcrumb-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500 }}>
              <Home style={{ width: '.875rem', height: '.875rem' }} /> Home
            </Link>
            <ChevronRight style={{ width: '.8125rem', height: '.8125rem' }} />
            <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Project Blueprints</span>
          </nav>
        </div>

        <BlueprintClient />
      </div>
    </>
  );
}
