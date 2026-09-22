import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Star, ShieldCheck, Stethoscope, Apple, Dumbbell, 
  Sparkles, Clock, ArrowRight, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const categories = [
  { id: 'all', label: 'All Partners' },
  { id: 'doctors', label: 'Longevity Physicians', icon: Stethoscope },
  { id: 'dietitians', label: 'Clinical Dietitians', icon: Apple },
  { id: 'trainers', label: 'Strength Coaches', icon: Dumbbell },
  { id: 'supplements', label: 'Curated Supplements', icon: Sparkles },
];

const partners = [
  {
    id: 1,
    category: 'doctors',
    name: 'Dr. Sarah Jenkins, MD',
    title: 'Functional Medicine & Longevity',
    experience: '14+ Yrs Exp • Stanford Health',
    rating: 4.98,
    reviews: 184,
    tags: ['ApoB Protocols', 'Biological Age', 'Hormone Panels'],
    price: '$180 / session',
    badge: 'Verified Physician',
    image: '/images/marketplace/doctor_jenkins.jpg',
  },
  {
    id: 2,
    category: 'dietitians',
    name: 'Marcus Vance, MS, RD',
    title: 'Metabolic & Sports Nutritionist',
    experience: '9+ Yrs Exp • Olympic Advisory',
    rating: 4.95,
    reviews: 210,
    tags: ['CGM Optimization', 'Insulin Sensitivity', 'Zone 2 Fueling'],
    price: '$120 / session',
    badge: 'Certified Dietitian',
    image: '/images/marketplace/dietitian_marcus.jpg',
  },
  {
    id: 3,
    category: 'trainers',
    name: 'Elena Rostova, CSCS',
    title: 'Longevity Strength & Mobility Specialist',
    experience: '11+ Yrs Exp • S&C Lead',
    rating: 4.99,
    reviews: 340,
    tags: ['VO2 Max Periodization', 'Hypertrophy', 'Joint Health'],
    price: '$95 / session',
    badge: 'Elite Trainer',
    image: '/images/marketplace/trainer_elena.jpg',
  },
  {
    id: 4,
    category: 'supplements',
    name: 'Cellular NAD+ & Resveratrol Stack',
    title: 'Third-Party Purity Tested (99.8%)',
    experience: 'Pharmaceutical Grade • NSF Certified',
    rating: 4.92,
    reviews: 512,
    tags: ['Mitochondrial Health', 'DNA Repair', 'Sirtuin Activation'],
    price: '$68 / month',
    badge: 'Curated Biohacking',
    image: '/images/marketplace/supplement_nad.jpg',
  },
];

const MarketplacePreview: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPartners = selectedCat === 'all' 
    ? partners 
    : partners.filter((p) => p.category === selectedCat);

  return (
    <section className="py-24 bg-gray-50/70 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold mb-4">
            <ShoppingBag size={14} className="text-pink-500" />
            <span>Verified Care Network & Marketplace</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Consult Top <span className="gradient-text">Longevity & Wellness Experts</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Connect your live health data directly with vetted physicians, dietitians, and coaches for personalized 1-on-1 protocols and precision supplementation.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 scrollbar-hide mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <AnimatePresence>
            {filteredPartners.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="h-44 w-full relative overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-700 shadow-sm flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-500" />
                      {item.badge}
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                      <span>{item.experience}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={13} className="fill-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-gray-400 font-normal">({item.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 leading-snug">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{item.title}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer price & CTA */}
                <div className="p-5 pt-0 border-t border-gray-50 mt-2">
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-xs font-bold text-gray-900">{item.price}</span>
                    <Link
                      to={ROUTES.REGISTER}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Book Session <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to={ROUTES.REGISTER}
            className="btn-outline inline-flex items-center gap-2 text-sm font-bold"
          >
            Browse All 250+ Verified Practitioners & Store Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
