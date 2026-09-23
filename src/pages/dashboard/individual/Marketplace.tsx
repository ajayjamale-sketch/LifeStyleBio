import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Search, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/common/Modal';
import { INITIAL_PRODUCTS, MARKETPLACE_STORAGE_KEY, type MarketplaceProduct } from '@/pages/dashboard/admin/Marketplace';

const CATEGORIES = ['All', 'Supplements', 'Nutrition', 'Fitness', 'Sleep', 'Mental Health'];
const MEMBER_CART_KEY = 'lifestylebio_member_cart';

interface CartItem {
  productId: string;
  quantity: number;
}

const Marketplace: React.FC = () => {
  const [products] = useState<MarketplaceProduct[]>(() => {
    try {
      const saved = localStorage.getItem(MARKETPLACE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(MEMBER_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(MEMBER_CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const filtered = products.filter(p => {
    if (category !== 'All' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartDetails = cart
    .map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (MarketplaceProduct & { quantity: number })[];

  const cartTotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (id: string, name: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === id);
      if (existing) {
        return prev.map(i => (i.productId === id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { productId: id, quantity: 1 }];
    });
    toast.success(`${name} added to cart!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => (i.productId === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.productId !== id));
    toast.info('Item removed from cart.');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCart([]);
    setIsCartOpen(false);
    toast.success(`Order placed! Total charged: $${cartTotal.toFixed(2)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Wellness Marketplace</h2>
          <p className="text-gray-500 text-sm">AI-curated products for your health goals · {totalItems} items in cart</p>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="btn-primary flex items-center gap-2 text-sm relative"
        >
          <ShoppingBag size={16} />
          View Cart ({totalItems})
          {totalItems > 0 && (
            <span className="ml-1 bg-white text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
              ${cartTotal.toFixed(2)}
            </span>
          )}
        </button>
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
              <img src={p.image.startsWith('http') ? p.image : `https://images.unsplash.com/${p.image}`} alt={p.name} className="w-full h-full object-cover" />
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

      {/* Shopping Cart Modal */}
      <Modal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title={`Your Wellness Cart (${totalItems} items)`}
        size="md"
      >
        {cartDetails.length === 0 ? (
          <div className="text-center py-10 text-gray-400 space-y-2">
            <ShoppingBag size={36} className="mx-auto text-gray-300" />
            <p className="text-sm">Your cart is empty. Add AI-curated wellness products to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cartDetails.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 ml-1"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Total</span>
              <span className="text-xl font-bold text-emerald-600">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCart([])}
                className="btn-outline text-sm"
              >
                Clear Cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="btn-primary text-sm"
              >
                Checkout (${cartTotal.toFixed(2)})
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Marketplace;
