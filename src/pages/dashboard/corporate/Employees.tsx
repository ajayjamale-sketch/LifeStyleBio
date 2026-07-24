import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, BarChart2, Download } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import { toast } from 'sonner';

const EMPLOYEES = [
  { id: '1', name: 'John Smith', dept: 'Engineering', enrolled: true, wellnessScore: 82, programsActive: 3, lastActivity: 'Today' },
  { id: '2', name: 'Lisa Johnson', dept: 'Marketing', enrolled: true, wellnessScore: 91, programsActive: 4, lastActivity: 'Yesterday' },
  { id: '3', name: 'Mark Davis', dept: 'Sales', enrolled: false, wellnessScore: 0, programsActive: 0, lastActivity: 'Never' },
  { id: '4', name: 'Sarah Brown', dept: 'HR', enrolled: true, wellnessScore: 76, programsActive: 2, lastActivity: '2 days ago' },
  { id: '5', name: 'Tom Wilson', dept: 'Finance', enrolled: true, wellnessScore: 65, programsActive: 1, lastActivity: '3 days ago' },
  { id: '6', name: 'Emma Taylor', dept: 'Engineering', enrolled: true, wellnessScore: 88, programsActive: 3, lastActivity: 'Today' },
  { id: '7', name: 'Chris Martinez', dept: 'Operations', enrolled: false, wellnessScore: 0, programsActive: 0, lastActivity: 'Never' },
];

const Employees: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 7;
  const filtered = EMPLOYEES.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Employee Wellness</h2>
          <p className="text-gray-500 text-sm">{EMPLOYEES.filter(e => e.enrolled).length}/{EMPLOYEES.length} enrolled in programs</p>
        </div>
        <button onClick={() => toast.success('Invitations sent to unenrolled employees!')} className="btn-primary text-sm py-2.5 px-4">Send Invitations</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Enrolled', value: EMPLOYEES.filter(e => e.enrolled).length, color: 'text-emerald-600' },
          { label: 'Avg Wellness Score', value: Math.round(EMPLOYEES.filter(e => e.enrolled).reduce((acc, e) => acc + e.wellnessScore, 0) / EMPLOYEES.filter(e => e.enrolled).length), color: 'text-sky-600' },
          { label: 'Not Enrolled', value: EMPLOYEES.filter(e => !e.enrolled).length, color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <div className={`text-3xl font-bold font-heading ${s.color}`}>{s.value}</div>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <SearchBar placeholder="Search employees..." onSearch={v => { setSearch(v); setPage(1); }} className="max-w-sm" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['Name', 'Department', 'Enrolled', 'Wellness Score', 'Active Programs', 'Last Activity'].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.slice((page-1)*PER_PAGE, page*PER_PAGE).map(e => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 font-semibold text-gray-900">{e.name}</td>
                <td className="px-4 py-3.5 text-gray-500">{e.dept}</td>
                <td className="px-4 py-3.5"><span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${e.enrolled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{e.enrolled ? 'Enrolled' : 'Not enrolled'}</span></td>
                <td className="px-4 py-3.5">
                  {e.enrolled ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${e.wellnessScore}%` }} />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{e.wellnessScore}</span>
                    </div>
                  ) : <span className="text-xs text-gray-400">N/A</span>}
                </td>
                <td className="px-4 py-3.5 text-gray-600">{e.programsActive}</td>
                <td className="px-4 py-3.5 text-gray-400 text-xs">{e.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} totalPages={Math.ceil(filtered.length / PER_PAGE)} onPageChange={setPage} total={filtered.length} limit={PER_PAGE} />
    </div>
  );
};

export default Employees;
