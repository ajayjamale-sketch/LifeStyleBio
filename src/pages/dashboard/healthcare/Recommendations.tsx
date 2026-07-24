import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Stethoscope, Edit, Trash2, Send } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const RECOMMENDATIONS = [
  { id: '1', patient: 'Robert Garcia', type: 'Lifestyle', title: 'Increase Physical Activity', description: 'Start with 20-minute walks, 5 days per week. Target 150 minutes of moderate activity weekly.', priority: 'high', date: 'Jul 24, 2026', sent: true },
  { id: '2', patient: 'Anna Kim', type: 'Dietary', title: 'Carbohydrate Management Plan', description: 'Limit refined carbs to <130g/day. Increase fiber intake with vegetables and legumes.', priority: 'high', date: 'Jul 23, 2026', sent: true },
  { id: '3', patient: 'David Park', type: 'Preventive', title: 'Annual Screening Schedule', description: 'Schedule colonoscopy at 45, annual blood panel, and cardiac risk assessment.', priority: 'low', date: 'Jul 22, 2026', sent: false },
  { id: '4', patient: 'Maria Torres', type: 'Medication', title: 'Beta-Blocker Adjustment', description: 'Increase metoprolol dose to 50mg twice daily. Monitor heart rate and blood pressure weekly.', priority: 'high', date: 'Jul 21, 2026', sent: true },
];

const priorityColors = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-emerald-100 text-emerald-700' };
const typeColors: Record<string, string> = { Lifestyle: 'bg-sky-100 text-sky-700', Dietary: 'bg-orange-100 text-orange-700', Preventive: 'bg-violet-100 text-violet-700', Medication: 'bg-red-100 text-red-700' };

const Recommendations: React.FC = () => {
  const [recs, setRecs] = useState(RECOMMENDATIONS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Clinical Recommendations</h2>
          <p className="text-gray-500 text-sm">{recs.length} recommendations issued</p>
        </div>
        <button onClick={() => toast.info('Recommendation builder coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> New Recommendation
        </button>
      </div>

      <div className="space-y-3">
        {recs.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Stethoscope size={18} className="text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{r.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[r.priority as keyof typeof priorityColors]}`}>{r.priority} priority</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[r.type]}`}>{r.type}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">For: {r.patient} · {r.date}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{r.description}</p>
              </div>
              <div className="flex gap-1.5">
                {!r.sent && <button onClick={() => { setRecs(p => p.map(rec => rec.id === r.id ? {...rec, sent: true} : rec)); toast.success('Recommendation sent to patient!'); }} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg"><Send size={15} /></button>}
                <button onClick={() => toast.info('Edit coming soon!')} className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Edit size={15} /></button>
                <button onClick={() => setDeleteId(r.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
            {r.sent && <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-emerald-600 flex items-center gap-1.5"><Send size={11} /> Sent to patient portal</div>}
          </motion.div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteId} title="Delete Recommendation" message="Remove this clinical recommendation? This action cannot be undone." onConfirm={() => { setRecs(p => p.filter(r => r.id !== deleteId)); setDeleteId(null); toast.success('Deleted.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Recommendations;
