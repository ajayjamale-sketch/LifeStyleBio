import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, Activity, Heart, AlertCircle, CheckCircle, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import StatsCard from '@/components/dashboard/cards/StatsCard';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { useAuth } from '@/hooks/useAuth';
import { Modal } from '@/components/common/Modal';
import { FAMILY_PROFILES_KEY, DEFAULT_FAMILY_PROFILES, type FamilyMemberProfile } from './SharedProfiles';
import { FAMILY_ALERTS_KEY, DEFAULT_FAMILY_ALERTS, type FamilyAlertItem } from './Alerts';

interface FamilyCareTask {
  id: string;
  member: string;
  task: string;
  dueDate: string;
  completed: boolean;
}

const FAMILY_TASKS_KEY = 'lifestylebio_family_care_tasks';

const DEFAULT_CARE_TASKS: FamilyCareTask[] = [
  { id: 'ft_1', member: 'Mom (Eleanor)', task: 'Morning blood pressure log & low-sodium breakfast', dueDate: 'Today, 9:00 AM', completed: true },
  { id: 'ft_2', member: 'Dad (Arthur)', task: 'Refill Metformin prescription at Walgreens', dueDate: 'Today, 5:00 PM', completed: false },
  { id: 'ft_3', member: 'Mom (Eleanor)', task: 'Quarterly Cardiology Telehealth Checkup', dueDate: 'Tomorrow, 11:00 AM', completed: false },
];

const weeklyActivity = [
  { day: 'Mon', mom: 4200, dad: 6800, sister: 12400 },
  { day: 'Tue', mom: 5100, dad: 7200, sister: 11800 },
  { day: 'Wed', mom: 3800, dad: 8100, sister: 13200 },
  { day: 'Thu', mom: 6200, dad: 7500, sister: 10900 },
  { day: 'Fri', mom: 5600, dad: 6900, sister: 11500 },
];

const statusColors = {
  excellent: 'text-emerald-600 bg-emerald-50',
  good: 'text-sky-600 bg-sky-50',
  attention: 'text-orange-600 bg-orange-50',
  critical: 'text-red-600 bg-red-50',
};
const statusIcons = {
  excellent: CheckCircle,
  good: CheckCircle,
  attention: AlertCircle,
  critical: AlertCircle,
};

const getStatusFromScore = (score: number): keyof typeof statusColors => {
  if (score >= 88) return 'excellent';
  if (score >= 78) return 'good';
  if (score >= 65) return 'attention';
  return 'critical';
};

