import React from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, Activity, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';

const familyHealth = [
  { member: 'Mom', age: 58, score: 74, status: 'attention', condition: 'Blood pressure elevated' },
  { member: 'Dad', age: 62, score: 81, status: 'good', condition: 'All vitals normal' },
  { member: 'Sister', age: 28, score: 92, status: 'excellent', condition: 'Excellent health' },
  { member: 'You', age: 32, score: 87, status: 'good', condition: 'Minor vitamin D deficiency' },
];

const weeklyActivity = [
  { day: 'Mon', mom: 4200, dad: 6800, sister: 12400 },
  { day: 'Tue', mom: 5100, dad: 7200, sister: 11800 },
  { day: 'Wed', mom: 3800, dad: 8100, sister: 13200 },
  { day: 'Thu', mom: 6200, dad: 7500, sister: 10900 },
  { day: 'Fri', mom: 5600, dad: 6900, sister: 11500 },
];

const statusColors = { excellent: 'text-emerald-600 bg-emerald-50', good: 'text-sky-600 bg-sky-50', attention: 'text-orange-600 bg-orange-50', critical: 'text-red-600 bg-red-50' };
const statusIcons = { excellent: CheckCircle, good: CheckCircle, attention: AlertCircle, critical: AlertCircle };

const FamilyDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-gray-900">Family Health Overview</h2>
        <p className="text-gray-500 text-sm">Monitor your family's health at a glance.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Family Members', value: '4', icon: <Users size={20} />, color: 'green' as const },
          { title: 'Active Alerts', value: '1', icon: <Bell size={20} />, color: 'yellow' as const },
          { title: 'Health Checks Today', value: '3', change: 0, changeType: 'neutral' as const, icon: <Activity size={20} />, color: 'blue' as const },
          { title: 'Avg Family Score', value: '83.5', icon: <Heart size={20} />, color: 'purple' as const },
        ].map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>

      {/* Family Health Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {familyHealth.map((member, i) => {
          const StatusIcon = statusIcons[member.status as keyof typeof statusIcons];
          return (
            <motion.div key={member.member} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`flex items-center gap-2 mb-3 p-2 rounded-xl ${statusColors[member.status as keyof typeof statusColors]}`}>
                <StatusIcon size={16} />
                <span className="text-sm font-semibold">{member.member} · {member.age}y</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 font-heading mb-1">{member.score}</div>
              <p className="text-xs text-gray-500 mb-3">Health Score</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full" style={{ width: `${member.score}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">{member.condition}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Family Daily Steps (Week)</h3>
        <HealthChart type="area" data={weeklyActivity} dataKeys={[
          { key: 'mom', color: '#10B981', label: 'Mom' },
          { key: 'dad', color: '#38BDF8', label: 'Dad' },
          { key: 'sister', color: '#8B5CF6', label: 'Sister' },
        ]} xAxisKey="day" height={230} showLegend />
      </div>
    </div>
  );
};

export default FamilyDashboard;
