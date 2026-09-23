import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmText?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  confirmText,
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
  onClose,
}) => {
  const handleClose = onCancel || onClose || (() => {});
  const resolvedConfirmLabel = confirmLabel || confirmText || 'Confirm';

  const variantMap = {
    danger: { icon: 'bg-red-100 text-red-500', btn: 'bg-red-500 hover:bg-red-600 text-white' },
    warning: { icon: 'bg-yellow-100 text-yellow-500', btn: 'bg-yellow-500 hover:bg-yellow-600 text-white' },
    info: { icon: 'bg-blue-100 text-blue-500', btn: 'bg-blue-500 hover:bg-blue-600 text-white' },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 !m-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 !m-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${variantMap[variant].icon}`}>
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{message}</p>
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors ${variantMap[variant].btn}`}
              >
                {resolvedConfirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDialog;
