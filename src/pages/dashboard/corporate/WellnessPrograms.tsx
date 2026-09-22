import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Plus, Users, Calendar, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import { crudService, WellnessProgram } from '@/services/crudService';

const typeColors: Record<string, string> = {
  'Mental Health': 'bg-violet-100 text-violet-700 border-violet-200',
  Fitness: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Nutrition: 'bg-orange-100 text-orange-700 border-orange-200',
};

const WellnessPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<WellnessProgram[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<WellnessProgram | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fitness',
    participants: 50,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    status: 'Active' as 'Active' | 'Upcoming' | 'Completed',
    budget: '$1,000',
  });

  useEffect(() => {
    setPrograms(crudService.getWellnessPrograms());
  }, []);

  const handleOpenAddModal = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      category: 'Fitness',
      participants: 25,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      status: 'Active',
      budget: '$2,000',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: WellnessProgram) => {
    setEditingProgram(item);
    setFormData({
      title: item.title,
      category: item.category,
      participants: item.participants,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
      budget: item.budget || '$1,000',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Please enter program title');
      return;
    }

    if (editingProgram) {
      crudService.updateWellnessProgram(editingProgram.id, formData);
      setPrograms(crudService.getWellnessPrograms());
      toast.success('Wellness program updated');
    } else {
      crudService.addWellnessProgram(formData);
      setPrograms(crudService.getWellnessPrograms());
      toast.success('Wellness program created');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteWellnessProgram(deleteId);
    setPrograms(crudService.getWellnessPrograms());
    setDeleteId(null);
    toast.success('Wellness program deleted');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Corporate Wellness Programs</h2>
          <p className="text-gray-500 text-sm">
            {programs.filter(p => p.status === 'Active').length} active programs running
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Create Program
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {programs.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">
            No wellness programs created yet. Click "Create Program" to start one.
          </div>
        ) : (
          programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HeartPulse size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{p.title}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                        typeColors[p.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                    title="Edit Program"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Program"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mb-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {p.participants} Enrolled Employees
                  </span>
                  <span>Budget: {p.budget || '$1,500'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {p.startDate} – {p.endDate}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-medium ${
                    p.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : p.status === 'Upcoming'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProgram ? 'Edit Wellness Program' : 'Create Wellness Program'}
        subtitle="Set up corporate health challenges and wellness initiatives"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Program Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 10k Daily Steps Challenge"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Fitness">Fitness</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Nutrition">Nutrition</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Participants</label>
              <input
                type="number"
                min={1}
                value={formData.participants}
                onChange={e => setFormData({ ...formData, participants: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Start Date</label>
              <input
                type="text"
                required
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">End Date</label>
              <input
                type="text"
                required
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Allocated Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                placeholder="$2,000"
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
              {editingProgram ? 'Save Changes' : 'Create Program'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Program"
        message="This will remove the wellness program for all participants."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default WellnessPrograms;
