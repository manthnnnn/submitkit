import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickBite | Smart Restaurant QR Ordering & Kitchen KDS",
  description: "Contactless table-side QR ordering, live kitchen display system, and digital receipts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} style={{ background: '#0B0F19', color: '#ffffff', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
