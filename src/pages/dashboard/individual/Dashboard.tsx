import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Apple, Moon, Footprints, Flame, Droplets, Brain } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import TodoList from '@/components/dashboard/todo/TodoList';
import { generateWeeklyHealthData, generateActivityRing, generateNutritionData } from '@/services/dashboardService';
import { ActivityRing } from '@/components/dashboard/widgets/HealthWidget';

const IndividualDashboard: React.FC = () => {
  const { user } = useAuth();
  const [weeklyData] = useState(() => generateWeeklyHealthData());
  const [activity] = useState(() => generateActivityRing());
  const [nutrition] = useState(() => generateNutritionData());

  const stats = [
    { title: 'Steps Today', value: '8,432', unit: 'steps', change: 12, changeType: 'increase' as const, icon: <Footprints size={20} />, color: 'green' as const },
    { title: 'Calories Consumed', value: nutrition.calories.consumed, unit: 'kcal', change: -3, changeType: 'decrease' as const, icon: <Flame size={20} />, color: 'orange' as const },
    { title: 'Resting Heart Rate', value: '72', unit: 'BPM', change: 2, changeType: 'decrease' as const, icon: <HeartPulse size={20} />, color: 'red' as const },
    { title: 'Sleep Score', value: '87', unit: '/100', change: 5, changeType: 'increase' as const, icon: <Moon size={20} />, color: 'blue' as const },
    { title: 'Water Intake', value: nutrition.water.consumed.toFixed(1), unit: 'L', change: 8, changeType: 'increase' as const, icon: <Droplets size={20} />, color: 'blue' as const },
    { title: 'Active Minutes', value: '47', unit: 'min', change: 15, changeType: 'increase' as const, icon: <Activity size={20} />, color: 'purple' as const },
    { title: 'Protein Today', value: nutrition.protein.consumed, unit: 'g', change: 4, changeType: 'increase' as const, icon: <Apple size={20} />, color: 'green' as const },
    { title: 'Mood Score', value: '8.2', unit: '/10', change: 1, changeType: 'increase' as const, icon: <Brain size={20} />, color: 'purple' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.firstName}!
        </h2>
        <p className="text-gray-500 text-sm mt-1">Here's your health overview for today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatsCard key={stat.title} {...stat} index={i} />)}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Weekly Activity</h3>
          <HealthChart type="area" data={weeklyData} dataKeys={[
            { key: 'steps', color: '#10B981', label: 'Steps' },
            { key: 'calories', color: '#38BDF8', label: 'Calories' },
          ]} xAxisKey="day" height={230} />
        </div>

        {/* Activity Rings */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Activity Rings</h3>
          <div className="flex flex-col items-center gap-6">
            <ActivityRing move={activity.move} exercise={activity.exercise} stand={activity.stand} />
            <div className="w-full space-y-3">
              {[
                { label: 'Move', value: activity.move, color: 'bg-emerald-500' },
                { label: 'Exercise', value: activity.exercise, color: 'bg-sky-400' },
                { label: 'Stand', value: activity.stand, color: 'bg-violet-500' },
              ].map(ring => (
                <div key={ring.label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span className="font-medium">{ring.label}</span>
                    <span>{ring.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ring.value}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full rounded-full ${ring.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Sleep Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Sleep Duration (7 Days)</h3>
          <HealthChart type="bar" data={weeklyData} dataKeys={[{ key: 'sleep', color: '#8B5CF6', label: 'Hours' }]} xAxisKey="day" height={200} />
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;
