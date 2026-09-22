import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Dumbbell, Trophy, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { crudService, WorkoutPlan, Challenge } from '@/services/crudService';
import { toast } from 'sonner';

const clientProgress = [
  { month: 'Feb', clients: 5, sessions: 18, goals: 12 },
  { month: 'Mar', clients: 8, sessions: 24, goals: 18 },
  { month: 'Apr', clients: 11, sessions: 32, goals: 26 },
  { month: 'May', clients: 13, sessions: 38, goals: 31 },
  { month: 'Jun', clients: 15, sessions: 46, goals: 38 },
  { month: 'Jul', clients: 18, sessions: 54, goals: 44 },
];

const FitnessCoachDashboard: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Quick Modal for Workout Plan
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    level: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced',
    duration: '45 min',
    daysPerWeek: 4,
    status: 'active' as 'active' | 'completed' | 'draft',
    createdAt: new Date().toISOString().split('T')[0],
  });

  const loadData = () => {
    setPlans(crudService.getWorkoutPlans());
    setChallenges(crudService.getChallenges());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingPlan(null);
    setFormData({
      title: '',
      clientName: '',
      level: 'Intermediate',
      duration: '45 min',
      daysPerWeek: 4,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: WorkoutPlan) => {
    setEditingPlan(plan);
    setFormData({
      title: plan.title,
      clientName: plan.clientName,
      level: plan.level,
      duration: plan.duration,
      daysPerWeek: plan.daysPerWeek,
      status: plan.status,
      createdAt: plan.createdAt,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.clientName.trim()) {
      toast.error('Please enter title and client name');
      return;
    }
    if (editingPlan) {
      crudService.updateWorkoutPlan(editingPlan.id, formData);
      toast.success('Workout routine updated');
    } else {
      crudService.addWorkoutPlan(formData);
      toast.success('Workout routine created');
    }
    loadData();
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteWorkoutPlan(deleteId);
    loadData();
    setDeleteId(null);
    toast.success('Workout plan deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Welcome, Coach {user?.firstName || 'Trainer'}!
          </h2>
          <p className="text-gray-500 text-sm font-sans">Your dynamic training overview and client management.</p>
        </motion.div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Quick Create Workout Plan
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Active Workout Routines',
            value: plans.length.toString(),
            change: 20,
            changeType: 'increase' as const,
            icon: <Dumbbell size={20} />,
            color: 'green' as const,
          },
          {
            title: 'Sessions Scheduled',
            value: (plans.length * 4).toString(),
            change: 9,
            changeType: 'increase' as const,
            icon: <Users size={20} />,
            color: 'blue' as const,
          },
          {
            title: 'Active Challenges',
            value: challenges.length.toString(),
            icon: <Trophy size={20} />,
            color: 'yellow' as const,
          },
          {
            title: 'Avg Client Progress',
            value: '78%',
            change: 5,
            changeType: 'increase' as const,
            icon: <TrendingUp size={20} />,
            color: 'purple' as const,
          },
        ].map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 font-heading">Practice & Session Growth</h3>
          <HealthChart
            type="area"
            data={clientProgress}
            dataKeys={[
              { key: 'clients', color: '#10B981', label: 'Clients' },
              { key: 'sessions', color: '#8B5CF6', label: 'Sessions' },
            ]}
            xAxisKey="month"
            height={230}
            showLegend
          />
        </div>

        {/* Live Workout Routines List */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-heading">Active Routines</h3>
              <button
                onClick={handleOpenAddModal}
                className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Create Plan
              </button>
            </div>
            <div className="space-y-3">
              {plans.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No workout routines yet.</p>
              ) : (
                plans.slice(0, 4).map(p => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/60 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
                      <p className="text-xs text-gray-500 truncate">Client: {p.clientName} · {p.level}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                        title="Edit Plan"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                        title="Delete Plan"
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
        title={editingPlan ? 'Edit Workout Routine' : 'Quick Create Workout Routine'}
        subtitle="Specify routine details, target client, and intensity"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Routine Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Full Body Hypertrophy"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Client Name</label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={e => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="e.g. Michael Chen"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Fitness Level</label>
              <select
                value={formData.level}
                onChange={e => setFormData({ ...formData, level: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Days / Week</label>
              <input
                type="number"
                min={1}
                max={7}
                value={formData.daysPerWeek}
                onChange={e => setFormData({ ...formData, daysPerWeek: Number(e.target.value) })}
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
              {editingPlan ? 'Save Changes' : 'Create Routine'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Workout Plan"
        message="Are you sure you want to delete this workout plan?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default FitnessCoachDashboard;
