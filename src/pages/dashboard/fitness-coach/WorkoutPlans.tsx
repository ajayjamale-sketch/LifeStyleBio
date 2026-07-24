import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Dumbbell, Edit, Trash2, Clock } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { toast } from 'sonner';

const PLANS = [
  { id: '1', name: '12-Week Strength Program', client: 'Alex Turner', level: 'Intermediate', sessionsPerWeek: 4, duration: '12 weeks', status: 'active', focus: 'Strength & Hypertrophy' },
  { id: '2', name: 'HIIT Fat Burn Circuit', client: 'Maria Santos', level: 'Advanced', sessionsPerWeek: 5, duration: '8 weeks', status: 'active', focus: 'Fat Loss & Conditioning' },
  { id: '3', name: 'Beginner Full Body', client: 'Tom Bradley', level: 'Beginner', sessionsPerWeek: 3, duration: '6 weeks', status: 'active', focus: 'Strength Foundation' },
  { id: '4', name: 'Athletic Performance', client: 'Nina Patel', level: 'Advanced', sessionsPerWeek: 6, duration: '16 weeks', status: 'active', focus: 'Sport-Specific Training' },
  { id: '5', name: 'Recovery & Mobility', client: 'James Lee', level: 'All Levels', sessionsPerWeek: 3, duration: 'Ongoing', status: 'paused', focus: 'Injury Prevention' },
];

const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-100 text-emerald-700',
  'Intermediate': 'bg-sky-100 text-sky-700',
  'Advanced': 'bg-violet-100 text-violet-700',
  'All Levels': 'bg-gray-100 text-gray-600',
};

const WorkoutPlans: React.FC = () => {
  const [plans, setPlans] = useState(PLANS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    setPlans(p => p.filter(plan => plan.id !== deleteId));
    setDeleteId(null);
    toast.success('Workout plan deleted.');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Workout Plans</h2>
          <p className="text-gray-500 text-sm">{plans.length} plans in use</p>
        </div>
        <button onClick={() => toast.info('Plan builder coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Create Plan
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {plans.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <Dumbbell size={18} className="text-violet-600" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => toast.info('Edit coming soon!')} className="p-1.5 text-gray-400 hover:text-sky-500 rounded-lg hover:bg-sky-50"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{p.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{p.client} · {p.focus}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[p.level]}`}>{p.level}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
            </div>
            <div className="flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock size={11} /> {p.sessionsPerWeek}x/week</span>
              <span>{p.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteId} title="Delete Workout Plan" message="Delete this workout plan? The client will need a new plan assigned." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default WorkoutPlans;
