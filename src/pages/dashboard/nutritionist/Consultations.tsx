import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Phone, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStatusColor } from '@/utils/helpers';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import { crudService, Consultation } from '@/services/crudService';

const typeIcons: Record<string, any> = { 'Video Call': Video, 'In-Person': Calendar, 'Phone Call': Phone };

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [cancelId, setCancelId] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Consultation | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    doctorOrCoach: 'Nutritionist',
    type: 'Video Call',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    status: 'Scheduled' as 'Scheduled' | 'Completed' | 'Cancelled',
    notes: '',
  });

  useEffect(() => {
    setConsultations(crudService.getConsultations());
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      patientName: '',
      doctorOrCoach: 'Nutritionist',
      type: 'Video Call',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: '10:00 AM',
      status: 'Scheduled',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Consultation) => {
    setEditingItem(item);
    setFormData({
      patientName: item.patientName,
      doctorOrCoach: item.doctorOrCoach,
      type: item.type,
      date: item.date,
      time: item.time,
      status: item.status,
      notes: item.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      toast.error('Please enter client/patient name');
      return;
    }

    if (editingItem) {
      crudService.updateConsultation(editingItem.id, formData);
      setConsultations(crudService.getConsultations());
      toast.success('Consultation updated');
    } else {
      crudService.addConsultation(formData);
      setConsultations(crudService.getConsultations());
      toast.success('Consultation session scheduled');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!cancelId) return;
    crudService.deleteConsultation(cancelId);
    setConsultations(crudService.getConsultations());
    setCancelId(null);
    toast.success('Consultation session removed');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Consultations</h2>
          <p className="text-gray-500 text-sm">
            {consultations.filter(c => c.status === 'Scheduled').length} upcoming sessions scheduled
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Schedule Session
        </button>
      </div>

      <div className="space-y-3">
        {consultations.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400">
            No consultations scheduled yet. Click "Schedule Session" to add one.
          </div>
        ) : (
          consultations.map((c, i) => {
            const TypeIcon = typeIcons[c.type] || Video;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TypeIcon size={20} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{c.patientName}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {c.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {c.time}
                      </span>
                    </div>
                    {c.notes && <p className="text-sm text-gray-600 leading-relaxed font-sans">{c.notes}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(c)}
                      className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      title="Edit Consultation"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => setCancelId(c.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete / Cancel Consultation"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Session Details' : 'Schedule Consultation Session'}
        subtitle="Book or update a client consultation"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Client / Patient Name</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={e => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="e.g. Emma Johnson"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Consultation Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Video Call">Video Call</option>
                <option value="In-Person">In-Person</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Date</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g. Jul 28, 2026"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Time</label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g. 10:00 AM"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Session Agenda / Notes</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Monthly progress review and macro adjustments"
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
              {editingItem ? 'Save Changes' : 'Schedule Session'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!cancelId}
        title="Remove Consultation"
        message="Are you sure you want to remove this consultation session?"
        confirmLabel="Remove"
        onConfirm={handleDelete}
        onCancel={() => setCancelId(null)}
      />
    </div>
  );
};

export default Consultations;
