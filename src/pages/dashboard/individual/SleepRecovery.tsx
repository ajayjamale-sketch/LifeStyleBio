import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Zap, Clock, Star, Plus } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { generateSleepData } from '@/services/dashboardService';
import { ScoreGauge } from '@/components/dashboard/widgets/HealthWidget';
import { toast } from 'sonner';

const SleepRecovery: React.FC = () => {
  const [sleepData] = useState(() => generateSleepData(7));
  const lastNight = sleepData[sleepData.length - 1];
  const [logForm, setLogForm] = useState({ bedTime: '22:30', wakeTime: '06:30', quality: '8' });

  const handleLog = () => {
    toast.success('Sleep log saved successfully!');
  };

  const tips = [
    'Maintain a consistent sleep schedule, even on weekends.',
    'Keep your bedroom cool (65–68°F / 18–20°C) for optimal sleep.',
    'Avoid screens 1 hour before bed to reduce blue light exposure.',
    'Limit caffeine after 2 PM to prevent sleep disruption.',
    'Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.',
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sleep Duration', value: `${lastNight?.total || 7.5}h`, icon: Moon, color: 'text-indigo-500 bg-indigo-50' },
          { label: 'Sleep Quality', value: `${lastNight?.quality || 85}%`, icon: Star, color: 'text-yellow-500 bg-yellow-50' },
          { label: 'Deep Sleep', value: `${lastNight?.deep || 1.8}h`, icon: Zap, color: 'text-violet-500 bg-violet-50' },
          { label: 'Avg Bedtime', value: '10:45 PM', icon: Clock, color: 'text-sky-500 bg-sky-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Sleep Score */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Last Night's Score</h3>
          <div className="flex justify-around">
            <ScoreGauge score={lastNight?.quality || 87} label="Overall Score" color="#8B5CF6" />
            <ScoreGauge score={Math.round((lastNight?.deep || 1.8) / 2.5 * 100)} label="Deep Sleep" color="#10B981" />
          </div>
          <div className="mt-5 space-y-2.5">
            {[
              { label: 'Deep Sleep', value: lastNight?.deep || 1.8, color: '#8B5CF6' },
              { label: 'REM Sleep', value: lastNight?.rem || 2.1, color: '#38BDF8' },
              { label: 'Light Sleep', value: lastNight?.light || 3.2, color: '#10B981' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-gray-600 flex-1">{s.label}</span>
                <span className="font-semibold text-gray-800">{s.value}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">7-Day Sleep Duration</h3>
          <HealthChart type="area" data={sleepData} dataKeys={[
            { key: 'total', color: '#8B5CF6', label: 'Total Sleep (h)' },
            { key: 'deep', color: '#10B981', label: 'Deep Sleep (h)' },
          ]} xAxisKey="date" height={220} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Log Sleep */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus size={18} className="text-indigo-500" /> Log Sleep</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="label text-xs">Bedtime</label>
              <input type="time" value={logForm.bedTime} onChange={e => setLogForm(p => ({ ...p, bedTime: e.target.value }))} className="input-field" />
            </div>
            <div>
              <label className="label text-xs">Wake Time</label>
              <input type="time" value={logForm.wakeTime} onChange={e => setLogForm(p => ({ ...p, wakeTime: e.target.value }))} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label text-xs">Sleep Quality: {logForm.quality}/10</label>
            <input type="range" min="1" max="10" value={logForm.quality} onChange={e => setLogForm(p => ({ ...p, quality: e.target.value }))} className="w-full accent-violet-500" />
          </div>
          <button onClick={handleLog} className="btn-purple mt-3 text-sm py-2.5 px-5">Save Sleep Log</button>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Sleep Improvement Tips</h3>
          <ul className="space-y-2.5">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">{i + 1}</div>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SleepRecovery;
