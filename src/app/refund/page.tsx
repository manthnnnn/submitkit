import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: `Refund Policy for ${CONSTANTS.APP_NAME}. All digital sales are final with one narrow technical exception.`,
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.8, margin: 0 }}>{children}</p>
);

export default function RefundPage() {
  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '.6875rem', fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Legal</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em', margin: '.75rem 0 .5rem' }}>
            Refund Policy
          </h1>
          <p style={{ fontSize: '.875rem', color: 'var(--ink-4)' }}>Last updated: September 2026 · Effective on all purchases</p>
          <div style={{ height: '3px', width: '3rem', background: 'var(--teal)', borderRadius: '9999px', marginTop: '1rem' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* All sales final */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--sh-xs)' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.875rem' }}>All Sales Are Final</h2>
            <p style={{ fontSize: '.9375rem', color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: '.75rem' }}>
              <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{CONSTANTS.APP_NAME}</span> sells digital goods delivered instantly upon payment. Because the product is electronically transferred and immediately accessible, <strong style={{ color: 'var(--navy)' }}>all purchases are non-refundable by default</strong>.
            </p>
            <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', lineHeight: 1.75, margin: 0 }}>
              We strongly encourage you to review the live demo, deliverable details, and tech stack before completing your purchase. By proceeding to payment you confirm you have done so and accept this policy.
            </p>
          </div>

          {/* The exception */}
          <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', margin: '0 0 .375rem' }}>The One Exception: Verified Technical Failure</h2>
              <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', margin: 0 }}>We stand behind every kit. If the code is genuinely broken, we will make it right.</p>
            </div>
            <P>If the provided <code style={{ background: 'var(--teal-50)', border: '1px solid var(--teal-100)', padding: '.125rem .375rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '.8125rem', color: 'var(--teal-dark)' }}>run.bat</code> or <code style={{ background: 'var(--teal-50)', border: '1px solid var(--teal-100)', padding: '.125rem .375rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '.8125rem', color: 'var(--teal-dark)' }}>run.sh</code> script fails to launch on a clean, standard environment due to a defect in our delivered files, you may submit a support request within <strong style={{ color: 'var(--navy)' }}>24 hours of purchase</strong>.</P>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1rem' }}>
              <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.875rem' }}>How to Claim:</h3>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: '.625rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {[
                  'Take a screenshot of your terminal showing the full error output.',
                  'Confirm you are using the documented prerequisite versions (Python 3.10+, Node 18+).',
                  `Email the screenshot and your Order ID to ${CONSTANTS.SUPPORT_EMAIL} with subject: "Technical Failure — Order #[YOUR_ORDER_ID]".`,
                  'Our team will verify the defect within 24 business hours.',
                ].map((step, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
                    <span style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal-dark)', flexShrink: 0, marginTop: '.0625rem' }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-100)', borderRadius: '12px', padding: '1rem' }}>
              <h3 style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '.375rem' }}>Resolution Options</h3>
              <P>Upon verification, we offer either: (a) a <strong style={{ color: 'var(--navy)' }}>bug-fixed replacement bundle</strong> within 48 hours, or (b) a <strong style={{ color: 'var(--navy)' }}>store credit</strong> of equal value. <strong style={{ color: 'var(--amber)' }}>Cash / payment-gateway refunds are not provided under any circumstances.</strong></P>
            </div>
          </div>

          {/* Non-refundable */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Non-Refundable Scenarios (No Exceptions)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
              {[
                { t: '"I changed my mind" or "Wrong project purchased"', d: 'Please thoroughly review the product page, live demo, and tech stack before purchase.' },
                { t: 'Unable to explain the code during viva', d: 'You are expected to study and understand the code. Exam failure is not a product defect.' },
                { t: 'Code modified after download and then broken', d: 'Errors introduced by your own changes void the technical guarantee entirely.' },
                { t: 'Environment or prerequisite mismatch', d: 'Errors caused by incompatible OS versions or unsupported runtime versions are not covered.' },
                { t: 'Request submitted after 24 hours of purchase', d: 'Claims received more than 24 hours after the order timestamp will not be considered.' },
                { t: 'Partial use or partial download', d: 'Accessing, opening, or extracting any part of the bundle constitutes full acceptance.' },
              ].map(item => (
                <div key={item.t} style={{ border: '1px solid var(--line)', borderRadius: '10px', padding: '.875rem 1rem' }}>
                  <p style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--rose)', marginBottom: '.25rem' }}>✕ &nbsp;{item.t}</p>
                  <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', lineHeight: 1.65, margin: 0 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', padding: '1.125rem 1.375rem', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <div>
              <p style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 .125rem' }}>Have a genuine technical issue?</p>
              <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', margin: 0 }}>Email us with your Order ID and error screenshot.</p>
            </div>
            <a href={`mailto:${CONSTANTS.SUPPORT_EMAIL}?subject=Technical Failure — Order %23`} style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}>{CONSTANTS.SUPPORT_EMAIL}</a>
          </div>

        </div>
      </div>
    </div>
  );
}
