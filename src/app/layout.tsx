import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { CONSTANTS } from "@/lib/constants";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

// GA4 Measurement ID — set NEXT_PUBLIC_GA_ID in your env vars (format: G-XXXXXXXXXX)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    template: `%s | ${CONSTANTS.APP_NAME}`,
    default: `${CONSTANTS.APP_NAME} - Premium Academic Project Bundles`,
  },
  description: "The digital marketplace delivering verified, 1-click runnable academic project bundles including source code, Black Book reports, and presentation slides.",
  metadataBase: new URL(CONSTANTS.APP_URL),
  openGraph: {
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
