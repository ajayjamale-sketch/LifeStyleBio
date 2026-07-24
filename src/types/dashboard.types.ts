export interface StatsCard {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: 'green' | 'blue' | 'purple' | 'red' | 'yellow' | 'orange';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  value2?: number;
  value3?: number;
}

export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'list' | 'calendar' | 'todo' | 'progress';
  title: string;
  visible: boolean;
  position: number;
}

export interface TodoItem {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface AppointmentItem {
  id: string;
  title: string;
  date: string;
  time: string;
  doctor?: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  notes?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastSession?: string;
  notes?: string;
  goals?: string[];
}
