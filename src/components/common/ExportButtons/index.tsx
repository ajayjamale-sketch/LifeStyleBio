import React from 'react';
import { Download, FileText } from 'lucide-react';

interface ExportButtonsProps {
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ onExportCSV, onExportPDF, className = '', size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'text-xs py-1.5 px-3 gap-1.5' : 'text-sm py-2 px-4 gap-2';
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {onExportCSV && (
        <button
          onClick={onExportCSV}
          className={`flex items-center ${sizeClass} border border-emerald-200 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium`}
        >
          <Download size={iconSize} />
          CSV
        </button>
      )}
      {onExportPDF && (
        <button
          onClick={onExportPDF}
          className={`flex items-center ${sizeClass} border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors font-medium`}
        >
          <FileText size={iconSize} />
          PDF
        </button>
      )}
    </div>
  );
};

export default ExportButtons;
