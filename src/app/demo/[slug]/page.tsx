import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { READY_PROJECTS } from '@/lib/available-projects';
import { CONSTANTS } from '@/lib/constants';
import { DemoBanner } from '@/components/demos/DemoBanner';
import TruthLensDemo from '@/components/demos/TruthLensDemo';
import BloodBankDemo from '@/components/demos/BloodBankDemo';
import HealthSyncDemo from '@/components/demos/HealthSyncDemo';
import SentinelPayDemo from '@/components/demos/SentinelPayDemo';
import DevForgeDemo from '@/components/demos/DevForgeDemo';
import TalentScanDemo from '@/components/demos/TalentScanDemo';
import SmartExpenseDemo from '@/components/demos/SmartExpenseDemo';
import AeroFuelDemo from '@/components/demos/AeroFuelDemo';
import PhishGuardDemo from '@/components/demos/PhishGuardDemo';
import QuickBiteDemo from '@/components/demos/QuickBiteDemo';
import CropGuardDemo from '@/components/demos/CropGuardDemo';

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
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
      case 'fake-news-detector':
        return <TruthLensDemo />;
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
      case 'plant-disease-detection':
      case 'crop-disease-detector':
        return <CropGuardDemo />;
      default:
        return (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl border border-[#EAE6DF] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ⚡ Interactive System Preview
                </span>
                <span className="text-xs text-slate-500 font-mono">Status: Ready to Ship</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{project.name}</h1>
              <p className="text-slate-600 mb-6 leading-relaxed">{project.oneLiner}</p>
              
              <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#EAE6DF] mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">How It Works:</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{project.tenthGradeExplainer}</p>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-[#EAE6DF]">
                <div className="text-xs text-slate-500">
                  Full runnable source code, dataset, and IEEE documentation ready for instant download.
                </div>
                <a
                  href={`/projects/${slug}`}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm transition-colors shadow-xs"
                >
                  View Complete Kit &amp; Source Code →
                </a>
              </div>
            </div>
          </div>
        );
    }
  };

  const projectPrice = project.price ?? (project.tier === 'MAJOR' ? CONSTANTS.PRICING.MAJOR_PROJECT : CONSTANTS.PRICING.MINI_PROJECT);

  return (
    <div className="min-h-screen bg-[var(--canvas)] flex flex-col">
      <DemoBanner
        title={project.name}
        slug={slug}
        price={projectPrice}
      />
      <main className="flex-1 w-full">
        {renderDemoContent()}
      </main>
    </div>
  );
}

