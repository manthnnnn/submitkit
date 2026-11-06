'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, X, Zap, ChevronRight, BookOpen,
  Package, Search, Sparkles, MessageCircle
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Logo } from '@/components/ui/logo';
import { CONSTANTS } from '@/lib/constants';

interface NavItem {
  href: string;
  label: string;
  sub: string;
  icon: any;
  badge?: string;
}

const DESKTOP_NAV: NavItem[] = [
  { href: '/projects',  label: 'Browse Projects', sub: '59+ verified runnable project kits', icon: Package, badge: '59+ Kits' },
  { href: '/blueprint', label: 'Free Topics',     sub: '1,078 free topic blueprints',       icon: BookOpen, badge: 'Free' },
];

const MOBILE_DRAWER_NAV: NavItem[] = [
  { href: '/projects',    label: 'Browse Project Kits',   sub: '59+ kits with IEEE Black Book & PPT', icon: Package, badge: '59+ Kits' },
  { href: '/blueprint',   label: 'Topic Blueprints',      sub: '1,078 IEEE abstracts & viva questions', icon: BookOpen, badge: 'Free' },
  { href: '/order/lookup',label: 'Track Order & Vault',   sub: 'Recover your purchased project downloads', icon: Search },
  { href: '/custom',      label: 'Custom Project Build',  sub: 'Built in 48 hrs with 1-on-1 viva coaching', icon: Sparkles, badge: 'Custom' },
];

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();
  const lastToggleRef           = useRef(0);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  // Track scroll position for subtle acrylic navbar blur
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Instant touch-safe toggle handler
  const handleToggle = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - lastToggleRef.current < 250) return; // Prevent double-trigger on touch
    lastToggleRef.current = now;
    setOpen(prev => !prev);
  }, []);

  const handleClose = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastToggleRef.current < 250) return;
    lastToggleRef.current = now;
    setOpen(false);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const isActive = (href: string) => {
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
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 125, // Always higher than backdrop (115) and drawer (120) so hamburger/close button is always clickable
          transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
          ...(scrolled
            ? {
                background: 'rgba(253, 251, 247, 0.94)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(232, 225, 213, 0.85)',
                boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.06)',
              }
            : {
                background: 'rgba(250, 248, 244, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(232, 225, 213, 0.5)',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.02)',
              }),
        }}
      >
        <div
          className="shell"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          <Logo size="sm" href="/" />

          {/* Desktop nav: Browse Projects & Free Topics */}
          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
            {DESKTOP_NAV.map(({ href, label, badge }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: active ? 700 : 500,
                    textDecoration: 'none',
                    transition: 'all 150ms ease',
                    background: active ? 'var(--teal-50)' : 'transparent',
                    color: active ? 'var(--teal-darker)' : 'var(--ink-2)',
                    border: active ? '1px solid rgba(13, 148, 136, 0.25)' : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'var(--surface-2)';
                      e.currentTarget.style.color = 'var(--ink)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--ink-2)';
                    }
                  }}
                >
                  {label}
                  {badge && (
                    <span className="tag tag-teal" style={{ fontSize: '0.625rem', padding: '0.125rem 0.45rem', fontWeight: 800 }}>
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger / Close Toggle Button */}
          <div className="flex lg:hidden" style={{ alignItems: 'center', gap: '0.625rem' }}>
            <button
              type="button"
              onPointerDown={handleToggle}
              onClick={handleToggle}
              aria-expanded={open}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="tt rounded-xl cursor-pointer"
              style={{
                width: '44px',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: open ? 'var(--teal-100)' : 'var(--surface-2)',
                border: open ? '1px solid rgba(13, 148, 136, 0.4)' : '1px solid var(--line)',
                color: open ? 'var(--teal-darker)' : 'var(--ink)',
                transition: 'transform 150ms cubic-bezier(0.32, 0.72, 0, 1), background-color 150ms ease',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              {open ? (
                <X className="pointer-events-none" style={{ width: '1.35rem', height: '1.35rem' }} />
              ) : (
                <Menu className="pointer-events-none" style={{ width: '1.35rem', height: '1.35rem' }} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modern iOS Spring Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop with soft acrylic blur */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
              onPointerDown={(e) => {
                if (e.target === e.currentTarget) {
                  handleClose(e);
                }
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 115,
                background: 'rgba(15, 23, 42, 0.38)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
              }}
              aria-hidden="true"
            />

            {/* iOS Floating Popover Drawer */}
            <motion.div
              key="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 380,
                mass: 0.7,
              }}
              style={{
                position: 'fixed',
                top: 'calc(4.25rem + env(safe-area-inset-top, 0px))',
                right: '0.75rem',
                left: '0.75rem',
                maxWidth: '24rem',
                marginLeft: 'auto',
                zIndex: 120,
                background: 'rgba(253, 251, 247, 0.98)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: '20px',
                border: '1px solid rgba(232, 225, 213, 0.95)',
                boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(13, 148, 136, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header inside drawer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.875rem 0.5rem',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)' }}>
                    Menu
                  </span>
                  <span className="tag tag-emerald" style={{ fontSize: '0.625rem', padding: '0.1rem 0.45rem', fontWeight: 800 }}>
                    ● 59+ Kits Ready
                  </span>
                </div>
                <button
                  type="button"
                  onPointerDown={handleClose}
                  onClick={handleClose}
                  aria-label="Close menu"
                  className="tt rounded-lg cursor-pointer"
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink-3)',
                  }}
                >
                  <X style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>

              {/* Navigation Items List */}
              <nav style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {MOBILE_DRAWER_NAV.map(({ href, label, sub, icon: Icon, badge }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      prefetch={true}
                      onClick={() => setOpen(false)}
                      className="press drawer-nav-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6875rem 0.75rem',
                        borderRadius: '14px',
                        textDecoration: 'none',
                        transition: 'background-color 150ms ease, transform 150ms cubic-bezier(0.32, 0.72, 0, 1)',
                        background: active ? 'var(--teal-50)' : 'transparent',
                        color: active ? 'var(--teal-darker)' : 'var(--navy)',
                      }}
                    >
                      <div
                        style={{
                          width: '2.25rem',
                          height: '2.25rem',
                          borderRadius: '11px',
                          flexShrink: 0,
                          background: active ? 'var(--teal-100)' : 'var(--surface-2)',
                          border: active ? '1px solid rgba(13, 148, 136, 0.25)' : '1px solid var(--line)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon style={{ width: '1.1rem', height: '1.1rem', color: active ? 'var(--teal)' : 'var(--ink-2)' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <span style={{ fontSize: '0.9375rem', fontWeight: 700, lineHeight: 1.25 }}>{label}</span>
                          {badge && (
                            <span className="tag tag-teal" style={{ fontSize: '0.625rem', padding: '0.1rem 0.4rem', fontWeight: 800 }}>
                              {badge}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--ink-4)', margin: '0.125rem 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sub}
                        </p>
                      </div>
                      <ChevronRight style={{ width: '1rem', height: '1rem', color: 'var(--ink-5)', flexShrink: 0 }} />
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions: Browse All Kits + WhatsApp Direct */}
              <div
                style={{
                  padding: '0.625rem 0.75rem 0.75rem',
                  borderTop: '1px solid var(--line)',
                  background: 'rgba(248, 245, 238, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <Link
                  href="/projects"
                  prefetch={true}
                  onClick={() => setOpen(false)}
                  className="btn btn-teal drawer-cta-btn"
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: 'var(--sh-xs)',
                  }}
                >
                  <Zap style={{ width: '0.9375rem', height: '0.9375rem', fill: 'white' }} />
                  Browse All 59+ Kits
                </Link>

                <a
                  href="https://wa.me/918799814256?text=Hi%20SubmitKit!%20I%20have%20a%20question%20about%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#059669',
                    textDecoration: 'none',
                    padding: '0.375rem 0',
                  }}
                >
                  <MessageCircle style={{ width: '0.875rem', height: '0.875rem' }} />
                  Need immediate help? WhatsApp us 24/7
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
