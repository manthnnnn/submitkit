import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Read the Terms of Service for ${CONSTANTS.APP_NAME} — India's premier academic project marketplace.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="container mx-auto px-4 py-20 max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-display font-bold text-white mb-3 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-500">
            Last updated: <span className="text-zinc-400">September 2026</span> &bull; Effective immediately
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-brand-500/40 via-white/10 to-transparent" />
        </div>

        {/* Intro */}
        <p className="text-zinc-300 leading-relaxed mb-10">
          Welcome to <span className="text-white font-semibold">{CONSTANTS.APP_NAME}</span>. By
          accessing or purchasing from our platform, you agree to be bound by these Terms of Service.
          Please read them carefully before making a purchase.
        </p>

        <div className="space-y-8">

          {/* 1 */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold shrink-0">1</span>
              Product Nature &amp; Intended Use
            </h2>
            <div className="bg-brand-500/5 border border-brand-500/15 rounded-xl p-4 mb-4">
              <h3 className="text-brand-400 font-semibold text-sm mb-1">Educational Reference Kits</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                All materials provided — source code, architecture blueprints, and documentation drafts
                — are intended strictly for <strong className="text-zinc-200">educational research, rapid prototyping,
                and baseline reference</strong>. Customers are expected to build upon, customise, and defend
                their own implementations in accordance with their institution&apos;s academic integrity policies.
              </p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We do not sell &ldquo;ready-made degrees&rdquo; or guarantee any specific academic grade. You are
              solely responsible for understanding the codebase and successfully defending it during
              your evaluations.
            </p>
          </section>

          {/* 2 */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold shrink-0">2</span>
              Intellectual Property
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              Our project kits are built on open-source technologies (MIT, Apache 2.0). The
              proprietary assembly, formatting, documentation templates, and presentation structures
              provided by {CONSTANTS.APP_NAME} remain our intellectual property.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              You are granted a <strong className="text-zinc-200">single-user, non-transferable licence</strong> for
              personal educational use. You may not resell, redistribute, or publish downloaded bundles
              on public repositories (e.g., public GitHub) without substantial modification.
            </p>
          </section>

          {/* 3 */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold shrink-0">3</span>
              Download Limits &amp; Anti-Piracy
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Upon purchase, you are granted a maximum of{' '}
              <strong className="text-zinc-200">{CONSTANTS.LIMITS.MAX_DOWNLOADS} download attempts</strong>.
              Download links expire after{' '}
              <strong className="text-zinc-200">{CONSTANTS.LIMITS.DOWNLOAD_LINK_TTL_SECONDS / 60} minutes</strong>{' '}
              for security. We log IP addresses and user agents to prevent unauthorised link sharing and
              piracy.
            </p>
          </section>

          {/* 4 */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold shrink-0">4</span>
              Payments &amp; Pricing
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              All transactions are processed securely through Razorpay. Prices are listed in Indian
              Rupees (INR) inclusive of applicable taxes. {CONSTANTS.APP_NAME} reserves the right to
              change pricing at any time without notice. Orders are charged at the price displayed at
              the time of checkout.
            </p>
          </section>

          {/* 5 */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold shrink-0">5</span>
              Limitation of Liability
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {CONSTANTS.APP_NAME} is not liable for any academic penalties, institutional sanctions,
              or consequential damages arising from your use of our materials. The maximum liability
              to you in any circumstance is limited to the amount you paid for the specific product
              in question.
            </p>
          </section>

          {/* Contact */}
          <div className="border border-white/5 rounded-2xl p-5 flex items-center justify-between bg-white/[0.02]">
            <p className="text-sm text-zinc-500">
              Questions about these terms?
            </p>
            <a
              href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`}
              className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              {CONSTANTS.SUPPORT_EMAIL}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