const FamilyDashboard: React.FC = () => {
  const { user } = useAuth();

  const [profiles, setProfiles] = useState<FamilyMemberProfile[]>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_PROFILES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_PROFILES;
    } catch {
      return DEFAULT_FAMILY_PROFILES;
    }
  });

  const [alerts] = useState<FamilyAlertItem[]>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_ALERTS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_ALERTS;
    } catch {
      return DEFAULT_FAMILY_ALERTS;
    }
  });

  const [careTasks, setCareTasks] = useState<FamilyCareTask[]>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_TASKS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CARE_TASKS;
    } catch {
      return DEFAULT_CARE_TASKS;
    }
  });

  useEffect(() => {
    localStorage.setItem(FAMILY_PROFILES_KEY, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(FAMILY_TASKS_KEY, JSON.stringify(careTasks));
  }, [careTasks]);

  const [editingMember, setEditingMember] = useState<FamilyMemberProfile | null>(null);
  const [newTask, setNewTask] = useState({ member: profiles[0]?.name || 'Mom (Eleanor)', task: '', dueDate: 'Today' });
  const [editingTask, setEditingTask] = useState<FamilyCareTask | null>(null);

  const unreadAlerts = alerts.filter(a => !a.read).length;
  const selfCard: FamilyMemberProfile = {
    id: 'self',
    name: `You (${user?.firstName || 'Admin'})`,
    relation: 'Family Admin',
    age: 32,
    healthScore: 87,
    lastChecked: 'Today',
    conditions: [],
    notes: 'All vitals optimal · Active wearable sync',
    avatar: '',
  };

  const allCards = [...profiles, selfCard];
  const avgScore = (allCards.reduce((sum, m) => sum + m.healthScore, 0) / Math.max(1, allCards.length)).toFixed(1);
  const checksToday = profiles.filter(p => p.lastChecked.toLowerCase().includes('today') || p.lastChecked.toLowerCase().includes('just now')).length + 1;

  const handleSaveMemberVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    setProfiles(prev =>
      prev.map(p =>
        p.id === editingMember.id
          ? {
              ...editingMember,
              healthScore: Math.min(100, Math.max(1, Number(editingMember.healthScore) || 80)),
              lastChecked: 'Just now',
            }
          : p
      )
    );
    toast.success(`Updated vitals & status for ${editingMember.name}.`);
    setEditingMember(null);
  };

  const handleAddCareTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.task.trim()) return;
    const created: FamilyCareTask = {
      id: `ft_${Date.now()}`,
      member: newTask.member,
      task: newTask.task.trim(),
      dueDate: newTask.dueDate || 'Today',
      completed: false,
    };
    setCareTasks(prev => [created, ...prev]);
    setNewTask({ member: profiles[0]?.name || 'Mom (Eleanor)', task: '', dueDate: 'Today' });
    toast.success('Family care task added.');
  };

  const handleToggleTask = (id: string) => {
    setCareTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleSaveTaskEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !editingTask.task.trim()) return;
    setCareTasks(prev => prev.map(t => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
    toast.success('Care task updated.');
  };

  const handleDeleteTask = (id: string) => {
    setCareTasks(prev => prev.filter(t => t.id !== id));
    toast.info('Care task deleted.');
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Family Health Overview</h2>
          <p className="text-gray-500 text-sm">Monitor your family's health, vitals, and shared care schedule in real time.</p>
        </div>
        {profiles.length > 0 && (
          <button
            onClick={() => setEditingMember(profiles[0])}
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto"
          >
            <Activity size={16} /> Log Vitals Check-In
          </button>
        )}
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Family Members', value: String(allCards.length), icon: <Users size={20} />, color: 'green' as const },
          { title: 'Active Alerts', value: String(unreadAlerts), icon: <Bell size={20} />, color: 'yellow' as const },
          { title: 'Health Checks Today', value: String(checksToday), change: 0, changeType: 'neutral' as const, icon: <Activity size={20} />, color: 'blue' as const },
          { title: 'Avg Family Score', value: avgScore, icon: <Heart size={20} />, color: 'purple' as const },
        ].map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      {/* Family Health Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {allCards.map((member, i) => {
          const statusKey = getStatusFromScore(member.healthScore);
          const StatusIcon = statusIcons[statusKey];
          const isSelf = member.id === 'self';
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl ${statusColors[statusKey]}`}>
                    <StatusIcon size={15} />
                    <span className="text-xs font-bold">{member.name} · {member.age}y</span>
                  </div>
                  {!isSelf && (
                    <button
                      onClick={() => setEditingMember(member)}
                      className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Update Vitals & Score"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 font-heading mb-1">{member.healthScore}</div>
                <p className="text-xs text-gray-500 mb-3">Health Score · Checked {member.lastChecked}</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500"
                    style={{ width: `${member.healthScore}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                {member.notes || (member.conditions.length > 0 ? member.conditions.join(', ') : 'All vitals normal')}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-5">
        {/* Family Daily Steps Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Family Daily Steps (Week)</h3>
          <HealthChart
            type="area"
            data={weeklyActivity}
            dataKeys={[
              { key: 'mom', color: '#10B981', label: 'Mom' },
              { key: 'dad', color: '#38BDF8', label: 'Dad' },
              { key: 'sister', color: '#8B5CF6', label: 'Emma' },
            ]}
            xAxisKey="day"
            height={230}
            showLegend
          />
        </div>

        {/* Shared Family Care Tasks CRUD */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Family Care Schedule & Tasks</h3>
            <span className="text-xs font-semibold text-emerald-600">
              {careTasks.filter(t => t.completed).length}/{careTasks.length} Done
            </span>
          </div>

          <form onSubmit={handleAddCareTask} className="flex flex-col sm:flex-row gap-2 mb-4">
            <select
              value={newTask.member}
              onChange={e => setNewTask({ ...newTask, member: e.target.value })}
              className="text-xs border border-gray-200 rounded-xl px-2.5 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
              <option value="Family">All Family</option>
            </select>
            <div className="flex gap-2 flex-1">
              <input
                type="text"
                placeholder="Add care task or appointment..."
                value={newTask.task}
                onChange={e => setNewTask({ ...newTask, task: e.target.value })}
                className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                title="Add Task"
              >
                <Plus size={15} />
              </button>
            </div>
          </form>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-60 pr-1">
            {careTasks.map(task => (
              <div
                key={task.id}
                className="flex items-start justify-between gap-2 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50/70 transition-colors group"
              >
                <button
                  type="button"
                  onClick={() => handleToggleTask(task.id)}
                  className="flex items-start gap-2.5 text-left flex-1"
                >
                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border flex-shrink-0 ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>
                    {task.completed && <Check size={11} />}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.task}
                    </p>
                    <span className="text-[11px] text-gray-400">
                      {task.member} · {task.dueDate}
                    </span>
                  </div>
                </button>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => setEditingTask(task)}
                    className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                    title="Edit Task"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded"
                    title="Delete Task"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log / Edit Member Vitals Modal */}
      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title="Log Family Member Vitals & Score"
        size="md"
      >
        {editingMember && (
          <form onSubmit={handleSaveMemberVitals} className="space-y-4">
            <div>
              <label className="label">Select Family Member</label>
              <select
                value={editingMember.id}
                onChange={e => {
                  const found = profiles.find(p => p.id === e.target.value);
                  if (found) setEditingMember({ ...found });
                }}
                className="input-field"
              >
                {profiles.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.relation})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Updated Health Score (1-100)</label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={editingMember.healthScore}
                onChange={e => setEditingMember({ ...editingMember, healthScore: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Latest Vitals / Condition Summary</label>
              <textarea
                rows={3}
                value={editingMember.notes || ''}
                onChange={e => setEditingMember({ ...editingMember, notes: e.target.value })}
                placeholder="e.g. BP 124/80 mmHg, morning walk completed..."
                className="input-field"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditingMember(null)} className="btn-outline text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm">
                Save Vitals Check-In
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Edit Care Task Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Family Care Task"
        size="sm"
      >
        {editingTask && (
          <form onSubmit={handleSaveTaskEdit} className="space-y-4">
            <div>
              <label className="label">Family Member</label>
              <input
                type="text"
                value={editingTask.member}
                onChange={e => setEditingTask({ ...editingTask, member: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Task Description *</label>
              <input
                type="text"
                required
                value={editingTask.task}
                onChange={e => setEditingTask({ ...editingTask, task: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Scheduled Time / Due</label>
              <input
                type="text"
                value={editingTask.dueDate}
                onChange={e => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditingTask(null)} className="btn-outline text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default FamilyDashboard;
