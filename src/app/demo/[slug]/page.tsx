import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { READY_PROJECTS, AVAILABLE_PROJECT_SLUGS } from '@/lib/available-projects';
import { CONSTANTS } from '@/lib/constants';
import { DemoBanner } from '@/components/demos/DemoBanner';
import BloodBankDemo from '@/components/demos/BloodBankDemo';
import HealthSyncDemo from '@/components/demos/HealthSyncDemo';
import SentinelPayDemo from '@/components/demos/SentinelPayDemo';
import DevForgeDemo from '@/components/demos/DevForgeDemo';
import TalentScanDemo from '@/components/demos/TalentScanDemo';
import SmartExpenseDemo from '@/components/demos/SmartExpenseDemo';
import AeroFuelDemo from '@/components/demos/AeroFuelDemo';
import PhishGuardDemo from '@/components/demos/PhishGuardDemo';
import QuickBiteDemo from '@/components/demos/QuickBiteDemo';

// Derive price from CONSTANTS — same source of truth as project cards
const DEMO_PRICES: Record<string, number> = {
  'healthcare-ehr-portal':  CONSTANTS.PRICING.MAJOR_PROJECT,
  'blood-bank-management':  CONSTANTS.PRICING.MINI_PROJECT,
  'resume-parsing-engine':  CONSTANTS.PRICING.MAJOR_PROJECT,
  'online-code-compiler':   CONSTANTS.PRICING.MAJOR_PROJECT,
  'credit-card-fraud':      CONSTANTS.PRICING.MAJOR_PROJECT,
  'phishing-detector-ai':   CONSTANTS.PRICING.MAJOR_PROJECT,
  'restaurant-qr-ordering': CONSTANTS.PRICING.MINI_PROJECT,
  'aerofuel-predictor':     CONSTANTS.PRICING.MAJOR_PROJECT,
  'smart-expense-tracker':  CONSTANTS.PRICING.MINI_PROJECT,
};

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Array.from(AVAILABLE_PROJECT_SLUGS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = READY_PROJECTS[slug];

  if (!project) {
    return {
      title: 'Demo Not Found | SubmitKit',
    };
  }

  return {
    title: `Live Interactive Demo: ${project.name} | SubmitKit`,
    description: project.oneLiner,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const project = READY_PROJECTS[slug];

  if (!project) {
    notFound();
  }

  const renderDemoContent = () => {
    switch (slug) {
      case 'blood-bank-management':
        return <BloodBankDemo />;
      case 'healthcare-ehr-portal':
        return <HealthSyncDemo />;
      case 'credit-card-fraud':
        return <SentinelPayDemo />;
      case 'online-code-compiler':
        return <DevForgeDemo />;
      case 'resume-parsing-engine':
        return <TalentScanDemo />;
      case 'smart-expense-tracker':
        return <SmartExpenseDemo />;
      case 'aerofuel-predictor':
        return <AeroFuelDemo />;
      case 'phishing-detector-ai':
        return <PhishGuardDemo />;
      case 'restaurant-qr-ordering':
        return <QuickBiteDemo />;
      default:
        notFound();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col">
      <DemoBanner
        title={project.name}
        slug={slug}
        price={DEMO_PRICES[slug] ?? CONSTANTS.PRICING.MINI_PROJECT}
      />
      <main className="flex-1 w-full">
        {renderDemoContent()}
      </main>
    </div>
  );
}
