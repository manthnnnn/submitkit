'use client';

import { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Hit the server-side logout route which properly deletes the httpOnly cookie
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      // Always redirect even if fetch fails
      window.location.href = '/admin/login';
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
    >
      {loading
        ? <Loader2 className="h-4 w-4 animate-spin" />
        : <LogOut className="h-4 w-4" />
      }
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
