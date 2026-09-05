import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Project } from "@/lib/types";
import { TechBadge } from "@/components/ui/tech-badge";
import { formatCurrency } from "@/lib/utils";
import { CustomerForm } from "@/components/ui/customer-form";
import { UrgencyTimer } from "@/components/ui/urgency-timer";
import { StickyBuyBar } from "@/components/ui/sticky-buy-bar";
import { CheckCircle2, ChevronRight, FileText, MonitorPlay, Presentation, TerminalSquare, Lock, Star } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import { getProjectLiveUrl } from "@/lib/available-projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let project = null;

  const fetchProject = async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', resolvedParams.slug)
      .single();
    return data;
  };

  try {
    project = await fetchProject();
  } catch (err) {
    try {
      project = await fetchProject();
    } catch (retryErr) {
      project = null;
    }
  }

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | SubmitKit`,
    description: project.problem_statement?.substring(0, 160) || project.description,
    openGraph: {
      title: project.title,
      description: project.problem_statement?.substring(0, 160) || project.description,
      type: 'website',
    }
  };
}

export const dynamic = 'force-dynamic';

// Sample Viva Q&As (blurred teaser)
const vivaQuestions = [
  { q: "What is the main purpose of this project?", a: "This project is designed to solve the problem of..." },
  { q: "Which algorithm/model did you use and why?", a: "We used a supervised learning approach specifically..." },
  { q: "How does the data flow through the system?", a: "The user inputs data through the frontend, which..." },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let project = null;
  let queryError = null;

  const fetchProjectDetail = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data;
  };

  try {
    project = await fetchProjectDetail();
  } catch (err) {
    try {
      project = await fetchProjectDetail();
    } catch (retryErr) {
      queryError = retryErr;
    }
  }

  if (queryError || !project) {
    notFound();
  }

  const p: Project = project as Project;
  const isMajor = p.tier === 'MAJOR';

  return (
    <div className="min-h-screen pb-24 bg-[#09090b] relative overflow-hidden">

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/10 top-0 right-0 -translate-y-1/3 translate-x-1/3" />
      </div>

      {/* Sticky Mobile Buy Bar */}
      <StickyBuyBar price={p.price_inr} title={p.title} />

      {/* Breadcrumb & Header */}
      <div className="border-b border-white/5 pt-8 pb-10 relative z-10 bg-[#09090b]/60 backdrop-blur-3xl">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-xs text-zinc-600 mb-6 gap-1">
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/projects?category=${p.category}`} className="hover:text-white transition-colors">{p.category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-400 truncate max-w-[200px]">{p.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
            <div className="max-w-2xl">
              <div className="flex gap-2.5 mb-5">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${isMajor
                  ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  {p.tier} BUNDLE
                </span>
                <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                  {p.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight leading-tight">
                {p.title}
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed mb-5">{p.description}</p>

              {getProjectLiveUrl(p.slug) && (
                <div className="mb-6">
                  <Link
                    href={getProjectLiveUrl(p.slug)!}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-400 font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 group"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>⚡ Launch Live Interactive Demo (Web Simulator)</span>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              )}

              {/* Trust Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                  <span className="text-zinc-300 font-medium">4.9</span> from 500+ students
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Bug-Free Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* About This Project */}
            <section id="about">
              <h2 className="text-xl font-display font-medium text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-500/10 rounded-lg"><FileText className="h-4 w-4 text-blue-400" /></div>
                About This Project
              </h2>
              <div className="glass-card p-6 rounded-2xl border-l-2 border-l-brand-500">
                <div className="text-zinc-300 leading-relaxed space-y-4 whitespace-pre-wrap text-sm md:text-base">
                  {p.problem_statement?.split('\\n').map((line, i) => {
                    if (!line) return null;
                    const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    });
                    return (
                      <p key={i}>{formattedLine}</p>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Project Demo Video */}
            <section>
              <h2 className="text-xl font-display font-medium text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-brand-500/10 rounded-lg"><MonitorPlay className="h-4 w-4 text-brand-400" /></div>
                Watch Project Demo
              </h2>
              <div className="aspect-video w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-950 shadow-2xl relative group">
                {p.demo_video_id ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${p.demo_video_id}?autoplay=0&rel=0&modestbranding=1`}
                    className="w-full h-full" 
                    title={`${p.title} Demo Video`} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 p-8 text-center bg-zinc-900/50">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <MonitorPlay className="h-12 w-12 mb-3 opacity-20 text-brand-400 animate-pulse" />
                    <p className="text-sm font-medium text-white mb-1">🎬 Demo Video Uploading Soon</p>
                    <p className="text-xs max-w-sm text-zinc-500">We are currently recording the high-quality demo video for this project. Rest assured, the project code is fully functional and ready to download.</p>
                  </div>
                )}
              </div>
              
              {/* Optional: Screenshots Gallery Strip */}
              {p.demo_screenshots && p.demo_screenshots.length > 0 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x">
                  {p.demo_screenshots.map((img, i) => (
                    <div key={i} className="shrink-0 w-48 aspect-video rounded-xl border border-white/10 overflow-hidden bg-zinc-900 snap-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-xl font-display font-medium text-white mb-4 flex items-center gap-2.5">
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

            {/* What's in the Box */}
            <section>
              <h2 className="text-xl font-display font-medium text-white mb-4">What's in the Box?</h2>
              <div className="space-y-3">
                <div className="glass-card p-5 rounded-2xl flex gap-4 items-start border-l-2 border-l-blue-500 hover:border-white/20 transition-all">
                  <div className="bg-blue-500/10 p-3 rounded-xl shrink-0"><TerminalSquare className="h-5 w-5 text-blue-400" /></div>
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">Source Code + 1-Click Launcher</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Clean, tested code with <code className="bg-white/10 text-blue-300 px-1 py-0.5 rounded text-xs">run.bat</code> (Windows) and <code className="bg-white/10 text-blue-300 px-1 py-0.5 rounded text-xs">run.sh</code> (Mac/Linux). Double-click to start — zero setup.</p>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl flex gap-4 items-start border-l-2 border-l-purple-500 hover:border-white/20 transition-all">
                  <div className="bg-purple-500/10 p-3 rounded-xl shrink-0"><FileText className="h-5 w-5 text-purple-400" /></div>
                  <div>
                    <h3 className="text-base font-medium text-white mb-1 flex items-center gap-2">
                      IEEE Black Book Report
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-bold">.DOCX</span>
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">A completely written {isMajor ? '60+' : '30+'}-page Word document, formatted to university guidelines. Print and bind — your name goes on the cover.</p>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-xs text-zinc-400">
                      {['Literature Survey & Base Papers', 'System Architecture & Algorithms', 'UML, DFD & ER Diagrams', 'Hardware & Software Specs', 'Real Output Screenshots', 'Future Scope & Conclusion'].map(item => (
                        <div key={item} className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-purple-400 shrink-0" />{item}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl flex gap-4 items-start border-l-2 border-l-amber-500 hover:border-white/20 transition-all">
                  <div className="bg-amber-500/10 p-3 rounded-xl shrink-0"><Presentation className="h-5 w-5 text-amber-400" /></div>
                  <div>
                    <h3 className="text-base font-medium text-white mb-1 flex items-center gap-2">
                      Defense Presentation
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-bold">.PPTX</span>
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">15–20 beautifully designed slides with <strong className="text-white">exact speaker notes</strong> — we tell you word-for-word what to say to the examiner during your Viva.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 🔒 Viva Q&A Teaser */}
            <section>
              <h2 className="text-xl font-display font-medium text-white mb-4 flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg"><Lock className="h-4 w-4 text-emerald-400" /></div>
                Top Viva Questions Included
              </h2>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Preview <span className="text-white font-medium">3 of 25</span> included Q&As</p>
                  <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded font-medium border border-brand-500/30">25 Total Q&As</span>
                </div>
                <div className="divide-y divide-white/5">
                  {vivaQuestions.map((qa, idx) => (
                    <div key={idx} className="p-4 relative">
                      <p className="text-sm font-medium text-white mb-1.5">Q{idx + 1}: {qa.q}</p>
                      <p className={`text-sm text-zinc-400 ${idx > 0 ? 'blur-sm select-none' : ''}`}>
                        {idx === 0 ? qa.a + " The system architecture follows a 3-tier model..." : qa.a}
                      </p>
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

          {/* Sidebar */}
          <div className="w-full lg:w-auto space-y-4 lg:sticky lg:top-24 self-start" id="checkout-form">

            {/* Urgency Timer */}
            <UrgencyTimer />

            {/* Price + Checkout Form */}
            <div className="glass-card p-6 rounded-2xl border-t-2 relative overflow-hidden" style={{ borderTopColor: isMajor ? 'var(--color-brand-500)' : 'var(--color-success-500)' }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10 mb-5">
                <p className="text-zinc-500 text-xs font-medium mb-1">Complete Bundle</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-display font-bold text-white">{formatCurrency(p.price_inr)}</p>
                  <p className="text-zinc-600 text-sm line-through mb-1">
                    {formatCurrency(isMajor ? 3999 : 1499)}
                  </p>
                </div>
                <p className="text-emerald-400 text-xs font-medium mt-0.5">
                  Save {isMajor ? '₹3,500' : '₹1,200'} vs local shops
                </p>
              </div>
              <CustomerForm projectId={p.id} price={p.price_inr} />
            </div>

            {/* Trust Badges */}
            <div className="glass-card p-5 rounded-2xl space-y-4">
              <h3 className="text-white font-medium text-sm border-b border-white/5 pb-3">Why Buy This Project?</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-brand-400 text-xs font-semibold mb-0.5">Who is this for?</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">Perfect for {p.category} {isMajor ? 'final year (7th/8th sem)' : 'pre-final year (5th/6th sem)'} students who need a guaranteed passing submission.</p>
                </div>
                <div>
                  <p className="text-emerald-400 text-xs font-semibold mb-0.5">Zero-Friction Execution</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">Extract the ZIP, double click <code className="bg-white/10 px-1 py-0.5 rounded text-emerald-300">run.bat</code>, and it starts. No dev environment setup needed.</p>
                </div>
                <div>
                  <p className="text-blue-400 text-xs font-semibold mb-0.5">100% Original Codebase</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">Custom-built codebase for each project — not a copy-pasted GitHub repo.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
