import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: { label: string; value: string; count?: number }[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onChange, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === cat.value
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
          }`}
        >
          {cat.label}
          {cat.count !== undefined && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selected === cat.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {cat.count}
            </span>
          )}
          {selected === cat.value && (
            <motion.div
              layoutId="activeCat"
              className="absolute inset-0 rounded-full bg-emerald-500 -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
