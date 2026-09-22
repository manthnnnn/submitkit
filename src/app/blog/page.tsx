import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { BreadcrumbsSchema, FAQSchema } from '@/components/seo/SeoSchema';
import { Home, Clock, BookOpen, Lightbulb, GraduationCap, FileText, Award, ArrowRight, ChevronRight, Tag } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Project Ideas': <Lightbulb className="w-4 h-4" />,
  'Guide': <BookOpen className="w-4 h-4" />,
  'Viva Prep': <GraduationCap className="w-4 h-4" />,
  'IEEE Format': <FileText className="w-4 h-4" />,
  'Success Stories': <Award className="w-4 h-4" />,
};

const HOME_FAQ = [
  {
    question: 'Are these project guides free?',
    answer: 'Yes — every blog post on SubmitKit is 100% free to read and share. Full project bundles (1-click runnable source code + 60-page editable IEEE report + PPT + Viva Q&A with answers) are available starting at ₹299 for Mini, ₹499 for Major.',
  },
  {
    question: 'Which universities do these guides follow?',
    answer: 'All guides are specifically written for Indian engineering universities: VTU Belagavi, SPPU Pune, Mumbai University, Anna University Chennai, JNTU Hyderabad / Kakinada, GTU Gujarat, RGPV MP, MDU Haryana. Chapter page counts, report format, and Viva questions match each university syllabus exactly.',
  },
  {
    question: 'Do you cover Mini (Sem 5/6) AND Major (Sem 7/8) projects?',
    answer: 'Yes — every topic explicitly covers BOTH levels. For Mini: 30-page report, 3 modules, 5 tables. For Major: 60-page IEEE report, 6+ modules, 10+ tables, RBAC, dashboard, live demo, and complete evaluation metrics chapter.',
  },
  {
    question: 'Can I get the editable Word (.docx) report template directly?',
    answer: 'Absolutely — every SubmitKit bundle includes the 60-page complete editable IEEE format Black Book (.docx) already pre-populated with correct chapters, reference list format, auto-TOC, and placeholders for you to swap in your project details. 7+ days of formatting work saved instantly.',
  },
  {
    question: 'Are these blog posts updated for 2026 syllabus?',
    answer: 'Yes — every post was updated September 2026 for the latest 2026 academic year syllabi, latest frameworks (Next.js 14/15, TensorFlow 2.17, PyTorch 2.4, FastAPI 0.112), and current Viva examiner questions being asked this semester.',
  },
];

