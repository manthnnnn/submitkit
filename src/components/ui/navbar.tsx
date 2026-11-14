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
  { href: '/projects',     label: 'Pre-Made Projects',        sub: '11 verified runnable kits with IEEE report & PPT', icon: Package },
  { href: '/custom',       label: 'Custom Project & Ideas',  sub: 'Custom college projects or startup ideas built in 48–72h', icon: Zap, badge: 'Custom' },
  { href: '/blueprint',    label: 'Ideas & Blueprints',       sub: '1,000+ free architectural blueprints', icon: BookOpen, badge: 'Free' },
  { href: '/order/lookup', label: 'Track Order',              sub: 'Access your purchased system downloads', icon: Search },
];

const MOBILE_DRAWER_NAV: NavItem[] = [
  { href: '/projects',     label: 'Pre-Made Projects',        sub: '11 verified runnable kits with IEEE report & PPT', icon: Package },
  { href: '/custom',       label: 'Custom Project & Ideas',  sub: 'Custom college projects or startup ideas built in 48–72h', icon: Zap, badge: 'Custom' },
  { href: '/blueprint',    label: 'Ideas & Blueprints',       sub: '1,000+ free architectural blueprints', icon: BookOpen, badge: 'Free' },
  { href: '/order/lookup', label: 'Track Order',              sub: 'Access your purchased system downloads', icon: Search },
];

