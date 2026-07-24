import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit, Eye, Heart, Activity } from 'lucide-react';
import { toast } from 'sonner';

const PROFILES = [
  { id: '1', name: 'Mom', relation: 'Mother', age: 58, healthScore: 74, lastChecked: 'Today', conditions: ['Hypertension'], avatar: 'photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face' },
  { id: '2', name: 'Dad', relation: 'Father', age: 62, healthScore: 81, lastChecked: 'Yesterday', conditions: ['Type 2 Diabetes'], avatar: 'photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { id: '3', name: 'Emma', relation: 'Sister', age: 28, healthScore: 92, lastChecked: 'Today', conditions: [], avatar: 'photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
];

const SharedProfiles: React.FC = () => {
  const [profiles] = useState(PROFILES);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Family Profiles</h2>
          <p className="text-gray-500 text-sm">{profiles.length} family members connected</p>
        </div>
        <button onClick={() => toast.info('Invite family member feature coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Invite Member
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {profiles.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img src={`https://images.unsplash.com/${p.avatar}`} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-gray-900">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.relation} · {p.age} years</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Health Score</span>
              <span className={`text-xl font-bold ${p.healthScore >= 85 ? 'text-emerald-600' : p.healthScore >= 70 ? 'text-sky-600' : 'text-orange-500'}`}>{p.healthScore}/100</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div className={`h-full rounded-full ${p.healthScore >= 85 ? 'bg-emerald-500' : p.healthScore >= 70 ? 'bg-sky-400' : 'bg-orange-400'}`} style={{ width: `${p.healthScore}%` }} />
            </div>

            {p.conditions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.conditions.map(c => <span key={c} className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full">{c}</span>)}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span>Last checked: {p.lastChecked}</span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => toast.info('Viewing health details...')} className="flex-1 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                <Eye size={13} /> View
              </button>
              <button onClick={() => toast.success('Message sent!')} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1">
                <Heart size={13} /> Check In
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SharedProfiles;
