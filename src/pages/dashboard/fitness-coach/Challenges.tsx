import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Plus, Flame, Star } from 'lucide-react';
import { toast } from 'sonner';

const CHALLENGES = [
  { id: '1', title: '30-Day Push-Up Challenge', participants: 12, duration: '30 days', daysLeft: 14, type: 'Strength', progress: 53, prize: 'Free premium month' },
  { id: '2', title: '10K Steps Daily Challenge', participants: 18, duration: '21 days', daysLeft: 7, type: 'Cardio', progress: 67, prize: 'LifestyleBio merchandise' },
  { id: '3', title: 'Plank Master Challenge', participants: 8, duration: '14 days', daysLeft: 3, type: 'Core', progress: 79, prize: 'Personalized training plan' },
];

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState(CHALLENGES);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Fitness Challenges</h2>
          <p className="text-gray-500 text-sm">{challenges.length} active challenges</p>
        </div>
        <button onClick={() => toast.info('Challenge creator coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Create Challenge
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {challenges.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Trophy size={20} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{c.title}</h3>
                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">{c.type}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <Users size={12} className="text-gray-400 mx-auto mb-0.5" />
                <p className="text-xs font-bold text-gray-900">{c.participants}</p>
                <p className="text-xs text-gray-400">Members</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <Clock size={12} className="text-gray-400 mx-auto mb-0.5" />
                <p className="text-xs font-bold text-gray-900">{c.daysLeft}</p>
                <p className="text-xs text-gray-400">Days Left</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <Flame size={12} className="text-gray-400 mx-auto mb-0.5" />
                <p className="text-xs font-bold text-gray-900">{c.progress}%</p>
                <p className="text-xs text-gray-400">Avg Done</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
              <Star size={11} className="text-yellow-400" /> Prize: {c.prize}
            </div>

            <div className="flex gap-2">
              <button onClick={() => toast.success('Challenge details updated!')} className="flex-1 py-2 text-xs font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">Manage</button>
              <button onClick={() => toast.info('Leaderboard opening...')} className="flex-1 py-2 text-xs font-medium bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">Leaderboard</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
