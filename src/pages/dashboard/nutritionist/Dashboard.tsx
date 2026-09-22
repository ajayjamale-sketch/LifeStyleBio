import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Apple, Calendar, Star, Plus, Edit, Trash2 } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { crudService, Client } from '@/services/crudService';
import { toast } from 'sonner';

const clientProgress = [
  { month: 'Feb', clients: 8, plans: 12, sessions: 24 },
  { month: 'Mar', clients: 11, plans: 15, sessions: 32 },
  { month: 'Apr', clients: 14, plans: 18, sessions: 41 },
  { month: 'May', clients: 16, plans: 22, sessions: 48 },
  { month: 'Jun', clients: 18, plans: 26, sessions: 54 },
  { month: 'Jul', clients: 21, plans: 29, sessions: 62 },
];

const NutritionistDashboard: React.FC = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [dietPlansCount, setDietPlansCount] = useState(0);
  const [consultationsCount, setConsultationsCount] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Quick Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Weight Loss',
    status: 'active' as 'active' | 'inactive',
    progress: 50,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    nextSession: 'Next Week',
  });

  const loadData = () => {
    setClients(crudService.getClients());
    setDietPlansCount(crudService.getDietPlans().length);
    setConsultationsCount(crudService.getConsultations().length);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      goal: 'Weight Loss',
      status: 'active',
      progress: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      nextSession: 'Next Week',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      goal: client.goal,
      status: client.status,
      progress: client.progress,
      joinDate: client.joinDate,
      nextSession: client.nextSession,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please enter name and email');
      return;
    }
    if (editingClient) {
      crudService.updateClient(editingClient.id, formData);
      toast.success('Client updated');
    } else {
      crudService.addClient(formData);
      toast.success('Client registered');
    }
    loadData();
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteClient(deleteId);
    loadData();
    setDeleteId(null);
    toast.success('Client removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Welcome back, {user?.firstName || 'Nutritionist'}!
          </h2>
          <p className="text-gray-500 text-sm">Here's your active practice overview and client metrics.</p>
        </motion.div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Quick Add Client
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Active Clients',
            value: clients.length.toString(),
            change: 16,
            changeType: 'increase' as const,
            icon: <Users size={20} />,
            color: 'green' as const,
          },
          {
            title: 'Diet Plans Active',
            value: dietPlansCount.toString(),
            change: 12,
            changeType: 'increase' as const,
            icon: <Apple size={20} />,
            color: 'orange' as const,
          },
          {
            title: 'Sessions Booked',
            value: consultationsCount.toString(),
            change: 14,
            changeType: 'increase' as const,
            icon: <Calendar size={20} />,
            color: 'blue' as const,
          },
          {
            title: 'Avg Client Rating',
            value: '4.9',
            unit: '/5',
            icon: <Star size={20} />,
            color: 'purple' as const,
          },
        ].map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 font-heading">Practice Growth</h3>
          <HealthChart
            type="area"
            data={clientProgress}
            dataKeys={[
              { key: 'clients', color: '#10B981', label: 'Clients' },
              { key: 'sessions', color: '#38BDF8', label: 'Sessions' },
            ]}
            xAxisKey="month"
            height={230}
            showLegend
          />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-heading">Clients Summary</h3>
              <button
                onClick={handleOpenAdd}
                className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Client
              </button>
            </div>
            <div className="space-y-3">
              {clients.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No clients added.</p>
              ) : (
                clients.slice(0, 4).map(c => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/60 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                      <p className="text-xs text-gray-500 truncate">{c.goal}</p>
                      <div className="h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                        title="Edit Client"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(c.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                        title="Delete Client"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? 'Edit Client' : 'Add New Client'}
        subtitle="Manage client details directly from your dashboard overview"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Emma Johnson"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="emma@email.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Goal</label>
              <input
                type="text"
                required
                value={formData.goal}
                onChange={e => setFormData({ ...formData, goal: e.target.value })}
                placeholder="Weight Loss"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm px-5 py-2 rounded-xl shadow-sm">
              {editingClient ? 'Save Changes' : 'Save Client'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Client"
        message="Are you sure you want to delete this client?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default NutritionistDashboard;
