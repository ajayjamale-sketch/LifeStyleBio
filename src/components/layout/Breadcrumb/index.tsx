import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
    <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
      <Home size={14} />
    </Link>
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <ChevronRight size={13} className="text-gray-300" />
        {item.href && i < items.length - 1 ? (
          <Link to={item.href} className="hover:text-emerald-600 transition-colors">{item.label}</Link>
        ) : (
          <span className="text-gray-900 font-medium">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumb;
