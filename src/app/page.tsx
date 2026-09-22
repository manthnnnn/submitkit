'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CONSTANTS } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Zap, Download, ShieldCheck, Star, Sparkles, MonitorPlay, Search, BookOpen, ChevronRight, MessageCircle, Compass, Code2, FileText, Presentation, Flame } from "lucide-react";
import { PricingHook } from "@/components/ui/pricing-hook";
import { CompareSlider } from "@/components/ui/compare-slider";
import { FleetSection } from "@/components/ui/fleet-section";
import { Testimonials } from "@/components/ui/testimonials";
import { LiveTicker } from "@/components/ui/live-ticker";
import { useEffect, useState, useRef } from "react";

interface SearchTopicResult {
  id: string;
  title: string;
  category: string;
  tagline: string;
}

// Animated counter hook
function useCounter(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-display font-bold text-white">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-xs text-zinc-500 mt-1">{label}</div>
    </div>
  );
}

const ROTATING_HERO_TITLES = [
  {
    line1: "100% Working AI Projects.",
    line2: "Ready to run in 2 minutes.",
  },
  {
    line1: "Stop fixing broken code.",
    line2: "Get verified project kits today.",
  },
  {
    line1: "Complete College Projects.",
    line2: "Code, Reports, and PPTs included.",
  },
  {
    line1: "Stuck on your final year project?",
    line2: "We have exactly what you need.",
  },
  {
    line1: "1,078 Free AI Blueprints.",
    line2: "Find your perfect project topic.",
  },
];

