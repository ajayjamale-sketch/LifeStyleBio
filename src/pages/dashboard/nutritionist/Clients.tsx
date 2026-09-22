import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Mail, Phone, UserPlus } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import ExportButtons from '@/components/common/ExportButtons';
import { toast } from 'sonner';
import { getStatusColor } from '@/utils/helpers';
import { exportToCSV } from '@/utils/exportCSV';
import { crudService, Client } from '@/services/crudService';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    status: 'active' as 'active' | 'inactive',
    progress: 50,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    nextSession: 'Next Week',
  });

  useEffect(() => {
    setClients(crudService.getClients());
  }, []);

  const handleOpenAddModal = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      goal: 'Weight Loss',
      status: 'active',
      progress: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      nextSession: 'Next Week',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      goal: client.goal,
      status: client.status,
      progress: client.progress,
      joinDate: client.joinDate,
      nextSession: client.nextSession,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please enter name and email');
      return;
    }

    if (editingClient) {
      crudService.updateClient(editingClient.id, formData);
      setClients(crudService.getClients());
      toast.success('Client profile updated');
    } else {
      crudService.addClient(formData);
      setClients(crudService.getClients());
      toast.success('New client added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    crudService.deleteClient(deleteId);
    setClients(crudService.getClients());
    setDeleteId(null);
    toast.success('Client removed');
  };

  const PER_PAGE = 5;
  const filtered = clients.filter(
    c =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.goal.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-heading font-heading">My Clients</h2>
          <p className="text-gray-500 text-sm">{clients.length} total clients enrolled</p>
        </div>
        <div className="flex gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(filtered, 'clients')} />
          <button onClick={handleOpenAddModal} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 shadow-sm">
            <UserPlus size={16} /> Add Client
          </button>
        </div>
      </div>

      <SearchBar
        placeholder="Search by client name, email or goal..."
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
              {['Client', 'Goal', 'Progress', 'Status', 'Next Session', 'Actions'].map(h => (
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
                  No clients found.
                </td>
              </tr>
            ) : (
              paginated.map(client => (
                <motion.tr key={client.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-semibold text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Mail size={11} /> {client.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-700 font-medium">{client.goal}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${client.progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{client.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{client.nextSession}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(client)}
                        className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Edit Client"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(client.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Client"
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
        title={editingClient ? 'Edit Client Details' : 'Add New Client'}
        subtitle="Manage client goals, contact info, and progress tracking"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Client Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Emma Johnson"
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
                placeholder="emma@email.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 555-0101"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary Goal</label>
              <input
                type="text"
                required
                value={formData.goal}
                onChange={e => setFormData({ ...formData, goal: e.target.value })}
                placeholder="e.g. Weight Loss / Muscle Gain"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Progress (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.progress}
                onChange={e => setFormData({ ...formData, progress: Number(e.target.value) })}
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Next Session</label>
              <input
                type="text"
                value={formData.nextSession}
                onChange={e => setFormData({ ...formData, nextSession: e.target.value })}
                placeholder="e.g. Jul 30, 2026"
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
              {editingClient ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Client"
        message="Remove this client from your active list? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Clients;
