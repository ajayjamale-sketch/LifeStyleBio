import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Edit, Trash2, UserX, UserCheck, Plus } from 'lucide-react';
import { authService } from '@/services/authService';
import type { User } from '@/types/auth.types';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import CategoryFilter from '@/components/common/CategoryFilter';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import ExportButtons from '@/components/common/ExportButtons';
import { ROLE_LABELS } from '@/constants/roles';
import { formatDate, getRoleBadgeColor, getStatusColor } from '@/utils/helpers';
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

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const PER_PAGE = 8;

  useEffect(() => { setUsers(authService.getAllUsers()); }, []);

  const filtered = users.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search && !u.firstName.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
        <ExportButtons onExportCSV={() => exportToCSV(filtered.map(u => ({ name: `${u.firstName} ${u.lastName}`, email: u.email, role: u.role, status: u.isActive ? 'active' : 'inactive', joined: u.createdAt })), 'users')} />
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
                      <button onClick={() => toggleStatus(u.id)} title={u.isActive ? 'Deactivate' : 'Activate'} className={`p-1.5 rounded-lg transition-colors ${u.isActive ? 'text-gray-400 hover:text-orange-500 hover:bg-orange-50' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                        {u.isActive ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                      {u.role !== 'admin' && (
                        <button onClick={() => setDeleteId(u.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
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
      <ConfirmDialog isOpen={!!deleteId} title="Delete User Account" message="Permanently delete this user account and all associated data? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default AdminUsers;
