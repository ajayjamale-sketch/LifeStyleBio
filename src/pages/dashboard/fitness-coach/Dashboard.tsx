import React from 'react';
import { motion } from 'framer-motion';
import { Users, Dumbbell, Trophy, TrendingUp, Flame, Clock } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';

const clientProgress = [
  { month: 'Feb', clients: 5, sessions: 18, goals: 12 },
  { month: 'Mar', clients: 8, sessions: 24, goals: 18 },
  { month: 'Apr', clients: 11, sessions: 32, goals: 26 },
  { month: 'May', clients: 13, sessions: 38, goals: 31 },
  { month: 'Jun', clients: 15, sessions: 46, goals: 38 },
  { month: 'Jul', clients: 18, sessions: 54, goals: 44 },
];

const recentActivity = [
  { client: 'Alex Turner', workout: 'Upper Body Strength', duration: '55 min', completed: true },
  { client: 'Maria Santos', workout: 'HIIT Cardio Blast', duration: '30 min', completed: true },
  { client: 'Tom Bradley', workout: 'Full Body Circuit', duration: '45 min', completed: false },
  { client: 'Nina Patel', workout: 'Yoga & Flexibility', duration: '40 min', completed: true },
];

const FitnessCoachDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-gray-900">Welcome, Coach {user?.firstName}!</h2>
        <p className="text-gray-500 text-sm">Your training overview for today.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Active Clients', value: '18', change: 20, changeType: 'increase' as const, icon: <Users size={20} />, color: 'green' as const },
          { title: 'Sessions This Week', value: '24', change: 9, changeType: 'increase' as const, icon: <Dumbbell size={20} />, color: 'blue' as const },
          { title: 'Active Challenges', value: '3', icon: <Trophy size={20} />, color: 'yellow' as const },
          { title: 'Avg Client Progress', value: '76%', change: 5, changeType: 'increase' as const, icon: <TrendingUp size={20} />, color: 'purple' as const },
        ].map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Practice Growth</h3>
          <HealthChart type="area" data={clientProgress} dataKeys={[
            { key: 'clients', color: '#10B981', label: 'Clients' },
            { key: 'sessions', color: '#8B5CF6', label: 'Sessions' },
          ]} xAxisKey="month" height={220} showLegend />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Today's Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.completed ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                  <Dumbbell size={14} className={a.completed ? 'text-emerald-600' : 'text-orange-500'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{a.client}</p>
                  <p className="text-xs text-gray-400">{a.workout} · {a.duration}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                  {a.completed ? 'Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessCoachDashboard;
