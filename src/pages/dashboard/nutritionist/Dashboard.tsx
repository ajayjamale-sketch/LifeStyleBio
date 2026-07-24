import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Apple, TrendingUp, Calendar, Star } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';

const clientProgress = [
  { month: 'Feb', clients: 8, plans: 12, sessions: 24 },
  { month: 'Mar', clients: 11, plans: 15, sessions: 32 },
  { month: 'Apr', clients: 14, plans: 18, sessions: 41 },
  { month: 'May', clients: 16, plans: 22, sessions: 48 },
  { month: 'Jun', clients: 18, plans: 26, sessions: 54 },
  { month: 'Jul', clients: 21, plans: 29, sessions: 62 },
];

const recentClients = [
  { name: 'Emma Johnson', goal: 'Weight Loss', progress: 72, avatar: 'photo-1494790198235-0ad729444aca?w=80&h=80&fit=crop&crop=face', lastSession: 'Today' },
  { name: 'Michael Chen', goal: 'Muscle Gain', progress: 58, avatar: 'photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', lastSession: 'Yesterday' },
  { name: 'Sarah Williams', goal: 'Diabetes Management', progress: 84, avatar: 'photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', lastSession: '2 days ago' },
];

const NutritionistDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h2>
        <p className="text-gray-500 text-sm">Here's your practice overview for today.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Active Clients', value: '21', change: 16, changeType: 'increase' as const, icon: <Users size={20} />, color: 'green' as const },
          { title: 'Diet Plans Active', value: '29', change: 12, changeType: 'increase' as const, icon: <Apple size={20} />, color: 'orange' as const },
          { title: 'Sessions This Month', value: '62', change: 14, changeType: 'increase' as const, icon: <Calendar size={20} />, color: 'blue' as const },
          { title: 'Avg Client Rating', value: '4.9', unit: '/5', icon: <Star size={20} />, color: 'purple' as const },
        ].map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Practice Growth</h3>
          <HealthChart type="area" data={clientProgress} dataKeys={[
            { key: 'clients', color: '#10B981', label: 'Clients' },
            { key: 'sessions', color: '#38BDF8', label: 'Sessions' },
          ]} xAxisKey="month" height={220} showLegend />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Clients</h3>
          <div className="space-y-4">
            {recentClients.map(c => (
              <div key={c.name} className="flex items-center gap-3">
                <img src={`https://images.unsplash.com/${c.avatar}`} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.goal} · {c.lastSession}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1.5">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">{c.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistDashboard;
