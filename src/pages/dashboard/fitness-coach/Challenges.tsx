import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Plus, Flame, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { crudService, Challenge } from '@/services/crudService';

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    participants: 10,
    duration: '30 Days',
    category: 'Hypertrophy',
    status: 'Active' as 'Active' | 'Upcoming' | 'Ended',
  });

  useEffect(() => {
    setChallenges(crudService.getChallenges());
  }, []);

  const handleOpenAddModal = () => {
    setEditingChallenge(null);
    setFormData({
      title: '',
      description: '',
      participants: 1,
      duration: '30 Days',
      category: 'Fitness',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Challenge) => {
    setEditingChallenge(item);
    setFormData({
      title: item.title,
      description: item.description,
      participants: item.participants,
      duration: item.duration,
      category: item.category,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Please enter challenge title');
      return;
    }

    if (editingChallenge) {
      crudService.updateChallenge(editingChallenge.id, formData);
      setChallenges(crudService.getChallenges());
      toast.success('Fitness challenge updated');
    } else {
      crudService.addChallenge(formData);
      setChallenges(crudService.getChallenges());
      toast.success('Fitness challenge created');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteChallenge(deleteId);
    setChallenges(crudService.getChallenges());
    setDeleteId(null);
    toast.success('Fitness challenge deleted');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Fitness Challenges</h2>
          <p className="text-gray-500 text-sm">{challenges.length} active community challenges</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Create Challenge
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {challenges.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">
            No active challenges found. Click "Create Challenge" to start one.
          </div>
        ) : (
          challenges.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Trophy size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{c.title}</h3>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                      {c.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(c)}
                    className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-sky-50"
                    title="Edit Challenge"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete Challenge"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-4 line-clamp-2">{c.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <Users size={12} className="text-gray-400 mx-auto mb-0.5" />
                  <p className="text-xs font-bold text-gray-900">{c.participants}</p>
                  <p className="text-xs text-gray-400">Members</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <Clock size={12} className="text-gray-400 mx-auto mb-0.5" />
                  <p className="text-xs font-bold text-gray-900">{c.duration}</p>
                  <p className="text-xs text-gray-400">Duration</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">Status: {c.status}</span>
                <button
                  onClick={() => toast.success(`Viewing details for ${c.title}`)}
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingChallenge ? 'Edit Challenge' : 'Create Fitness Challenge'}
        subtitle="Launch community fitness challenges for your clients"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Challenge Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 30-Day Lean Muscle Building"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Description</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief overview of rules & objectives..."
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Hypertrophy / Fat Loss"
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
                placeholder="e.g. 30 Days"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Initial Participants</label>
              <input
                type="number"
                min={1}
                value={formData.participants}
                onChange={e => setFormData({ ...formData, participants: Number(e.target.value) })}
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
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ended">Ended</option>
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
              {editingChallenge ? 'Save Changes' : 'Create Challenge'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Challenge"
        message="Are you sure you want to delete this challenge?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Challenges;
