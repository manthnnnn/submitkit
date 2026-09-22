import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { CONSTANTS } from "@/lib/constants";
import Script from "next/script";
import { HomeSchema } from "@/components/seo/SeoSchema";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

// GA4 Measurement ID — set NEXT_PUBLIC_GA_ID in your env vars (format: G-XXXXXXXXXX)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.APP_URL),
  title: {
    template: `%s | ${CONSTANTS.APP_NAME}`,
    default: `Final Year CSE Projects with Source Code & IEEE Report (₹299) | ${CONSTANTS.APP_NAME}`,
  },
  description: CONSTANTS.TAGLINE_LONG,
  keywords: CONSTANTS.SEO_KEYWORDS,
  authors: [{ name: CONSTANTS.FOUNDER_NAME, url: CONSTANTS.APP_URL }],
  creator: CONSTANTS.FOUNDER_NAME,
  publisher: CONSTANTS.APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'education, engineering, final year projects, academic projects',
  classification: 'Education, Engineering, Academic Project Marketplace',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: CONSTANTS.APP_URL,
    siteName: CONSTANTS.APP_NAME,
    title: `Final Year CSE Projects with Source Code & IEEE Report (₹299) | ${CONSTANTS.APP_NAME}`,
    description: CONSTANTS.TAGLINE_LONG,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${CONSTANTS.APP_NAME} - Engineering Final Year Project Kits with Source Code`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Final Year CSE Projects with Source Code & IEEE Report (₹299) | ${CONSTANTS.APP_NAME}`,
    description: CONSTANTS.TAGLINE_LONG,
    images: ['/og-image.jpg'],
    creator: '@submitkit',
  },
  facebook: {
    appId: 'submitkit',
  },
  verification: {
    // TODO: Replace with real code from Google Search Console > Ownership Verification > HTML tag
    // Go to: https://search.google.com/search-console → Add Property → HTML tag → copy content value
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'REPLACE_WITH_REAL_GSC_CODE',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon.svg' }],
  },
  other: {
    'telephone': CONSTANTS.SUPPORT_PHONE,
    'whatsapp-number': CONSTANTS.SUPPORT_PHONE,
    'place': CONSTANTS.SUPPORT_ADDRESS,
  } as Record<string, string | string[]>,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        {/* Razorpay checkout */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        {/* Google Analytics 4 — only loads when GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        <HomeSchema />
        <AnalyticsTracker />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
