import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${CONSTANTS.APP_NAME} — how we collect, use, and protect your data.`,
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }} >
    {children}
  </section>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.8, margin: 0 }}>{children}</p>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.8, margin: 0 }}>{children}</p>
);

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '.6875rem', fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Legal</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em', margin: '.75rem 0 .5rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '.875rem', color: 'var(--ink-4)' }}>
            Last updated: September 2026 · We never sell your data
          </p>
          <div style={{ height: '3px', width: '3rem', background: 'var(--teal)', borderRadius: '9999px', marginTop: '1rem' }} />
        </div>

        <P>At <strong style={{ color: 'var(--navy)' }}>{CONSTANTS.APP_NAME}</strong>, your privacy matters. This policy explains what data we collect, why we collect it, and how it is used.</P>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

          <Card>
            <H2>What We Collect</H2>
            {[
              { title: 'Order Information', body: 'When you purchase, we collect your Name, Email, Phone Number, and optionally your College Name — the minimum needed to process your order and personalise documents.' },
              { title: 'Security & Anti-Piracy Logs', body: 'Our systems automatically log your IP address and User Agent when you download a purchased bundle to prevent unauthorised link sharing and piracy.' },
              { title: 'Usage Analytics', body: 'We use privacy-respecting analytics (Google Analytics 4) to understand which pages are visited. No personally identifiable data is shared with analytics providers beyond anonymised visit counts.' },
            ].map((item, i) => (
              <div key={item.title}>
                {i > 0 && <div style={{ height: '1px', background: 'var(--line)', margin: '.5rem 0' }} />}
                <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.375rem' }}>{item.title}</h3>
                <Sub>{item.body}</Sub>
              </div>
            ))}
          </Card>

          <Card>
            <H2>Payment Processing</H2>
            <P>All payments are processed securely through <strong style={{ color: 'var(--navy)' }}>Razorpay</strong>. We do not store, process, or have access to your raw credit card data, UPI PINs, or banking passwords.</P>
          </Card>

          <Card>
            <H2>How We Use Your Data</H2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '.625rem', margin: 0, padding: 0, listStyle: 'none' }}>
              {[
                'Delivering the digital products you purchased via email and WhatsApp.',
                'Personalising your .docx report and PPT templates with your name and details.',
                'Providing customer support and processing refund requests.',
                'Preventing link-sharing and software piracy via download logs.',
                'Sending your order confirmation and download links by email.',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', fontSize: '.9rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0, marginTop: '.4375rem' }} />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <H2>Data Sharing & Retention</H2>
            <P><strong style={{ color: 'var(--navy)' }}>We will never sell your personal data to third parties.</strong> Your information is shared only with service providers essential to fulfilling your order (Razorpay for payments, Supabase for database storage).</P>
            <P>Order records are retained for a minimum of 3 years for financial compliance. You may request deletion of non-essential data by contacting us at <a href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`} style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}>{CONSTANTS.SUPPORT_EMAIL}</a>.</P>
          </Card>

          {/* Contact */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', padding: '1.125rem 1.375rem', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', margin: 0 }}>Privacy concerns or data requests?</p>
            <a href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`} style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}>{CONSTANTS.SUPPORT_EMAIL}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
