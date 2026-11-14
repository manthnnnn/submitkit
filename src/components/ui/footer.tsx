'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';

const FOOTER_SECTIONS = [
  {
    title: 'College Students',
    links: [
      { href: '/projects',                  label: '11 Pre-Made Kits (₹299/₹499)' },
      { href: '/custom?type=college',       label: 'Custom College Project (48h)' },
      { href: '/blueprint',                 label: '1,000+ Topic Blueprints' },
      { href: '/custom?type=college',       label: 'IEEE Black Book (.docx) & PPT' },
    ],
  },
  {
    title: 'Developers & Builders',
    links: [
      { href: '/projects',                  label: 'Production Software Systems' },
      { href: '/projects',                  label: 'Resume Profile Enhancement' },
      { href: '/order/lookup',              label: 'Track & Download Orders' },
      { href: '/projects',                  label: '1-Click Run.bat Launchers' },
    ],
  },
  {
    title: 'Startup Founders',
    links: [
      { href: '/startup',                   label: 'Execute Startup Ideas' },
      { href: '/custom?type=startup',       label: '100% Full IP Ownership' },
      { href: '/startup',                   label: 'SaaS & Web App Builds (48h)' },
      { href: 'https://wa.me/918799814256', label: 'Direct Engineer Chat', external: true },
    ],
  },
  {
    title: 'Support & Studio',
    links: [
      { href: 'https://wa.me/918799814256', label: 'WhatsApp Support', external: true },
      { href: '/about',                     label: 'About SubmitKit' },
      { href: '/#faq',                      label: 'Frequently Asked Questions' },
      { href: 'mailto:team@submitkit.in',   label: 'Email Engineering Team' },
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
        background: '#18181B',
        color: '#D4D4D8',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>

          {/* Column 1: Brand */}
          <div style={{ maxWidth: '22rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size="sm" href="/" light={true} />
            </div>
            <p style={{ fontSize: '.9rem', color: '#A1A1AA', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Built for college students, developers, and startup founders. From college capstones with IEEE reports to production systems and startup execution.
            </p>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              marginBottom: '1.25rem',
              padding: '.35rem .8rem',
              borderRadius: '9999px',
              background: 'rgba(229, 87, 41, 0.12)',
              border: '1px solid rgba(229, 87, 41, 0.28)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E55729', boxShadow: '0 0 8px rgba(229, 87, 41, 0.55)' }} className="apulse" />
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#F48B65', letterSpacing: '.02em' }}>All Systems Operational</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="mailto:team@submitkit.in" style={{ fontSize: '.8125rem', color: '#D4D4D8', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#E55729'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#D4D4D8'; }}>
                team@submitkit.in
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>·</span>
              <a href="https://wa.me/918799814256" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.8125rem', color: '#D4D4D8', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FF7B59'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#D4D4D8'; }}>
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Columns 2, 3, 4 */}
          {FOOTER_SECTIONS.map((sec) => (
            <div key={sec.title}>
              <h4 style={{ fontSize: '.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
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
                        style={{ fontSize: '.875rem', color: '#A1A1AA', textDecoration: 'none', fontWeight: 500, transition: 'color 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#FF7B59'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#A1A1AA'; }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{ fontSize: '.875rem', color: '#A1A1AA', textDecoration: 'none', fontWeight: 500, transition: 'color 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#FF7B59'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#A1A1AA'; }}
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
          color: '#71717A',
        }}>
          <div>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} SubmitKit. All rights reserved.</p>
            <p style={{ margin: '.25rem 0 0', fontSize: '.75rem', color: '#A1A1AA' }}>
              Founded &amp; Architected by <strong style={{ color: '#FFFFFF' }}>Manthan</strong> · Pune, Maharashtra
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/privacy" style={{ color: '#A1A1AA', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A1A1AA'; }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: '#A1A1AA', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A1A1AA'; }}>
              Terms of Service
            </Link>
            <Link href="/refund" style={{ color: '#A1A1AA', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#A1A1AA'; }}>
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
