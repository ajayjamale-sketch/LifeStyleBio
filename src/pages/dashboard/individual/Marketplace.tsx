import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';

const PRODUCTS = [
  { id: '1', name: 'Omega-3 Fish Oil Premium', category: 'Supplements', price: 29.99, rating: 4.8, reviews: 2847, image: 'photo-1550572017-4fcdbb59cc32?w=300&h=300&fit=crop', badge: 'AI Recommended', desc: 'High-potency EPA/DHA for heart and brain health' },
  { id: '2', name: 'Whey Protein Isolate', category: 'Nutrition', price: 54.99, rating: 4.7, reviews: 1923, image: 'photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop', badge: 'Top Seller', desc: 'Clean protein for muscle recovery and growth' },
  { id: '3', name: 'Smart Sleep Mask Pro', category: 'Sleep', price: 79.99, rating: 4.6, reviews: 892, image: 'photo-1531353826977-0941b4779a1c?w=300&h=300&fit=crop', badge: null, desc: 'Light-blocking mask with guided sleep audio' },
  { id: '4', name: 'Mindfulness Meditation App', category: 'Mental Health', price: 12.99, rating: 4.9, reviews: 5621, image: 'photo-1506126613408-eca07ce68773?w=300&h=300&fit=crop', badge: 'New', desc: '500+ guided meditations, sleep stories, and breathing exercises' },
  { id: '5', name: 'Resistance Band Set', category: 'Fitness', price: 34.99, rating: 4.5, reviews: 3102, image: 'photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', badge: null, desc: '5-resistance level set for home workouts' },
  { id: '6', name: 'Vitamin D3 + K2 Complex', category: 'Supplements', price: 22.99, rating: 4.8, reviews: 1456, image: 'photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', badge: 'AI Recommended', desc: 'Optimal bone and immune health support' },
];

const CATEGORIES = ['All', 'Supplements', 'Nutrition', 'Fitness', 'Sleep', 'Mental Health'];

const Marketplace: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const filtered = PRODUCTS.filter(p => {
    if (category !== 'All' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = (id: string, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`${name} added to cart!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Wellness Marketplace</h2>
          <p className="text-gray-500 text-sm">AI-curated products for your health goals · {cart.length} items in cart</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative h-44 overflow-hidden">
              <img src={`https://images.unsplash.com/${p.image}`} alt={p.name} className="w-full h-full object-cover" />
              {p.badge && (
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${p.badge === 'AI Recommended' ? 'bg-emerald-500 text-white' : p.badge === 'Top Seller' ? 'bg-orange-500 text-white' : 'bg-sky-500 text-white'}`}>{p.badge}</span>
              )}
            </div>
            <div className="p-4">
              <span className="text-xs text-gray-400 font-medium">{p.category}</span>
              <h3 className="font-bold text-gray-900 mt-0.5 mb-1 text-sm">{p.name}</h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">{p.desc}</p>
              <div className="flex items-center gap-1 mb-3">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                <span className="text-xs text-gray-400">({p.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-600">${p.price}</span>
                <button onClick={() => addToCart(p.id, p.name)} className="text-sm py-2 px-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium">Add to Cart</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
