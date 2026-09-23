import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertOctagon, Calendar, Filter, Plus, Trash2, Edit, X } from 'lucide-react';
import Pagination from '@/components/common/Pagination';
import ExportButtons from '@/components/common/ExportButtons';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Modal from '@/components/common/Modal';
import { exportToCSV } from '@/utils/exportCSV';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: 'USER_LOGIN' | 'PASSWORD_CHANGE' | 'EXPORT_DATA' | 'PROFILE_UPDATE' | 'ROLE_CHANGE' | 'API_KEY_GENERATE';
  ipAddress: string;
  status: 'success' | 'failed';
  details: string;
}

const STORAGE_KEY = 'lifestylebio_admin_audit_logs';

const INITIAL_LOGS: AuditLog[] = [
  { id: 'log_001', timestamp: '2026-07-24 14:32:10', userEmail: 'admin@lifestylebio.com', action: 'USER_LOGIN', ipAddress: '192.168.1.50', status: 'success', details: 'Successful administrator portal authentication.' },
  { id: 'log_002', timestamp: '2026-07-24 14:10:05', userEmail: 'jane.smith@gmail.com', action: 'PROFILE_UPDATE', ipAddress: '204.85.12.180', status: 'success', details: 'Updated biometric profile (weight and vital signs).' },
  { id: 'log_003', timestamp: '2026-07-24 13:45:20', userEmail: 'unknown_user@hacker.io', action: 'USER_LOGIN', ipAddress: '45.190.22.41', status: 'failed', details: 'Failed login attempt: invalid credentials.' },
  { id: 'log_004', timestamp: '2026-07-24 12:20:55', userEmail: 'coach.taylor@gmail.com', action: 'EXPORT_DATA', ipAddress: '72.180.95.10', status: 'success', details: 'Exported client list to CSV report format.' },
  { id: 'log_005', timestamp: '2026-07-24 11:05:40', userEmail: 'corporate.wellness@google.com', action: 'ROLE_CHANGE', ipAddress: '172.56.21.90', status: 'success', details: 'Upgraded employee "Bob Johnson" role to Wellness Manager.' },
  { id: 'log_006', timestamp: '2026-07-24 09:30:15', userEmail: 'jane.smith@gmail.com', action: 'PASSWORD_CHANGE', ipAddress: '204.85.12.180', status: 'success', details: 'Password successfully modified.' },
  { id: 'log_007', timestamp: '2026-07-23 18:40:12', userEmail: 'dr.wilson@healthcare.org', action: 'API_KEY_GENERATE', ipAddress: '99.42.110.5', status: 'success', details: 'Generated production clinical health records API key.' },
  { id: 'log_008', timestamp: '2026-07-23 16:15:30', userEmail: 'corporate.wellness@google.com', action: 'EXPORT_DATA', ipAddress: '172.56.21.90', status: 'success', details: 'Exported aggregate employee health index PDF report.' },
];

const ACTIONS: AuditLog['action'][] = ['USER_LOGIN', 'PASSWORD_CHANGE', 'EXPORT_DATA', 'PROFILE_UPDATE', 'ROLE_CHANGE', 'API_KEY_GENERATE'];

const EMPTY_LOG = {
  userEmail: 'admin@lifestylebio.com',
  action: 'USER_LOGIN' as AuditLog['action'],
  ipAddress: '192.168.1.50',
  status: 'success' as 'success' | 'failed',
  details: '',
};

const limit = 5;

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'success' | 'failed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<AuditLog | null>(null);
  const [form, setForm] = useState(EMPTY_LOG);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLogs.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limit);

  const openAddModal = () => {
    setEditingLog(null);
    setForm(EMPTY_LOG);
    setModalOpen(true);
  };

  const openEditModal = (log: AuditLog) => {
    setEditingLog(log);
    setForm({
      userEmail: log.userEmail,
      action: log.action,
      ipAddress: log.ipAddress,
      status: log.status,
      details: log.details,
    });
    setModalOpen(true);
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userEmail.trim() || !form.details.trim()) {
      toast.error('User email and event details are required.');
      return;
    }
    if (editingLog) {
      setLogs(prev => prev.map(l => l.id === editingLog.id ? { ...l, ...form, userEmail: form.userEmail.trim(), details: form.details.trim() } : l));
      toast.success('Audit log entry updated.');
    } else {
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
      const newEntry: AuditLog = {
        id: `log_${Date.now()}`,
        timestamp: now,
        ...form,
        userEmail: form.userEmail.trim(),
        details: form.details.trim(),
      };
      setLogs(prev => [newEntry, ...prev]);
      toast.success('Audit event logged.');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Security Audit Logs</h1>
            <p className="text-gray-500 text-sm mt-1">Review security events, database access logs, and user activity.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ExportButtons onExportCSV={() => exportToCSV(filteredLogs, 'audit_logs')} />
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5 cursor-pointer">
            <Plus size={15} /> Log Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedStatus}
              onChange={e => { setSelectedStatus(e.target.value as 'all' | 'success' | 'failed'); setCurrentPage(1); }}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
            >
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold bg-gray-50/50">
                <th className="py-3.5 px-4 rounded-l-xl">Timestamp</th>
                <th className="py-3.5 px-4">User Email</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Details</th>
                <th className="py-3.5 px-4 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <Calendar size={13} className="text-gray-400" /> {log.timestamp}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{log.userEmail}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 font-mono text-xs">{log.ipAddress}</td>
                  <td className="py-4 px-4">
                    {log.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                        <CheckCircle2 size={13} /> Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-red-500 font-semibold">
                        <AlertOctagon size={13} /> Failed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs truncate" title={log.details}>
                    {log.details}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(log)} title="Edit Log" className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-sky-50 cursor-pointer"><Edit size={14} /></button>
                      <button onClick={() => setDeleteId(log.id)} title="Delete Log" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400 font-medium">
                    No security events match the current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          total={filteredLogs.length}
          limit={limit}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingLog ? 'Edit Audit Log Entry' : 'Record Audit Event'}>
        <form onSubmit={handleSaveLog} className="space-y-3.5">
          <div>
            <label className="label">User Email *</label>
            <input type="email" value={form.userEmail} onChange={e => setForm({ ...form, userEmail: e.target.value })} className="input-field" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Action Type</label>
              <select value={form.action} onChange={e => setForm({ ...form, action: e.target.value as AuditLog['action'] })} className="input-field">
                {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'success' | 'failed' })} className="input-field">
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">IP Address</label>
            <input value={form.ipAddress} onChange={e => setForm({ ...form, ipAddress: e.target.value })} className="input-field" placeholder="192.168.1.50" />
          </div>
          <div>
            <label className="label">Event Details *</label>
            <textarea rows={2} value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className="input-field resize-none" required />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">{editingLog ? 'Save Changes' : 'Log Event'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Audit Log" message="Permanently remove this security audit log entry?" onConfirm={() => { setLogs(prev => prev.filter(l => l.id !== deleteId)); setDeleteId(null); toast.success('Audit log deleted.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default AuditLogs;
