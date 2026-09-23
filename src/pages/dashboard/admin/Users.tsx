import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, UserX, UserCheck, Plus, X } from 'lucide-react';
import { authService } from '@/services/authService';
import type { User, UserRole } from '@/types/auth.types';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import CategoryFilter from '@/components/common/CategoryFilter';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import ExportButtons from '@/components/common/ExportButtons';
import { ROLE_LABELS } from '@/constants/roles';
import { formatDate, getRoleBadgeColor } from '@/utils/helpers';
import { exportToCSV } from '@/utils/exportCSV';
import { toast } from 'sonner';

const ROLE_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Individual', value: 'individual_user' },
  { label: 'Nutritionist', value: 'nutritionist' },
  { label: 'Fitness Coach', value: 'fitness_coach' },
  { label: 'Healthcare', value: 'healthcare_professional' },
  { label: 'Corporate', value: 'corporate_wellness_manager' },
  { label: 'Family', value: 'family_member' },
  { label: 'Admin', value: 'admin' },
];

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  password: 'User@123456',
  phone: '',
  role: 'individual_user' as UserRole,
  isActive: true,
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const PER_PAGE = 8;

  useEffect(() => { setUsers(authService.getAllUsers()); }, []);

  const filtered = users.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    const q = search.toLowerCase();
    if (q && !`${u.firstName} ${u.lastName}`.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAddModal = () => {
    setEditingUser(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setForm({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      password: u.password || 'User@123456',
      phone: u.phone || '',
      role: u.role,
      isActive: u.isActive,
    });
    setModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      toast.error('First name, last name, and email are required.');
      return;
    }
    if (authService.isEmailTaken(form.email.trim(), editingUser?.id)) {
      toast.error('This email address is already registered.');
      return;
    }

    if (editingUser) {
      authService.updateUser(editingUser.id, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        isActive: form.isActive,
      });
      toast.success('User updated successfully.');
    } else {
      authService.createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password || 'User@123456',
        phone: form.phone.trim() || '555-0100',
        countryCode: '+1',
        role: form.role,
        isActive: form.isActive,
      });
      toast.success('New user created successfully.');
    }

    setUsers(authService.getAllUsers());
    setModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    const updated = authService.toggleUserStatus(id);
    if (updated) { setUsers(authService.getAllUsers()); toast.success(`User ${updated.isActive ? 'activated' : 'deactivated'}.`); }
  };

  const handleDelete = () => {
    if (!deleteId) return;
    authService.deleteUser(deleteId);
    setUsers(authService.getAllUsers());
    setDeleteId(null);
    toast.success('User account deleted.');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 text-sm">{users.length} total users</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(filtered.map(u => ({ name: `${u.firstName} ${u.lastName}`, email: u.email, role: u.role, status: u.isActive ? 'active' : 'inactive', joined: u.createdAt })), 'users')} />
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5 cursor-pointer">
            <Plus size={15} /> Add User
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar placeholder="Search users..." onSearch={v => { setSearch(v); setPage(1); }} className="sm:w-72" />
        <CategoryFilter categories={ROLE_FILTERS} selected={roleFilter} onChange={v => { setRoleFilter(v); setPage(1); }} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['User', 'Role', 'Status', 'Joined', 'Last Login', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map(u => (
                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-semibold text-gray-900">{u.firstName} {u.lastName}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getRoleBadgeColor(u.role)}`}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${u.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{formatDate(u.createdAt, 'MMM dd, yyyy')}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-xs">{u.lastLogin ? formatDate(u.lastLogin, 'MMM dd') : 'Never'}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(u)} title="Edit User" className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => toggleStatus(u.id)} title={u.isActive ? 'Deactivate' : 'Activate'} className={`p-1.5 rounded-lg transition-colors cursor-pointer ${u.isActive ? 'text-gray-400 hover:text-orange-500 hover:bg-orange-50' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                        {u.isActive ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                      {u.role !== 'admin' && (
                        <button onClick={() => setDeleteId(u.id)} title="Delete User" className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"><Trash2 size={14} /></button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {!paginated.length && <tr><td colSpan={6} className="text-center py-12 text-gray-400">No users found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination currentPage={page} totalPages={Math.ceil(filtered.length / PER_PAGE)} onPageChange={setPage} total={filtered.length} limit={PER_PAGE} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingUser ? 'Edit User Account' : 'Add New User'}>
        <form onSubmit={handleSaveUser} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">First Name *</label>
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="label">Last Name *</label>
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="input-field" required />
            </div>
          </div>
          <div>
            <label className="label">Email Address *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" required />
          </div>
          {!editingUser && (
            <div>
              <label className="label">Initial Password *</label>
              <input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field" required />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Role</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as UserRole })} className="input-field">
                {Object.entries(ROLE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="555-0199" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 font-medium pt-1 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="rounded text-emerald-600 focus:ring-emerald-500" />
            <span>Active Account</span>
          </label>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">{editingUser ? 'Save Changes' : 'Create User'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete User Account" message="Permanently delete this user account and all associated data? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default AdminUsers;
