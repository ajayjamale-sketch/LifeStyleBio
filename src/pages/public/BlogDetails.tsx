import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Tag, 
  Share2, 
  Check, 
  Copy, 
  Bookmark, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ExternalLink,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { BLOG_POSTS, BlogPost } from '@/constants/blogData';
import CTA from '@/components/sections/CTA';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Find post
  const post: BlogPost | undefined = BLOG_POSTS.find(p => p.slug === slug);

  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle share copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If article not found
  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-20 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
          <h2 className="text-xl font-bold text-slate-900 mb-2 font-heading">Article Not Found</h2>
          <p className="text-slate-500 text-xs mb-6">
            The clinical research article you are looking for may have been archived or updated.
          </p>
          <Link
            to={ROUTES.BLOG}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Return to Research Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Breadcrumbs Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
            <Link to={ROUTES.HOME} className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link to={ROUTES.BLOG} className="hover:text-emerald-600 transition-colors">Research</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors shrink-0 ml-4"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
        
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${post.categoryColor}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock size={12} /> {post.readTime} min clinical read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4 font-heading">
            {post.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Author & Action Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200/80">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20 shrink-0"
              />
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  {post.author.name}
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
                <div className="text-xs text-slate-500">{post.author.role}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                  <span>•</span>
                  <span>Peer-Reviewed Protocol</span>
                </div>
              </div>
            </div>

            {/* Social & Sharing Actions */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  copied 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                title="Copy study link"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                  bookmarked
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                title={bookmarked ? 'Saved to library' : 'Save protocol'}
              >
                <Bookmark size={14} className={bookmarked ? 'fill-white' : ''} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-md mb-10 border border-slate-200 bg-slate-900 relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[460px] object-cover"
          />
          <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 text-[11px] text-slate-300 flex items-center justify-between border-t border-slate-800">
            <span>LifestyleBio Clinical Laboratory & Diagnostics Division</span>
            <span className="font-mono text-emerald-400 text-[10px]">VERIFIED_STUDY_PROTOCOL</span>
          </div>
        </div>

        {/* Key Clinical Takeaways Callout Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 mb-10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-4">
            <Sparkles size={16} className="text-emerald-600" /> Key Clinical Takeaways
          </div>
          <ul className="space-y-3">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Structured Article Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-10">
          <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            {post.content.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-4">
                {sec.sectionTitle && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading pt-2 pb-1 border-b border-slate-100">
                    {sec.sectionTitle}
                  </h2>
                )}

                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-slate-700 leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* Callout box if present */}
                {sec.callout && (
                  <div className={`p-4 sm:p-5 rounded-2xl border my-4 ${
                    sec.callout.type === 'tip'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : sec.callout.type === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-sky-50/70 border-sky-200 text-sky-900'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1.5">
                      {sec.callout.type === 'tip' && <Sparkles size={14} className="text-emerald-600" />}
                      {sec.callout.type === 'warning' && <AlertTriangle size={14} className="text-amber-600" />}
                      {sec.callout.type === 'info' && <Info size={14} className="text-sky-600" />}
                      <span>{sec.callout.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {sec.callout.text}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-8 mt-8 border-t border-slate-100">
            <span className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-2">
              <Tag size={13} /> Keywords:
            </span>
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs rounded-xl font-medium transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* References Section */}
        {post.references && post.references.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
              <BookOpen size={14} /> Peer-Reviewed Citations & Literature
            </h3>
            <div className="space-y-3">
              {post.references.map((ref, idx) => (
                <div key={idx} className="text-xs text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800">[{idx + 1}] {ref.title}.</span>
                    <span className="italic text-slate-500 ml-1"> {ref.journal} ({ref.year}).</span>
                  </div>
                  {ref.doi && (
                    <span className="font-mono text-[10px] text-emerald-600 shrink-0">
                      DOI: {ref.doi}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extended Author Bio Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-500/10 shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-slate-900 text-base">{post.author.name}</h4>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200">
                Medical Advisor
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 mb-2">{post.author.role}</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {post.author.bio || 'Contributing clinical researcher and longevity scientist on the LifestyleBio Medical Advisory Board.'}
            </p>
          </div>
        </div>

        {/* Non-Diagnostic Disclaimer */}
        <div className="bg-slate-100 rounded-2xl p-4 sm:p-5 border border-slate-200 text-center text-slate-500 text-[11px] leading-relaxed mb-16">
          <p>
            <strong>Medical Disclaimer:</strong> The longevity research, biomarker thresholds, and health protocols published on LifestyleBio are intended strictly for educational, informational, and preventive wellness exploration. They do not constitute formal medical advice, diagnosis, or treatment. Always consult your board-certified physician before making significant modifications to your pharmacological, nutritional, or exercise regimens.
          </p>
        </div>

        {/* Related Clinical Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Related Longevity Protocols
            </h3>
            <Link to={ROUTES.BLOG} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(rel => (
              <div
                key={rel.slug}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                <Link to={`/blog/${rel.slug}`} className="block h-40 overflow-hidden relative">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shadow-xs ${rel.categoryColor}`}>
                      {rel.category}
                    </span>
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/blog/${rel.slug}`}>
                    <h5 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                      {rel.title}
                    </h5>
                  </Link>
                  <p className="text-slate-500 text-[11px] line-clamp-2 mb-3 leading-relaxed flex-1">
                    {rel.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[10px] text-slate-400 mt-auto">
                    <span>{rel.author.name.split(',')[0]}</span>
                    <span>{rel.readTime} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </article>

      {/* CTA Footer */}
      <CTA />
    </div>
  );
};

export default BlogDetails;
