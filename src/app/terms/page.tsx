import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${CONSTANTS.APP_NAME} — India's premier academic project marketplace.`,
};

const Section = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
    <h2 style={{ display: 'flex', alignItems: 'center', gap: '.75rem', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
      <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 800, color: 'var(--teal-dark)', flexShrink: 0 }}>{n}</span>
      {title}
    </h2>
    {children}
  </section>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.8, margin: 0 }}>{children}</p>
);

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '.6875rem', fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Legal</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em', margin: '.75rem 0 .5rem' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '.875rem', color: 'var(--ink-4)' }}>
            Last updated: September 2026 · Effective immediately
          </p>
          <div style={{ height: '3px', width: '3rem', background: 'var(--teal)', borderRadius: '9999px', marginTop: '1rem' }} />
        </div>

        <Body>
          Welcome to <strong style={{ color: 'var(--navy)' }}>{CONSTANTS.APP_NAME}</strong>. By accessing or purchasing from our platform, you agree to be bound by these Terms of Service.
        </Body>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

          <Section n={1} title="Product Nature & Intended Use">
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', marginBottom: '.25rem' }}>
              <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--teal-dark)', marginBottom: '.375rem' }}>Educational Reference Kits</h3>
              <Body>All materials — source code, architecture blueprints, and documentation — are intended for <strong style={{ color: 'var(--navy)' }}>educational research, rapid prototyping, and baseline reference</strong>. Customers are expected to build upon, customise, and defend their own implementations per their institution's academic integrity policies.</Body>
            </div>
            <Body>We do not sell "ready-made degrees" or guarantee any specific academic grade. You are solely responsible for understanding the codebase and defending it during evaluations.</Body>
          </Section>

          <Section n={2} title="Intellectual Property">
            <Body>Our project kits are built on open-source technologies (MIT, Apache 2.0). The proprietary assembly, formatting, and documentation templates remain {CONSTANTS.APP_NAME}&apos;s intellectual property.</Body>
            <Body>You are granted a <strong style={{ color: 'var(--navy)' }}>single-user, non-transferable licence</strong> for personal educational use. You may not resell, redistribute, or publish bundles on public repositories without substantial modification.</Body>
          </Section>

          <Section n={3} title="Download Limits & Anti-Piracy">
            <Body>Upon purchase you receive a maximum of <strong style={{ color: 'var(--navy)' }}>{CONSTANTS.LIMITS.MAX_DOWNLOADS} download attempts</strong>. Links expire after <strong style={{ color: 'var(--navy)' }}>{CONSTANTS.LIMITS.DOWNLOAD_LINK_TTL_SECONDS / 60} minutes</strong> for security. We log IP addresses and user agents to prevent unauthorised link sharing and piracy.</Body>
          </Section>

          <Section n={4} title="Payments & Pricing">
            <Body>All transactions are processed securely through Razorpay. Prices are in Indian Rupees (INR) inclusive of applicable taxes. {CONSTANTS.APP_NAME} reserves the right to change pricing at any time. Orders are charged at the price shown at checkout.</Body>
          </Section>

          <Section n={5} title="Limitation of Liability">
            <Body>{CONSTANTS.APP_NAME} is not liable for any academic penalties, institutional sanctions, or consequential damages arising from your use of our materials. Maximum liability is limited to the amount you paid for the specific product in question.</Body>
          </Section>

          {/* Contact */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', padding: '1.125rem 1.375rem', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', margin: 0 }}>Questions about these terms?</p>
            <a href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`} style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}>{CONSTANTS.SUPPORT_EMAIL}</a>
          </div>

        </div>
      </div>
    </div>
  );
}
