import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Activity } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { generateMonthlyData } from '@/services/dashboardService';
import ExportButtons from '@/components/common/ExportButtons';
import { exportToCSV } from '@/utils/exportCSV';

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState<'1M' | '3M' | '6M'>('3M');
  const months = period === '1M' ? 1 : period === '3M' ? 3 : 6;
  const [monthlyData] = useState(() => generateMonthlyData(6));

  const correlations = [
    { metric1: 'Sleep Quality', metric2: 'Mood Score', correlation: 0.84, direction: 'positive' },
    { metric1: 'Exercise Frequency', metric2: 'Energy Levels', correlation: 0.79, direction: 'positive' },
    { metric1: 'Water Intake', metric2: 'Cognitive Focus', correlation: 0.71, direction: 'positive' },
    { metric1: 'Screen Time', metric2: 'Sleep Quality', correlation: -0.68, direction: 'negative' },
    { metric1: 'Stress Level', metric2: 'Heart Rate Variability', correlation: -0.75, direction: 'negative' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Health Analytics</h2>
          <p className="text-gray-500 text-sm">Comprehensive trends and correlations from your health data</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(monthlyData, 'health_analytics')} />
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['1M', '3M', '6M'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Daily Steps', value: '8,247', change: '+12%', positive: true },
          { label: 'Avg Sleep', value: '7.4 hrs', change: '+0.4h', positive: true },
          { label: 'Avg Calories', value: '1,890', change: '-5%', positive: true },
          { label: 'Health Score', value: '78/100', change: '+6 pts', positive: true },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`text-xs font-semibold mb-1 px-2 py-0.5 rounded-full inline-block ${s.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>{s.change}</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{s.value}</div>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Weight & BMI Trend</h3>
          <HealthChart type="line" data={monthlyData} dataKeys={[
            { key: 'weight', color: '#10B981', label: 'Weight (kg)' },
            { key: 'bmi', color: '#38BDF8', label: 'BMI' },
          ]} xAxisKey="month" height={220} showLegend />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Monthly Workout Sessions</h3>
          <HealthChart type="bar" data={monthlyData} dataKeys={[{ key: 'workouts', color: '#8B5CF6', label: 'Workouts' }]} xAxisKey="month" height={220} />
        </div>
      </div>

      {/* Correlations */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Health Metric Correlations</h3>
        <div className="space-y-3">
          {correlations.map(c => (
            <div key={`${c.metric1}-${c.metric2}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{c.metric1} → {c.metric2}</p>
                <p className="text-xs text-gray-400">{c.direction === 'positive' ? 'Higher' : 'Lower'} {c.metric1} = {c.direction === 'positive' ? 'higher' : 'lower'} {c.metric2}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.direction === 'positive' ? 'bg-emerald-500' : 'bg-red-400'}`} style={{ width: `${Math.abs(c.correlation) * 100}%` }} />
                </div>
                <span className={`text-xs font-bold ${c.direction === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}>{c.correlation > 0 ? '+' : ''}{c.correlation.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
