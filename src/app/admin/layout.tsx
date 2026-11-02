import React from 'react';
import { cookies } from 'next/headers';
import { parseAdminSession } from '@/lib/rbac';
import { AdminShell } from './components/admin-shell';

// Admin pages read cookies and live data; never prerender them at build time.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'SubmitKit Admin Console',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  return (
    <div className="admin-root min-h-screen text-slate-900 bg-[#FAF6EE]">
      <AdminShell session={session}>
        {children}
      </AdminShell>
    </div>
  );
}
