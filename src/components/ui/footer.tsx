'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';

const FOOTER_SECTIONS = [
  {
    title: 'College Projects',
    links: [
      { href: '/projects',            label: 'All 11 Verified Kits' },
      { href: '/projects?tier=MINI',  label: 'Mini Projects (₹299)' },
      { href: '/projects?tier=MAJOR', label: 'Major Capstone Kits (₹499)' },
      { href: '/blueprint',           label: '1,000+ Free Blueprints' },
    ],
  },
  {
    title: 'Customize Project / Idea',
    links: [
      { href: '/custom',              label: 'Build Any Project from Scratch' },
      { href: '/custom',              label: 'Startup MVP Prototype (48h)' },
      { href: '/custom',              label: 'Custom College Topic & IEEE Doc' },
      { href: '/custom',              label: '1-on-1 Code Walkthrough' },
    ],
  },
  {
    title: 'Support & Orders',
    links: [
      { href: '/order/lookup',        label: 'Track & Download Order' },
      { href: 'https://wa.me/918799814256', label: 'Direct WhatsApp Support', external: true },
      { href: 'mailto:team@submitkit.in', label: 'Contact Us' },
      { href: '/#faq',                label: 'FAQs' },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer
      className="site-footer"
      style={{
        background: 'linear-gradient(180deg, #241D18 0%, #1A1512 100%)',
        color: '#C7BCB0',
        borderTop: '1px solid rgba(220, 205, 185, 0.15)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div className="shell" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
          gap: '2.25rem 2.5rem',
          marginBottom: '2.25rem',
          paddingBottom: '2.25rem',
          borderBottom: '1px solid rgba(220, 205, 185, 0.12)',
        }}>

          {/* Column 1: Brand */}
          <div style={{ maxWidth: '22rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size="sm" href="/" light={true} />
            </div>
            <p style={{ fontSize: '.9rem', color: '#BDB1A3', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              From project ideas to working products. Everything you need to build, learn, and launch with confidence.
            </p>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              marginBottom: '1.25rem',
              padding: '.35rem .8rem',
              borderRadius: '9999px',
              background: 'rgba(13, 148, 136, 0.14)',
              border: '1px solid rgba(13, 148, 136, 0.32)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2DD4BF', boxShadow: '0 0 8px rgba(45, 212, 191, 0.55)' }} className="apulse" />
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#2DD4BF', letterSpacing: '.02em' }}>All Systems Operational</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="mailto:team@submitkit.in" style={{ fontSize: '.8125rem', color: '#C7BCB0', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#2DD4BF'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#C7BCB0'; }}>
                team@submitkit.in
              </a>
              <span style={{ color: 'rgba(220, 205, 185, 0.28)' }}>·</span>
              <a href="https://wa.me/918799814256" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.8125rem', color: '#C7BCB0', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#2DD4BF'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#C7BCB0'; }}>
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Columns 2, 3, 4 */}
          {FOOTER_SECTIONS.map((sec) => (
            <div key={sec.title}>
              <h4 style={{ fontSize: '.75rem', fontWeight: 800, color: '#FAF6F0', marginBottom: '1.25rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                {sec.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                {sec.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '.875rem', color: '#C7BCB0', textDecoration: 'none', fontWeight: 500, transition: 'color 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#2DD4BF'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#C7BCB0'; }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{ fontSize: '.875rem', color: '#C7BCB0', textDecoration: 'none', fontWeight: 500, transition: 'color 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#2DD4BF'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#C7BCB0'; }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '.8125rem',
          color: '#8E8273',
        }}>
          <div>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} SubmitKit. All rights reserved.</p>
            <p style={{ margin: '.25rem 0 0', fontSize: '.75rem', color: '#BDB1A3' }}>
              Founded &amp; Architected by <strong style={{ color: '#FAF6F0' }}>Manthan</strong> · Built for Non-Coders &amp; Innovators
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/privacy" style={{ color: '#A19586', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FAF6F0'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A19586'; }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: '#A19586', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FAF6F0'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A19586'; }}>
              Terms of Service
            </Link>
            <Link href="/refund" style={{ color: '#A19586', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FAF6F0'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A19586'; }}>
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
