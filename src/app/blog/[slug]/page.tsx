import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONSTANTS } from '@/lib/constants';
import { BLOG_POSTS, getBlogPostBySlug, getFeaturedPosts } from '@/lib/blog-posts';
import { getBlogContent } from '@/lib/blog-content';
import { BreadcrumbsSchema, BlogPostSchema, FAQSchema } from '@/components/seo/SeoSchema';
import { Home, ChevronRight, Clock, BookOpen, Lightbulb, GraduationCap, FileText, Award, ArrowLeft, Share2, Copy, Check, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20">
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

      <div className="bg-white border-b border-slate-200/90 pt-8 pb-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 mb-6 gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1 font-medium">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            <Link href="/blog" className="hover:text-indigo-600 transition-colors font-medium">Blog</Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate max-w-[280px]">{post.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              {CATEGORY_ICONS[post.category]} {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.estimatedReadTime} read
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
              📅 {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <button
              data-copy-url-btn
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-all shadow-xs"
              aria-label="Copy blog post URL"
            >
              <Share2 data-copy className="w-3.5 h-3.5" />
              <Check data-check className="w-3.5 h-3.5 text-emerald-600 hidden" />
              <span data-copy>Share</span>
              <span data-check className="text-emerald-600 hidden">Copied!</span>
            </button>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-snug mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Guides
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pt-10">
        {content || (
          <div className="py-24 text-center">
            <p className="text-slate-500 mb-4">
              No content available. Please check back soon.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-sm"
            >
              Back to Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
              📌 Common Student Questions — FAQs
            </h2>
            <div className="grid grid-cols-1 gap-3.5">
              {faqs.map((f, i) => (
                <details key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs group open:border-indigo-300 transition-all">
                  <summary className="cursor-pointer font-bold text-slate-900 text-base flex items-start gap-3 select-none">
                    <span className="text-indigo-600 font-black shrink-0 text-base">Q{i + 1}.</span>
                    <span>{f.question}</span>
                  </summary>
                  <p className="text-sm text-slate-600 pl-8 mt-3 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-emerald-50/80 border border-indigo-200/90 p-8 shadow-sm relative overflow-hidden">
          <div className="relative">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3 leading-tight">
              ⚡ Need the Complete Verified Working Bundle?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-2xl">
              Get the 1-click runnable source code, the full 60-page editable IEEE format Black Book report (.docx), your defense PPT, and the top 25 Viva examiner Q&amp;A with complete answers. Instant download.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all">
                Browse Project Kits <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blueprint" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-xs">
                Free Blueprint Starter
              </Link>
              <a href={CONSTANTS.SUPPORT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs sm:text-sm hover:bg-emerald-100 transition-all shadow-xs">
                💬 WhatsApp ({CONSTANTS.SUPPORT_PHONE})
              </a>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight mb-6">
              📖 Related Guides You Will Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rp) => (
                <article
                  key={rp.slug}
                  className="rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 p-5 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all group"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                        {CATEGORY_ICONS[rp.category]} {rp.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                        <Clock className="w-2.5 h-2.5 text-slate-400" /> {rp.estimatedReadTime}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">{rp.summary}</p>
                  </div>
                  <Link href={`/blog/${rp.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors pt-3 border-t border-slate-100">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
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
