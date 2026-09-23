import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus, Edit, Trash2, Star, Globe, X } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import SearchBar from '@/components/common/SearchBar';
import { toast } from 'sonner';

interface Partner {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'pending';
  rating: number;
  patients: number;
  since: string;
}

const STORAGE_KEY = 'lifestylebio_admin_partners';

const INITIAL_PARTNERS: Partner[] = [
  { id: '1', name: 'HealthFirst Clinics', type: 'Healthcare Provider', location: 'San Francisco, CA', status: 'active', rating: 4.9, patients: 1240, since: 'Jan 2025' },
  { id: '2', name: 'NutriCoach Pro', type: 'Nutrition Service', location: 'New York, NY', status: 'active', rating: 4.8, patients: 892, since: 'Mar 2025' },
  { id: '3', name: 'FitLife Labs', type: 'Fitness Technology', location: 'Austin, TX', status: 'active', rating: 4.7, patients: 567, since: 'Jun 2025' },
  { id: '4', name: 'MindWell Center', type: 'Mental Health', location: 'Chicago, IL', status: 'pending', rating: 4.6, patients: 0, since: 'Jul 2026' },
  { id: '5', name: 'SleepTech Solutions', type: 'Sleep Technology', location: 'Seattle, WA', status: 'active', rating: 4.5, patients: 423, since: 'Sep 2025' },
];

const EMPTY_PARTNER = {
  name: '',
  type: 'Healthcare Provider',
  location: '',
  status: 'active' as 'active' | 'pending',
  rating: 4.8,
  patients: 0,
  since: 'Sep 2026',
};

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
    } catch {
      return INITIAL_PARTNERS;
    }
  });
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [form, setForm] = useState(EMPTY_PARTNER);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
  }, [partners]);

  const filtered = partners.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));

  const openAddModal = () => {
    setEditingPartner(null);
    setForm(EMPTY_PARTNER);
    setModalOpen(true);
  };

  const openEditModal = (p: Partner) => {
    setEditingPartner(p);
    setForm({
      name: p.name,
      type: p.type,
      location: p.location,
      status: p.status,
      rating: p.rating,
      patients: p.patients,
      since: p.since,
    });
    setModalOpen(true);
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) {
      toast.error('Partner name and location are required.');
      return;
    }
    if (editingPartner) {
      setPartners(prev => prev.map(p => p.id === editingPartner.id ? { ...p, ...form, name: form.name.trim(), location: form.location.trim() } : p));
      toast.success('Partner updated successfully.');
    } else {
      const newPartner: Partner = {
        id: `partner_${Date.now()}`,
        ...form,
        name: form.name.trim(),
        location: form.location.trim(),
      };
      setPartners(prev => [newPartner, ...prev]);
      toast.success('Partner onboarded successfully.');
    }
    setModalOpen(false);
  };

  const togglePartnerStatus = (id: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'pending' : 'active' } : p));
    toast.success('Partner status updated.');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Healthcare Partners</h2>
          <p className="text-gray-500 text-sm">{partners.filter(p => p.status === 'active').length} active partners</p>
        </div>
        <button onClick={openAddModal} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 cursor-pointer">
          <Plus size={16} /> Add Partner
        </button>
      </div>

      <SearchBar placeholder="Search partners..." onSearch={setSearch} className="max-w-sm" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                <Building2 size={18} className="text-sky-600" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEditModal(p)} title="Edit Partner" className="p-1.5 text-gray-400 hover:text-sky-500 rounded-lg hover:bg-sky-50 cursor-pointer"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(p.id)} title="Remove Partner" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"><Trash2 size={14} /></button>
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
              <button
                type="button"
                onClick={() => togglePartnerStatus(p.id)}
                title="Click to toggle status"
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium cursor-pointer ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}
              >
                {p.status}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingPartner ? 'Edit Partner' : 'Onboard New Partner'}>
        <form onSubmit={handleSavePartner} className="space-y-3.5">
          <div>
            <label className="label">Partner Organization Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Apex Longevity Clinic" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Category / Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="input-field">
                <option value="Healthcare Provider">Healthcare Provider</option>
                <option value="Nutrition Service">Nutrition Service</option>
                <option value="Fitness Technology">Fitness Technology</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Sleep Technology">Sleep Technology</option>
                <option value="Diagnostic Lab">Diagnostic Lab</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'pending' })} className="input-field">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Location *</label>
            <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="input-field" placeholder="e.g. Boston, MA" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Rating (1.0 - 5.0)</label>
              <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="input-field" />
            </div>
            <div>
              <label className="label">Active Patients</label>
              <input type="number" min="0" value={form.patients} onChange={e => setForm({ ...form, patients: Number(e.target.value) })} className="input-field" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">{editingPartner ? 'Save Changes' : 'Add Partner'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Remove Partner" message="Remove this healthcare partner from the platform? All associated data will be preserved." onConfirm={() => { setPartners(p => p.filter(par => par.id !== deleteId)); setDeleteId(null); toast.success('Partner removed.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Partners;
