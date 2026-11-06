'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { CONSTANTS } from '@/lib/constants';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer
      className="site-footer"
      style={{
        background: '#1A1814',
        color: '#A8A196',
        borderTop: '1px solid #2A2620',
      }}
    >
      <div className="shell" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>

        {/* Top grid */}
        <div
          className="site-footer-top"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.5rem',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >

          {/* Brand column */}
          <div style={{ maxWidth: '22rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size="sm" href="/" light={true} />
            </div>
            <p style={{ fontSize: '.875rem', color: '#A8A196', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              India&apos;s premier marketplace for engineering project bundles. Code + IEEE Black Book + Viva PPTs — delivered instantly.
            </p>

            {/* Live badge — dark emerald capsule */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                marginBottom: '1.5rem',
                padding: '.375rem .875rem',
                borderRadius: '9999px',
                background: 'rgba(23, 69, 51, 0.65)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 0 2px rgba(37, 211, 102, 0.25)' }} className="apulse" />
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#34D399' }}>All Systems Operational</span>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a href="mailto:team@submitkit.in"
                style={{ fontSize: '.8125rem', color: '#A8A196', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#5EEAD4')}
                onMouseLeave={e => (e.currentTarget.style.color = '#A8A196')}
              >
                team@submitkit.in
              </a>
              <a href="https://wa.me/918799814256" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.8125rem', color: '#A8A196', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#5EEAD4')}
                onMouseLeave={e => (e.currentTarget.style.color = '#A8A196')}
              >
                WhatsApp support
              </a>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))', gap: '2.5rem' }}>
            <div>
              <h4 style={{ fontSize: '.75rem', fontWeight: 800, color: '#FAF7F0', marginBottom: '1.25rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>Browse</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {[
                  { href: '/projects',              label: 'All Project Kits' },
                  { href: '/projects?tier=MINI',    label: `Mini (₹${CONSTANTS.PRICING.MINI_PROJECT})` },
                  { href: '/projects?tier=MAJOR',   label: `Major (₹${CONSTANTS.PRICING.MAJOR_PROJECT})` },
                  { href: '/blueprint',             label: 'Free Blueprints' },
                  { href: '/custom',                label: 'Custom Project' },
                  { href: '/blog',                  label: 'Project Guides' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      prefetch={true}
                      style={{ fontSize: '.875rem', color: '#A8A196', fontWeight: 500, transition: 'color 150ms' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#5EEAD4')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#A8A196')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '.75rem', fontWeight: 800, color: '#FAF7F0', marginBottom: '1.25rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>Company</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {[
                  { href: '/order/lookup', label: 'Track Order' },
                  { href: '/terms',        label: 'Terms of Service' },
                  { href: '/privacy',      label: 'Privacy Policy' },
                  { href: '/refund',       label: 'Refund Policy' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      prefetch={true}
                      style={{ fontSize: '.875rem', color: '#A8A196', fontWeight: 500, transition: 'color 150ms' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#5EEAD4')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#A8A196')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '.75rem', fontSize: '.8125rem', color: '#716B61' }}>
          <p>&copy; {new Date().getFullYear()} SubmitKit. All rights reserved.</p>
          <p>Built as educational reference material for engineering students</p>
        </div>
      </div>
    </footer>
  );
}
