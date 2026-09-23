import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Bell, CheckCircle, AlertTriangle, Clock, Plus, Edit2, Trash2, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { FAMILY_PROFILES_KEY, DEFAULT_FAMILY_PROFILES, type FamilyMemberProfile } from './SharedProfiles';

export interface FamilyAlertItem {
  id: string;
  member: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const FAMILY_ALERTS_KEY = 'lifestylebio_family_alerts';

export const DEFAULT_FAMILY_ALERTS: FamilyAlertItem[] = [
  { id: '1', member: 'Mom (Eleanor)', type: 'critical', title: 'Blood Pressure Alert', message: "Mom's blood pressure reading was 148/92 mmHg this morning. This is above the recommended range. Consider scheduling a doctor visit.", time: '2 hours ago', read: false },
  { id: '2', member: 'Dad (Arthur)', type: 'warning', title: 'Medication Reminder', message: "Dad missed his evening diabetes medication. Please ensure he takes it with dinner.", time: '5 hours ago', read: false },
  { id: '3', member: 'Emma', type: 'info', title: 'Wellness Milestone', message: "Emma completed her 7-day fitness streak! She has been consistently hitting 12,000+ steps daily.", time: 'Yesterday', read: true },
  { id: '4', member: 'Mom (Eleanor)', type: 'warning', title: 'Low Activity Alert', message: "Mom has had fewer than 3,000 steps in the last 2 days. Encourage some light movement.", time: '2 days ago', read: true },
  { id: '5', member: 'Dad (Arthur)', type: 'success', title: 'Blood Glucose Improved', message: "Dad's fasting blood glucose has improved to 118 mg/dL from 142 mg/dL last month. Great progress!", time: '3 days ago', read: true },
];

const alertConfig = {
  critical: { icon: AlertCircle, color: 'text-red-500 bg-red-50 border-red-100', badge: 'bg-red-500', label: 'Critical' },
  warning: { icon: AlertTriangle, color: 'text-orange-500 bg-orange-50 border-orange-100', badge: 'bg-orange-400', label: 'Warning' },
  info: { icon: Bell, color: 'text-sky-500 bg-sky-50 border-sky-100', badge: 'bg-sky-400', label: 'Info' },
  success: { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 border-emerald-100', badge: 'bg-emerald-500', label: 'Milestone' },
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<FamilyAlertItem[]>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_ALERTS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_ALERTS;
    } catch {
      return DEFAULT_FAMILY_ALERTS;
    }
  });

  const [familyMembers] = useState<FamilyMemberProfile[]>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_PROFILES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_PROFILES;
    } catch {
      return DEFAULT_FAMILY_PROFILES;
    }
  });

  useEffect(() => {
    localStorage.setItem(FAMILY_ALERTS_KEY, JSON.stringify(alerts));
  }, [alerts]);

  const [filterType, setFilterType] = useState<'all' | 'unread' | 'critical'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<FamilyAlertItem | null>(null);
  const [deletingAlert, setDeletingAlert] = useState<FamilyAlertItem | null>(null);

  const [newAlert, setNewAlert] = useState({
    member: familyMembers[0]?.name || 'Mom (Eleanor)',
    type: 'warning' as FamilyAlertItem['type'],
    title: '',
    message: '',
  });

  const unread = alerts.filter(a => !a.read).length;

  const filteredAlerts = alerts.filter(a => {
    if (filterType === 'unread') return !a.read;
    if (filterType === 'critical') return a.type === 'critical' || a.type === 'warning';
    return true;
  });

  const toggleRead = (id: string) => {
    setAlerts(p => p.map(a => (a.id === id ? { ...a, read: !a.read } : a)));
  };

  const markAllRead = () => {
    setAlerts(p => p.map(a => ({ ...a, read: true })));
    toast.success('All alerts marked as read.');
  };

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.title.trim() || !newAlert.message.trim()) {
      toast.error('Please enter both a title and message.');
      return;
    }
    const created: FamilyAlertItem = {
      id: `al_${Date.now()}`,
      member: newAlert.member,
      type: newAlert.type,
      title: newAlert.title.trim(),
      message: newAlert.message.trim(),
      time: 'Just now',
      read: false,
    };
    setAlerts(prev => [created, ...prev]);
    setNewAlert({
      member: familyMembers[0]?.name || 'Mom (Eleanor)',
      type: 'warning',
      title: '',
      message: '',
    });
    setIsAddOpen(false);
    toast.success('Family health alert / reminder created.');
  };

  const handleUpdateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAlert || !editingAlert.title.trim()) return;
    setAlerts(prev => prev.map(a => (a.id === editingAlert.id ? editingAlert : a)));
    setEditingAlert(null);
    toast.success('Alert updated successfully.');
  };

  const handleConfirmDelete = () => {
    if (!deletingAlert) return;
    setAlerts(prev => prev.filter(a => a.id !== deletingAlert.id));
    toast.success('Alert removed.');
    setDeletingAlert(null);
  };

  const clearReadAlerts = () => {
    setAlerts(prev => prev.filter(a => !a.read));
    toast.info('Cleared all read alerts.');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Health Alerts & Reminders</h2>
          <p className="text-gray-500 text-sm">{unread} unread alerts · {alerts.length} total notifications</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
          {alerts.some(a => a.read) && (
            <button
              onClick={clearReadAlerts}
              className="btn-outline text-xs py-2 px-3 text-gray-500 hover:text-red-600"
            >
              Clear Read
            </button>
          )}
          <button
            onClick={() => setIsAddOpen(true)}
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5"
          >
            <Plus size={15} /> Create Alert / Reminder
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: `All (${alerts.length})` },
          { key: 'unread', label: `Unread (${unread})` },
          { key: 'critical', label: `High Priority (${alerts.filter(a => a.type === 'critical' || a.type === 'warning').length})` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === tab.key
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAlerts.map((alert, i) => {
          const config = alertConfig[alert.type as keyof typeof alertConfig] || alertConfig.info;
          const Icon = config.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleRead(alert.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${config.color} ${alert.read ? 'opacity-65' : 'shadow-sm'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5"><Icon size={20} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-sm">{alert.title}</h3>
                      {!alert.read && <span className={`w-2 h-2 rounded-full ${config.badge}`} />}
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/80 font-semibold text-gray-700">
                        {alert.member}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <Clock size={11} /> {alert.time} · {alert.read ? 'Read (click to mark unread)' : 'Unread'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setEditingAlert(alert)}
                    className="p-1.5 rounded-lg bg-white/70 text-gray-500 hover:text-emerald-600 hover:bg-white transition-colors"
                    title="Edit Alert"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeletingAlert(alert)}
                    className="p-1.5 rounded-lg bg-white/70 text-gray-500 hover:text-red-600 hover:bg-white transition-colors"
                    title="Delete Alert"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400">
            No alerts match the selected filter.
          </div>
        )}
      </div>

      {/* Create Family Alert / Reminder Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create Family Health Alert / Reminder"
        size="md"
      >
        <form onSubmit={handleAddAlert} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Family Member</label>
              <select
                value={newAlert.member}
                onChange={e => setNewAlert({ ...newAlert, member: e.target.value })}
                className="input-field"
              >
                {familyMembers.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
                <option value="All Family Members">All Family Members</option>
              </select>
            </div>
            <div>
              <label className="label">Severity / Category</label>
              <select
                value={newAlert.type}
                onChange={e => setNewAlert({ ...newAlert, type: e.target.value as FamilyAlertItem['type'] })}
                className="input-field"
              >
                <option value="critical">Critical Alert</option>
                <option value="warning">Medication / Care Reminder</option>
                <option value="info">General Info</option>
                <option value="success">Health Milestone</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Alert Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Evening Blood Pressure Check"
              value={newAlert.title}
              onChange={e => setNewAlert({ ...newAlert, title: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Details / Instructions *</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the health alert or care reminder..."
              value={newAlert.message}
              onChange={e => setNewAlert({ ...newAlert, message: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsAddOpen(false)} className="btn-outline text-sm">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm">
              Create Alert
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Family Alert Modal */}
      <Modal
        isOpen={!!editingAlert}
        onClose={() => setEditingAlert(null)}
        title="Edit Health Alert"
        size="md"
      >
        {editingAlert && (
          <form onSubmit={handleUpdateAlert} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Family Member</label>
                <input
                  type="text"
                  value={editingAlert.member}
                  onChange={e => setEditingAlert({ ...editingAlert, member: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Severity</label>
                <select
                  value={editingAlert.type}
                  onChange={e => setEditingAlert({ ...editingAlert, type: e.target.value as FamilyAlertItem['type'] })}
                  className="input-field"
                >
                  <option value="critical">Critical Alert</option>
                  <option value="warning">Warning / Reminder</option>
                  <option value="info">General Info</option>
                  <option value="success">Health Milestone</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Alert Title *</label>
              <input
                type="text"
                required
                value={editingAlert.title}
                onChange={e => setEditingAlert({ ...editingAlert, title: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea
                rows={3}
                required
                value={editingAlert.message}
                onChange={e => setEditingAlert({ ...editingAlert, message: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditingAlert(null)} className="btn-outline text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Alert Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingAlert}
        onClose={() => setDeletingAlert(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Health Alert"
        message={`Are you sure you want to delete the alert "${deletingAlert?.title}"?`}
        confirmText="Delete Alert"
        variant="danger"
      />
    </div>
  );
};

export default Alerts;
