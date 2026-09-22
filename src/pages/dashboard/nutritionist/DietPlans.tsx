import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, User, Apple } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import SearchBar from '@/components/common/SearchBar';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { crudService, DietPlan } from '@/services/crudService';

const DietPlans: React.FC = () => {
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<DietPlan | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    calories: 2000,
    macros: 'P: 30%, C: 40%, F: 30%',
    duration: '4 Weeks',
    status: 'active' as 'active' | 'completed' | 'draft',
    createdAt: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    setPlans(crudService.getDietPlans());
  }, []);

  const handleOpenAddModal = () => {
    setEditingPlan(null);
    setFormData({
      title: '',
      clientName: '',
      calories: 2000,
      macros: 'P: 30%, C: 40%, F: 30%',
      duration: '4 Weeks',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: DietPlan) => {
    setEditingPlan(plan);
    setFormData({
      title: plan.title,
      clientName: plan.clientName,
      calories: plan.calories,
      macros: plan.macros,
      duration: plan.duration,
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
      crudService.updateDietPlan(editingPlan.id, formData);
      setPlans(crudService.getDietPlans());
      toast.success('Diet plan updated');
    } else {
      crudService.addDietPlan(formData);
      setPlans(crudService.getDietPlans());
      toast.success('Diet plan created');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteDietPlan(deleteId);
    setPlans(crudService.getDietPlans());
    setDeleteId(null);
    toast.success('Diet plan deleted');
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
          <h2 className="text-xl font-bold text-gray-900 font-heading">Diet Plans</h2>
          <p className="text-gray-500 text-sm">{plans.length} total active meal plans</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Create Diet Plan
        </button>
      </div>

      <SearchBar placeholder="Search diet plans or client names..." onSearch={setSearch} className="max-w-sm" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">
            No diet plans found. Click "Create Diet Plan" to add one.
          </div>
        ) : (
          filtered.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Apple size={18} className="text-emerald-600" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(plan)}
                    className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Edit Plan"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(plan.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Plan"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{plan.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                <User size={12} /> Client: <span className="font-semibold text-gray-700">{plan.clientName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-gray-400">Daily Cal</p>
                  <p className="text-sm font-bold text-gray-900">{plan.calories} kcal</p>
                </div>
                <div className="bg-gray-50/80 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="text-sm font-bold text-gray-900">{plan.duration}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 bg-emerald-50/50 p-2 rounded-lg text-emerald-800 font-mono">
                Macros: {plan.macros}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">{plan.createdAt}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    plan.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : plan.status === 'completed'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {plan.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? 'Edit Diet Plan' : 'Create New Diet Plan'}
        subtitle="Specify meal plan parameters, caloric limits and macros"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Plan Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Mediterranean Weight Loss Plan"
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
              placeholder="e.g. Emma Johnson"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Daily Calories</label>
              <input
                type="number"
                required
                min={800}
                max={6000}
                value={formData.calories}
                onChange={e => setFormData({ ...formData, calories: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 4 Weeks"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Macro Split</label>
            <input
              type="text"
              required
              value={formData.macros}
              onChange={e => setFormData({ ...formData, macros: e.target.value })}
              placeholder="e.g. P: 30%, C: 40%, F: 30%"
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
        title="Delete Diet Plan"
        message="Are you sure you want to delete this diet plan? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default DietPlans;
