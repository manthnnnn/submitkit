import Link from "next/link";
import { Layers, LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { LogoutButton } from "@/components/ui/logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 md:min-h-screen">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-brand-400" />
            <span className="font-display font-bold text-lg text-white">Vault Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Package className="h-5 w-5" /> Projects
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" /> Orders
          </Link>
        </nav>
        <div className="p-4 mt-auto border-t border-slate-800">
          <LogoutButton />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