export const metadata = {
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#09090b] relative overflow-hidden text-zinc-300">
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog' },
      ]} />
      <FAQSchema faqs={HOME_FAQ} />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-brand-500/8 top-0 left-0 -translate-y-1/3 -translate-x-1/3" />
        <div className="glow-orb w-[500px] h-[500px] bg-emerald-500/6 bottom-0 right-0 translate-y-1/3 translate-x-1/3" />
      </div>

      <div className="border-b border-white/5 pt-12 pb-16 relative z-10 bg-[#09090b]/70 backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-zinc-500 mb-8 gap-1 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-1">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-zinc-700" />
            <span className="text-zinc-300 font-medium">Blog</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 max-w-6xl">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold tracking-wide mb-5">
                <BookOpen className="w-3.5 h-3.5" />
                FREE FINAL YEAR KNOWLEDGE BASE
              </div>
              <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight leading-[1.05] mb-5">
                Project Guides, 500+ Ideas &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-emerald-400 to-sky-400">IEEE Report Templates</span>
              </h1>
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-6">
                Everything you need to score 95% in your VTU / SPPU / Mumbai / Anna / JNTU / GTU final year submission. Written by SubmitKit Engineering team — 65+ university projects delivered & verified.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all">
                  Browse Verified Project Kits <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/blueprint" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent border border-white/15 text-white font-medium text-sm hover:bg-white/5 transition-all">
                  ₹19 Blueprint Starter (Topic Approval)
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full md:w-auto md:min-w-[440px]">
              {[
                { num: BLOG_POSTS.length + '+', label: 'Published Guides', sub: 'More added weekly' },
                { num: '500+', label: 'Project Ideas', sub: 'CSE AIML IoT FullStack' },
                { num: '60p', label: 'IEEE Templates', sub: 'VTU SPPU MU AU JNTU GTU' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl">
                  <div className="font-display font-black text-2xl md:text-3xl text-white leading-none">{s.num}</div>
                  <div className="text-xs font-bold text-brand-400 mt-2 tracking-wide uppercase">{s.label}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-16 space-y-20">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-2">
                Latest University Guides
              </h2>
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
                Long-form, SEO-optimised deep dives. Each guide gives you the exact project structure, chapter-by-chapter report outline, working algorithms, and Viva Q&A with examiner-approved answers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, idx) => (
              <article
                key={post.slug}
                className="group relative rounded-3xl bg-gradient-to-br from-zinc-900/70 to-zinc-950 border border-white/[0.07] hover:border-brand-500/40 p-6 md:p-7 flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-brand-500/5 blur-3xl group-hover:bg-brand-500/15 transition-all" />

                <div className="relative flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px] font-bold uppercase tracking-wider">
                    {CATEGORY_ICONS[post.category]} {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 border border-white/5 text-zinc-400 text-[11px] font-medium">
                    <Clock className="w-3 h-3" /> {post.estimatedReadTime} read
                  </span>
                </div>

                <h3 className="relative font-display font-bold text-xl md:text-2xl text-white leading-[1.2] mb-4 min-h-[64px] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-brand-300 transition-all">
                  <Link href={`/blog/${post.slug}`} className="stretched-link">
                    {post.title}
                  </Link>
                </h3>

                <p className="relative text-sm md:text-base text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                  {post.summary}
                </p>

                <div className="relative flex flex-wrap gap-1.5 mb-6">
                  {post.tags.slice(0, 5).map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/5 text-zinc-400 text-[11px]">
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </span>
                  ))}
                </div>

                <div className="relative mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-lg">
                      SK
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{post.author}</div>
                      <div className="text-[11px] text-zinc-500">{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-400 group-hover:gap-2.5 transition-all"
                  >
                    Read <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="relative rounded-[2rem] bg-gradient-to-br from-brand-950/60 via-zinc-900 to-emerald-950/40 border border-brand-500/30 p-8 md:p-12 overflow-hidden shadow-2xl">
            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold tracking-wide mb-5">
                  ⚡ DEAL FOR FINAL YEAR STUDENTS
                </div>
                <h3 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-[1.1] mb-5">
                  60 Days to Submission?<br />
                  Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-300">Full Verified Project Kit</span> Today.
                </h3>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl mb-7">
                  <strong>1-click runnable source code</strong> + <strong>60-page editable IEEE Black Book (.docx)</strong> + <strong>defense PPT with speaker notes</strong> + <strong>top 25 Viva Q&amp;A with examiner-approved answers</strong>. UPI payment. WhatsApp delivery in 30 seconds. Prices start at ₹299 for Mini, ₹499 for Major.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-zinc-950 font-bold text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all">
                    Browse All 9 Project Kits <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href={CONSTANTS.SUPPORT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent border border-white/15 text-white font-medium text-sm hover:bg-white/5 transition-all">
                    Talk on WhatsApp (₹91-8799814256)
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {[
                  { title: 'Mini Project Kit', price: '₹299', features: ['30-page IEEE report .docx', 'Source Code + README', '15-slide PPT', 'Top 15 Viva Q&A'] },
                  { title: 'Major Project Kit', price: '₹499', highlight: true, features: ['60-page IEEE report .docx', '1-click runnable full code', '25-slide defense PPT', 'Top 25 Viva Q&A + Answers'] },
                ].map((plan, i) => (
                  <div key={i} className={`p-5 rounded-2xl border backdrop-blur-xl ${plan.highlight ? 'bg-white/[0.07] border-white/20 shadow-xl' : 'bg-white/[0.03] border-white/[0.07]'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-bold text-white">{plan.title}</div>
                      <div className="font-display font-black text-2xl md:text-3xl text-white">{plan.price}</div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f, j) => (
                        <li key={j} className="text-xs md:text-sm text-zinc-300 flex items-start gap-2">
                          <span className="text-brand-400 mt-1">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOME_FAQ.map((f, i) => (
              <details key={i} className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 group open:border-brand-500/30 transition-all">
                <summary className="cursor-pointer font-bold text-white text-base md:text-lg flex items-start gap-3">
                  <span className="text-brand-400 font-black shrink-0 text-lg">Q{i + 1}.</span>
                  <span>{f.question}</span>
                </summary>
                <p className="text-sm md:text-base text-zinc-300 pl-9 mt-3 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
