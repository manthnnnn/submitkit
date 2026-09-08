'use client';

import { useState } from 'react';
import { FileDown, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

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
    a.download = `preorders_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={orders.length === 0}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <FileDown className="w-4 h-4" />
      Export CSV ({orders.length})
    </button>
  );
}

export function BroadcastWaitlistButton({
  projectSlug,
  projectTitle,
  count,
}: {
  projectSlug: string;
  projectTitle?: string;
  count: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleBroadcast = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/admin/preorders/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectSlug, projectTitle }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Failed to send broadcast');
        return;
      }

      setStatus('success');
      setMessage(`Launch email sent to ${data.recipientsCount} waitlisted students!`);
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3500);
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={count === 0}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.25)',
        }}
      >
        <Send className="w-3.5 h-3.5 text-emerald-400" />
        Notify Waitlist ({count})
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111115] border border-white/10 w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">
              Broadcast Launch Notification
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Send an official launch email with instant download links to all <strong>{count}</strong> students who pre-ordered <strong>{projectTitle || projectSlug}</strong>.
            </p>

            {status === 'success' && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                {message}
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                {message}
              </div>
            )}

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => { setIsOpen(false); setStatus('idle'); }}
                disabled={status === 'loading'}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-white/5 border border-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBroadcast}
                disabled={status === 'loading' || status === 'success'}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Broadcasting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Launch Blast
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
