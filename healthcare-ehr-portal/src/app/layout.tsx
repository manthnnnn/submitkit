import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/sidebar';

import MainWrapper from '@/components/main-wrapper';

export const metadata: Metadata = {
  title: 'HealthSync EHR Portal',
  description: 'Centralized Smart Healthcare & Electronic Health Record Portal',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
        <Sidebar />
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
