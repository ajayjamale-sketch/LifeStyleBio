import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ClipboardList, Edit, Trash2, User, Apple } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import SearchBar from '@/components/common/SearchBar';
import { toast } from 'sonner';

const PLANS = [
  { id: '1', name: 'Mediterranean Weight Loss Plan', client: 'Emma Johnson', goal: 'Weight Loss', calories: 1600, duration: '12 weeks', status: 'active', createdDate: 'Jun 1, 2026' },
  { id: '2', name: 'High-Protein Muscle Building', client: 'Michael Chen', goal: 'Muscle Gain', calories: 2800, duration: '16 weeks', status: 'active', createdDate: 'May 15, 2026' },
  { id: '3', name: 'Diabetic-Friendly Meal Plan', client: 'Sarah Williams', goal: 'Diabetes Management', calories: 1800, duration: 'Ongoing', status: 'active', createdDate: 'Jan 10, 2026' },
  { id: '4', name: 'Heart-Healthy Low-Sodium Diet', client: 'James Rodriguez', goal: 'Heart Health', calories: 2000, duration: '8 weeks', status: 'paused', createdDate: 'Apr 20, 2026' },
  { id: '5', name: 'Athletic Performance Fueling', client: 'Lisa Anderson', goal: 'Sports Performance', calories: 3200, duration: '20 weeks', status: 'active', createdDate: 'Dec 1, 2025' },
];

const DietPlans: React.FC = () => {
  const [plans, setPlans] = useState(PLANS);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = plans.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = () => {
    if (!deleteId) return;
    setPlans(p => p.filter(plan => plan.id !== deleteId));
    setDeleteId(null);
    toast.success('Diet plan deleted.');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Diet Plans</h2>
          <p className="text-gray-500 text-sm">{plans.length} active plans</p>
        </div>
        <button onClick={() => toast.info('Plan builder launching soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Create Plan
        </button>
      </div>

      <SearchBar placeholder="Search plans or clients..." onSearch={setSearch} className="max-w-sm" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Apple size={18} className="text-emerald-600" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => toast.info('Edit coming soon!')} className="p-1.5 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(plan.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{plan.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <User size={11} /> {plan.client}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-400">Daily Cal</p>
                <p className="text-sm font-bold text-gray-900">{plan.calories}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-400">Duration</p>
                <p className="text-sm font-bold text-gray-900">{plan.duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{plan.createdDate}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${plan.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>{plan.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteId} title="Delete Diet Plan" message="This will permanently delete the diet plan. The client will be notified." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default DietPlans;
