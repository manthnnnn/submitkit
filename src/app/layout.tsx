import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { CONSTANTS } from "@/lib/constants";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    template: `%s | ${CONSTANTS.APP_NAME}`,
    default: `${CONSTANTS.APP_NAME} - Premium Academic Project Bundles`,
  },
  description: "The digital marketplace delivering verified, 1-click runnable academic project bundles including source code, Black Book reports, and presentation slides.",
  metadataBase: new URL(CONSTANTS.APP_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
