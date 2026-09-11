import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${CONSTANTS.APP_NAME} — how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="container mx-auto px-4 py-20 max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-display font-bold text-white mb-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500">
            Last updated: <span className="text-zinc-400">September 2026</span> &bull; We never sell your data
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-emerald-500/40 via-white/10 to-transparent" />
        </div>

        <p className="text-zinc-300 leading-relaxed mb-10">
          At <span className="text-white font-semibold">{CONSTANTS.APP_NAME}</span>, your privacy matters.
          This policy explains what data we collect, why we collect it, and how it is used.
        </p>

        <div className="space-y-8">

          {/* What we collect */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">What We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-1">Order Information</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  When you purchase, we collect your <strong className="text-zinc-300">Name, Email, Phone
                  Number</strong>, and optionally your College Name — the minimum needed to process
                  your order and personalise documents.
                </p>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-1">Security &amp; Anti-Piracy Logs</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Our systems automatically log your <strong className="text-zinc-300">IP address and User Agent</strong> when
                  you download a purchased bundle to prevent unauthorised link sharing and piracy.
                </p>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-1">Usage Analytics</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We use privacy-respecting analytics (Google Analytics 4) to understand which pages
                  are visited. No personally identifiable data is shared with analytics providers
                  beyond anonymised visit counts.
                </p>
              </div>
            </div>
          </section>

          {/* Payments */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Payment Processing</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              All payments are processed securely through{' '}
              <strong className="text-zinc-200">Razorpay</strong>. We do not store, process, or have
              access to your raw credit card data, UPI PINs, or banking passwords. Please review{' '}
              <a
                href="https://razorpay.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:underline"
              >
                Razorpay&apos;s Privacy Policy
              </a>{' '}
              for details on how they handle your financial information.
            </p>
          </section>

          {/* How we use data */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">How We Use Your Data</h2>
            <ul className="space-y-3">
              {[
                'Delivering the digital products you purchased via email and WhatsApp.',
                'Personalising your .docx report and PPT templates with your name and details.',
                'Providing customer support and processing refund requests.',
                'Preventing link-sharing and software piracy via download logs.',
                'Sending your order confirmation and download links by email.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Data sharing */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Data Sharing &amp; Retention</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              <strong className="text-zinc-200">We will never sell your personal data to third parties.</strong>{' '}
              Your information is shared only with service providers essential to fulfilling your
              order (Razorpay for payments, Brevo/Supabase for email delivery and database storage).
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Order records are retained for a minimum of 3 years for financial compliance. You may
              request deletion of non-essential data by contacting us at{' '}
              <a
                href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`}
                className="text-brand-400 hover:underline"
              >
                {CONSTANTS.SUPPORT_EMAIL}
              </a>.
            </p>
          </section>

          {/* Contact */}
          <div className="border border-white/5 rounded-2xl p-5 flex items-center justify-between bg-white/[0.02]">
            <p className="text-sm text-zinc-500">Privacy concerns or data requests?</p>
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
