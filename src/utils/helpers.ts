import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

export const formatDate = (date: string | Date, pattern = 'MMM dd, yyyy'): string => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return 'Invalid date';
    return format(d, pattern);
  } catch {
    return 'Invalid date';
  }
};

export const formatTimeAgo = (date: string | Date): string => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return 'Unknown';
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return 'Unknown';
  }
};

export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const getAvatarUrl = (seed: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};

export const getUnsplashUrl = (query: string, width = 800, height = 600): string => {
  return `https://images.unsplash.com/photo-${query}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const getRoleBadgeColor = (role: string): string => {
  const colors: Record<string, string> = {
    individual_user: 'bg-emerald-100 text-emerald-700',
    nutritionist: 'bg-sky-100 text-sky-700',
    fitness_coach: 'bg-orange-100 text-orange-700',
    healthcare_professional: 'bg-blue-100 text-blue-700',
    corporate_wellness_manager: 'bg-violet-100 text-violet-700',
    family_member: 'bg-pink-100 text-pink-700',
    admin: 'bg-red-100 text-red-700',
  };
  return colors[role] || 'bg-gray-100 text-gray-700';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    inactive: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
    scheduled: 'bg-violet-100 text-violet-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

export const clampNumber = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRoleDashboard = (role: string): string => {
  const routes: Record<string, string> = {
    individual_user: '/dashboard',
    nutritionist: '/nutritionist/dashboard',
    fitness_coach: '/fitness-coach/dashboard',
    healthcare_professional: '/healthcare/dashboard',
    corporate_wellness_manager: '/corporate/dashboard',
    family_member: '/family/dashboard',
    admin: '/admin/dashboard',
  };
  return routes[role] || '/dashboard';
};

