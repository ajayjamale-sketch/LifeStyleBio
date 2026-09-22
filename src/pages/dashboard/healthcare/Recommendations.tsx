import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Stethoscope, Edit, Trash2, Send } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import { crudService, Recommendation } from '@/services/crudService';

const priorityColors = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const typeColors: Record<string, string> = {
  Lifestyle: 'bg-sky-100 text-sky-700 border-sky-200',
  Dietary: 'bg-orange-100 text-orange-700 border-orange-200',
  Preventive: 'bg-violet-100 text-violet-700 border-violet-200',
  Medication: 'bg-red-100 text-red-700 border-red-200',
};

const Recommendations: React.FC = () => {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRec, setEditingRec] = useState<Recommendation | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    type: 'Lifestyle',
    recommendation: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending' as 'Pending' | 'Applied' | 'Dismissed',
  });

  useEffect(() => {
    setRecs(crudService.getRecommendations());
  }, []);

  const handleOpenAddModal = () => {
    setEditingRec(null);
    setFormData({
      patientName: '',
      type: 'Lifestyle',
      recommendation: '',
      priority: 'Medium',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: Recommendation) => {
    setEditingRec(rec);
    setFormData({
      patientName: rec.patientName,
      type: rec.type,
      recommendation: rec.recommendation,
      priority: rec.priority,
      date: rec.date,
      status: rec.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim() || !formData.recommendation.trim()) {
      toast.error('Please enter patient name and recommendation content');
      return;
    }

    if (editingRec) {
      crudService.updateRecommendation(editingRec.id, formData);
      setRecs(crudService.getRecommendations());
      toast.success('Recommendation updated');
    } else {
      crudService.addRecommendation(formData);
      setRecs(crudService.getRecommendations());
      toast.success('Recommendation created and saved');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteRecommendation(deleteId);
    setRecs(crudService.getRecommendations());
    setDeleteId(null);
    toast.success('Recommendation removed');
  };

  const handleToggleStatus = (rec: Recommendation) => {
    const nextStatus = rec.status === 'Applied' ? 'Pending' : 'Applied';
    crudService.updateRecommendation(rec.id, { status: nextStatus });
    setRecs(crudService.getRecommendations());
    toast.success(`Recommendation marked as ${nextStatus}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Clinical Recommendations</h2>
          <p className="text-gray-500 text-sm">{recs.length} recommendations registered</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> New Recommendation
        </button>
      </div>

      <div className="space-y-3">
        {recs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">
            No recommendations created yet. Click "New Recommendation" to add one.
          </div>
        ) : (
          recs.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope size={18} className="text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">Patient: {r.patientName}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                        priorityColors[r.priority] || priorityColors.Medium
                      }`}
                    >
                      {r.priority} Priority
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                        typeColors[r.type] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {r.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                        r.status === 'Applied'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      Status: {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Issued on: {r.date}</p>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">{r.recommendation}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleStatus(r)}
                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Toggle Status"
                  >
                    <Send size={15} />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(r)}
                    className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Edit Recommendation"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(r.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Recommendation"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRec ? 'Edit Recommendation' : 'New Clinical Recommendation'}
        subtitle="Create personalized medical & lifestyle recommendations"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Patient Name</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={e => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="e.g. Robert Garcia"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category / Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Lifestyle">Lifestyle</option>
                <option value="Dietary">Dietary</option>
                <option value="Preventive">Preventive</option>
                <option value="Medication">Medication</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Recommendation Details</label>
            <textarea
              required
              rows={3}
              value={formData.recommendation}
              onChange={e => setFormData({ ...formData, recommendation: e.target.value })}
              placeholder="Enter comprehensive clinical recommendation..."
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
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
              {editingRec ? 'Save Changes' : 'Issue Recommendation'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Recommendation"
        message="Are you sure you want to remove this recommendation? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Recommendations;
