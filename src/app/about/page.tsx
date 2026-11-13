import type { Metadata } from 'next';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About SubmitKit — Founder & Mission',
  description: 'SubmitKit is founded by Manthan, a software architect from Pune. Learn about our mission to help non-coders and students build real, working software without barriers.',
  alternates: { canonical: `${CONSTANTS.APP_URL}/about` },
  openGraph: {
    title: 'About SubmitKit — Founded by Manthan',
    description: 'Our mission: eliminate the technical barriers that stop students and non-coders from building real software.',
    url: `${CONSTANTS.APP_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 'clamp(3rem,8vw,6rem)', paddingBottom: 'clamp(3rem,8vw,5rem)' }}>
      <div className="shell" style={{ maxWidth: '52rem' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem', fontSize: '.8125rem', color: 'var(--ink-4)' }}>
          <Link href="/" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 .5rem' }}>·</span>
          <span>About</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.4rem',
            fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)',
            textTransform: 'uppercase', letterSpacing: '.12em',
            marginBottom: '.75rem', padding: '.25rem .75rem',
            borderRadius: '9999px', background: 'var(--teal-50)',
            border: '1px solid var(--teal-100)',
          }}>
            About SubmitKit
          </div>
          <h1 className="font-display font-black" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-.035em',
            color: 'var(--navy)', lineHeight: 1.15, margin: '0 0 1rem',
          }}>
            Built to eliminate the barrier between ideas and working software.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.75 }}>
            SubmitKit started with one simple observation: too many great ideas never become real products because the person with the idea cannot write code — and the people who can write code charge too much.
          </p>
        </div>

        {/* Founder Card */}
        <div style={{
          borderRadius: '20px',
          background: 'linear-gradient(165deg, #FFFFFF 0%, #FDFBF8 50%, #F5ECE0 100%)',
          border: '1.5px solid rgba(220, 208, 188, 0.9)',
          boxShadow: '0 8px 28px -4px rgba(180,145,100,0.12)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '2.5rem',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          {/* Avatar */}
          <div style={{
            width: '4.5rem', height: '4.5rem', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #079B8D 0%, #047668 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFFFFF', fontSize: '1.75rem', fontWeight: 900,
            boxShadow: '0 6px 18px rgba(13,148,136,0.3)',
          }}>
            M
          </div>
          <div style={{ flex: 1, minWidth: '14rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 .2rem', letterSpacing: '-.025em' }}>
              Manthan
            </h2>
            <p style={{ fontSize: '.875rem', color: '#047668', fontWeight: 700, margin: '0 0 .15rem' }}>
              Founder &amp; Lead Architect · SubmitKit
            </p>
            <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', margin: '0 0 1rem' }}>
              Pune, Maharashtra, India
            </p>
            <p style={{ fontSize: '.9375rem', color: 'var(--ink-2)', lineHeight: 1.75, margin: '0 0 .75rem' }}>
              Manthan is a full-stack engineer and systems architect with deep experience in cloud infrastructure, AI/ML engineering, and rapid software prototyping. He founded SubmitKit to give non-technical founders, students, and solo creators the same access to production-ready software that previously required a \$5,000+ agency budget.
            </p>
            <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.75, margin: 0 }}>
              Under his direction, every SubmitKit delivery follows three principles: <strong style={{ color: 'var(--navy)' }}>zero-jargon execution</strong> (clients describe ideas in plain English), <strong style={{ color: 'var(--navy)' }}>true code ownership</strong> (clean unencrypted source, 100% IP rights), and <strong style={{ color: 'var(--navy)' }}>academic rigor</strong> (IEEE-standard documentation, Viva preparation, and 1-click desktop launchers).
            </p>
          </div>
        </div>

        {/* Mission + Values */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {[
            {
              title: 'Our Mission',
              body: 'Make software accessible to every person with an idea — regardless of coding skill, budget, or technical background.',
            },
            {
              title: 'Who We Serve',
              body: 'Final-year engineering students, non-technical startup founders, small business owners, and solo creators across India.',
            },
            {
              title: 'What We Build',
              body: 'Custom MVPs, SaaS prototypes, AI agents, academic project kits with IEEE reports, and 1-click runnable desktop applications.',
            },
            {
              title: 'Our Guarantee',
              body: '100% working, unencrypted source code — or we debug it personally on WhatsApp. No black boxes, no excuses.',
            },
          ].map(item => (
            <div key={item.title} style={{
              padding: '1.5rem',
              borderRadius: '16px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
            }}>
              <h3 style={{ fontSize: '.9375rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 .625rem', letterSpacing: '-.015em' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div style={{
          borderRadius: '16px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          padding: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', margin: '0 0 .25rem' }}>
              Have a question or project in mind?
            </p>
            <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', margin: 0 }}>
              Reach the team directly — we reply within hours.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/918799814256"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ fontSize: '.875rem', minHeight: '42px', padding: '0 1.25rem' }}
            >
              WhatsApp
            </a>
            <Link
              href="/custom"
              className="btn btn-outline"
              style={{ fontSize: '.875rem', minHeight: '42px', padding: '0 1.25rem', textDecoration: 'none' }}
            >
              Start a Custom Build
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
