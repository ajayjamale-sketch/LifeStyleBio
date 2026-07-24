import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus, Edit, Trash2, Star, Globe } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import SearchBar from '@/components/common/SearchBar';
import { toast } from 'sonner';

const PARTNERS = [
  { id: '1', name: 'HealthFirst Clinics', type: 'Healthcare Provider', location: 'San Francisco, CA', status: 'active', rating: 4.9, patients: 1240, since: 'Jan 2025' },
  { id: '2', name: 'NutriCoach Pro', type: 'Nutrition Service', location: 'New York, NY', status: 'active', rating: 4.8, patients: 892, since: 'Mar 2025' },
  { id: '3', name: 'FitLife Labs', type: 'Fitness Technology', location: 'Austin, TX', status: 'active', rating: 4.7, patients: 567, since: 'Jun 2025' },
  { id: '4', name: 'MindWell Center', type: 'Mental Health', location: 'Chicago, IL', status: 'pending', rating: 4.6, patients: 0, since: 'Jul 2026' },
  { id: '5', name: 'SleepTech Solutions', type: 'Sleep Technology', location: 'Seattle, WA', status: 'active', rating: 4.5, patients: 423, since: 'Sep 2025' },
];

const Partners: React.FC = () => {
  const [partners, setPartners] = useState(PARTNERS);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = partners.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Healthcare Partners</h2>
          <p className="text-gray-500 text-sm">{partners.filter(p => p.status === 'active').length} active partners</p>
        </div>
        <button onClick={() => toast.info('Partner onboarding feature coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Add Partner
        </button>
      </div>

      <SearchBar placeholder="Search partners..." onSearch={setSearch} className="max-w-sm" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                <Building2 size={18} className="text-sky-600" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => toast.info('Edit coming soon!')} className="p-1.5 text-gray-400 hover:text-sky-500 rounded-lg hover:bg-sky-50"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-0.5">{p.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{p.type}</p>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={11} className="text-gray-400" />
              <span className="text-xs text-gray-500">{p.location}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <div className="flex items-center gap-1">
                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-900">{p.rating}</span>
              </div>
              <span className="text-gray-500 text-xs">{p.patients.toLocaleString()} patients</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Partner since {p.since}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteId} title="Remove Partner" message="Remove this healthcare partner from the platform? All associated data will be preserved." onConfirm={() => { setPartners(p => p.filter(par => par.id !== deleteId)); setDeleteId(null); toast.success('Partner removed.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Partners;
