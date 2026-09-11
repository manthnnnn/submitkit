import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: `Refund Policy for ${CONSTANTS.APP_NAME}. All digital sales are final. One narrow technical exception applies.`,
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="container mx-auto px-4 py-20 max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-display font-bold text-white mb-3 tracking-tight">
            Refund Policy
          </h1>
          <p className="text-sm text-zinc-500">
            Last updated: <span className="text-zinc-400">September 2026</span> &bull; Effective on all purchases
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-error-500/40 via-white/10 to-transparent" />
        </div>

        {/* All sales final — the primary statement */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            All Sales Are Final
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed mb-3">
            <span className="text-white font-semibold">{CONSTANTS.APP_NAME}</span> sells
            digital goods that are delivered instantly upon payment. Because the product is
            electronically transferred and immediately accessible to you, <strong className="text-white">
            all purchases are non-refundable by default</strong> — in accordance with the
            Indian Consumer Protection (E-Commerce) Rules 2020 and the Information Technology
            Act 2000 regarding intangible digital deliverables.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We strongly encourage you to review the live project demo, deliverable details,
            and tech stack listed on each product page <strong className="text-zinc-200">before
            completing your purchase</strong>. By proceeding to payment you confirm you have
            done so and accept this policy.
          </p>
        </div>

        <div className="space-y-6">

          {/* The one exception */}
          <section className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              The One Exception: Verified Technical Failure
            </h2>
            <p className="text-zinc-400 text-xs mb-4 ml-4">
              We stand behind every kit. If the code is genuinely broken, we will make it right.
            </p>

            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              If the provided <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs text-zinc-200">run.bat</code> or{' '}
              <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs text-zinc-200">run.sh</code> script
              fails to launch the application on a <strong className="text-white">clean, standard
              environment</strong> (meeting the documented prerequisites) due to a defect in our
              delivered files, you may submit a support request within{' '}
              <strong className="text-white">24 hours of purchase</strong>.
            </p>

            <div className="bg-black/30 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-bold text-zinc-200 mb-3">How to Claim:</h3>
              <ol className="space-y-2.5 text-sm text-zinc-400 list-none">
                {[
                  'Take a clear screenshot of your terminal showing the full error output.',
                  'Confirm you are using the documented prerequisite versions (e.g., Python 3.10+, Node 18+, fresh virtual environment).',
                  `Email the screenshot and your Order ID to ${CONSTANTS.SUPPORT_EMAIL} with subject line: "Technical Failure — Order #[YOUR_ORDER_ID]".`,
                  'Our team will verify the defect within 24 business hours.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-amber-300 mb-1">Resolution Options</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Upon verification of a genuine defect, we will, at our sole discretion, offer either:
                (a) a <strong className="text-zinc-200">bug-fixed replacement bundle</strong> delivered
                within 48 hours, or (b) a <strong className="text-zinc-200">store credit</strong> of equal
                value redeemable on any {CONSTANTS.APP_NAME} product.{' '}
                <strong className="text-amber-300">Cash / payment-gateway refunds are not provided
                under any circumstances.</strong>
              </p>
            </div>
          </section>

          {/* Non-refundable scenarios */}
          <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Non-Refundable Scenarios (No Exceptions)
            </h2>
            <ul className="space-y-3">
              {[
                {
                  title: '"I changed my mind" or "Wrong project purchased"',
                  detail: 'Please thoroughly review the product page, live demo, and tech stack before purchase. We cannot accept returns for buyer&apos;s remorse.',
                },
                {
                  title: 'Unable to explain the code during viva or academic evaluation',
                  detail: 'You are expected to study and understand the code. Failure to defend it during examination is not a product defect.',
                },
                {
                  title: 'Code modified after download and then broken',
                  detail: 'Any errors introduced by your own changes to the original source files void the technical guarantee entirely.',
                },
                {
                  title: 'Environment or prerequisite mismatch',
                  detail: 'Errors caused by missing dependencies, incompatible OS versions, or running on an unsupported Python/Node version are not covered.',
                },
                {
                  title: 'Request submitted after 24 hours of purchase',
                  detail: 'Claims received more than 24 hours after the order timestamp will not be considered under any circumstances.',
                },
                {
                  title: 'Partial use or partial download',
                  detail: 'Accessing, opening, or extracting any part of the delivered bundle constitutes full acceptance of the product.',
                },
              ].map((item) => (
                <li key={item.title} className="border border-white/5 rounded-xl p-4">
                  <p className="text-sm font-semibold text-zinc-200 mb-1">✕ &nbsp;{item.title}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
                </li>
              ))}
            </ul>
          </section>

          {/* Chargebacks warning */}
          <section className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">
              Fraudulent Chargebacks
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Initiating a payment-gateway chargeback or bank dispute for a valid, delivered digital
              order — rather than contacting us first — constitutes chargeback fraud. We retain full
              delivery logs, download records, IP addresses, and email confirmations for every order.
              These records will be submitted as evidence to Razorpay and relevant authorities. We
              reserve the right to pursue recovery of funds and associated dispute fees.
            </p>
          </section>

          {/* Contact */}
          <div className="border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02]">
            <div>
              <p className="text-sm text-zinc-300 font-medium">Have a genuine technical issue?</p>
              <p className="text-xs text-zinc-500 mt-0.5">Email us with your Order ID and error screenshot.</p>
            </div>
            <a
              href={`mailto:${CONSTANTS.SUPPORT_EMAIL}?subject=Technical Failure — Order %23`}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all font-medium"
            >
              {CONSTANTS.SUPPORT_EMAIL}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
