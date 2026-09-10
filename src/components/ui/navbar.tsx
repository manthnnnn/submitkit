'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/ui/logo';

const NAV_LINKS = [
  { href: '/projects', label: 'Browse Projects' },
  { href: '/blueprint', label: 'Topic Blueprints' },
  { href: '/#pricing',  label: 'Pricing' },
  { href: '/order/lookup', label: 'Find My Order' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false; // anchor links never "active"
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/85 backdrop-blur-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo size="sm" href="/" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-white bg-white/8'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="w-px h-4 bg-white/10 mx-2" />

            <Link
              href="/projects"
              className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-zinc-950 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Zap className="h-3.5 w-3.5" />
              Get a Project
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#09090b]/95 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-white bg-white/8'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full bg-white text-zinc-950 py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                <Zap className="h-3.5 w-3.5" />
                Get a Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
