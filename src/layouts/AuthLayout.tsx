import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_LOGO_URL } from '@/constants/appConstants';
import { ROUTES } from '@/constants/routes';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-brand relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="relative z-10">
          <Link to={ROUTES.HOME}>
            <img src={APP_LOGO_URL} alt="LifestyleBio" className="h-14 w-auto brightness-0 invert" />
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold text-white font-heading leading-tight mb-6">
            Your Complete Health & Wellness Partner
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Join over 500,000 individuals transforming their health with AI-powered insights, personalized coaching, and comprehensive wellness tracking.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500K+', label: 'Active Users' },
              { value: '95%', label: 'Satisfaction Rate' },
              { value: '1M+', label: 'Health Goals Met' },
              { value: '50+', label: 'Health Metrics' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face"
              alt="Testimonial"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-white text-sm font-medium">"LifestyleBio transformed my health journey completely!"</p>
              <p className="text-white/60 text-xs">Dr. Sarah Chen, Healthcare Professional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to={ROUTES.HOME}>
              <img src={APP_LOGO_URL} alt="LifestyleBio" className="h-12 w-auto mx-auto" />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
