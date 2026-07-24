import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Bell, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ALERTS = [
  { id: '1', member: 'Mom', type: 'critical', title: 'Blood Pressure Alert', message: "Mom's blood pressure reading was 148/92 mmHg this morning. This is above the recommended range. Consider scheduling a doctor visit.", time: '2 hours ago', read: false },
  { id: '2', member: 'Dad', type: 'warning', title: 'Medication Reminder', message: "Dad missed his evening diabetes medication. Please ensure he takes it with dinner.", time: '5 hours ago', read: false },
  { id: '3', member: 'Emma', type: 'info', title: 'Wellness Milestone', message: "Emma completed her 7-day fitness streak! She has been consistently hitting 12,000+ steps daily.", time: 'Yesterday', read: true },
  { id: '4', member: 'Mom', type: 'warning', title: 'Low Activity Alert', message: "Mom has had fewer than 3,000 steps in the last 2 days. Encourage some light movement.", time: '2 days ago', read: true },
  { id: '5', member: 'Dad', type: 'success', title: 'Blood Glucose Improved', message: "Dad's fasting blood glucose has improved to 118 mg/dL from 142 mg/dL last month. Great progress!", time: '3 days ago', read: true },
];

const alertConfig = {
  critical: { icon: AlertCircle, color: 'text-red-500 bg-red-50 border-red-100', badge: 'bg-red-500' },
  warning: { icon: AlertTriangle, color: 'text-orange-500 bg-orange-50 border-orange-100', badge: 'bg-orange-400' },
  info: { icon: Bell, color: 'text-sky-500 bg-sky-50 border-sky-100', badge: 'bg-sky-400' },
  success: { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 border-emerald-100', badge: 'bg-emerald-500' },
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(ALERTS);
  const unread = alerts.filter(a => !a.read).length;

  const markRead = (id: string) => setAlerts(p => p.map(a => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => { setAlerts(p => p.map(a => ({ ...a, read: true }))); toast.success('All alerts marked as read.'); };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Health Alerts</h2>
          <p className="text-gray-500 text-sm">{unread} unread alerts</p>
        </div>
        {unread > 0 && <button onClick={markAllRead} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Mark all as read</button>}
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const config = alertConfig[alert.type as keyof typeof alertConfig];
          const Icon = config.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => markRead(alert.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-opacity ${config.color} ${alert.read ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5"><Icon size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{alert.title}</h3>
                    {!alert.read && <span className={`w-2 h-2 rounded-full ${config.badge}`} />}
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">{alert.member}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock size={10} /> {alert.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
