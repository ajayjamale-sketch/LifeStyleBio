import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Search } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import CategoryFilter from '@/components/common/CategoryFilter';
import CTA from '@/components/sections/CTA';

const categories = [
  { label: 'All', value: 'all', count: 6 },
  { label: 'Nutrition', value: 'Nutrition', count: 2 },
  { label: 'Sleep & Recovery', value: 'Sleep', count: 1 },
  { label: 'Mental Health', value: 'Mental Health', count: 2 },
  { label: 'Fitness', value: 'Fitness', count: 1 },
];

const allPosts = [
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
  {
    slug: 'preventive-cardiology-guide',
    title: 'A Preventive Guide to Cardiovascular Longevity',
    excerpt: 'Key indicators, nutrition considerations, and aerobic exercise protocols that help protect and improve heart health.',
    category: 'Fitness',
    author: 'Dr. Michael Taylor',
    date: 'Jul 10, 2026',
    readTime: 10,
    image: 'photo-1476480862126-209bfaa8edc8?w=600&h=350&fit=crop',
    categoryColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    slug: 'mindful-eating-microbiome',
    title: 'Mindful Eating, Gut Health, and Your Microbiome',
    excerpt: 'Understanding the bidirectional relationship between your digestive system and brain chemistry for enhanced wellbeing.',
    category: 'Nutrition',
    author: 'Dr. Sarah Chen',
    date: 'Jul 05, 2026',
    readTime: 9,
    image: 'photo-1512621776951-a57141f2eefd?w=600&h=350&fit=crop',
    categoryColor: 'bg-orange-100 text-orange-700',
  },
  {
    slug: 'cbt-for-insomnia-anxiety',
    title: 'Cognitive Behavioral Therapy Techniques for Anxiety & Insomnia',
    excerpt: 'Self-guided cognitive reframing methods that help quiet a hyperactive mind and promote deep physical relaxation before sleep.',
    category: 'Mental Health',
    author: 'Dr. Emily Park',
    date: 'Jun 28, 2026',
    readTime: 12,
    image: 'photo-1518495973542-4542c06a5843?w=600&h=350&fit=crop',
    categoryColor: 'bg-violet-100 text-violet-700',
  },
];

const Blog: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCat === 'all' || post.category === selectedCat;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Health & Wellness Blog"
        subtitle="Stay updated with the latest clinical studies, actionable wellness protocols, and expert articles from leading health advisors."
        image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400&h=400&fit=crop"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
            <CategoryFilter
              categories={categories}
              selected={selectedCat}
              onChange={setSelectedCat}
            />

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group flex flex-col h-full"
                >
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48">
                    <img
                      src={`https://images.unsplash.com/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-bold text-gray-900 mb-2 leading-snug hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto">
              <p className="text-gray-400 font-medium text-lg">No articles found matching your query.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCat('all'); }} className="mt-4 text-emerald-500 font-semibold hover:text-emerald-600 text-sm">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Blog;
