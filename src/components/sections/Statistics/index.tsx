import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, TrendingUp, Heart, Shield } from 'lucide-react';

const stats = [
  { icon: Users, value: '500K+', label: 'Active Users', color: 'text-emerald-500 bg-emerald-50' },
  { icon: Award, value: '95%', label: 'Satisfaction Rate', color: 'text-sky-500 bg-sky-50' },
  { icon: Globe, value: '120+', label: 'Countries', color: 'text-violet-500 bg-violet-50' },
  { icon: TrendingUp, value: '1M+', label: 'Goals Achieved', color: 'text-orange-500 bg-orange-50' },
  { icon: Heart, value: '50+', label: 'Health Metrics', color: 'text-red-500 bg-red-50' },
  { icon: Shield, value: '99.9%', label: 'Uptime SLA', color: 'text-teal-500 bg-teal-50' },
];

const Statistics: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="section-title mb-3">Trusted by <span className="gradient-text">Hundreds of Thousands</span></h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Real results from real people who transformed their health with LifestyleBio.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div className="text-2xl font-bold text-gray-900 font-heading">{stat.value}</div>
            <p className="text-gray-500 text-xs mt-1 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Statistics;
