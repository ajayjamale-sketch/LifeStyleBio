import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, HeartPulse, TrendingUp, Award, Activity } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';

const wellnessData = [
  { month: 'Feb', participation: 62, score: 68 }, { month: 'Mar', participation: 68, score: 71 },
  { month: 'Apr', participation: 72, score: 74 }, { month: 'May', participation: 78, score: 77 },
  { month: 'Jun', participation: 81, score: 80 }, { month: 'Jul', participation: 85, score: 83 },
];

const programs = [
  { name: 'Mindfulness Monday', participants: 142, type: 'Mental Health', status: 'active' },
  { name: '10K Steps Challenge', participants: 198, type: 'Fitness', status: 'active' },
  { name: 'Healthy Eating Week', participants: 87, type: 'Nutrition', status: 'completed' },
  { name: 'Stress Management Series', participants: 124, type: 'Mental Health', status: 'active' },
];

const CorporateDashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-gray-900">Corporate Wellness Hub</h2>
        <p className="text-gray-500 text-sm">Manage and optimize your organization's health programs.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Employees', value: '1,247', change: 5, changeType: 'increase' as const, icon: <Users size={20} />, color: 'green' as const },
          { title: 'Program Participation', value: '85%', change: 4, changeType: 'increase' as const, icon: <Activity size={20} />, color: 'blue' as const },
          { title: 'Wellness Score', value: '83/100', change: 3, changeType: 'increase' as const, icon: <HeartPulse size={20} />, color: 'purple' as const },
          { title: 'Active Programs', value: '7', icon: <Award size={20} />, color: 'yellow' as const },
        ].map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Wellness Participation & Score</h3>
          <HealthChart type="area" data={wellnessData} dataKeys={[
            { key: 'participation', color: '#10B981', label: 'Participation %' },
            { key: 'score', color: '#8B5CF6', label: 'Wellness Score' },
          ]} xAxisKey="month" height={220} showLegend />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Active Programs</h3>
          <div className="space-y-3">
            {programs.map(p => (
              <div key={p.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HeartPulse size={14} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.participants} participants · {p.type}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateDashboard;
