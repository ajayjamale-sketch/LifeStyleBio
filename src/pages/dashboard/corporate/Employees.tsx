import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import ExportButtons from '@/components/common/ExportButtons';
import { toast } from 'sonner';
import { exportToCSV } from '@/utils/exportCSV';
import { crudService, Employee } from '@/services/crudService';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: 'Team Member',
    healthScore: 85,
    participation: 90,
    status: 'Active' as 'Active' | 'Inactive',
  });

  useEffect(() => {
    setEmployees(crudService.getEmployees());
  }, []);

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      department: 'Engineering',
      role: 'Team Member',
      healthScore: 80,
      participation: 85,
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Employee) => {
    setEditingEmployee(item);
    setFormData({
      name: item.name,
      email: item.email,
      department: item.department,
      role: item.role,
      healthScore: item.healthScore,
      participation: item.participation,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please enter name and email');
      return;
    }

    if (editingEmployee) {
      crudService.updateEmployee(editingEmployee.id, formData);
      setEmployees(crudService.getEmployees());
      toast.success('Employee updated');
    } else {
      crudService.addEmployee(formData);
      setEmployees(crudService.getEmployees());
      toast.success('Employee added to wellness platform');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteEmployee(deleteId);
    setEmployees(crudService.getEmployees());
    setDeleteId(null);
    toast.success('Employee removed');
  };

  const PER_PAGE = 7;
  const filtered = employees.filter(
    e =>
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const avgHealthScore =
    employees.length > 0
      ? Math.round(employees.reduce((acc, e) => acc + e.healthScore, 0) / employees.length)
      : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading">Employee Directory</h2>
          <p className="text-gray-500 text-sm">{employees.length} total employees enrolled</p>
        </div>
        <div className="flex gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(filtered, 'employees')} />
          <button
            onClick={handleOpenAddModal}
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <UserPlus size={16} /> Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-emerald-600 font-heading">{employees.length}</div>
          <p className="text-gray-500 text-sm">Total Enrolled</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-sky-600 font-heading">{avgHealthScore}</div>
          <p className="text-gray-500 text-sm">Avg Health Score</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-violet-600 font-heading">
            {employees.filter(e => e.status === 'Active').length}
          </div>
          <p className="text-gray-500 text-sm">Active Members</p>
        </div>
      </div>

      <SearchBar
        placeholder="Search employees by name, email or department..."
        onSearch={v => {
          setSearch(v);
          setPage(1);
        }}
        className="max-w-sm"
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Employee', 'Department', 'Role', 'Health Score', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No employees found.
                </td>
              </tr>
            ) : (
              paginated.map(e => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-gray-900">{e.name}</p>
                    <p className="text-xs text-gray-400">{e.email}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-700">{e.department}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{e.role}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${e.healthScore}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{e.healthScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        e.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(e)}
                        className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(e.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.max(1, Math.ceil(filtered.length / PER_PAGE))}
        onPageChange={setPage}
        total={filtered.length}
        limit={PER_PAGE}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEmployee ? 'Edit Employee Details' : 'Add Employee to Corporate Wellness'}
        subtitle="Manage employee profile and corporate health score"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Mercer"
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
                placeholder="alex.m@company.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Department</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Engineering"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Senior Developer"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Health Score (0-100)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.healthScore}
                onChange={e => setFormData({ ...formData, healthScore: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              {editingEmployee ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Employee"
        message="Are you sure you want to remove this employee from the corporate program?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Employees;
