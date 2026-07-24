import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Activity, BarChart2, TrendingUp, AlertTriangle, Shield, DollarSign } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { ROLE_LABELS } from '@/constants/roles';

const growthData = [
  { month: 'Feb', users: 12800, revenue: 38400 }, { month: 'Mar', users: 15200, revenue: 45600 },
  { month: 'Apr', users: 18900, revenue: 56700 }, { month: 'May', users: 22400, revenue: 67200 },
  { month: 'Jun', users: 27800, revenue: 83400 }, { month: 'Jul', users: 34100, revenue: 102300 },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const allUsers = authService.getAllUsers();
  const activeUsers = allUsers.filter(u => u.isActive);

  const roleCounts = allUsers.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleData = Object.entries(roleCounts).map(([role, count]) => ({ name: ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role, value: count }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-500 text-sm">System overview and platform management.</p>
      </motion.div>

      {/* Critical Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
        <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
        <p className="text-amber-800 text-sm"><span className="font-semibold">System Notice:</span> Platform uptime 99.97%. Last maintenance completed Jul 20, 2026.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', value: allUsers.length, change: 22, changeType: 'increase' as const, icon: <Users size={20} />, color: 'green' as const },
          { title: 'Active Users', value: activeUsers.length, change: 18, changeType: 'increase' as const, icon: <Activity size={20} />, color: 'blue' as const },
          { title: 'Monthly Revenue', value: '$102,300', change: 23, changeType: 'increase' as const, icon: <DollarSign size={20} />, color: 'purple' as const },
          { title: 'Marketplace Items', value: '284', change: 8, changeType: 'increase' as const, icon: <ShoppingBag size={20} />, color: 'orange' as const },
        ].map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">User Growth & Revenue</h3>
          <HealthChart type="area" data={growthData} dataKeys={[
            { key: 'users', color: '#10B981', label: 'Users' },
            { key: 'revenue', color: '#8B5CF6', label: 'Revenue ($)' },
          ]} xAxisKey="month" height={220} showLegend />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Users by Role</h3>
          <div className="space-y-3">
            {roleData.map(r => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 truncate">{r.name}</span>
                  <span className="font-bold text-gray-900 ml-2">{r.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(r.value / allUsers.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
