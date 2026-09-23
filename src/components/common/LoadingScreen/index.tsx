import React from 'react';
import { motion } from 'framer-motion';
import { BrandLogo } from '@/components/common/BrandLogo';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <BrandLogo variant="light" className="h-14 sm:h-16 w-auto" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-emerald-500"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm font-medium">Loading your health journey...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
