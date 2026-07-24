import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Phone, AlertCircle } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import { toast } from 'sonner';

const PATIENTS = [
  { id: '1', name: 'Robert Garcia', age: 62, gender: 'Male', condition: 'Hypertension, Type 2 Diabetes', lastVisit: 'Jul 24, 2026', nextVisit: 'Aug 7, 2026', risk: 'high', status: 'active' },
  { id: '2', name: 'Anna Kim', age: 48, gender: 'Female', condition: 'Type 2 Diabetes', lastVisit: 'Jul 23, 2026', nextVisit: 'Aug 6, 2026', risk: 'medium', status: 'active' },
  { id: '3', name: 'David Park', age: 35, gender: 'Male', condition: 'Routine Checkup', lastVisit: 'Jul 22, 2026', nextVisit: 'Jan 2027', risk: 'low', status: 'active' },
  { id: '4', name: 'Maria Torres', age: 71, gender: 'Female', condition: 'Cardiac Arrhythmia, Hypertension', lastVisit: 'Jul 21, 2026', nextVisit: 'Jul 28, 2026', risk: 'high', status: 'active' },
  { id: '5', name: 'James Wilson', age: 55, gender: 'Male', condition: 'Chronic Back Pain, Obesity', lastVisit: 'Jul 18, 2026', nextVisit: 'Aug 1, 2026', risk: 'medium', status: 'active' },
];

const riskColors = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-emerald-100 text-emerald-700' };

const Patients: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const filtered = PATIENTS.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Patients</h2>
          <p className="text-gray-500 text-sm">{PATIENTS.length} patients under care</p>
        </div>
      </div>
      <SearchBar placeholder="Search patients..." onSearch={v => { setSearch(v); setPage(1); }} className="max-w-sm" />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Patient', 'Age', 'Condition', 'Risk', 'Last Visit', 'Next Visit', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5"><p className="font-semibold text-gray-900">{p.name}</p><p className="text-xs text-gray-400">{p.gender}</p></td>
                  <td className="px-4 py-3.5 text-gray-600">{p.age}</td>
                  <td className="px-4 py-3.5 text-gray-600 max-w-xs"><span className="line-clamp-1">{p.condition}</span></td>
                  <td className="px-4 py-3.5"><span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${riskColors[p.risk as keyof typeof riskColors]}`}>{p.risk}</span></td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{p.lastVisit}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{p.nextVisit}</td>
                  <td className="px-4 py-3.5"><div className="flex gap-1">
                    <button onClick={() => toast.info('Patient records opening...')} className="p-1.5 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Eye size={14} /></button>
                    <button onClick={() => toast.info('Calling patient...')} className="p-1.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg"><Phone size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination currentPage={page} totalPages={Math.ceil(filtered.length / PER_PAGE)} onPageChange={setPage} total={filtered.length} limit={PER_PAGE} />
    </div>
  );
};

export default Patients;
