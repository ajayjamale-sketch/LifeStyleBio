export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: PaginationInfo;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string;
  authorRole: string;
  imageUrl: string;
  readTime: number;
  publishedAt: string;
  featured: boolean;
  views: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  path: string;
  badge?: string | number;
  children?: SidebarItem[];
}
