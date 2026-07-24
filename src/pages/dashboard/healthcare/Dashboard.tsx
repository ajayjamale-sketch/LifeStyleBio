import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, Stethoscope, Activity, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';

const appointmentData = [
  { day: 'Mon', appointments: 8, followups: 3 }, { day: 'Tue', appointments: 12, followups: 5 },
  { day: 'Wed', appointments: 9, followups: 4 }, { day: 'Thu', appointments: 14, followups: 6 },
  { day: 'Fri', appointments: 11, followups: 4 }, { day: 'Sat', appointments: 6, followups: 2 },
];

const recentPatients = [
  { name: 'Robert Garcia', condition: 'Hypertension', lastVisit: 'Today', risk: 'high' },
  { name: 'Anna Kim', condition: 'Type 2 Diabetes', lastVisit: 'Yesterday', risk: 'medium' },
  { name: 'David Park', condition: 'Routine Checkup', lastVisit: '2 days ago', risk: 'low' },
  { name: 'Maria Torres', condition: 'Cardiac Monitoring', lastVisit: '3 days ago', risk: 'high' },
];

const HealthcareDashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-gray-900">Dr. {user?.lastName}'s Dashboard</h2>
        <p className="text-gray-500 text-sm">Patient management and clinical overview.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Patients', value: '247', change: 8, changeType: 'increase' as const, icon: <Users size={20} />, color: 'green' as const },
          { title: "Today's Appointments", value: '14', icon: <Calendar size={20} />, color: 'blue' as const },
          { title: 'Records Updated', value: '38', change: 12, changeType: 'increase' as const, icon: <FileText size={20} />, color: 'purple' as const },
          { title: 'High Risk Patients', value: '12', change: 3, changeType: 'decrease' as const, icon: <AlertCircle size={20} />, color: 'red' as const },
        ].map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Appointment Volume</h3>
          <HealthChart type="bar" data={appointmentData} dataKeys={[
            { key: 'appointments', color: '#38BDF8', label: 'Appointments' },
            { key: 'followups', color: '#10B981', label: 'Follow-ups' },
          ]} xAxisKey="day" height={220} showLegend />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {recentPatients.map(p => (
              <div key={p.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${p.risk === 'high' ? 'bg-red-500' : p.risk === 'medium' ? 'bg-yellow-400' : 'bg-emerald-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.condition} · {p.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareDashboard;
