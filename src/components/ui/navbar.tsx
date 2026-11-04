'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, ChevronRight, BookOpen, Layers, Package, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/logo';
import { CONSTANTS } from '@/lib/constants';

interface NavItem {
  href: string;
  label: string;
  sub: string;
  icon: any;
  badge?: string;
}

const NAV: NavItem[] = [
  { href: '/projects',  label: 'Browse Projects', sub: 'All verified project kits',   icon: Package },
  { href: '/blueprint', label: 'Free Topics',     sub: '1,078 free topic blueprints', icon: BookOpen, badge: 'Free' },
];

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else       document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const active = (href: string) => {
    if (href === '/projects') {
      return pathname === '/projects' || pathname?.startsWith('/projects/');
    }
    if (href === '/blueprint') {
      return pathname === '/blueprint' || pathname?.startsWith('/blueprint/');
    }
    return pathname === href;
  };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 300ms',
        ...(scrolled
          ? {
              background: 'rgba(253, 251, 247, 0.92)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderBottom: '1px solid rgba(232, 225, 213, 0.85)',
              boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.06)',
            }
          : {
              background: 'rgba(250, 248, 244, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(232, 225, 213, 0.45)',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.02)',
            }
        ),
      }}>
        <div className="shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          <Logo size="sm" href="/" />

          {/* Desktop nav: Only Browse Projects & Free Topics */}
          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '.5rem' }}>
            {NAV.map(({ href, label, badge }) => (
              <Link key={href} href={href} prefetch={true}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.375rem',
                  padding: '.5rem 1rem', borderRadius: '10px',
                  fontSize: '.9375rem', fontWeight: active(href) ? 700 : 500,
                  textDecoration: 'none', transition: 'all 150ms',
                  background: active(href)
                    ? 'linear-gradient(135deg, rgba(204, 251, 241, 0.8) 0%, rgba(240, 253, 250, 0.9) 100%)'
                    : 'transparent',
                  color: active(href) ? 'var(--teal-darker)' : 'var(--ink-2)',
                  border: active(href) ? '1px solid rgba(13, 148, 136, 0.25)' : '1px solid transparent',
                  boxShadow: active(href) ? '0 2px 6px -1px rgba(13, 148, 136, 0.12), inset 0 1px 0 #FFFFFF' : 'none',
                }}
                onMouseEnter={e => { if (!active(href)) { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--ink)'; }}}
                onMouseLeave={e => { if (!active(href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-2)'; }}}
              >
                {label}
                {badge && (
                  <span className="tag tag-teal" style={{ fontSize: '.625rem', padding: '.125rem .45rem', fontWeight: 800 }}>
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop right: WhatsApp Us */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '.75rem' }}>
            <a href={`https://wa.me/918799814256`} target="_blank" rel="noopener noreferrer"
              className="btn btn-wa"
              style={{ minHeight: '40px', padding: '0 1.25rem', fontSize: '.875rem', gap: '.5rem', borderRadius: '11px', boxShadow: '0 4px 14px rgba(37,211,102,.3)' }}
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden" style={{ alignItems: 'center', gap: '.625rem' }}>
            <a href={`https://wa.me/918799814256`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
              className="btn btn-wa wa-nav-btn"
            >
              <WhatsAppIcon />
              <span className="hidden sm:inline">WhatsApp Us</span>
            </a>
            <button onClick={() => setOpen(true)} className="tt rounded-xl" aria-label="Open menu"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink-2)' }}
            >
              <Menu style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div className="ai" onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(15,23,42,.35)', backdropFilter: 'blur(4px)' }}
            aria-hidden="true"
          />
          <div className="adrawer" role="dialog" aria-modal="true" aria-label="Navigation"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 120,
              width: 'min(88vw, 360px)',
              background: 'var(--surface)',
              display: 'flex', flexDirection: 'column',
              boxShadow: 'var(--sh-2xl)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'calc(1rem + env(safe-area-inset-top,0px)) 1.25rem 1rem', borderBottom: '1px solid var(--line)' }}>
              <Logo size="sm" href="/" />
              <button onClick={() => setOpen(false)} className="tt rounded-xl" aria-label="Close"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink-3)' }}
              >
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, padding: '.75rem 1rem' }}>
              {NAV.map(({ href, label, icon: Icon, sub, badge }) => (
                <Link key={href} href={href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem', borderRadius: '14px', marginBottom: '.375rem',
                    textDecoration: 'none', transition: 'all 150ms', minHeight: '64px',
                    background: active(href) ? 'var(--teal-50)' : 'transparent',
                    color: active(href) ? 'var(--teal-dark)' : 'var(--ink-2)',
                  }}
                  onMouseEnter={e => { if (!active(href)) e.currentTarget.style.background = 'var(--surface-2)'; }}
                  onMouseLeave={e => { if (!active(href)) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '12px', flexShrink: 0, background: active(href) ? 'var(--teal-100)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style={{ width: '1.125rem', height: '1.125rem', color: active(href) ? 'var(--teal)' : 'var(--ink-3)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <span style={{ fontSize: '.9375rem', fontWeight: 600 }}>{label}</span>
                      {badge && (
                        <span className="tag tag-teal" style={{ fontSize: '.6rem', padding: '.125rem .45rem' }}>
                          {badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', marginTop: '.125rem' }}>{sub}</p>
                  </div>
                  <ChevronRight style={{ width: '1rem', height: '1rem', color: 'var(--ink-5)', flexShrink: 0 }} />
                </Link>
              ))}
            </nav>

            {/* Footer CTAs */}
            <div style={{ padding: '1rem 1rem calc(1rem + env(safe-area-inset-bottom,0px))', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
              <Link href="/projects" className="btn btn-teal" style={{ width: '100%', minHeight: '52px', fontSize: '1rem', borderRadius: '14px' }}>
                <Zap style={{ width: '1.125rem', height: '1.125rem', fill: 'white' }} />
                Browse All Project Kits
              </Link>
              <a href="https://wa.me/918799814256" target="_blank" rel="noopener noreferrer"
                className="btn btn-wa" style={{ width: '100%', minHeight: '48px', fontSize: '.9375rem', borderRadius: '12px' }}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
