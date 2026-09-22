import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Dumbbell, Edit, Trash2, Clock, User } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import SearchBar from '@/components/common/SearchBar';
import { toast } from 'sonner';
import { crudService, WorkoutPlan } from '@/services/crudService';

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-sky-100 text-sky-700',
  Advanced: 'bg-violet-100 text-violet-700',
};

const WorkoutPlans: React.FC = () => {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
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

  useEffect(() => {
    setPlans(crudService.getWorkoutPlans());
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
      toast.error('Please enter plan title and client name');
      return;
    }

    if (editingPlan) {
      crudService.updateWorkoutPlan(editingPlan.id, formData);
      setPlans(crudService.getWorkoutPlans());
      toast.success('Workout plan updated');
    } else {
      crudService.addWorkoutPlan(formData);
      setPlans(crudService.getWorkoutPlans());
      toast.success('Workout plan created');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteWorkoutPlan(deleteId);
    setPlans(crudService.getWorkoutPlans());
    setDeleteId(null);
    toast.success('Workout plan deleted');
  };

  const filtered = plans.filter(
    p =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Workout Plans</h2>
          <p className="text-gray-500 text-sm">{plans.length} active training routines</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Create Workout Plan
        </button>
      </div>

      <SearchBar placeholder="Search routines or clients..." onSearch={setSearch} className="max-w-sm" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">
            No workout plans found. Click "Create Workout Plan" to add one.
          </div>
        ) : (
          filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Dumbbell size={18} className="text-violet-600" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Edit Plan"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Plan"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{p.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                <User size={12} /> Client: <span className="font-semibold text-gray-700">{p.clientName}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${levelColors[p.level] || 'bg-gray-100'}`}>
                  {p.level}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {p.status.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {p.daysPerWeek} days/week
                </span>
                <span>Duration: {p.duration}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? 'Edit Workout Plan' : 'Create Workout Routine'}
        subtitle="Configure client fitness level, workout frequency, and session targets"
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
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Days Per Week</label>
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Session Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 60 min"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
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
              {editingPlan ? 'Save Changes' : 'Create Plan'}
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

export default WorkoutPlans;
