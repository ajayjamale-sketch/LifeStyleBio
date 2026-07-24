import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Clock, Activity, Plus, Trophy } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { toast } from 'sonner';

const workoutData = [
  { day: 'Mon', calories: 380, duration: 45, intensity: 75 },
  { day: 'Tue', calories: 0, duration: 0, intensity: 0 },
  { day: 'Wed', calories: 520, duration: 60, intensity: 88 },
  { day: 'Thu', calories: 290, duration: 35, intensity: 62 },
  { day: 'Fri', calories: 610, duration: 70, intensity: 92 },
  { day: 'Sat', calories: 480, duration: 55, intensity: 80 },
  { day: 'Sun', calories: 0, duration: 0, intensity: 0 },
];

const WORKOUTS = [
  { id: '1', name: 'Morning Run', type: 'Cardio', duration: 32, calories: 320, date: 'Today', status: 'completed' },
  { id: '2', name: 'Upper Body Strength', type: 'Strength', duration: 48, calories: 280, date: 'Yesterday', status: 'completed' },
  { id: '3', name: 'Yoga Flow', type: 'Flexibility', duration: 25, calories: 95, date: '2 days ago', status: 'completed' },
];

const Fitness: React.FC = () => {
  const [logForm, setLogForm] = useState({ type: 'cardio', duration: '', calories: '' });

  const handleLog = () => {
    if (!logForm.duration) { toast.error('Please enter workout duration.'); return; }
    toast.success('Workout logged successfully!');
    setLogForm({ type: 'cardio', duration: '', calories: '' });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Workouts This Week', value: '5', icon: Dumbbell, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Calories Burned', value: '2,280', icon: Flame, color: 'text-orange-500 bg-orange-50' },
          { label: 'Active Minutes', value: '265', icon: Clock, color: 'text-sky-500 bg-sky-50' },
          { label: 'Current Streak', value: '12 days', icon: Trophy, color: 'text-yellow-500 bg-yellow-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Activity Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Activity</h3>
          <HealthChart type="area" data={workoutData} dataKeys={[
            { key: 'calories', color: '#10B981', label: 'Calories Burned' },
            { key: 'duration', color: '#38BDF8', label: 'Duration (min)' },
          ]} xAxisKey="day" height={200} />
        </div>

        {/* Recent Workouts */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Workouts</h3>
          <div className="space-y-3">
            {WORKOUTS.map(w => (
              <div key={w.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Activity size={16} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{w.name}</p>
                  <p className="text-xs text-gray-500">{w.type} · {w.duration} min · {w.calories} cal</p>
                </div>
                <span className="text-xs text-gray-400">{w.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Workout */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus size={18} className="text-emerald-500" /> Log Workout</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <select value={logForm.type} onChange={e => setLogForm(p => ({ ...p, type: e.target.value }))} className="input-field">
            <option value="cardio">Cardio</option>
            <option value="strength">Strength Training</option>
            <option value="hiit">HIIT</option>
            <option value="yoga">Yoga / Stretching</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
          <input value={logForm.duration} onChange={e => setLogForm(p => ({ ...p, duration: e.target.value }))} type="number" placeholder="Duration (minutes) *" className="input-field" />
          <input value={logForm.calories} onChange={e => setLogForm(p => ({ ...p, calories: e.target.value }))} type="number" placeholder="Calories burned" className="input-field" />
        </div>
        <button onClick={handleLog} className="btn-primary mt-3 text-sm py-2.5 px-5">Log Workout</button>
      </div>
    </div>
  );
};

export default Fitness;
