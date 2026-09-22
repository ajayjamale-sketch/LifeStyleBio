import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, Stethoscope, AlertCircle, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { crudService, Patient } from '@/services/crudService';
import { toast } from 'sonner';

const appointmentData = [
  { day: 'Mon', appointments: 8, followups: 3 },
  { day: 'Tue', appointments: 12, followups: 5 },
  { day: 'Wed', appointments: 9, followups: 4 },
  { day: 'Thu', appointments: 14, followups: 6 },
  { day: 'Fri', appointments: 11, followups: 4 },
  { day: 'Sat', appointments: 6, followups: 2 },
];

const HealthcareDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State for Quick Add Patient
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: 35,
    gender: 'Male',
    condition: '',
    risk: 'low' as 'high' | 'medium' | 'low',
    lastVisit: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    nextVisit: 'In 2 weeks',
    status: 'active' as 'active' | 'inactive',
    phone: '',
    email: '',
  });

  const loadData = () => {
    setPatients(crudService.getPatients());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingPatient(null);
    setFormData({
      name: '',
      age: 35,
      gender: 'Male',
      condition: '',
      risk: 'low',
      lastVisit: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      nextVisit: 'In 2 weeks',
      status: 'active',
      phone: '',
      email: '',
    });
    setIsAddPatientOpen(true);
  };

  const handleOpenEditModal = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      condition: patient.condition,
      risk: patient.risk,
      lastVisit: patient.lastVisit,
      nextVisit: patient.nextVisit,
      status: patient.status,
      phone: patient.phone || '',
      email: patient.email || '',
    });
    setIsAddPatientOpen(true);
  };

  const handleSubmitPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter patient name');
      return;
    }
    if (editingPatient) {
      crudService.updatePatient(editingPatient.id, formData);
      toast.success('Patient record updated');
    } else {
      crudService.addPatient(formData);
      toast.success('New patient registered');
    }
    loadData();
    setIsAddPatientOpen(false);
  };

  const handleDeletePatient = () => {
    if (!deleteId) return;
    crudService.deletePatient(deleteId);
    loadData();
    setDeleteId(null);
    toast.success('Patient removed');
  };

  const highRiskCount = patients.filter(p => p.risk === 'high').length;
  const recentPatients = patients.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header with Quick Action CRUD Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Dr. {user?.lastName || 'Healthcare Provider'}'s Dashboard
          </h2>
          <p className="text-gray-500 text-sm">Real-time patient management and clinical overview.</p>
        </motion.div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAddModal}
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> Quick Add Patient
          </button>
        </div>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Patients',
            value: patients.length.toString(),
            change: 8,
            changeType: 'increase' as const,
            icon: <Users size={20} />,
            color: 'green' as const,
          },
          {
            title: "Today's Appointments",
            value: '14',
            icon: <Calendar size={20} />,
            color: 'blue' as const,
          },
          {
            title: 'Clinical Records',
            value: (patients.length * 3).toString(),
            change: 12,
            changeType: 'increase' as const,
            icon: <FileText size={20} />,
            color: 'purple' as const,
          },
          {
            title: 'High Risk Patients',
            value: highRiskCount.toString(),
            change: highRiskCount > 0 ? 1 : 0,
            changeType: 'decrease' as const,
            icon: <AlertCircle size={20} />,
            color: 'red' as const,
          },
        ].map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      {/* Chart and Live Patient List */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 font-heading">Weekly Appointment Volume</h3>
          <HealthChart
            type="bar"
            data={appointmentData}
            dataKeys={[
              { key: 'appointments', color: '#38BDF8', label: 'Appointments' },
              { key: 'followups', color: '#10B981', label: 'Follow-ups' },
            ]}
            xAxisKey="day"
            height={230}
            showLegend
          />
        </div>

        {/* Live Patients CRUD Widget */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-heading">Active Patients</h3>
              <button
                onClick={handleOpenAddModal}
                className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {recentPatients.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No patients found.</p>
              ) : (
                recentPatients.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          p.risk === 'high'
                            ? 'bg-red-500'
                            : p.risk === 'medium'
                            ? 'bg-amber-400'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-400 truncate">{p.condition}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                        title="Edit Patient"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                        title="Delete Patient"
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

      {/* Modal */}
      <Modal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
        subtitle="Manage patient details directly from your dashboard"
      >
        <form onSubmit={handleSubmitPatient} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Robert Garcia"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Age</label>
              <input
                type="number"
                required
                min={1}
                max={120}
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary Condition</label>
            <input
              type="text"
              required
              value={formData.condition}
              onChange={e => setFormData({ ...formData, condition: e.target.value })}
              placeholder="e.g. Hypertension"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Risk Level</label>
            <select
              value={formData.risk}
              onChange={e => setFormData({ ...formData, risk: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddPatientOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm px-5 py-2 rounded-xl shadow-sm">
              {editingPatient ? 'Save Changes' : 'Save Patient'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Patient"
        message="Are you sure you want to remove this patient?"
        onConfirm={handleDeletePatient}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default HealthcareDashboard;
