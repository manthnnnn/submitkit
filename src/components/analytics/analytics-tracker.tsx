'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getOrCreateVisitorId(): string {
  try {
    let vid = localStorage.getItem('sk_visitor_id');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem('sk_visitor_id', vid);
    }
    return vid;
  } catch {
    return 'v_guest_' + Math.random().toString(36).substring(2, 10);
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const lastTrackedTime = useRef<number>(0);

  useEffect(() => {
    if (!pathname) return;

    // Never track admin panel or internal API endpoints
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return;
    }

    const now = Date.now();
    // Prevent duplicate firing on fast re-renders (1.5s throttle)
    if (lastTrackedPath.current === pathname && now - lastTrackedTime.current < 1500) {
      return;
    }

    lastTrackedPath.current = pathname;
    lastTrackedTime.current = now;

    const visitorId = getOrCreateVisitorId();
    const referrer = typeof document !== 'undefined' ? (document.referrer || 'direct') : 'direct';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const payload = JSON.stringify({
      path: pathname,
      visitorId,
      referrer,
      device: isMobile ? 'mobile' : 'desktop',
    });

    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Non-blocking fallback
    }
  }, [pathname]);

  return null;
}
