import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Plus, Users, Calendar, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const PROGRAMS = [
  { id: '1', name: 'Mindfulness Monday', type: 'Mental Health', participants: 142, maxParticipants: 200, startDate: 'Jul 1, 2026', endDate: 'Aug 31, 2026', status: 'active', description: 'Weekly guided meditation and stress management sessions.' },
  { id: '2', name: '10K Steps Daily Challenge', type: 'Fitness', participants: 198, maxParticipants: 250, startDate: 'Jul 1, 2026', endDate: 'Jul 31, 2026', status: 'active', description: 'Daily step challenge with leaderboard and prizes.' },
  { id: '3', name: 'Healthy Eating Week', type: 'Nutrition', participants: 87, maxParticipants: 150, startDate: 'Jun 1, 2026', endDate: 'Jun 7, 2026', status: 'completed', description: 'Nutritionist-led meal planning and healthy cooking workshops.' },
  { id: '4', name: 'Stress Management Series', type: 'Mental Health', participants: 124, maxParticipants: 180, startDate: 'Jul 15, 2026', endDate: 'Aug 15, 2026', status: 'active', description: 'Six-week program covering stress, resilience, and work-life balance.' },
];

const typeColors: Record<string, string> = {
  'Mental Health': 'bg-violet-100 text-violet-700',
  'Fitness': 'bg-emerald-100 text-emerald-700',
  'Nutrition': 'bg-orange-100 text-orange-700',
};

const WellnessPrograms: React.FC = () => {
  const [programs, setPrograms] = useState(PROGRAMS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Wellness Programs</h2>
          <p className="text-gray-500 text-sm">{programs.filter(p => p.status === 'active').length} active programs</p>
        </div>
        <button onClick={() => toast.info('Program creator coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Create Program
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {programs.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HeartPulse size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{p.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[p.type]}`}>{p.type}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toast.info('Edit coming soon!')} className="p-1.5 text-gray-400 hover:text-sky-500 rounded-lg hover:bg-sky-50"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{p.description}</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span className="flex items-center gap-1"><Users size={11} /> {p.participants}/{p.maxParticipants} participants</span>
                <span>{Math.round(p.participants / p.maxParticipants * 100)}% full</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(p.participants / p.maxParticipants) * 100}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1"><Calendar size={11} /> {p.startDate} – {p.endDate}</span>
              <span className={`px-2.5 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteId} title="Delete Program" message="This will end the wellness program for all enrolled employees." onConfirm={() => { setPrograms(p => p.filter(prog => prog.id !== deleteId)); setDeleteId(null); toast.success('Program deleted.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default WellnessPrograms;
