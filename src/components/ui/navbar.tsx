'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
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
  { href: '/projects',     label: 'College Projects',        sub: '11 verified runnable kits with IEEE report & PPT', icon: Package },
  { href: '/custom',       label: 'Customize Project / Idea', sub: 'Custom college project or startup MVP built from scratch', icon: Zap, badge: 'CUSTOM' },
  { href: '/blueprint',    label: 'Ideas & Blueprints',       sub: '1,000+ structured engineering blueprints', icon: BookOpen, badge: 'FREE' },
  { href: '/order/lookup', label: 'Track Order',              sub: 'Access your purchased project downloads', icon: Search },
];

const MOBILE_DRAWER_NAV: NavItem[] = [
  { href: '/projects',     label: 'College Projects',        sub: '11 verified runnable kits with IEEE report & PPT', icon: Package },
  { href: '/custom',       label: 'Customize Project / Idea', sub: 'Custom college project or startup MVP built from scratch', icon: Zap, badge: 'CUSTOM' },
  { href: '/blueprint',    label: 'Ideas & Blueprints',       sub: '1,000+ structured engineering blueprints — free', icon: BookOpen, badge: 'Free' },
  { href: '/order/lookup', label: 'Track Your Order',         sub: 'Access your purchased project downloads', icon: Search },
];

/* ── 120 FPS Stagger Orchestration: Menu items cascade in one by one ── */
const drawerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 300,
      mass: 0.8,
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

const drawerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
    y: 14,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 22,
      stiffness: 320,
      mass: 0.7,
    },
  },
};

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

  // Track scroll position with requestAnimationFrame to prevent layout thrashing and maintain 120 FPS
  useEffect(() => {
    let ticking = false;
    let lastScrolled = window.scrollY > 8;
    setScrolled(lastScrolled);

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 8;
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
          willChange: 'background-color, border-color',
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

          {/* Desktop nav: With iOS Fluid Spring Active Tab Slider */}
          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {DESKTOP_NAV.map(({ href, label, badge }) => {
              const active = isActive(href);
              return (
                <motion.div
                  key={href}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                  style={{ position: 'relative', display: 'inline-flex' }}
                >
                  <Link
                    href={href}
                    prefetch={true}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: active ? 650 : 500,
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                      color: active ? 'var(--navy)' : 'var(--ink-3)',
                      transition: 'color 140ms ease',
                      zIndex: 1,
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--navy)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--ink-3)';
                      }
                    }}
                  >
                    {/* Fluid sliding active pill across tabs */}
                    {active && (
                      <motion.div
                        layoutId="desktop-active-nav-pill"
                        transition={{
                          type: 'spring',
                          stiffness: 440,
                          damping: 34,
                          mass: 0.6,
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '12px',
                          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
                          border: '1.2px solid rgba(220, 212, 198, 0.95)',
                          boxShadow: '0 2px 6px -1px rgba(60, 45, 20, 0.05), inset 0 1px 0 #FFFFFF',
                          zIndex: -1,
                        }}
                      />
                    )}

                    {/* Active dot indicator with spring */}
                    {active && (
                      <motion.span
                        layoutId="desktop-active-dot"
                        transition={{ type: 'spring', stiffness: 480, damping: 32 }}
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: 'var(--teal)',
                          boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.22)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span>{label}</span>
                    {badge && (
                      <span
                        style={{
                          fontSize: '0.625rem',
                          padding: '0.1rem 0.45rem',
                          fontWeight: 750,
                          letterSpacing: '0.04em',
                          borderRadius: '9999px',
                          background: badge === 'FREE'
                            ? 'rgba(217, 119, 6, 0.09)'
                            : 'rgba(13, 148, 136, 0.09)',
                          color: badge === 'FREE'
                            ? '#B45309'
                            : 'var(--teal-darker)',
                          border: badge === 'FREE'
                            ? '1px solid rgba(217, 119, 6, 0.25)'
                            : '1px solid rgba(13, 148, 136, 0.22)',
                        }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop right-side CTA with tactile spring */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '.75rem' }}>
            {pathname === '/custom' ? (
              <motion.div whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }}>
                <Link
                  href="/projects"
                  className="btn btn-hero-secondary"
                  style={{
                    padding: '.45rem 1.125rem',
                    fontSize: '.875rem',
                    borderRadius: '12px',
                    gap: '.4rem',
                    fontWeight: 650,
                    minHeight: '38px',
                  }}
                >
                  <Package style={{ width: '14px', height: '14px', color: 'var(--teal)' }} />
                  Browse 11 Kits
                </Link>
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }}>
                <Link
                  href="/custom"
                  className="btn btn-hero-primary"
                  style={{
                    padding: '.45rem 1.125rem',
                    fontSize: '.875rem',
                    borderRadius: '12px',
                    gap: '.375rem',
                    fontWeight: 650,
                    minHeight: '38px',
                  }}
                >
                  Customize Idea <ChevronRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Hamburger / Close Toggle Button with tactile bounce */}
          <div className="flex lg:hidden" style={{ alignItems: 'center', gap: '0.625rem' }}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
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
                background: open ? 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)' : 'var(--surface-2)',
                border: open ? '1.2px solid rgba(13, 148, 136, 0.4)' : '1px solid var(--line)',
                color: open ? 'var(--teal-darker)' : 'var(--ink)',
                boxShadow: open ? '0 2px 8px -2px rgba(13, 148, 136, 0.2)' : 'none',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.14 }}
                  >
                    <X style={{ width: '1.35rem', height: '1.35rem' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Menu style={{ width: '1.35rem', height: '1.35rem' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Modern iOS Spring Mobile Drawer with Cascading Stagger (One By One) */}
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

            {/* iOS Floating Popover Drawer with Staggered Container */}
            <motion.div
              key="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              variants={drawerContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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
                willChange: 'transform, opacity',
              }}
            >
              {/* Header inside drawer */}
              <motion.div
                variants={drawerItemVariants}
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
                    ● 11 Verified Kits
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
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
                </motion.button>
              </motion.div>

              {/* Navigation Items List: Enters One By One */}
              <nav style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {MOBILE_DRAWER_NAV.map(({ href, label, sub, icon: Icon, badge }) => {
                  const active = isActive(href);
                  return (
                    <motion.div
                      key={href}
                      variants={drawerItemVariants}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
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
                          background: active
                            ? 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)'
                            : 'transparent',
                          border: active
                            ? '1.2px solid rgba(220, 212, 198, 0.95)'
                            : '1.2px solid transparent',
                          boxShadow: active
                            ? '0 2px 6px -1px rgba(60, 45, 20, 0.05)'
                            : 'none',
                          color: 'var(--navy)',
                        }}
                      >
                        <div
                          style={{
                            width: '2.25rem',
                            height: '2.25rem',
                            borderRadius: '11px',
                            flexShrink: 0,
                            background: active
                              ? 'rgba(13, 148, 136, 0.1)'
                              : 'var(--surface-2)',
                            border: active
                              ? '1px solid rgba(13, 148, 136, 0.25)'
                              : '1px solid var(--line)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon style={{ width: '1.1rem', height: '1.1rem', color: active ? 'var(--teal)' : 'var(--ink-2)' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <span style={{ fontSize: '0.9375rem', fontWeight: active ? 700 : 600, lineHeight: 1.25 }}>{label}</span>
                            {badge && (
                              <span
                                style={{
                                  fontSize: '0.625rem',
                                  padding: '0.1rem 0.45rem',
                                  fontWeight: 750,
                                  letterSpacing: '0.04em',
                                  borderRadius: '9999px',
                                  background: badge.toUpperCase() === 'FREE'
                                    ? 'rgba(217, 119, 6, 0.09)'
                                    : 'rgba(13, 148, 136, 0.09)',
                                  color: badge.toUpperCase() === 'FREE'
                                    ? '#B45309'
                                    : 'var(--teal-darker)',
                                  border: badge.toUpperCase() === 'FREE'
                                    ? '1px solid rgba(217, 119, 6, 0.25)'
                                    : '1px solid rgba(13, 148, 136, 0.22)',
                                }}
                              >
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
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Actions: Enters as Final Staggered Item */}
              <motion.div
                variants={drawerItemVariants}
                style={{
                  padding: '0.625rem 0.75rem 0.75rem',
                  borderTop: '1px solid var(--line)',
                  background: 'rgba(248, 245, 238, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <motion.div whileTap={{ scale: 0.98 }}>
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
                    <Package style={{ width: '0.9375rem', height: '0.9375rem', color: '#FFFFFF' }} />
                    Browse 11 College Kits (₹299)
                  </Link>
                </motion.div>

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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
