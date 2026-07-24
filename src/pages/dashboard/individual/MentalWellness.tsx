import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Meh, Frown, Heart, Plus, Zap, Wind } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { toast } from 'sonner';

const moodData = [
  { day: 'Mon', mood: 7, energy: 6, stress: 4, anxiety: 3 },
  { day: 'Tue', mood: 8, energy: 8, stress: 3, anxiety: 2 },
  { day: 'Wed', mood: 5, energy: 5, stress: 7, anxiety: 6 },
  { day: 'Thu', mood: 9, energy: 8, stress: 2, anxiety: 2 },
  { day: 'Fri', mood: 8, energy: 9, stress: 3, anxiety: 3 },
  { day: 'Sat', mood: 9, energy: 8, stress: 2, anxiety: 1 },
  { day: 'Sun', mood: 7, energy: 7, stress: 4, anxiety: 3 },
];

const moods = [
  { icon: Smile, label: 'Great', value: 9, color: 'text-emerald-500 bg-emerald-50' },
  { icon: Smile, label: 'Good', value: 7, color: 'text-sky-500 bg-sky-50' },
  { icon: Meh, label: 'Okay', value: 5, color: 'text-yellow-500 bg-yellow-50' },
  { icon: Frown, label: 'Bad', value: 3, color: 'text-red-500 bg-red-50' },
];

const exercises = [
  { title: '4-7-8 Breathing', desc: 'Inhale 4s, hold 7s, exhale 8s', icon: Wind, color: 'bg-sky-50 text-sky-600' },
  { title: 'Body Scan Meditation', desc: '10-minute mindfulness practice', icon: Brain, color: 'bg-violet-50 text-violet-600' },
  { title: 'Gratitude Journal', desc: 'Write 3 things you are grateful for', icon: Heart, color: 'bg-pink-50 text-pink-600' },
  { title: 'Progressive Muscle Relaxation', desc: 'Tense and release muscle groups', icon: Zap, color: 'bg-emerald-50 text-emerald-600' },
];

const MentalWellness: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stress, setStress] = useState(4);
  const [notes, setNotes] = useState('');

  const handleLogMood = () => {
    if (!selectedMood) { toast.error('Please select your mood.'); return; }
    toast.success('Mood logged successfully! Keep tracking your mental wellness.');
    setSelectedMood(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Mood Score', value: '7.6/10', color: 'text-violet-500 bg-violet-50' },
          { label: 'Stress Level', value: 'Low', color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Mindful Minutes', value: '42 min', color: 'text-sky-500 bg-sky-50' },
          { label: 'Mood Streak', value: '7 days', color: 'text-yellow-500 bg-yellow-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`text-2xl font-bold mb-1 ${s.color.split(' ')[0]}`}>{s.value}</div>
            <p className="text-gray-500 text-xs">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Log Mood */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">How are you feeling today?</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {moods.map(m => (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m.value)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${selectedMood === m.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <m.icon size={20} className={m.color.split(' ')[0]} />
                <span className="text-sm font-medium text-gray-700">{m.label}</span>
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="label text-xs">Stress Level: {stress}/10</label>
            <input type="range" min="1" max="10" value={stress} onChange={e => setStress(Number(e.target.value))} className="w-full accent-violet-500" />
          </div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add notes about your day..." className="input-field resize-none text-sm mb-3" />
          <button onClick={handleLogMood} className="btn-purple w-full text-sm py-2.5 flex items-center justify-center gap-2">
            <Plus size={16} /> Log Mood
          </button>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Mood & Stress Trends</h3>
          <HealthChart type="line" data={moodData} dataKeys={[
            { key: 'mood', color: '#8B5CF6', label: 'Mood' },
            { key: 'energy', color: '#10B981', label: 'Energy' },
            { key: 'stress', color: '#EF4444', label: 'Stress' },
          ]} xAxisKey="day" height={220} showLegend />
        </div>
      </div>

      {/* Wellness Exercises */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Recommended Exercises</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {exercises.map(ex => (
            <div key={ex.title} className={`p-4 rounded-xl ${ex.color.split(' ')[0]} border border-gray-100`}>
              <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center mb-3 shadow-sm`}>
                <ex.icon size={17} className={ex.color.split(' ')[1]} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{ex.title}</h4>
              <p className="text-gray-500 text-xs">{ex.desc}</p>
              <button className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700">Start Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentalWellness;
