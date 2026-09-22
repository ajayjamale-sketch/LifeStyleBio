import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Phone, Edit, Trash2, UserPlus } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import ExportButtons from '@/components/common/ExportButtons';
import { toast } from 'sonner';
import { exportToCSV } from '@/utils/exportCSV';
import { crudService, Patient } from '@/services/crudService';

const riskColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: 30,
    gender: 'Male',
    condition: '',
    risk: 'low' as 'high' | 'medium' | 'low',
    lastVisit: new Date().toISOString().split('T')[0],
    nextVisit: 'In 2 weeks',
    status: 'active' as 'active' | 'inactive',
    phone: '',
    email: '',
  });

  useEffect(() => {
    setPatients(crudService.getPatients());
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
      nextVisit: 'In 3 weeks',
      status: 'active',
      phone: '',
      email: '',
    });
    setIsModalOpen(true);
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
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter patient name');
      return;
    }

    if (editingPatient) {
      const updated = crudService.updatePatient(editingPatient.id, formData);
      if (updated) {
        setPatients(crudService.getPatients());
        toast.success('Patient record updated successfully');
      }
    } else {
      crudService.addPatient(formData);
      setPatients(crudService.getPatients());
      toast.success('Patient added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deletePatient(deleteId);
    setPatients(crudService.getPatients());
    setDeleteId(null);
    toast.success('Patient removed successfully');
  };

  const PER_PAGE = 5;
  const filtered = patients.filter(
    p =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">My Patients</h2>
          <p className="text-gray-500 text-sm">{patients.length} total patients under active care</p>
        </div>
        <div className="flex gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(filtered, 'patients')} />
          <button
            onClick={handleOpenAddModal}
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <UserPlus size={16} /> Add Patient
          </button>
        </div>
      </div>

      <SearchBar
        placeholder="Search by patient name or condition..."
        onSearch={v => {
          setSearch(v);
          setPage(1);
        }}
        className="max-w-sm"
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                {['Patient', 'Age / Gender', 'Condition', 'Risk Level', 'Last Visit', 'Next Visit', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No patients found matching your search.
                  </td>
                </tr>
              ) : (
                paginated.map(p => (
                  <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-gray-900">{p.name}</p>
                      {p.email && <p className="text-xs text-gray-400">{p.email}</p>}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">
                      {p.age} yrs · {p.gender}
                    </td>
                    <td className="px-4 py-3.5 text-gray-700 max-w-xs">
                      <span className="line-clamp-1 font-medium">{p.condition}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${riskColors[p.risk]}`}>
                        {p.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs">{p.lastVisit}</td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs">{p.nextVisit}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toast.info(`Viewing record for ${p.name}`)}
                          className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="View Records"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit Patient"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Patient"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.max(1, Math.ceil(filtered.length / PER_PAGE))}
        onPageChange={setPage}
        total={filtered.length}
        limit={PER_PAGE}
      />

      {/* Add / Edit Patient Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPatient ? 'Edit Patient Record' : 'Add New Patient'}
        subtitle="Enter patient clinical information and risk classification"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="e.g. Hypertension, Type 2 Diabetes"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Risk Classification</label>
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
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Next Visit Schedule</label>
              <input
                type="text"
                value={formData.nextVisit}
                onChange={e => setFormData({ ...formData, nextVisit: e.target.value })}
                placeholder="e.g. Aug 15, 2026"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 555-0199"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="patient@email.com"
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
            <button
              type="submit"
              className="btn-primary text-sm px-5 py-2 rounded-xl shadow-sm"
            >
              {editingPatient ? 'Save Changes' : 'Add Patient'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Patient Record"
        message="Are you sure you want to delete this patient record? This operation cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Patients;
