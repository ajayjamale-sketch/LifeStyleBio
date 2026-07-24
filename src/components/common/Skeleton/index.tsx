import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect', lines = 1 }) => {
  const base = 'animate-pulse bg-gray-200 rounded';
  if (variant === 'circle') return <div className={`${base} rounded-full ${className}`} />;
  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`${base} h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'} ${className}`} />
        ))}
      </div>
    );
  }
  return <div className={`${base} ${className}`} />;
};

export const CardSkeleton: React.FC = () => (
  <div className="card space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" className="w-12 h-12" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
    <Skeleton className="h-20 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 items-center p-4 bg-white rounded-xl border border-gray-100">
        <Skeleton variant="circle" className="w-10 h-10" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    ))}
  </div>
);

export default Skeleton;