export default function Home() {
  const router = useRouter();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % ROTATING_HERO_TITLES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [stats] = useState({
    totalScans: 1250,
    totalOrders: 512,
    moneySaved: 120000,
    moneySavedFormatted: '₹1,20,000+',
  });

  const [topicQuery, setTopicQuery] = useState("");
  const [topicResults, setTopicResults] = useState<SearchTopicResult[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTopicSearchChange = (val: string) => {
    setTopicQuery(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    const trimmed = val.trim();
    if (trimmed.length >= 1) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/blueprint/search?q=${encodeURIComponent(trimmed)}&limit=4`);
          if (res.ok) {
            const data = await res.json();
            setTopicResults(data.results || []);
          }
        } catch {
          // silently handle network error
        }
      }, 100);
    } else {
      setTopicResults([]);
    }
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicQuery.trim()) {
      router.push(`/blueprint?q=${encodeURIComponent(topicQuery.trim())}`);
    } else {
      router.push('/blueprint');
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#09090b]">

      {/* Premium Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] -translate-y-1/2 mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-emerald-500/15 rounded-full blur-[100px] translate-y-1/3 mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        {/* Subtle grid overlay for tech feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative pt-12 md:pt-24 pb-16">


        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:pt-8">

            {/* Left: Pitch */}
            <div className="text-left max-w-2xl relative z-10">
              
              {/* Premium Branding Hook for Stories */}
              <div className="mb-8 flex items-center gap-3 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold tracking-wide text-xs backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" /> India's #1 Project Platform
                </div>
                <LiveTicker />
              </div>

              {/* Rotating Title */}
              <div className="min-h-[160px] md:min-h-[180px] lg:min-h-[220px] flex flex-col justify-end mb-6">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={heroIndex % ROTATING_HERO_TITLES.length}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className="text-5xl md:text-6xl lg:text-6xl xl:text-[64px] font-display font-black tracking-tighter text-white leading-[1.1] md:leading-tight"
                  >
                    {ROTATING_HERO_TITLES[heroIndex % ROTATING_HERO_TITLES.length]?.line1}<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-brand-400 to-purple-500 font-black inline-block pb-2 pr-4 max-w-full">
                      {ROTATING_HERO_TITLES[heroIndex % ROTATING_HERO_TITLES.length]?.line2}
                    </span>
                  </motion.h1>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-[90%]"
              >
                Skip the stress of broken GitHub code. Get a <strong className="text-white font-semibold">ready-to-submit project</strong> with the IEEE Black Book report, PPT slides, and code. Just download, run, and submit.
              </motion.p>

              {/* Deliverable Highlights */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Code Errors
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <FileText className="w-3.5 h-3.5" /> 60-Page Report (.docx)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <Presentation className="w-3.5 h-3.5" /> Defense PPT
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Link href="/projects" className="relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-zinc-950 font-bold text-sm transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Browse Ready Projects <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#pricing" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 hover:border-white/20 backdrop-blur-md">
                  View Pricing
                </Link>
              </motion.div>

              {/* Star rating social proof */}
              <motion.div
                initial={{ opacity: 0, opacity: 0 }}
                animate={{ opacity: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 mt-8 pt-8 border-t border-white/10"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#09090b] bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center`}>
                      <Star className="w-3 h-3 text-zinc-400" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-zinc-400 text-xs mt-0.5">Trusted by <strong className="text-white">500+</strong> students</span>
                </div>
              </motion.div>

              {/* Divider / Clean Visual Portal Entrance */}
              <div className="mt-12 mb-6 w-full max-w-lg flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Topic Intelligence & 1-Prompt Roadmaps
                </span>
                <div className="h-px bg-gradient-to-r from-emerald-500/25 via-white/10 to-transparent flex-1" />
              </div>

              {/* Ultra-Professional Topic Explorer Portal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-lg relative rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden group mt-12"
              >
                {/* Internal glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-500/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />

                {/* Top header */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center shadow-lg group-hover:border-emerald-500/50 transition-colors duration-500">
                    <Compass className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-white font-bold tracking-tight text-xl">
                        AI Topic Explorer
                      </h3>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        Free AI Tool
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                      Search 1,000+ topics to generate instant roadmaps, code architecture, and AI build prompts.
                    </p>
                  </div>
                </div>

                {/* Frosted Modern Search Bar */}
                <form 
                  onSubmit={handleTopicSubmit}
                  className="relative flex items-center bg-zinc-900/50 border border-white/10 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-2xl p-2 transition-all shadow-inner z-10"
                >
                  <Search className="w-5 h-5 text-zinc-500 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search e.g. Face Recognition, RAG..."
                    value={topicQuery}
                    onChange={(e) => handleTopicSearchChange(e.target.value)}
                    className="w-full bg-transparent border-none text-white px-4 py-3 outline-none text-sm placeholder:text-zinc-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-white hover:bg-zinc-200 text-zinc-950 px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Instant Topic Autocomplete Results */}
                {topicResults.length > 0 && (
                  <div className="mt-3 bg-zinc-950/95 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden shadow-2xl backdrop-blur-xl">
                    {topicResults.map((t) => (
                      <Link
                        key={t.id}
                        href={`/blueprint/${t.id}`}
                        className="flex items-center justify-between p-3 hover:bg-emerald-500/10 transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                              {t.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 font-mono shrink-0">
                              {t.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate mt-0.5">{t.tagline}</p>
                        </div>
                        <span className="text-xs text-emerald-400 font-semibold shrink-0 flex items-center gap-1">
                          View Roadmap <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Popular Quick Chips */}
                <div className="mt-6 z-10 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Trending Right Now:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Face Attendance", domain: "AI", id: "face-recognition-attendance", color: "from-blue-500/20 to-indigo-500/20" },
                      { name: "Crypto Portfolio", domain: "Web3", id: "crypto-portfolio-tracker", color: "from-amber-500/20 to-orange-500/20" },
                      { name: "Fraud Detection", domain: "Fintech", id: "credit-card-fraud-detection", color: "from-emerald-500/20 to-teal-500/20" },
                    ].map((chip) => (
                      <Link
                        key={chip.id}
                        href={`/blueprint/${chip.id}`}
                        className={`text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r ${chip.color} hover:brightness-125 text-white border border-white/5 transition-all flex items-center gap-2`}
                      >
                        <span className="font-medium">{chip.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* High-Impact Direct Catalog Link */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between z-10 relative">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">
                      Over 1,078 blueprints available
                    </span>
                  </div>
                  <Link
                    href="/blueprint"
                    className="text-xs text-white hover:text-emerald-400 font-bold flex items-center gap-1.5 transition-colors group/link"
                  >
                    View All Topics
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right: Pricing Hook Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <PricingHook />
            </motion.div>
          </div>



          {/* College Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/5"
          >
            <p className="text-center text-xs text-zinc-600 mb-4 uppercase tracking-wider">Trusted by students from</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-zinc-600 font-medium">
              {['VTU', 'Mumbai University', 'Pune University', 'Anna University', 'JNTU', 'GTU', 'RGPV', 'MDU'].map(uni => (
                <span key={uni} className="hover:text-zinc-400 transition-colors cursor-default">{uni}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS ROW (Global Counter)
      ═══════════════════════════════════════ */}
      <section className="py-10 border-t border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatCounter target={59} suffix="" label="Ready Project Kits" />
            <StatCounter target={CONSTANTS.TOTAL_TOPICS} suffix="+" label="Free Topic Blueprints" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-emerald-400">
                {stats.moneySavedFormatted}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Saved from Local Shops</div>
            </div>
            <StatCounter target={stats.totalOrders} suffix="+" label="Students Passed" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          BROWSE BY CATEGORY
      ═══════════════════════════════════════ */}
      <section className="py-16 relative section-deferred">
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-4 border border-indigo-500/20 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" /> Domain Specific
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">Browse by Category</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">Find the exact project stack mandated by your college professors.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {CONSTANTS.CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/blueprint?q=${encodeURIComponent(cat.value)}`}
                  className="block p-5 text-center rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/80 hover:border-indigo-500/30 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    {cat.value === 'AIML' ? <Zap className="w-5 h-5" /> : 
                     cat.value === 'FullStack' ? <Code2 className="w-5 h-5" /> :
                     cat.value === 'Cybersecurity' ? <ShieldCheck className="w-5 h-5" /> :
                     cat.value === 'Healthcare' ? <CheckCircle2 className="w-5 h-5" /> :
                     cat.value === 'FinTech' ? <Star className="w-5 h-5" /> :
                     <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">{cat.label}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DEMO VIDEO (How it works)
      ═══════════════════════════════════════ */}
      <section className="py-16 border-b border-white/5 relative bg-zinc-950/50 section-deferred">
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 border border-blue-500/20 uppercase tracking-wider">
              <MonitorPlay className="w-3.5 h-3.5" /> 2-Minute Setup
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">See it in action</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">From instant download to a fully working localhost project in under 2 minutes.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] bg-black relative ring-1 ring-white/5"
          >
            <video 
              controls
              playsInline
              preload="metadata"
              poster="/video-poster.jpg"
              className="w-full aspect-video object-contain"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BENTO GRID (What & Why)
      ═══════════════════════════════════════ */}
      <section className="py-16 relative section-deferred">
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold mb-4 border border-brand-500/20 uppercase tracking-wider">
              Why Students Choose SubmitKit
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">Stop Wasting Weeks Fixing Broken Code</h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-sm">One download. Zero headaches. Running on your screen in under 5 minutes.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">

            {/* Compare Slider - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 glass-card rounded-3xl overflow-hidden"
            >
              <div className="p-5 pb-0">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 inline-block" />
                  Compare: Building Alone from Random GitHub Code vs. SubmitKit Complete Bundle
                </h3>
              </div>
              <div className="p-3 w-full flex items-center justify-center min-h-[380px]">
                <CompareSlider />
              </div>
            </motion.div>

            {/* Right column */}
            <div className="flex flex-col gap-5">

              {/* Why SubmitKit */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-3xl p-6 flex-grow"
              >
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> The SubmitKit Way
                </h3>
                <ul className="space-y-3">
                  {[
                    'Starts from just ₹299 (Save ₹10,000)',
                    '1-Click Runnable Code (Zero Errors)',
                    'Pre-formatted 60-Page IEEE Black Book',
                    'Defense PPT Slides with Speaker Notes',
                    'Top 25 Viva Q&A with Full Answers',
                    'Instant WhatsApp & Email Download',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-zinc-300 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 3 Steps */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-3xl p-6 bg-brand-500/5 border-brand-500/20"
              >
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-400" /> 3 Steps to Submit
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { num: '1', text: 'Pick Your Kit & Pay via UPI', sub: 'Instant QR / Google Pay / PhonePe' },
                    { num: '2', text: 'Download & Double-Click to Run', sub: 'Runs on any laptop in 2 mins' },
                    { num: '3', text: 'Print Black Book & Ace Your Viva', sub: 'Full report & top 25 answers' },
                  ].map((step, i) => (
                    <div key={step.num}>
                      {i > 0 && <div className="w-px h-3 bg-white/10 ml-3.5 mb-3" />}
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">{step.num}</div>
                        <div>
                          <span className="text-xs text-white font-medium block">{step.text}</span>
                          <span className="text-[11px] text-zinc-500">{step.sub}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FLEET SECTION: AVAILABLE VS UPCOMING
      ═══════════════════════════════════════ */}
      <FleetSection />

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <Testimonials />

      {/* ═══════════════════════════════════════
          PRICING SECTION
      ═══════════════════════════════════════ */}
      <section id="pricing" className="py-16 relative border-t border-white/5 section-deferred">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">Simple Pricing. No Hidden Charges.</h2>
            <p className="text-zinc-500 max-w-lg mx-auto mb-12">Pay once, download instantly. No subscriptions. No nonsense.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-left">

            {/* Blueprint Starter - ₹19 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="glass-card rounded-2xl p-6 md:p-7 flex flex-col hover-glow transition-all duration-500 hover:-translate-y-1 border-t-2 border-t-amber-400 bg-amber-950/10 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-medium text-white">Blueprint Starter</h3>
                <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5 text-amber-400" /> Best Entry
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-5">Topic roadmap &amp; evaluator defense before writing code.</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹19</span>
                <span className="text-zinc-600 text-sm line-through">₹149</span>
                <span className="text-xs text-amber-400 font-semibold ml-1">Save ₹130</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  'Topic Roadmap (.docx & .pdf)',
                  '1-Prompt AI Master Build Guide',
                  'Mock Dataset & Architecture Schema',
                  'Top 10 Viva Q&A with Answers',
                  'Instant WhatsApp & Email Access',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/blueprint" className="block w-full py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-center rounded-xl text-amber-300 font-medium transition-all text-sm border border-amber-500/30 hover:border-amber-500/50">
                Browse 1,000+ Topics
              </Link>
            </motion.div>

            {/* Mini */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-7 flex flex-col hover-glow transition-all duration-500 hover:-translate-y-1 border-t-2 border-t-white/20"
            >
              <h3 className="text-xl font-medium text-white mb-1">Mini Project Kit</h3>
              <p className="text-xs text-zinc-400 mb-5">Perfect for 5th or 6th semester college submissions.</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹{CONSTANTS.PRICING.MINI_PROJECT}</span>
                <span className="text-zinc-600 text-sm line-through">₹1,699</span>
                <span className="text-xs text-emerald-400 font-semibold ml-1">Save ₹1,200</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  '1-Click Runnable Code (Zero Errors)',
                  '30-Page IEEE Black Book (.docx)',
                  'Viva Defense PPT with Speaker Notes',
                  'Top 15 Viva Q&A with Answers',
                  'Instant Download to WhatsApp & Email',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects?tier=MINI" className="block w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-center rounded-xl text-white font-medium transition-all text-sm border border-white/10 hover:border-white/20">
                Browse Mini Projects
              </Link>
            </motion.div>

            {/* Major - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 md:p-7 flex flex-col relative hover-glow transition-all duration-500 hover:-translate-y-2 border-t-2 border-t-brand-500 md:-translate-y-3 shadow-2xl shadow-brand-500/10"
            >
              <div className="absolute top-4 right-4 bg-brand-500/20 border border-brand-500/30 text-brand-400 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-brand-400" /> Most Popular
              </div>
              <h3 className="text-xl font-medium text-white mb-1">Major Project Kit</h3>
              <p className="text-xs text-zinc-400 mb-5">Built for 7th &amp; 8th Sem Final Year BE / BTech / MCA.</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹{CONSTANTS.PRICING.MAJOR_PROJECT}</span>
                <span className="text-zinc-600 text-sm line-through">₹4,999</span>
                <span className="text-xs text-emerald-400 font-semibold ml-1">Save ₹3,500</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  'Complete Full-Stack / ML Source Code',
                  '60-Page IEEE Black Book (.docx)',
                  'Viva Defense PPT with Talking Points',
                  'Top 25 External Examiner Viva Q&A',
                  'Step-by-Step Video Setup Guide',
                  'Instant WhatsApp & Email Delivery',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                    <span className="text-zinc-200 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects?tier=MAJOR" className="block w-full py-3 px-4 bg-white hover:bg-zinc-100 text-center rounded-xl text-zinc-950 font-bold transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Browse Major Projects
              </Link>
            </motion.div>

            {/* Custom Project - Tailored Build */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 md:p-7 flex flex-col hover-glow transition-all duration-500 hover:-translate-y-1 border-t-2 border-t-emerald-500/80 bg-emerald-950/10 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-medium text-white">Custom Project</h3>
                <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> 48-Hr Delivery
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-5">Custom-built to your exact college syllabus &amp; problem statement.</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹1,999</span>
                <span className="text-zinc-600 text-sm line-through">₹5,999</span>
                <span className="text-xs text-emerald-400 font-semibold ml-1">Starting from</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  '100% Unique Code Written to Your Topic',
                  'Full IEEE Black Book Report (.docx)',
                  'Defense Presentation PPT Deck',
                  '1-on-1 Code Walkthrough on Google Meet',
                  '48-Hour Delivery Guarantee',
                  'Direct WhatsApp Engineer Support',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-200 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/918799814256?text=${encodeURIComponent("Hi SubmitKit team! I want to build a custom project. Here are my requirements:\n\n• Project Title / Idea:\n• Preferred Tech Stack:\n• Core Features Needed:\n• Target Timeline / Deadline:")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-center rounded-xl text-black font-bold transition-all text-sm shadow-[0_0_20px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-black" /> Order Custom Build on WhatsApp
              </a>
            </motion.div>

          </div>

          {/* Trust strip below pricing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-zinc-600"
          >
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-zinc-500" /> Razorpay Secured</div>
            <div className="flex items-center gap-1.5"><Download className="w-4 h-4 text-zinc-500" /> Instant Delivery</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-zinc-500" /> Bug-Free Code Guarantee</div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
