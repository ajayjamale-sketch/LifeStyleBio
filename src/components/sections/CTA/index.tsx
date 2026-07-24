import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-brand rounded-[2.5rem] p-12 md:p-16 text-center text-white shadow-2xl"
        >
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 h-64 w-64 rounded-full bg-white/10 blur-xl" />
          <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 h-64 w-64 rounded-full bg-emerald-500/20 blur-xl" />

          <div className="relative max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-6">
              <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Ready to transform?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Start Taking Control of Your Health Today
            </h2>

            <p className="text-lg text-emerald-50 mb-10 max-w-xl">
              Join thousands of users logging, tracking, and optimizing their vitality using advanced biometric analysis and smart AI coaching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link
                to={ROUTES.REGISTER}
                className="bg-white hover:bg-emerald-50 text-emerald-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-base group"
              >
                Sign Up Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="bg-emerald-600/35 hover:bg-emerald-600/50 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center text-base"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
