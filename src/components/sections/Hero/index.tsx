import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Activity } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-pattern pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-6">
                <Activity size={14} className="text-emerald-500 animate-pulse" />
                <span>Next-Gen AI Personalized Health Platform</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6"
            >
              Transform Your Health With <span className="gradient-text">Precision Insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Connect your wearables, secure your medical history, and let our advanced AI health engine guide you to optimal longevity and daily vitality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to={ROUTES.REGISTER} className="btn-primary flex items-center justify-center gap-2 group">
                Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to={ROUTES.FEATURES} className="btn-outline flex items-center justify-center gap-2">
                Explore Features
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-100 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">99.8%</span>
                <span className="text-xs text-gray-500 mt-1">Uptime Reliability</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">200+</span>
                <span className="text-xs text-gray-500 mt-1">App Integrations</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">HIPAA</span>
                <span className="text-xs text-gray-500 mt-1">Secured Data</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-[450px] lg:max-w-none"
            >
              <div className="absolute inset-0 bg-gradient-brand rounded-3xl opacity-20 blur-2xl -z-10 transform rotate-3 scale-105" />
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop"
                alt="Health Analytics Dashboard"
                className="w-full h-auto rounded-3xl shadow-2xl border border-white/50"
              />

              <div className="absolute top-8 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100/50 flex items-center gap-3 animate-bounce" style={{ animationDuration: '6s' }}>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Heart Rate</p>
                  <p className="text-sm font-bold text-gray-800">72 bpm <span className="text-[10px] text-emerald-500 font-normal">Normal</span></p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100/50 flex items-center gap-3 animate-bounce" style={{ animationDuration: '8s' }}>
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Health Score</p>
                  <p className="text-sm font-bold text-gray-800">94/100 <span className="text-[10px] text-violet-500 font-normal">+3 pts</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