/* ── 3D Minimal Cascading Menu Orchestration (Slow, Premium & Fluid) ── */
const drawerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    rotateX: 4,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 260,
      mass: 0.9,
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.96,
    transition: {
      duration: 0.22,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

const drawerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    rotateX: -14,
    scale: 0.93,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 240,
      mass: 0.85,
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
          zIndex: 125,
          transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
          willChange: 'background-color, border-color',
          ...(scrolled
            ? {
                background: 'rgba(252, 248, 244, 0.94)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(239, 230, 220, 0.85)',
                boxShadow: '0 2px 12px -2px rgba(24, 24, 27, 0.05)',
              }
            : {
                background: 'rgba(252, 248, 244, 0.82)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(239, 230, 220, 0.5)',
                boxShadow: 'none',
              }),
        }}
      >
        <div
          className="shell"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
          }}
        >
          <Logo size="sm" href="/" />

          {/* Desktop nav: With iOS Fluid Spring Active Tab Slider */}
          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.4rem' }}>
            {DESKTOP_NAV.map(({ href, label, badge }) => {
              const active = isActive(href);
              const isCustom = badge?.toLowerCase() === 'custom';
              const isFree = badge?.toLowerCase() === 'free';
              return (
                <motion.div
                  key={href}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -2, rotateX: 3, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                  style={{ position: 'relative', display: 'inline-flex', perspective: 800, transformStyle: 'preserve-3d' }}
                >
                  <Link
                    href={href}
                    prefetch={true}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '9999px',
                      fontSize: '0.9rem',
                      fontWeight: active ? 650 : 500,
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                      color: active ? '#18181B' : '#52525B',
                      transition: 'color 140ms ease',
                      zIndex: 1,
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.color = '#18181B';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.color = '#52525B';
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
                          borderRadius: '9999px',
                          background: '#FFFFFF',
                          border: '1.2px solid rgba(239, 230, 220, 0.95)',
                          boxShadow: '0 2px 6px -1px rgba(24, 24, 27, 0.05)',
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
                          background: '#E55729',
                          boxShadow: '0 0 0 2px rgba(229, 87, 41, 0.22)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span>{label}</span>
                    {badge && (
                      <span
                        style={{
                          fontSize: '0.625rem',
                          padding: '0.12rem 0.5rem',
                          fontWeight: 700,
                          letterSpacing: '0.03em',
                          borderRadius: '9999px',
                          background: isCustom ? '#FDF6F2' : '#FAF5EE',
                          color: isCustom ? '#E55729' : '#71717A',
                          border: `1px solid ${isCustom ? '#F3CFBF' : '#EFE6DC'}`,
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

          {/* Desktop right-side CTA: Elegant Near-Black Pill Button with 3D Spring Lift */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '.75rem' }}>
            {pathname === '/custom' ? (
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }}>
                <Link
                  href="/projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.45rem',
                    padding: '.55rem 1.35rem',
                    fontSize: '.875rem',
                    fontWeight: 650,
                    borderRadius: '9999px',
                    color: '#FFFFFF',
                    background: '#18181B',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 2px 8px rgba(24, 24, 27, 0.25)',
                    textDecoration: 'none',
                    transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#27272A';
                    e.currentTarget.style.boxShadow = '0 6px 18px -2px rgba(24, 24, 27, 0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#18181B';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.25)';
                  }}
                >
                  <Package style={{ width: '14px', height: '14px', color: '#EE6E44' }} />
                  Explore Systems
                </Link>
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }}>
                <Link
                  href="/custom"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.45rem',
                    padding: '.55rem 1.35rem',
                    fontSize: '.875rem',
                    fontWeight: 650,
                    borderRadius: '9999px',
                    color: '#FFFFFF',
                    background: '#18181B',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 2px 8px rgba(24, 24, 27, 0.25)',
                    textDecoration: 'none',
                    transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#27272A';
                    e.currentTarget.style.boxShadow = '0 6px 18px -2px rgba(24, 24, 27, 0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#18181B';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.25)';
                  }}
                >
                  Customize Project <ChevronRight style={{ width: '14px', height: '14px' }} />
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
                border: open ? '1.2px solid #F3CFBF' : '1px solid var(--line)',
                color: open ? '#E55729' : 'var(--ink)',
                boxShadow: open ? '0 2px 8px -2px rgba(229, 87, 41, 0.2)' : 'none',
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
                background: 'rgba(252, 248, 244, 0.98)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: '20px',
                border: '1px solid rgba(239, 230, 220, 0.95)',
                boxShadow: '0 20px 40px -12px rgba(24, 24, 27, 0.15)',
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
                  <span style={{ fontSize: '0.625rem', padding: '0.1rem 0.45rem', fontWeight: 800, borderRadius: '9999px', background: '#FFF0EB', color: '#FF5C35', border: '1px solid #FFD4C8' }}>
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
                  const isCustom = badge?.toLowerCase() === 'custom';
                  const isFree = badge?.toLowerCase() === 'free';
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
                            ? '#FFFFFF'
                            : 'transparent',
                          border: active
                            ? '1.2px solid rgba(239, 230, 220, 0.95)'
                            : '1.2px solid transparent',
                          boxShadow: active
                            ? '0 2px 6px -1px rgba(24, 24, 27, 0.05)'
                            : 'none',
                          color: '#18181B',
                        }}
                      >
                        <div
                          style={{
                            width: '2.25rem',
                            height: '2.25rem',
                            borderRadius: '11px',
                            flexShrink: 0,
                            background: active
                              ? '#FFF0EB'
                              : 'var(--surface-2)',
                            border: active
                              ? '1px solid #FFD4C8'
                              : '1px solid var(--line)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon style={{ width: '1.1rem', height: '1.1rem', color: active ? '#FF5C35' : 'var(--ink-2)' }} />
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
                                  background: isCustom ? '#FDF6F2' : '#FAF5EE',
                                  color: isCustom ? '#E55729' : '#71717A',
                                  border: `1px solid ${isCustom ? '#F3CFBF' : '#EFE6DC'}`,
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
                  background: 'rgba(250, 245, 238, 0.7)',
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
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: '#18181B',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(24, 24, 27, 0.25)',
                    }}
                  >
                    <Package style={{ width: '0.9375rem', height: '0.9375rem', color: '#FF7B59' }} />
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
                    color: '#E55729',
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
