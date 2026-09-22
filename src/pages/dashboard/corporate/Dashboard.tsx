import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, HeartPulse, Activity, Award, Plus, Edit, Trash2 } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { crudService, Employee, WellnessProgram } from '@/services/crudService';
import { toast } from 'sonner';

const wellnessData = [
  { month: 'Feb', participation: 62, score: 68 },
  { month: 'Mar', participation: 68, score: 71 },
  { month: 'Apr', participation: 72, score: 74 },
  { month: 'May', participation: 78, score: 77 },
  { month: 'Jun', participation: 81, score: 80 },
  { month: 'Jul', participation: 85, score: 83 },
];

const CorporateDashboard: React.FC = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [programs, setPrograms] = useState<WellnessProgram[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Quick Modal
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

  const loadData = () => {
    setEmployees(crudService.getEmployees());
    setPrograms(crudService.getWellnessPrograms());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      department: 'Engineering',
      role: 'Team Member',
      healthScore: 85,
      participation: 90,
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      role: emp.role,
      healthScore: emp.healthScore,
      participation: emp.participation,
      status: emp.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in name and email');
      return;
    }
    if (editingEmployee) {
      crudService.updateEmployee(editingEmployee.id, formData);
      toast.success('Employee record updated');
    } else {
      crudService.addEmployee(formData);
      toast.success('New employee added');
    }
    loadData();
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteEmployee(deleteId);
    loadData();
    setDeleteId(null);
    toast.success('Employee removed');
  };

  const avgScore =
    employees.length > 0
      ? Math.round(employees.reduce((acc, e) => acc + e.healthScore, 0) / employees.length)
      : 80;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Corporate Wellness Hub
          </h2>
          <p className="text-gray-500 text-sm">Manage and optimize your organization's health programs.</p>
        </motion.div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Quick Add Employee
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Employees',
            value: employees.length.toString(),
            change: 5,
            changeType: 'increase' as const,
            icon: <Users size={20} />,
            color: 'green' as const,
          },
          {
            title: 'Program Participation',
            value: '88%',
            change: 4,
            changeType: 'increase' as const,
            icon: <Activity size={20} />,
            color: 'blue' as const,
          },
          {
            title: 'Wellness Score',
            value: `${avgScore}/100`,
            change: 3,
            changeType: 'increase' as const,
            icon: <HeartPulse size={20} />,
            color: 'purple' as const,
          },
          {
            title: 'Active Programs',
            value: programs.length.toString(),
            icon: <Award size={20} />,
            color: 'yellow' as const,
          },
        ].map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 font-heading">Wellness Participation & Health Score</h3>
          <HealthChart
            type="area"
            data={wellnessData}
            dataKeys={[
              { key: 'participation', color: '#10B981', label: 'Participation %' },
              { key: 'score', color: '#8B5CF6', label: 'Wellness Score' },
            ]}
            xAxisKey="month"
            height={230}
            showLegend
          />
        </div>

        {/* Dynamic Employees Widget */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 font-heading">Enrolled Staff</h3>
              <button
                onClick={handleOpenAddModal}
                className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {employees.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No staff added.</p>
              ) : (
                employees.slice(0, 4).map(e => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/60 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{e.name}</p>
                      <p className="text-xs text-gray-400 truncate">{e.department} · {e.role}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleOpenEditModal(e)}
                        className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                        title="Edit Employee"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(e.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                        title="Delete Employee"
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
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        subtitle="Manage employee participation and wellness credentials"
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
                placeholder="alex@company.com"
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
                placeholder="Engineering"
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
              {editingEmployee ? 'Save Changes' : 'Save Employee'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Employee"
        message="Are you sure you want to remove this employee?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default CorporateDashboard;
