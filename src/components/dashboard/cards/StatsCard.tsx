import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: 'green' | 'orange' | 'red' | 'blue' | 'purple';
  index?: number;
}

const colorMap = {
  green: {
    bg: 'bg-emerald-50 text-emerald-600',
    border: 'hover:border-emerald-100',
    indicator: 'text-emerald-600 bg-emerald-50',
  },
  orange: {
    bg: 'bg-orange-50 text-orange-500',
    border: 'hover:border-orange-100',
    indicator: 'text-orange-600 bg-orange-50',
  },
  red: {
    bg: 'bg-red-50 text-red-500',
    border: 'hover:border-red-100',
    indicator: 'text-red-600 bg-red-50',
  },
  blue: {
    bg: 'bg-sky-50 text-sky-500',
    border: 'hover:border-sky-100',
    indicator: 'text-sky-600 bg-sky-50',
  },
  purple: {
    bg: 'bg-violet-50 text-violet-500',
    border: 'hover:border-violet-100',
    indicator: 'text-violet-600 bg-violet-50',
  },
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType,
  icon,
  color,
  index = 0,
}) => {
  const styles = colorMap[color] || colorMap.green;
  const isIncrease = changeType === 'increase';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[130px] ${styles.border}`}
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-xs font-semibold text-gray-400 font-heading leading-tight">{title}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.bg}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{value}</span>
        <span className="text-xs text-gray-400 font-medium">{unit}</span>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
          isIncrease ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
        }`}>
          {isIncrease ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          <span>{Math.abs(change)}%</span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">vs yesterday</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
