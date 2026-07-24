import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, BookOpen, MessageCircle, Zap, Shield } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { AnimatePresence } from 'framer-motion';

const categories = [
  { icon: BookOpen, title: 'Getting Started', desc: 'Setup guides, account creation, and platform overview', count: 12 },
  { icon: Zap, title: 'Features & Tools', desc: 'How to use nutrition, fitness, sleep, and AI coach features', count: 28 },
  { icon: Shield, title: 'Privacy & Security', desc: 'Data protection, HIPAA compliance, and account security', count: 9 },
  { icon: MessageCircle, title: 'Billing & Subscriptions', desc: 'Plans, payments, upgrades, and cancellations', count: 15 },
];

const faqs = [
  { q: 'How do I create my health profile?', a: 'Navigate to Dashboard > Health Profile after logging in. Complete the form with your height, weight, health goals, and medical information. Your AI coach uses this data to provide personalized recommendations.' },
  { q: 'How do I connect my wearable device?', a: 'Go to Dashboard > Wearables and click "Add Device". Select your device brand (Apple Watch, Fitbit, Garmin, etc.) and follow the pairing instructions. Data syncs automatically every 15 minutes.' },
  { q: 'Can I export my health data?', a: 'Yes! Navigate to Analytics or any data section and click the "Export" button. You can export to CSV for spreadsheets or PDF for printable reports. All exports are comprehensive and HIPAA-compliant.' },
  { q: 'How is my data protected?', a: 'LifestyleBio uses AES-256 encryption for data at rest and TLS 1.3 for data in transit. We are HIPAA compliant and never sell your personal health data to third parties.' },
  { q: 'How do I add family members to my plan?', a: 'Premium subscribers can add up to 6 family members. Go to Settings > Family Plan > Add Member. Each member gets their own separate account and private health profile.' },
  { q: 'How do I cancel my subscription?', a: 'Go to Dashboard > Settings > Billing > Cancel Subscription. Your access continues until the end of the billing period. We do not offer prorated refunds for partial months.' },
];

const HelpCenter: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Help Center"
        subtitle="Find answers to your questions and learn how to get the most out of LifestyleBio."
        gradient="health"
        breadcrumbs={[{ label: 'Help Center' }]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search help articles..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer"
            >
              <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <cat.icon size={20} className="text-emerald-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
              <p className="text-gray-500 text-sm mb-3 leading-relaxed">{cat.desc}</p>
              <span className="text-xs text-emerald-600 font-semibold">{cat.count} articles</span>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
