import React from 'react';
import { motion } from 'framer-motion';
import { Award, Quote, CheckCircle2, TrendingDown, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: 'Marcus Chen, 44',
    profession: 'Software Executive & Biohacker',
    image: '/images/testimonials/marcus.jpg',
    quote: 'LifestyleBio connected my continuous glucose monitor and Oura ring with my Quest blood panels. In 6 months, my fasting insulin stabilized and my biological age dropped by 4.2 years.',
    results: [
      { label: 'Biological Age', before: '46.1 yrs', after: '41.9 yrs', delta: '-4.2 yrs', positive: true },
      { label: 'Fasting Glucose', before: '108 mg/dL', after: '86 mg/dL', delta: '-22 mg/dL', positive: true },
      { label: 'Avg Deep Sleep', before: '42 min', after: '1h 35m', delta: '+53 min', positive: true },
    ],
    verifiedBadge: 'Verified Biomarker Reversal',
  },
  {
    id: 2,
    name: 'Dr. Elena Rostova, 38',
    profession: 'Physician & Endurance Athlete',
    image: '/images/testimonials/elena.jpg',
    quote: 'The AI Health Coach gives me context-aware morning briefings that adjust my training based on nocturnal HRV and systemic inflammation scores. It is the gold standard for preventive health.',
    results: [
      { label: 'Resting HRV', before: '44 ms', after: '72 ms', delta: '+28 ms', positive: true },
      { label: 'hs-CRP (Inflammation)', before: '2.1 mg/L', after: '0.4 mg/L', delta: '-1.7 mg/L', positive: true },
      { label: 'VO2 Max Score', before: '42 ml/kg', after: '51 ml/kg', delta: '+9 pts', positive: true },
    ],
    verifiedBadge: 'Clinical Biomarker Audit',
  },
  {
    id: 3,
    name: 'David & Karen Miller, 52 & 50',
    profession: 'Corporate Partners • Family Circle',
    image: '/images/testimonials/millers.jpg',
    quote: 'We use the Family Circle to monitor health trends alongside our college-aged kids and elderly parents. The proactive alerts give our entire family peace of mind.',
    results: [
      { label: 'Composite Health Score', before: '68 / 100', after: '94 / 100', delta: '+26 pts', positive: true },
      { label: 'Cardiovascular Risk', before: '18% 10-Yr', after: '6% 10-Yr', delta: '-12%', positive: true },
      { label: 'Daily Step Consistency', before: '4,200', after: '11,400', delta: '+170%', positive: true },
    ],
    verifiedBadge: 'Multi-User Family Circle',
  },
];

const BiomarkerStories: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
            <Award size={14} className="text-emerald-500" />
            <span>Proven Clinical Outcomes & Biomarker Shifts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-heading">
            Real People. <span className="gradient-text">Measurable Longevity Gains.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            See how continuous data aggregation and AI coaching deliver verifiable improvements in blood biomarkers, sleep depth, and biological age.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50/90 rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex-1">
                {/* User Info Header: Profile avatar with clear flex layout */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-white shadow-xs ring-2 ring-emerald-500/20"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-gray-900 leading-tight truncate">
                      {story.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                      {story.profession}
                    </p>
                    <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100/80 px-2 py-0.5 rounded-full mt-1.5">
                      <ShieldCheck size={11} className="text-emerald-500" />
                      <span>{story.verifiedBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-5 bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-gray-100">
                  <Quote size={18} className="text-emerald-500/40 mb-1" />
                  <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
              </div>

              {/* Biomarker Results Table */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2 mt-auto">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-100">
                  <span>Biomarker Shifts</span>
                  <span className="text-emerald-600 font-semibold">6-Mo Delta</span>
                </div>
                {story.results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 font-medium">{r.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through text-[11px]">{r.before}</span>
                      <span className="text-gray-900 font-bold">{r.after}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                        {r.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BiomarkerStories;
