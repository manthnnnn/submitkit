import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONSTANTS } from '@/lib/constants';
import { BLOG_POSTS, getBlogPostBySlug, getFeaturedPosts } from '@/lib/blog-posts';
import { getBlogContent } from '@/lib/blog-content';
import { BreadcrumbsSchema, BlogPostSchema, FAQSchema } from '@/components/seo/SeoSchema';
import { Home, ChevronRight, Clock, BookOpen, Lightbulb, GraduationCap, FileText, Award, Tag, ArrowLeft, Share2, Copy, Check, ArrowRight } from 'lucide-react';
import Script from 'next/script';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Project Ideas': <Lightbulb className="w-4 h-4" />,
  'Guide': <BookOpen className="w-4 h-4" />,
  'Viva Prep': <GraduationCap className="w-4 h-4" />,
  'IEEE Format': <FileText className="w-4 h-4" />,
  'Success Stories': <Award className="w-4 h-4" />,
};

export const dynamic = 'force-static';

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found | SubmitKit',
      description: 'The requested project guide or blog post does not exist.',
    };
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [...post.keywords, ...CONSTANTS.SEO_KEYWORDS],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true, follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: `engineering final year projects, ${post.category}`,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      locale: 'en_IN',
      url,
      siteName: CONSTANTS.APP_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: [{
        url: `${CONSTANTS.APP_URL}/og-image.jpg`,
        width: 1200, height: 630,
        alt: `${post.title} | ${CONSTANTS.APP_NAME}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      creator: '@submitkit.in',
      images: [`${CONSTANTS.APP_URL}/og-image.jpg`],
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const contentEntry = getBlogContent(post.slug);
  const content = contentEntry?.content;
  const faqs = contentEntry?.faq || [];
  const related = getFeaturedPosts().filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen pb-24 bg-[#09090b] relative overflow-hidden text-zinc-300">
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title },
      ]} />
      <BlogPostSchema
        title={post.metaTitle}
        description={post.metaDescription}
        slug={post.slug}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        author={post.author}
        keywords={post.tags || post.keywords}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      <Script id={`blog-copy-btn-${post.slug}`} strategy="afterInteractive">
        {`document.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-copy-url-btn]');
          if (!btn) return;
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href).then(() => {
            btn.setAttribute('data-copied', '1');
            const check = btn.querySelector('[data-check]');
            const copy = btn.querySelector('[data-copy]');
            if (check) check.classList.remove('hidden');
            if (copy) copy.classList.add('hidden');
            setTimeout(() => {
              btn.removeAttribute('data-copied');
              if (check) check.classList.add('hidden');
              if (copy) copy.classList.remove('hidden');
            }, 1800);
          });
        });`}
      </Script>

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-brand-500/8 top-0 left-0 -translate-y-1/3 -translate-x-1/3" />
        <div className="glow-orb w-[500px] h-[500px] bg-emerald-500/6 bottom-0 right-0 translate-y-1/3 translate-x-1/3" />
      </div>

      <div className="border-b border-white/5 pt-10 pb-10 relative z-10 bg-[#09090b]/70 backdrop-blur-2xl">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-zinc-500 mb-8 gap-1 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-1">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-zinc-700" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-zinc-700" />
            <span className="text-zinc-400 truncate max-w-[280px]">{post.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px] font-bold uppercase tracking-wider">
              {CATEGORY_ICONS[post.category]} {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 border border-white/5 text-zinc-400 text-[11px] font-medium">
              <Clock className="w-3 h-3" /> {post.estimatedReadTime} read
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 border border-white/5 text-zinc-400 text-[11px] font-medium">
              📅 {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <button
              data-copy-url-btn
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-zinc-300 text-[11px] font-medium hover:bg-white/[0.07] transition-all"
              aria-label="Copy blog post URL"
            >
              <Share2 data-copy className="w-3 h-3" />
              <Check data-check className="w-3 h-3 text-emerald-400 hidden" />
              <span data-copy>Share</span>
              <span data-check className="text-emerald-400 hidden">Copied!</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pt-12">
        {content || (
          <div className="py-24 text-center">
            <p className="text-zinc-400 mb-4">
              No content. Please check back.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-zinc-950 font-bold text-sm"
            >
              Back to Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {faqs.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
              📌 Common Student Questions — FAQs
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {faqs.map((f, i) => (
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
        )}

        <div className="mt-20 relative rounded-[2rem] bg-gradient-to-br from-brand-950/60 via-zinc-900 to-emerald-950/40 border border-brand-500/30 p-8 md:p-10 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-[320px] h-[320px] rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[320px] h-[320px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
              ⚡ Still Need the Full Working Bundle?
            </h3>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6 max-w-3xl">
              Get the 1-click runnable source code, the full 60-page editable IEEE format Black Book report (.docx), your defense PPT, and the top 25 Viva examiner Q&amp;A with complete answers. One-time UPI payment, instant WhatsApp download in under 30 seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-sm shadow-[0_0_25px_rgba(255,255,255,0.18)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all">
                Browse Project Kits <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blueprint" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/15 text-white font-medium text-sm hover:bg-white/5 transition-all">
                ₹19 Blueprint Starter (Topic Approval)
              </Link>
              <a href={CONSTANTS.SUPPORT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-medium text-sm hover:bg-emerald-500/15 transition-all">
                💬 WhatsApp Support (+91-8799814256)
              </a>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-8">
              📖 Related Guides You Will Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <article
                  key={rp.slug}
                  className="group rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-brand-500/40 p-6 flex flex-col transition-all hover:-translate-y-0.5 shadow-lg"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold uppercase tracking-wider">
                      {CATEGORY_ICONS[rp.category]} {rp.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800/60 border border-white/5 text-zinc-400 text-[10px]">
                      <Clock className="w-2.5 h-2.5" /> {rp.estimatedReadTime}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white leading-snug mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-brand-300 transition-all">
                    <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3">{rp.summary}</p>
                  <Link href={`/blog/${rp.slug}`} className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-400 group-hover:gap-2.5 transition-all">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
