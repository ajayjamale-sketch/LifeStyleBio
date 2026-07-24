import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import ExportButtons from '@/components/common/ExportButtons';
import { toast } from 'sonner';
import { getStatusColor } from '@/utils/helpers';
import { exportToCSV } from '@/utils/exportCSV';

const MOCK_CLIENTS = [
  { id: '1', name: 'Emma Johnson', email: 'emma@email.com', phone: '+1 555-0101', goal: 'Weight Loss', status: 'active', progress: 72, joinDate: 'Jan 2026', nextSession: 'Jul 25, 2026' },
  { id: '2', name: 'Michael Chen', email: 'mchen@email.com', phone: '+1 555-0102', goal: 'Muscle Gain', status: 'active', progress: 58, joinDate: 'Feb 2026', nextSession: 'Jul 26, 2026' },
  { id: '3', name: 'Sarah Williams', email: 'swilliams@email.com', phone: '+1 555-0103', goal: 'Diabetes Management', status: 'active', progress: 84, joinDate: 'Nov 2025', nextSession: 'Jul 27, 2026' },
  { id: '4', name: 'James Rodriguez', email: 'jrod@email.com', phone: '+1 555-0104', goal: 'Heart Health', status: 'inactive', progress: 40, joinDate: 'Mar 2026', nextSession: 'TBD' },
  { id: '5', name: 'Lisa Anderson', email: 'landerson@email.com', phone: '+1 555-0105', goal: 'Sports Performance', status: 'active', progress: 91, joinDate: 'Dec 2025', nextSession: 'Jul 28, 2026' },
];

const Clients: React.FC = () => {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const PER_PAGE = 5;

  const filtered = clients.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = () => {
    if (!deleteId) return;
    setClients(p => p.filter(c => c.id !== deleteId));
    setDeleteId(null);
    toast.success('Client removed from your list.');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Clients</h2>
          <p className="text-gray-500 text-sm">{clients.length} total clients</p>
        </div>
        <div className="flex gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(filtered, 'clients')} />
          <button onClick={() => toast.info('Client invitation feature coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
            <Plus size={16} /> Add Client
          </button>
        </div>
      </div>

      <SearchBar placeholder="Search clients..." onSearch={v => { setSearch(v); setPage(1); }} className="max-w-sm" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Client', 'Goal', 'Progress', 'Status', 'Next Session', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map(client => (
              <motion.tr key={client.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50">
                <td className="px-4 py-3.5">
                  <div>
                    <p className="font-semibold text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Mail size={10} /> {client.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-600">{client.goal}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${client.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{client.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(client.status)}`}>{client.status}</span>
                </td>
                <td className="px-4 py-3.5 text-gray-500 text-xs">{client.nextSession}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-1">
                    <button onClick={() => toast.info('Edit feature coming soon!')} className="p-1.5 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"><Edit size={14} /></button>
                    <button onClick={() => setDeleteId(client.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={Math.ceil(filtered.length / PER_PAGE)} onPageChange={setPage} total={filtered.length} limit={PER_PAGE} />
      <ConfirmDialog isOpen={!!deleteId} title="Remove Client" message="Remove this client from your list? Their data will be preserved." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Clients;
