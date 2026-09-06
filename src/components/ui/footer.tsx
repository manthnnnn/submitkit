﻿import Link from 'next/link';
import { Layers } from 'lucide-react';

// Inline SVG icons for Instagram & WhatsApp (lucide-react version doesn't include them)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-white/5 pt-14 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="bg-white/5 p-1.5 rounded border border-white/10 group-hover:bg-white/10 transition-all">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-medium text-base text-white">
                Submit<span className="text-zinc-500 font-normal">Kit</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-5">
              India's premier digital marketplace for academic project bundles. Get working code, a 60-page Black Book, and Viva PPTs -- instantly.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/submitkit"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500/20 hover:border-brand-500/30 transition-all group"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-zinc-500 group-hover:text-brand-400 transition-colors" />
              </a>
              <a
                href="https://wa.me/918799814256"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all group"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Browse</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li><Link href="/projects" className="hover:text-zinc-300 transition-colors">All Projects</Link></li>
              <li><Link href="/projects?tier=MINI" className="hover:text-zinc-300 transition-colors">Mini Projects</Link></li>
              <li><Link href="/projects?tier=MAJOR" className="hover:text-zinc-300 transition-colors">Major Projects</Link></li>
              <li><Link href="/projects?category=AIML" className="hover:text-zinc-300 transition-colors">AI / ML Projects</Link></li>
              <li><Link href="/projects?category=Cybersecurity" className="hover:text-zinc-300 transition-colors">Cybersecurity Projects</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li><Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-zinc-300 transition-colors">Refund Policy</Link></li>
              <li>
                <a href="mailto:team@submitkit.in" className="hover:text-zinc-300 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:team@submitkit.in?subject=Custom Project Request&body=Hi, I need a custom project. Details: "
                  className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Custom Project Request
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600">
          <p>Â© {new Date().getFullYear()} SubmitKit. All rights reserved.</p>
          <p className="text-center">Disclaimer: Sold as educational reference materials only.</p>
        </div>
      </div>
    </footer>
  );
}

