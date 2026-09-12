'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Map,
  Clock,
  ShieldAlert,
  PlusCircle,
  LogOut,
  ExternalLink,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
  shortcut?: string;
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = [
    { id: 'dashboard', title: 'Dashboard Overview', category: 'Navigation', icon: LayoutDashboard, href: '/admin' },
    { id: 'analytics', title: 'Traffic & Revenue Analytics', category: 'Navigation', icon: BarChart3, href: '/admin/analytics' },
    { id: 'orders', title: 'Customer Orders & Transactions', category: 'Operations', icon: ShoppingCart, href: '/admin/orders', shortcut: 'O' },
    { id: 'preorders', title: 'Student Pre-orders & Demand', category: 'Operations', icon: Clock, href: '/admin/preorders', shortcut: 'P' },
    { id: 'projects', title: 'Projects Catalog', category: 'Catalog', icon: Package, href: '/admin/projects' },
    { id: 'new-project', title: 'Create New Project Bundle', category: 'Catalog', icon: PlusCircle, href: '/admin/projects/new' },
    { id: 'blueprints', title: 'Blueprints Management', category: 'Catalog', icon: Map, href: '/admin/blueprints' },
    { id: 'acquisitions', title: 'Acquisition Channels', category: 'Navigation', icon: DollarSign, href: '/admin/acquisitions' },
    { id: 'audit-log', title: 'Security & Audit Logs', category: 'Security', icon: ShieldAlert, href: '/admin/audit-log', shortcut: 'A' },
    { id: 'home', title: 'View Live Public Site', category: 'External', icon: ExternalLink, href: '/' },
    { id: 'signout', title: 'Sign Out of Admin Console', category: 'Account', icon: LogOut, action: () => { window.location.href = '/api/admin/logout'; } },
  ];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          executeItem(selected);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  const executeItem = (item: PaletteItem) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border transition-all animate-in fade-in zoom-in-95 duration-150"
        style={{
          background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
          borderColor: 'rgba(255,255,255,0.12)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="h-5 w-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, pages, actions... (ESC to close)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 text-xs">
              No matching commands or pages found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors"
                  style={{
                    background: isSelected ? 'rgba(99,102,241,0.18)' : 'transparent',
                    border: isSelected ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                    color: isSelected ? '#ffffff' : '#a1a1aa',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: isSelected ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)',
                        color: isSelected ? '#818cf8' : '#71717a',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <span className="text-[10px] text-zinc-500 ml-2 font-normal">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {item.shortcut && (
                    <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <span><kbd className="text-[10px] bg-white/5 px-1 py-0.5 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="text-[10px] bg-white/5 px-1 py-0.5 rounded">↵</kbd> select</span>
          </div>
          <span>SubmitKit Admin v2</span>
        </div>
      </div>
    </div>
  );
}
