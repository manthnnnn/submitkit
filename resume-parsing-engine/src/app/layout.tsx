import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'TalentScan AI | Intelligent Resume Parsing & ATS Scoring Engine',
  description: 'Enterprise AI-powered resume parser and applicant tracking system (ATS). Extract candidate skills, experience, and match resumes against job descriptions with real-time keyword scoring.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 130px)', paddingBottom: '40px' }}>
          {children}
        </main>
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px 20px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          background: 'rgba(9, 10, 16, 0.95)',
        }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <strong>TalentScan AI ATS</strong> — Enterprise Resume Parsing & Scoring Engine
            </div>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)' }}>
              <span>NLP Regex Parser</span>
              <span>•</span>
              <span>Vector Keyword Matching</span>
              <span>•</span>
              <span>Cloudflare R2 Optimized</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
