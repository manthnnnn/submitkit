import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
            <Logo size="sm" href="/" className="mb-4" />
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
          <p>&copy; {new Date().getFullYear()} SubmitKit. All rights reserved.</p>
          <p className="text-center">Disclaimer: Sold as educational reference materials only.</p>
        </div>
      </div>
    </footer>
  );
}

