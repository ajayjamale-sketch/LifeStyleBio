import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const posts = [
  {
    slug: '10-nutrition-habits',
    title: '10 Evidence-Based Nutrition Habits for Optimal Health',
    excerpt: 'Discover science-backed dietary practices that can transform your health from the inside out, supported by clinical research.',
    category: 'Nutrition',
    author: 'Dr. Sarah Chen',
    date: 'Jul 20, 2026',
    readTime: 8,
    image: 'photo-1490645935967-10de6ba17061?w=600&h=350&fit=crop',
    categoryColor: 'bg-orange-100 text-orange-700',
  },
  {
    slug: 'sleep-science-recovery',
    title: 'The Science of Sleep: How Quality Rest Accelerates Recovery',
    excerpt: 'Explore the latest research on sleep stages, circadian rhythms, and recovery protocols that elite athletes and health experts use.',
    category: 'Sleep',
    author: 'Dr. James Wilson',
    date: 'Jul 18, 2026',
    readTime: 6,
    image: 'photo-1541781774459-bb2af2f05b55?w=600&h=350&fit=crop',
    categoryColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    slug: 'mental-wellness-workplace',
    title: 'Building Mental Resilience in a High-Pressure World',
    excerpt: 'Practical mindfulness and stress management strategies from leading psychologists to help you thrive in challenging environments.',
    category: 'Mental Health',
    author: 'Dr. Emily Park',
    date: 'Jul 15, 2026',
    readTime: 7,
    image: 'photo-1506126613408-eca07ce68773?w=600&h=350&fit=crop',
    categoryColor: 'bg-violet-100 text-violet-700',
  },
];

const BlogSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="section-title mb-3">Latest Health <span className="gradient-text">Insights</span></h2>
          <p className="section-subtitle max-w-lg">Expert-written articles to help you make informed decisions about your health.</p>
        </div>
        <Link to={ROUTES.BLOG} className="btn-outline flex items-center gap-2 text-sm py-2.5 px-5 self-start sm:self-auto flex-shrink-0">
          View All Posts <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group"
          >
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48">
              <img
                src={`https://images.unsplash.com/${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-5">
              <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${post.categoryColor}`}>
                {post.category}
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
              </Link>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
