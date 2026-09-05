import { CONSTANTS } from '@/lib/constants';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-display font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none text-slate-300">
        <p className="lead text-lg mb-8">
          Welcome to {CONSTANTS.APP_NAME}. By accessing or using our platform, you agree to be bound by these terms.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. Product Framing & Intended Use</h2>
          <div className="bg-brand-500/10 border border-brand-500/20 p-6 rounded-lg mb-4">
            <h3 className="text-brand-400 font-bold mb-2">Educational Reference Kits</h3>
            <p>
              The materials provided (source code, architecture blueprints, and documentation drafts) are intended strictly for educational research, rapid prototyping, and baseline reference. Customers are expected to build upon, customize, and defend their own project implementations in accordance with their academic institution’s integrity policies.
            </p>
          </div>
          <p>
            We do not sell "ready-made degrees" or guarantee any specific academic grades. You are solely responsible for understanding the codebase and successfully defending it during your evaluations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
          <p>
            Our project baselines are built using open-source technologies (e.g., MIT, Apache 2.0). The proprietary assembly, formatting, documentation templates, and presentation structures provided by {CONSTANTS.APP_NAME} remain our intellectual property.
          </p>
          <p>
            You are granted a single-user license for personal, educational use. You may not resell, redistribute, or publish the downloaded bundles on public repositories (e.g., public GitHub) without substantial modification.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">3. Download Limits & Anti-Piracy</h2>
          <p>
            Upon purchase, you are granted a maximum of {CONSTANTS.LIMITS.MAX_DOWNLOADS} download attempts. Download links expire after {CONSTANTS.LIMITS.DOWNLOAD_LINK_TTL_SECONDS / 60} minutes for security. We log IP addresses and user agents to prevent unauthorized link sharing and piracy.
          </p>
        </section>
      </div>
    </div>
  );
}
