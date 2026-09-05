import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevForge IDE | Cloud Remote Code Sandbox & Practice Platform',
  description: 'Interactive cloud web IDE and algorithmic coding sandbox. Execute JavaScript, TypeScript, Python, and SQL with automated test cases and performance profiling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
