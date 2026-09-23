import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Users, DollarSign, ArrowUpRight, Plus, Edit, Trash2, X } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import ExportButtons from '@/components/common/ExportButtons';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import { exportToCSV } from '@/utils/exportCSV';
import { toast } from 'sonner';

interface SubscriptionRecord {
  id: string;
  user: string;
  email: string;
  plan: 'Starter' | 'Pro' | 'Premium';
  amount: string;
  date: string;
  status: 'active' | 'cancelled';
}

const STORAGE_KEY = 'lifestylebio_admin_subscriptions';

const subData = [
  { month: 'Feb', starter: 4200, pro: 2800, premium: 980 },
  { month: 'Mar', starter: 4800, pro: 3200, premium: 1100 },
  { month: 'Apr', starter: 5400, pro: 3800, premium: 1280 },
  { month: 'May', starter: 6100, pro: 4400, premium: 1450 },
  { month: 'Jun', starter: 7200, pro: 5100, premium: 1720 },
  { month: 'Jul', starter: 8500, pro: 6200, premium: 2100 },
];

const INITIAL_SUBS: SubscriptionRecord[] = [
  { id: 'sub_1', user: 'John D.', email: 'john.d@lifestylebio.com', plan: 'Pro', amount: '$12.00', date: 'Jul 24, 2026', status: 'active' },
  { id: 'sub_2', user: 'Emma W.', email: 'emma.w@lifestylebio.com', plan: 'Premium', amount: '$29.00', date: 'Jul 24, 2026', status: 'active' },
  { id: 'sub_3', user: 'Mike J.', email: 'mike.j@lifestylebio.com', plan: 'Pro', amount: '$12.00', date: 'Jul 23, 2026', status: 'active' },
  { id: 'sub_4', user: 'Lisa A.', email: 'lisa.a@lifestylebio.com', plan: 'Starter', amount: '$0.00', date: 'Jul 23, 2026', status: 'active' },
  { id: 'sub_5', user: 'Tom R.', email: 'tom.r@lifestylebio.com', plan: 'Premium', amount: '$29.00', date: 'Jul 22, 2026', status: 'cancelled' },
];

const PLAN_PRICES: Record<'Starter' | 'Pro' | 'Premium', string> = {
  Starter: '$0.00',
  Pro: '$12.00',
  Premium: '$29.00',
};

const EMPTY_SUB = {
  user: '',
  email: '',
  plan: 'Pro' as 'Starter' | 'Pro' | 'Premium',
  amount: '$12.00',
  date: 'Sep 23, 2026',
  status: 'active' as 'active' | 'cancelled',
};

const AdminSubscriptions: React.FC = () => {
  const [subs, setSubs] = useState<SubscriptionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SUBS;
    } catch {
      return INITIAL_SUBS;
    }
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<SubscriptionRecord | null>(null);
  const [form, setForm] = useState(EMPTY_SUB);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  }, [subs]);

  const openAddModal = () => {
    setEditingSub(null);
    setForm(EMPTY_SUB);
    setModalOpen(true);
  };

  const openEditModal = (s: SubscriptionRecord) => {
    setEditingSub(s);
    setForm({
      user: s.user,
      email: s.email,
      plan: s.plan,
      amount: s.amount,
      date: s.date,
      status: s.status,
    });
    setModalOpen(true);
  };

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.user.trim()) {
      toast.error('Subscriber name is required.');
      return;
    }
    if (editingSub) {
      setSubs(prev => prev.map(s => s.id === editingSub.id ? { ...s, ...form, user: form.user.trim() } : s));
      toast.success('Subscription updated.');
    } else {
      const newSub: SubscriptionRecord = {
        id: `sub_${Date.now()}`,
        ...form,
        user: form.user.trim(),
      };
      setSubs(prev => [newSub, ...prev]);
      toast.success('Subscription record created.');
    }
    setModalOpen(false);
  };

  const toggleSubStatus = (id: string) => {
    setSubs(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'cancelled' : 'active' } : s));
    toast.success('Subscription status toggled.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Subscription Management</h2>
          <p className="text-gray-500 text-sm">Revenue and plan distribution · {subs.filter(s => s.status === 'active').length} active subscriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButtons
            onExportCSV={() => exportToCSV(subs, 'subscriptions')}
            onExportPDF={() => toast.info('Generating PDF report...')}
          />
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5 cursor-pointer">
            <Plus size={15} /> Add Subscription
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: '$102,300', change: '+23%', icon: DollarSign, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Total Subscribers', value: '16,800', change: '+18%', icon: Users, color: 'text-sky-500 bg-sky-50' },
          { label: 'Pro Subscribers', value: '6,200', change: '+21%', icon: CreditCard, color: 'text-violet-500 bg-violet-50' },
          { label: 'MRR Growth', value: '23%', change: '+3%', icon: TrendingUp, color: 'text-orange-500 bg-orange-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={18} /></div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <p className="text-gray-500 text-xs">{s.label}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-medium">
              <ArrowUpRight size={12} />{s.change} this month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Subscriber Growth by Plan</h3>
          <HealthChart type="area" data={subData} dataKeys={[
            { key: 'starter', color: '#9CA3AF', label: 'Starter' },
            { key: 'pro', color: '#10B981', label: 'Pro' },
            { key: 'premium', color: '#8B5CF6', label: 'Premium' },
          ]} xAxisKey="month" height={220} showLegend />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Manage Subscriptions</h3>
          <div className="space-y-3">
            {subs.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard size={14} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{s.user}</p>
                  <p className="text-xs text-gray-400">{s.plan} · {s.date}</p>
                </div>
                <div className="text-right mr-2">
                  <p className="text-sm font-bold text-gray-900">{s.amount}</p>
                  <button
                    type="button"
                    onClick={() => toggleSubStatus(s.id)}
                    title="Click to toggle status"
                    className={`text-xs px-1.5 py-0.5 rounded font-medium cursor-pointer ${s.status === 'active' ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}
                  >
                    {s.status}
                  </button>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEditModal(s)} title="Edit Subscription" className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-white cursor-pointer"><Edit size={14} /></button>
                  <button onClick={() => setDeleteId(s.id)} title="Delete Subscription" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white cursor-pointer"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingSub ? 'Edit Subscription' : 'New Subscription'}>
        <form onSubmit={handleSaveSub} className="space-y-3.5">
          <div>
            <label className="label">Subscriber Name *</label>
            <input value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} className="input-field" placeholder="e.g. Sarah Connor" required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="sarah@lifestylebio.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Plan Tier</label>
              <select
                value={form.plan}
                onChange={e => {
                  const plan = e.target.value as 'Starter' | 'Pro' | 'Premium';
                  setForm({ ...form, plan, amount: PLAN_PRICES[plan] });
                }}
                className="input-field"
              >
                <option value="Starter">Starter ($0.00)</option>
                <option value="Pro">Pro ($12.00)</option>
                <option value="Premium">Premium ($29.00)</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'cancelled' })} className="input-field">
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">{editingSub ? 'Save Changes' : 'Add Subscription'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Remove Subscription" message="Delete this subscription record?" onConfirm={() => { setSubs(prev => prev.filter(s => s.id !== deleteId)); setDeleteId(null); toast.success('Subscription record deleted.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default AdminSubscriptions;
