import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Clock, Activity, Plus, Trophy, Edit, Trash2 } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { toast } from 'sonner';

interface WorkoutItem {
  id: string;
  name: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

const STORAGE_KEY = 'lifestylebio_member_workouts';

const workoutData = [
  { day: 'Mon', calories: 380, duration: 45, intensity: 75 },
  { day: 'Tue', calories: 0, duration: 0, intensity: 0 },
  { day: 'Wed', calories: 520, duration: 60, intensity: 88 },
  { day: 'Thu', calories: 290, duration: 35, intensity: 62 },
  { day: 'Fri', calories: 610, duration: 70, intensity: 92 },
  { day: 'Sat', calories: 480, duration: 55, intensity: 80 },
  { day: 'Sun', calories: 0, duration: 0, intensity: 0 },
];

const INITIAL_WORKOUTS: WorkoutItem[] = [
  { id: '1', name: 'Morning Run', type: 'Cardio', duration: 32, calories: 320, date: 'Today' },
  { id: '2', name: 'Upper Body Strength', type: 'Strength Training', duration: 48, calories: 280, date: 'Yesterday' },
  { id: '3', name: 'Yoga Flow', type: 'Yoga / Stretching', duration: 25, calories: 95, date: '2 days ago' },
];

const EMPTY_FORM = {
  name: '',
  type: 'Cardio',
  duration: '',
  calories: '',
  date: 'Today',
};

const Fitness: React.FC = () => {
  const [workouts, setFixtures] = useState<WorkoutItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_WORKOUTS;
    } catch {
      return INITIAL_WORKOUTS;
    }
  });
  const [logForm, setLogForm] = useState(EMPTY_FORM);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutItem | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }, [workouts]);

  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0) + 1585;
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0) + 160;

  const handleLog = () => {
    if (!logForm.duration) {
      toast.error('Please enter workout duration.');
      return;
    }
    const dur = Number(logForm.duration);
    const cal = Number(logForm.calories) || Math.round(dur * 7.5);
    const newWorkout: WorkoutItem = {
      id: `wk_${Date.now()}`,
      name: logForm.name.trim() || `${logForm.type} Session`,
      type: logForm.type,
      duration: dur,
      calories: cal,
      date: 'Just now',
    };
    setFixtures(prev => [newWorkout, ...prev]);
    toast.success('Workout logged successfully!');
    setLogForm(EMPTY_FORM);
  };

  const openEditModal = (w: WorkoutItem) => {
    setEditingWorkout(w);
    setLogForm({
      name: w.name,
      type: w.type,
      duration: String(w.duration),
      calories: String(w.calories),
      date: w.date,
    });
    setEditModalOpen(true);
  };

  const handleUpdateWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkout || !logForm.duration) return;
    setFixtures(prev => prev.map(w => w.id === editingWorkout.id ? {
      ...w,
      name: logForm.name.trim() || `${logForm.type} Session`,
      type: logForm.type,
      duration: Number(logForm.duration),
      calories: Number(logForm.calories) || 0,
      date: logForm.date || w.date,
    } : w));
    setEditModalOpen(false);
    setEditingWorkout(null);
    setLogForm(EMPTY_FORM);
    toast.success('Workout updated!');
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Workouts Logged', value: String(workouts.length + 2), icon: Dumbbell, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Calories Burned', value: totalCalories.toLocaleString(), icon: Flame, color: 'text-orange-500 bg-orange-50' },
          { label: 'Active Minutes', value: String(totalMinutes), icon: Clock, color: 'text-sky-500 bg-sky-50' },
          { label: 'Current Streak', value: '12 days', icon: Trophy, color: 'text-yellow-500 bg-yellow-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Activity Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Activity</h3>
          <HealthChart type="area" data={workoutData} dataKeys={[
            { key: 'calories', color: '#10B981', label: 'Calories Burned' },
            { key: 'duration', color: '#38BDF8', label: 'Duration (min)' },
          ]} xAxisKey="day" height={200} />
        </div>

        {/* Recent Workouts */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Workouts ({workouts.length})</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
            {workouts.map(w => (
              <div key={w.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <Activity size={16} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{w.name}</p>
                  <p className="text-xs text-gray-500">{w.type} · {w.duration} min · {w.calories} cal</p>
                </div>
                <span className="text-xs text-gray-400 mr-1">{w.date}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEditModal(w)} title="Edit Workout" className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-white cursor-pointer"><Edit size={14} /></button>
                  <button onClick={() => setDeleteId(w.id)} title="Delete Workout" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white cursor-pointer"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {!workouts.length && <p className="text-center text-sm text-gray-400 py-6">No workouts logged yet.</p>}
          </div>
        </div>
      </div>

      {/* Log Workout */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus size={18} className="text-emerald-500" /> Log Workout</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          <input value={logForm.name} onChange={e => setLogForm(p => ({ ...p, name: e.target.value }))} placeholder="Workout name (e.g. Evening HIIT)" className="input-field" />
          <select value={logForm.type} onChange={e => setLogForm(p => ({ ...p, type: e.target.value }))} className="input-field">
            <option value="Cardio">Cardio</option>
            <option value="Strength Training">Strength Training</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga / Stretching">Yoga / Stretching</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
          <input value={logForm.duration} onChange={e => setLogForm(p => ({ ...p, duration: e.target.value }))} type="number" placeholder="Duration (minutes) *" className="input-field" />
          <input value={logForm.calories} onChange={e => setLogForm(p => ({ ...p, calories: e.target.value }))} type="number" placeholder="Calories burned" className="input-field" />
        </div>
        <button onClick={handleLog} className="btn-primary mt-3 text-sm py-2.5 px-5 cursor-pointer">Log Workout</button>
      </div>

      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setLogForm(EMPTY_FORM); }} title="Edit Workout">
        <form onSubmit={handleUpdateWorkout} className="space-y-3.5">
          <div>
            <label className="label">Workout Name *</label>
            <input value={logForm.name} onChange={e => setLogForm({ ...logForm, name: e.target.value })} className="input-field" required />
          </div>
          <div>
            <label className="label">Workout Type</label>
            <select value={logForm.type} onChange={e => setLogForm({ ...logForm, type: e.target.value })} className="input-field">
              <option value="Cardio">Cardio</option>
              <option value="Strength Training">Strength Training</option>
              <option value="HIIT">HIIT</option>
              <option value="Yoga / Stretching">Yoga / Stretching</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Duration (minutes) *</label>
              <input type="number" value={logForm.duration} onChange={e => setLogForm({ ...logForm, duration: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="label">Calories Burned</label>
              <input type="number" value={logForm.calories} onChange={e => setLogForm({ ...logForm, calories: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">Save Changes</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Workout" message="Remove this workout session from your fitness log?" onConfirm={() => { setFixtures(prev => prev.filter(w => w.id !== deleteId)); setDeleteId(null); toast.success('Workout deleted.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Fitness;
