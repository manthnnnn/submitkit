'use client';

import { FileDown } from 'lucide-react';

interface PreOrder {
  id: string;
  project_slug: string;
  project_title: string;
  name: string;
  email: string;
  phone: string;
  college: string | null;
  created_at: string;
}

export function ExportCSVButton({ orders }: { orders: PreOrder[] }) {
  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Project', 'Date'];
    const rows = orders.map(o => [
      `"${o.name}"`,
      o.email,
      o.phone,
      `"${o.college ?? ''}"`,
      `"${o.project_title || o.project_slug}"`,
      new Date(o.created_at).toISOString(),
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `preorders_waitlist_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={orders.length === 0}
      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <FileDown className="w-4 h-4" />
      Export CSV ({orders.length})
    </button>
  );
}
