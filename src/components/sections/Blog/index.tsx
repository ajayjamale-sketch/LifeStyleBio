import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { BLOG_POSTS } from '@/constants/blogData';

const BlogSection: React.FC = () => {
  const topPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
              <Sparkles size={13} /> Evidence-Based Longevity Science
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Latest Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600">Research & Protocols</span>
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl leading-relaxed">
              Explore peer-reviewed biomarker insights, metabolic optimization protocols, and sleep neurobiology guides written by our clinical advisory board.
            </p>
          </div>
          <Link 
            to={ROUTES.BLOG} 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all self-start sm:self-auto shrink-0"
          >
            View All Research Papers <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col hover:-translate-y-1"
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-52 relative bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1">
                  <Clock size={11} /> {post.readTime} min read
                </div>
              </Link>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-bold text-slate-900 text-lg mb-2.5 leading-snug hover:text-emerald-600 transition-colors line-clamp-2 font-heading">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-slate-500 text-xs line-clamp-2 mb-6 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 leading-tight">{post.author.name.split(',')[0]}</div>
                      <div className="text-[10px] text-slate-400">{post.author.role.split('•')[0]}</div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
