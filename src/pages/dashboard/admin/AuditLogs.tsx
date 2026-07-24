import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertOctagon, Calendar, Filter } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: 'USER_LOGIN' | 'PASSWORD_CHANGE' | 'EXPORT_DATA' | 'PROFILE_UPDATE' | 'ROLE_CHANGE' | 'API_KEY_GENERATE';
  ipAddress: string;
  status: 'success' | 'failed';
  details: string;
}

const mockLogs: AuditLog[] = [
  { id: 'log_001', timestamp: '2026-07-24 14:32:10', userEmail: 'admin@lifestylebio.com', action: 'USER_LOGIN', ipAddress: '192.168.1.50', status: 'success', details: 'Successful administrator portal authentication.' },
  { id: 'log_002', timestamp: '2026-07-24 14:10:05', userEmail: 'jane.smith@gmail.com', action: 'PROFILE_UPDATE', ipAddress: '204.85.12.180', status: 'success', details: 'Updated biometric profile (weight and vital signs).' },
  { id: 'log_003', timestamp: '2026-07-24 13:45:20', userEmail: 'unknown_user@hacker.io', action: 'USER_LOGIN', ipAddress: '45.190.22.41', status: 'failed', details: 'Failed login attempt: invalid credentials.' },
  { id: 'log_004', timestamp: '2026-07-24 12:20:55', userEmail: 'coach.taylor@gmail.com', action: 'EXPORT_DATA', ipAddress: '72.180.95.10', status: 'success', details: 'Exported client list to CSV report format.' },
  { id: 'log_005', timestamp: '2026-07-24 11:05:40', userEmail: 'corporate.wellness@google.com', action: 'ROLE_CHANGE', ipAddress: '172.56.21.90', status: 'success', details: 'Upgraded employee "Bob Johnson" role to Wellness Manager.' },
  { id: 'log_006', timestamp: '2026-07-24 09:30:15', userEmail: 'jane.smith@gmail.com', action: 'PASSWORD_CHANGE', ipAddress: '204.85.12.180', status: 'success', details: 'Password successfully modified.' },
  { id: 'log_007', timestamp: '2026-07-23 18:40:12', userEmail: 'dr.wilson@healthcare.org', action: 'API_KEY_GENERATE', ipAddress: '99.42.110.5', status: 'success', details: 'Generated production clinical health records API key.' },
  { id: 'log_008', timestamp: '2026-07-23 16:15:30', userEmail: 'corporate.wellness@google.com', action: 'EXPORT_DATA', ipAddress: '172.56.21.90', status: 'success', details: 'Exported aggregate employee health index PDF report.' },
];

const limit = 5;

const AuditLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'success' | 'failed'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLogs.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Security Audit Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Review security events, database access logs, and user activity.</p>
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
              onChange={e => { setSelectedStatus(e.target.value as any); setCurrentPage(1); }}
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
                <th className="py-3.5 px-4 rounded-r-xl">Details</th>
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
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400 font-medium">
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
    </div>
  );
};

export default AuditLogs;
