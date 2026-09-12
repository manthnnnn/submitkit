import React from 'react';
import { cookies } from 'next/headers';
import { parseAdminSession } from '@/lib/rbac';
import { AdminShell } from './components/admin-shell';

export const metadata = {
  title: 'SubmitKit Admin Console',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  return (
    <AdminShell session={session}>
      {children}
    </AdminShell>
  );
}
