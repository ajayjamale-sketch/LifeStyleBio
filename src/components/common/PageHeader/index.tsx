import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumbs?: Breadcrumb[];
  gradient?: 'brand' | 'health' | 'wellness';
  height?: 'sm' | 'md' | 'lg';
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  image,
  breadcrumbs,
  gradient = 'brand',
  height = 'md',
}) => {
  const gradientMap = {
    brand: 'from-emerald-600 via-emerald-500 to-sky-400',
    health: 'from-emerald-600 to-violet-500',
    wellness: 'from-sky-500 to-violet-500',
  };

  const heightMap = {
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-28',
    lg: 'py-28 md:py-36',
  };

  return (
    <div className={`relative overflow-hidden polygon-header bg-gradient-to-r ${gradientMap[gradient]} ${heightMap[height]}`}>
      {/* Background image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-pattern opacity-10" />

      {/* Animated circles */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-white/70 text-sm mb-4"
          >
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={14} className="text-white/50" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white font-heading mb-4 max-w-3xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
