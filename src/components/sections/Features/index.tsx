import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Apple, Brain, Moon, Shield, Watch, Zap, FileText,
  BarChart2, ShoppingBag, Users, Building2, HeartPulse, Bot
} from 'lucide-react';

const features = [
  { icon: Bot, title: 'AI Health Coach', desc: 'Personalized AI-driven health recommendations based on your unique biological data, goals, and lifestyle patterns.', color: 'text-emerald-500 bg-emerald-50', category: 'Core' },
  { icon: Apple, title: 'Nutrition & Diet Planner', desc: 'Track macros, micros, and calories. Get personalized meal plans and smart grocery suggestions with a database of 1M+ foods.', color: 'text-orange-500 bg-orange-50', category: 'Core' },
  { icon: Zap, title: 'Fitness & Activity Tracking', desc: 'Comprehensive workout logging, progress tracking, and AI-generated personalized workout plans for all fitness levels.', color: 'text-sky-500 bg-sky-50', category: 'Core' },
  { icon: Moon, title: 'Sleep & Recovery Analytics', desc: 'Advanced sleep stage analysis, recovery scoring, and personalized tips to optimize your rest and recovery.', color: 'text-indigo-500 bg-indigo-50', category: 'Wellness' },
  { icon: Brain, title: 'Mental Wellness', desc: 'Mood tracking, guided meditation, stress management tools, and mental health insights to support your psychological wellbeing.', color: 'text-violet-500 bg-violet-50', category: 'Wellness' },
  { icon: Shield, title: 'Preventive Health & Risk', desc: 'Comprehensive risk assessment tools that analyze your health data to identify potential risks before they become problems.', color: 'text-teal-500 bg-teal-50', category: 'Healthcare' },
  { icon: FileText, title: 'Medical Records & Labs', desc: 'Securely store and organize your medical records, lab results, prescriptions, and vaccination history in one place.', color: 'text-blue-500 bg-blue-50', category: 'Healthcare' },
  { icon: Watch, title: 'Wearable Integration', desc: 'Seamless integration with Apple Watch, Fitbit, Garmin, Oura Ring, and 50+ other wearable devices.', color: 'text-gray-600 bg-gray-100', category: 'Integrations' },
  { icon: BarChart2, title: 'Health Analytics Dashboard', desc: 'Beautiful, comprehensive analytics with trend analysis, correlations, and predictive insights for all your health metrics.', color: 'text-emerald-600 bg-emerald-50', category: 'Analytics' },
  { icon: ShoppingBag, title: 'Wellness Marketplace', desc: 'Curated health products, supplements, fitness equipment, and wellness services with personalized recommendations.', color: 'text-pink-500 bg-pink-50', category: 'Marketplace' },
  { icon: Users, title: 'Healthcare Partner Portal', desc: 'Dedicated tools for nutritionists, fitness coaches, and healthcare professionals to manage clients and patients.', color: 'text-amber-500 bg-amber-50', category: 'Professional' },
  { icon: Building2, title: 'Corporate Wellness', desc: 'Enterprise wellness programs with team analytics, challenges, and reporting tools for HR and wellness managers.', color: 'text-slate-500 bg-slate-50', category: 'Enterprise' },
];

const Features: React.FC = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="section-title mb-3">Comprehensive <span className="gradient-text">Health Features</span></h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Everything you need to monitor, improve, and maintain your health in one powerful platform.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform duration-200`}>
              <f.icon size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{f.category}</span>
            <h3 className="font-bold text-gray-900 mt-1 mb-2 text-sm">{f.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
