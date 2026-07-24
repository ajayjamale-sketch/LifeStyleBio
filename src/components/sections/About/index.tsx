import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, Users, Shield, Zap } from 'lucide-react';

const AboutSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">About LifestyleBio</span>
          <h2 className="section-title mb-5">Transforming Health Through <span className="gradient-text">Innovation</span></h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            LifestyleBio was founded with a bold mission: to make evidence-based health management accessible to everyone. We believe that every person deserves personalized, AI-powered health insights to live their best life.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our platform brings together nutrition science, fitness research, mental health psychology, and medical expertise into one comprehensive, easy-to-use platform that adapts to your unique biology and lifestyle.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, label: 'Our Goal', desc: 'Democratize health data' },
              { icon: Eye, label: 'Our Vision', desc: 'A healthier world for all' },
              { icon: Lightbulb, label: 'Innovation', desc: 'AI-first approach' },
              { icon: Shield, label: 'Privacy', desc: 'Your data stays yours' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <item.icon size={17} className="text-emerald-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=350&fit=crop" alt="Fitness" className="rounded-2xl w-full h-48 object-cover shadow-md" />
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop" alt="Nutrition" className="rounded-2xl w-full h-32 object-cover shadow-md self-end" />
            <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop" alt="Medical" className="rounded-2xl w-full h-32 object-cover shadow-md" />
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=350&fit=crop" alt="Mental" className="rounded-2xl w-full h-48 object-cover shadow-md" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">500K+ Users</p>
                <p className="text-xs text-gray-500">Trust LifestyleBio daily</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
