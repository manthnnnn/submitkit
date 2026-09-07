import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Project } from "@/lib/types";
import { TechBadge } from "@/components/ui/tech-badge";
import { formatCurrency } from "@/lib/utils";
import { CustomerForm } from "@/components/ui/customer-form";
import { UrgencyTimer } from "@/components/ui/urgency-timer";
import { StickyBuyBar } from "@/components/ui/sticky-buy-bar";
import { HowToRun } from "@/components/ui/how-to-run";
import {
  CheckCircle2, ChevronRight, FileText, MonitorPlay,
  Presentation, TerminalSquare, Lock, Star, Zap,
  ShieldCheck, Download, BookOpen, Play, ImageIcon, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import { isProjectAvailable } from "@/lib/available-projects";
import { SHOWCASE_DATA } from "@/lib/project-showcase";

// ─── Metadata ──────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  let project: Project | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
    project = data as Project;
  } catch { /* ignore — notFound handled below */ }

  if (!project) return { title: 'Project Not Found | SubmitKit' };

  return {
    title: `${project.title} | SubmitKit`,
    description: project.problem_statement?.substring(0, 160) || project.description,
    openGraph: {
      title: project.title,
      description: project.problem_statement?.substring(0, 160) || project.description,
      type: 'website',
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?select=slug&is_active=eq.true`;
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    const projects = await res.json();
    if (!Array.isArray(projects)) return [];
    return projects.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// Sample Viva Q&As — blurred teaser
const VIVA_QS = [
  { q: "What is the main purpose of this project?",       a: "This project is designed to solve the problem of managing large-scale data in real time..." },
  { q: "Which algorithm / model did you use and why?",    a: "We used a supervised learning approach specifically chosen for its efficiency..." },
  { q: "How does the data flow through the system?",      a: "The user inputs data through the frontend which sends it to the Node.js API layer..." },
];

// ─── Page ──────────────────────────────────────────────────
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project: Project | null = null;

  const fetch = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error) throw error;
    return data as Project;
  };

  try {
    project = await fetch();
  } catch {
    try { project = await fetch(); } catch { project = null; }
  }

  if (!project) notFound();

  const p          = project!;
  const isMajor    = p.tier === 'MAJOR';
  const available  = isProjectAvailable(p.slug);
  const hasVideo   = !!p.demo_video_id;
  const hasShots   = p.demo_screenshots && p.demo_screenshots.length > 0;

  return (
    <div className="min-h-screen pb-32 bg-[#09090b] relative overflow-hidden">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-brand-500/8 top-0 right-0 -translate-y-1/3 translate-x-1/3" />
        <div className="glow-orb w-[500px] h-[500px] bg-emerald-500/6 bottom-0 left-0 translate-y-1/3 -translate-x-1/3" />
      </div>

      {/* Mobile sticky buy bar */}
      <StickyBuyBar price={p.price_inr} title={p.title} />

      {/* ── BREADCRUMB + HERO HEADER ── */}
      <div className="border-b border-white/5 pt-8 pb-10 relative z-10 bg-[#09090b]/70 backdrop-blur-2xl">
        <div className="container mx-auto px-4">

          {/* Breadcrumb */}
          <nav className="flex items-center text-xs text-zinc-600 mb-6 gap-1 flex-wrap">
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href={`/projects?category=${p.category}`} className="hover:text-white transition-colors">{p.category}</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-zinc-400 truncate max-w-[200px]">{p.title}</span>
          </nav>

          <div className="flex flex-col gap-5 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                isMajor
                  ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {p.tier} BUNDLE
              </span>
              <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                {p.category}
              </span>
              {available && (
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready to Ship — Instant Download
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              {p.title}
            </h1>

            {/* Description */}
            <p className="text-zinc-400 text-base leading-relaxed">{p.description}</p>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                <span className="text-zinc-300 font-medium">4.9</span>
                <span>from 500+ students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-3 h-3 text-emerald-500" />
                <span>Instant secure download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Bug-free guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ═══ LEFT — MAIN CONTENT ═══ */}
          <div className="lg:col-span-2 space-y-12">

            {/* 1. Video + Screenshots */}
            <section>
              <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-brand-500/10 rounded-lg"><MonitorPlay className="h-4 w-4 text-brand-400" /></div>
                Project Demo
              </h2>

              {/* Video embed */}
              <div className="aspect-video w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-950 shadow-2xl mb-4">
                {hasVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${p.demo_video_id}?rel=0&modestbranding=1`}
                    className="w-full h-full"
                    title={`${p.title} Demo Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/60 text-center p-8 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                      <Play className="h-7 w-7 text-brand-400" />
                    </div>
                    <p className="text-white font-semibold mb-1">Demo Video Coming Soon</p>
                    <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
                      We are recording a high-quality walkthrough. The project code is fully functional and ready to download today.
                    </p>
                  </div>
                )}
              </div>

              {/* New See It In Action Showcase */}
              {SHOWCASE_DATA[p.slug] && SHOWCASE_DATA[p.slug].length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-400" />
                    See It In Action
                  </h3>
                  <div className="space-y-10">
                    {SHOWCASE_DATA[p.slug].map((item, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-2 py-1 rounded-md border border-brand-500/20">
                            0{idx + 1}
                          </span>
                          <h4 className="text-base font-medium text-white">{item.title}</h4>
                        </div>
                        <div className="aspect-video w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-xl group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 2. About this project */}
            <section id="about">
              <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-500/10 rounded-lg"><FileText className="h-4 w-4 text-blue-400" /></div>
                About This Project
              </h2>
              <div className="glass-card p-6 rounded-2xl border-l-2 border-l-brand-500">
                <div className="text-zinc-300 leading-relaxed space-y-4 text-sm md:text-base">
                  {p.problem_statement
                    ? p.problem_statement.split('\\n').map((line, i) => {
                        if (!line.trim()) return null;
                        const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>
                            : part
                        );
                        return <p key={i}>{parts}</p>;
                      })
                    : <p>{p.description}</p>
                  }
                </div>
              </div>
            </section>

            {/* 3. Tech Stack */}
            {p.tech_stack && p.tech_stack.length > 0 && (
              <section>
                <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                  <div className="p-1.5 bg-zinc-800 rounded-lg"><TerminalSquare className="h-4 w-4 text-zinc-400" /></div>
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {p.tech_stack.map(tech => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </section>
            )}

            {/* 4. Key Features */}
            <section>
              <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg"><CheckCircle2 className="h-4 w-4 text-emerald-400" /></div>
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {p.features.map((feature, idx) => (
                  <div key={idx} className="glass-card p-4 rounded-xl flex items-start gap-3 hover:border-white/20 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. What's in the box */}
            <section>
              <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-amber-500/10 rounded-lg"><Download className="h-4 w-4 text-amber-400" /></div>
                What&apos;s in the Box?
              </h2>
              <div className="space-y-3">
                <div className="glass-card p-5 rounded-2xl flex gap-4 items-start border-l-2 border-l-blue-500">
                  <div className="bg-blue-500/10 p-3 rounded-xl shrink-0"><TerminalSquare className="h-5 w-5 text-blue-400" /></div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Source Code + 1-Click Launcher</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Complete, tested project code with{' '}
                      <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono">run.bat</code> (Windows) and{' '}
                      <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono">run.sh</code> (Mac/Linux).
                      Double-click to launch — no manual setup required.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl flex gap-4 items-start border-l-2 border-l-purple-500">
                  <div className="bg-purple-500/10 p-3 rounded-xl shrink-0"><FileText className="h-5 w-5 text-purple-400" /></div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                      IEEE Black Book Report
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-bold">.DOCX</span>
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      {isMajor ? '60+' : '30+'}-page Word document fully formatted to university standards. Print, bind, and submit — your name goes on the cover.
                    </p>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-xs text-zinc-500">
                      {['Literature Survey & Base Papers','System Architecture & Algorithms','UML, DFD & ER Diagrams','Hardware & Software Specs','Real Output Screenshots','Future Scope & Conclusion'].map(item => (
                        <div key={item} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-purple-500 shrink-0" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl flex gap-4 items-start border-l-2 border-l-amber-500">
                  <div className="bg-amber-500/10 p-3 rounded-xl shrink-0"><Presentation className="h-5 w-5 text-amber-400" /></div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                      Viva Defense Presentation
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-bold">.PPTX</span>
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      15–20 professionally designed slides with <strong className="text-white">exact speaker notes</strong> — we tell you word-for-word what to say to the examiner.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. How to Run */}
            <section>
              <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg"><Zap className="h-4 w-4 text-emerald-400" /></div>
                How to Run This Project
              </h2>
              <div className="glass-card p-6 rounded-2xl">
                <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
                  After downloading, follow these steps to get the project running in under 5 minutes on any computer.
                </p>
                <HowToRun />
              </div>
            </section>

            {/* 7. Viva Q&A teaser */}
            <section>
              <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg"><BookOpen className="h-4 w-4 text-emerald-400" /></div>
                Top Viva Questions Included
              </h2>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Preview <span className="text-white font-medium">3 of 25</span> included Q&amp;As</p>
                  <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded font-medium border border-brand-500/30">25 Total Q&amp;As</span>
                </div>
                <div className="divide-y divide-white/5">
                  {VIVA_QS.map((qa, idx) => (
                    <div key={idx} className="p-4 relative">
                      <p className="text-sm font-semibold text-white mb-1.5">Q{idx + 1}: {qa.q}</p>
                      <p className={`text-sm text-zinc-400 ${idx > 0 ? 'blur-sm select-none' : ''}`}>{qa.a}</p>
                      {idx > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-[#09090b]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs text-zinc-400">
                            <Lock className="w-3 h-3" /> Unlock with purchase
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* ═══ RIGHT — STICKY SIDEBAR ═══ */}
          <div className="w-full space-y-4 lg:sticky lg:top-24 self-start" id="checkout-form">

            {/* Urgency timer */}
            <UrgencyTimer />

            {/* Pricing + checkout */}
            <div
              className="glass-card p-6 rounded-2xl border-t-2 relative overflow-hidden shadow-2xl"
              style={{ borderTopColor: isMajor ? 'var(--color-brand-500)' : 'var(--color-success-500)' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10 mb-5">
                <p className="text-zinc-500 text-xs font-medium mb-1">Complete Bundle — One-time Payment</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-display font-bold text-white">{formatCurrency(p.price_inr)}</p>
                  <p className="text-zinc-600 text-sm line-through mb-1">
                    {formatCurrency(isMajor ? 3999 : 1499)}
                  </p>
                </div>
                <p className="text-emerald-400 text-xs font-semibold mt-0.5">
                  Save {isMajor ? '₹3,500' : '₹1,200'} vs local project shops
                </p>
              </div>
              <CustomerForm projectId={p.id} price={p.price_inr} />
            </div>

            {/* What you get */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <h3 className="text-white font-semibold text-sm border-b border-white/5 pb-3">Everything You Receive</h3>
              {[
                { icon: <TerminalSquare className="w-3.5 h-3.5 text-blue-400" />, title: 'Working Source Code',       sub: '1-click launcher included' },
                { icon: <FileText className="w-3.5 h-3.5 text-purple-400" />,     title: `${isMajor ? '60+' : '30+'}-Page IEEE Black Book`, sub: 'Print-ready .docx format' },
                { icon: <Presentation className="w-3.5 h-3.5 text-amber-400" />,  title: 'Viva Defense PPT',          sub: 'Speaker notes included' },
                { icon: <BookOpen className="w-3.5 h-3.5 text-emerald-400" />,    title: '25 Viva Q&A Answers',       sub: 'Examiner-tested questions' },
                { icon: <Download className="w-3.5 h-3.5 text-zinc-400" />,       title: 'Instant ZIP Download',      sub: 'Available immediately after payment' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-zinc-200 text-xs font-semibold">{item.title}</p>
                    <p className="text-zinc-500 text-[11px]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick run guide */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-white font-semibold text-sm mb-4 border-b border-white/5 pb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> How to Run (Quick Steps)
              </h3>
              <HowToRun compact />
            </div>

            {/* Trust badge */}
            <div className="glass-card p-4 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-zinc-400 text-xs leading-relaxed">
                100% Secure payment powered by Razorpay. Files delivered instantly after payment confirmation.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
