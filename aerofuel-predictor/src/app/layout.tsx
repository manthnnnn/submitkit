import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'AeroFuel Predictor AI',
  description: 'AI-driven aviation fuel consumption and route optimization platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Outfit:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
