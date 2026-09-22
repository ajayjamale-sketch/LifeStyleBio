import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Tag, 
  Mail, 
  Check,
  BookOpen,
  Filter
} from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import CTA from '@/components/sections/CTA';
import { BLOG_POSTS, BlogPost } from '@/constants/blogData';

const CATEGORIES = [
  { label: 'All Fields', value: 'all' },
  { label: 'Biomarkers', value: 'Biomarkers' },
  { label: 'Longevity', value: 'Longevity' },
  { label: 'Nutrition', value: 'Nutrition' },
  { label: 'Sleep & Recovery', value: 'Sleep & Recovery' },
  { label: 'Fitness', value: 'Fitness' },
  { label: 'Mental Health', value: 'Mental Health' },
];

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const activeTag = searchParams.get('tag') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, searchQuery]);

  // Featured post
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleCategoryChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val === 'all') {
      params.delete('category');
    } else {
      params.set('category', val);
    }
    setSearchParams(params);
  };

  const handleTagClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('tag');
    setSearchParams(params);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: BLOG_POSTS.length };
    BLOG_POSTS.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Clinical Longevity & Healthspan Research"
        subtitle="Peer-reviewed biomarker guides, metabolic telemetry protocols, and preventive medicine insights published by the LifestyleBio Clinical Advisory Board."
        image="/images/about/science_lab.jpg"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        
        {/* Featured Story Hero (when no search or tag active) */}
        {!searchQuery && !activeTag && activeCategory === 'all' && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <Sparkles size={14} /> Featured Clinical Investigation
            </div>
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 gap-0 group">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {featuredPost.readTime} min clinical read
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors font-heading">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  {/* Quick takeaways preview */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-500" /> Core Insights Preview:
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 pl-2">
                      {featuredPost.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-slate-500">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all group-hover:translate-x-1 duration-200 self-start sm:self-auto"
                  >
                    Read Full Study <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 font-mono text-[11px]">
                    DOI: 10.1016/j.longevity.2026
                  </span>
                  <span className="flex items-center gap-1 text-slate-200">
                    <Calendar size={12} /> {featuredPost.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <div className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1 shrink-0">
                <Filter size={13} /> Pillar:
              </div>
              {CATEGORIES.map(cat => {
                const isSelected = activeCategory === cat.value;
                const count = categoryCounts[cat.value] || 0;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:w-80">
              <Search className="absolute left-3.5 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search protocols, biomarkers, authors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Active Tag Filter Notification */}
          {activeTag && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Tag size={13} className="text-emerald-600" />
                <span>Filtering by keyword tag: <strong className="text-emerald-700">#{activeTag}</strong></span>
              </div>
              <button
                onClick={handleTagClear}
                className="text-emerald-600 font-bold hover:underline"
              >
                Clear tag filter
              </button>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {activeCategory === 'all' ? 'All Published Research & Protocols' : `${activeCategory} Protocols`}
              <span className="text-xs font-normal text-slate-500 ml-2">({filteredPosts.length} papers)</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-md ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                      <Clock size={11} /> {post.readTime} min read
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h4 className="font-bold text-slate-900 mb-2.5 leading-snug hover:text-emerald-600 transition-colors line-clamp-2 text-base font-heading">
                        {post.title}
                      </h4>
                    </Link>

                    <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('tag', tag);
                            setSearchParams(params);
                          }}
                          className="text-[10px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 px-2 py-0.5 rounded-md font-medium transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-slate-800 leading-tight">{post.author.name}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{post.author.role.split('•')[0]}</div>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 group/link"
                      >
                        Read <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty Search / Filter State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto p-8 shadow-sm">
              <BookOpen className="mx-auto text-slate-300 mb-4" size={44} />
              <h4 className="text-slate-800 font-bold text-lg mb-2">No Research Articles Found</h4>
              <p className="text-slate-500 text-xs mb-6 max-w-sm mx-auto">
                No matching clinical studies or health protocols match your current search parameters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Clinical Research Newsletter Digest */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-700/60 shadow-xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4 border border-emerald-500/30">
              <ShieldCheck size={14} /> Weekly Bio-Intelligence Briefing
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-3">
              Join 45,000+ Clinicians & Biohackers
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed">
              Receive breakdown summaries of newly published longevity trials, biomarker thresholds, and actionable lifestyle protocols delivered directly to your inbox every Sunday morning.
            </p>

            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 px-6 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold">
                <Check size={18} /> You are subscribed to the LifestyleBio Research Digest.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input
                    type="email"
                    required
                    placeholder="Enter your clinical or personal email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 mt-6 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400" /> Zero spam</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400" /> Peer-reviewed sources</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400" /> Unsubscribe anytime</span>
            </div>
          </div>
        </div>

      </div>

      {/* Conversion CTA */}
      <CTA />
    </div>
  );
};

export default Blog;
