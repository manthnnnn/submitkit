'use client';

import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/admin/login";
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-error-400 hover:bg-error-500/10 rounded-lg transition-colors"
    >
      <LogOut className="h-5 w-5" /> Logout
    </button>
  );
}
