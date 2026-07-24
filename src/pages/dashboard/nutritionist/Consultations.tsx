import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Phone, MessageSquare, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { getStatusColor } from '@/utils/helpers';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const CONSULTATIONS = [
  { id: '1', client: 'Emma Johnson', type: 'Video Call', date: 'Jul 25, 2026', time: '10:00 AM', duration: '45 min', status: 'scheduled', notes: 'Monthly progress review and meal plan update' },
  { id: '2', client: 'Michael Chen', type: 'In-Person', date: 'Jul 26, 2026', time: '2:00 PM', duration: '60 min', status: 'scheduled', notes: 'Initial assessment and goal setting' },
  { id: '3', client: 'Sarah Williams', type: 'Phone Call', date: 'Jul 24, 2026', time: '11:30 AM', duration: '30 min', status: 'completed', notes: 'Reviewed weekly food diary, all on track' },
  { id: '4', client: 'Lisa Anderson', type: 'Video Call', date: 'Jul 22, 2026', time: '3:00 PM', duration: '45 min', status: 'completed', notes: 'Discussed pre-competition nutrition strategy' },
  { id: '5', client: 'James Rodriguez', type: 'Video Call', date: 'Jul 28, 2026', time: '9:00 AM', duration: '30 min', status: 'pending', notes: 'Follow-up on blood pressure management diet' },
];

const typeIcons = { 'Video Call': Video, 'In-Person': Calendar, 'Phone Call': Phone };

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState(CONSULTATIONS);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const handleCancel = () => {
    if (!cancelId) return;
    setConsultations(p => p.map(c => c.id === cancelId ? { ...c, status: 'cancelled' } : c));
    setCancelId(null);
    toast.success('Consultation cancelled. Client has been notified.');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Consultations</h2>
          <p className="text-gray-500 text-sm">{consultations.filter(c => c.status === 'scheduled').length} upcoming sessions</p>
        </div>
        <button onClick={() => toast.info('Booking feature coming soon!')} className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
          <Plus size={16} /> Schedule Session
        </button>
      </div>

      <div className="space-y-3">
        {consultations.map((c, i) => {
          const TypeIcon = typeIcons[c.type as keyof typeof typeIcons] || Video;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TypeIcon size={20} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{c.client}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {c.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {c.time} · {c.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600">{c.notes}</p>
                </div>
                {c.status === 'scheduled' && (
                  <div className="flex gap-2">
                    <button onClick={() => toast.success('Joining session...')} className="text-sm py-1.5 px-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">Join</button>
                    <button onClick={() => setCancelId(c.id)} className="text-sm py-1.5 px-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <ConfirmDialog isOpen={!!cancelId} title="Cancel Consultation" message="Cancel this consultation? The client will be notified via email." confirmLabel="Yes, Cancel" onConfirm={handleCancel} onCancel={() => setCancelId(null)} />
    </div>
  );
};

export default Consultations;
