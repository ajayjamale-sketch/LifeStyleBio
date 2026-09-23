import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Search, Plus, Edit, Trash2, X } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  desc: string;
}

export const MARKETPLACE_STORAGE_KEY = 'lifestylebio_marketplace_products';

export const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  { id: '1', name: 'Omega-3 Fish Oil Premium', category: 'Supplements', price: 29.99, rating: 4.8, reviews: 2847, image: 'https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=300&h=300&fit=crop', badge: 'AI Recommended', desc: 'High-potency EPA/DHA for heart and brain health' },
  { id: '2', name: 'Whey Protein Isolate', category: 'Nutrition', price: 54.99, rating: 4.7, reviews: 1923, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop', badge: 'Top Seller', desc: 'Clean protein for muscle recovery and growth' },
  { id: '3', name: 'Smart Sleep Mask Pro', category: 'Sleep', price: 79.99, rating: 4.6, reviews: 892, image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=300&h=300&fit=crop', badge: null, desc: 'Light-blocking mask with guided sleep audio' },
  { id: '4', name: 'Mindfulness Meditation App', category: 'Mental Health', price: 12.99, rating: 4.9, reviews: 5621, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=300&fit=crop', badge: 'New', desc: '500+ guided meditations, sleep stories, and breathing exercises' },
  { id: '5', name: 'Resistance Band Set', category: 'Fitness', price: 34.99, rating: 4.5, reviews: 3102, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', badge: null, desc: '5-resistance level set for home workouts' },
  { id: '6', name: 'Vitamin D3 + K2 Complex', category: 'Supplements', price: 22.99, rating: 4.8, reviews: 1456, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', badge: 'AI Recommended', desc: 'Optimal bone and immune health support' },
];

const CATEGORIES = ['All', 'Supplements', 'Nutrition', 'Fitness', 'Sleep', 'Mental Health'];

const EMPTY_PRODUCT = {
  name: '',
  category: 'Supplements',
  price: 29.99,
  rating: 4.8,
  reviews: 100,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
  badge: 'AI Recommended' as string | null,
  desc: '',
};

const AdminMarketplace: React.FC = () => {
  const [products, setProducts] = useState<MarketplaceProduct[]>(() => {
    try {
      const saved = localStorage.getItem(MARKETPLACE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MarketplaceProduct | null>(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);

  useEffect(() => {
    localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const filtered = products.filter(p => {
    if (category !== 'All' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(EMPTY_PRODUCT);
    setModalOpen(true);
  };

  const openEditModal = (p: MarketplaceProduct) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      reviews: p.reviews,
      image: p.image.startsWith('http') ? p.image : `https://images.unsplash.com/${p.image}`,
      badge: p.badge,
      desc: p.desc,
    });
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.desc.trim()) {
      toast.error('Product name and description are required.');
      return;
    }
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...form, name: form.name.trim(), desc: form.desc.trim() } : p));
      toast.success('Product updated successfully.');
    } else {
      const newProd: MarketplaceProduct = {
        id: `prod_${Date.now()}`,
        ...form,
        name: form.name.trim(),
        desc: form.desc.trim(),
      };
      setProducts(prev => [newProd, ...prev]);
      toast.success('Product added to Marketplace.');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Marketplace Catalog Management</h2>
          <p className="text-gray-500 text-sm">Manage wellness products, pricing, and AI badges · {products.length} total products</p>
        </div>
        <button onClick={openAddModal} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 cursor-pointer">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search catalog..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${category === c ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img src={p.image.startsWith('http') ? p.image : `https://images.unsplash.com/${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                {p.badge && (
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${p.badge === 'AI Recommended' ? 'bg-emerald-500 text-white' : p.badge === 'Top Seller' ? 'bg-orange-500 text-white' : 'bg-sky-500 text-white'}`}>{p.badge}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-400 font-medium">{p.category}</span>
                <h3 className="font-bold text-gray-900 mt-0.5 mb-1 text-sm">{p.name}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{p.desc}</p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                  <span className="text-xs text-gray-400">({p.reviews.toLocaleString()})</span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between">
              <span className="text-lg font-bold text-emerald-600">${Number(p.price).toFixed(2)}</span>
              <div className="flex gap-1.5">
                <button onClick={() => openEditModal(p)} title="Edit Product" className="px-3 py-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer">
                  <Edit size={13} /> Edit
                </button>
                <button onClick={() => setDeleteId(p.id)} title="Delete Product" className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add Marketplace Product'}>
        <form onSubmit={handleSaveProduct} className="space-y-3.5">
          <div>
            <label className="label">Product Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Magnesium Glycinate" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Price ($) *</label>
              <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="input-field" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Badge</label>
              <select value={form.badge || ''} onChange={e => setForm({ ...form, badge: e.target.value || null })} className="input-field">
                <option value="">None</option>
                <option value="AI Recommended">AI Recommended</option>
                <option value="Top Seller">Top Seller</option>
                <option value="New">New</option>
              </select>
            </div>
            <div>
              <label className="label">Rating (1.0 - 5.0)</label>
              <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Image URL</label>
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label">Description *</label>
            <textarea rows={2} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className="input-field resize-none" required />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">{editingProduct ? 'Save Changes' : 'Add Product'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Product" message="Remove this product from the Wellness Marketplace catalog?" onConfirm={() => { setProducts(prev => prev.filter(p => p.id !== deleteId)); setDeleteId(null); toast.success('Product removed from catalog.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default AdminMarketplace;
