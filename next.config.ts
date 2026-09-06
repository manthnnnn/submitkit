import type { NextConfig } from "next";

// Only set basic non-breaking security headers.
// A strict CSP blocks Razorpay's payment iframe/popup — removed.
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',  value: 'on' },
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // NOTE: X-Frame-Options and Content-Security-Policy intentionally omitted.
  // Razorpay opens an iframe/popup for payment — a strict frame-src CSP
  // causes "This content is blocked" on the checkout page.
];

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // No redirects — the old status-based redirect caused an infinite loop
  // since /projects itself was the destination.
};

export default nextConfig;
