import React from 'react';
import { motion } from 'framer-motion';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data found',
  description = 'There is nothing to display here yet.',
  icon,
  action,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        {icon || <FileX className="text-gray-400" size={28} />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary text-sm py-2.5 px-5">
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
