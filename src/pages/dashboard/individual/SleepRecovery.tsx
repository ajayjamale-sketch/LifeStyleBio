import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Zap, Clock, Star, Plus, Edit, Trash2 } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { ScoreGauge } from '@/components/dashboard/widgets/HealthWidget';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { toast } from 'sonner';

interface SleepLogEntry {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  total: number;
  deep: number;
  rem: number;
  light: number;
  quality: number;
}

const STORAGE_KEY = 'lifestylebio_member_sleep_logs';

const INITIAL_SLEEP_LOGS: SleepLogEntry[] = [
  { id: 's1', date: 'Mon', bedTime: '22:45', wakeTime: '06:15', total: 7.5, deep: 1.7, rem: 2.0, light: 3.8, quality: 84 },
  { id: 's2', date: 'Tue', bedTime: '23:00', wakeTime: '06:30', total: 7.5, deep: 1.8, rem: 2.1, light: 3.6, quality: 86 },
  { id: 's3', date: 'Wed', bedTime: '22:30', wakeTime: '06:30', total: 8.0, deep: 2.0, rem: 2.2, light: 3.8, quality: 91 },
  { id: 's4', date: 'Thu', bedTime: '23:15', wakeTime: '06:15', total: 7.0, deep: 1.5, rem: 1.8, light: 3.7, quality: 79 },
  { id: 's5', date: 'Fri', bedTime: '22:30', wakeTime: '06:30', total: 8.0, deep: 1.9, rem: 2.1, light: 4.0, quality: 88 },
];

const calcSleepHours = (bed: string, wake: string): number => {
  const [bh, bm] = bed.split(':').map(Number);
  const [wh, wm] = wake.split(':').map(Number);
  if (isNaN(bh) || isNaN(wh)) return 7.5;
  let diff = (wh + wm / 60) - (bh + bm / 60);
  if (diff <= 0) diff += 24;
  return +(diff.toFixed(1));
};

const SleepRecovery: React.FC = () => {
  const [sleepLogs, setSleepLogs] = useState<SleepLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SLEEP_LOGS;
    } catch {
      return INITIAL_SLEEP_LOGS;
    }
  });
  const [logForm, setLogForm] = useState({ date: 'Today', bedTime: '22:30', wakeTime: '06:30', quality: '8' });
  const [editingLog, setEditingLog] = useState<SleepLogEntry | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sleepLogs));
  }, [sleepLogs]);

  const lastNight = sleepLogs[sleepLogs.length - 1] || INITIAL_SLEEP_LOGS[0];

  const handleLog = () => {
    const total = calcSleepHours(logForm.bedTime, logForm.wakeTime);
    const qualityPct = Math.min(100, Math.round(Number(logForm.quality) * 10));
    const newEntry: SleepLogEntry = {
      id: `sleep_${Date.now()}`,
      date: logForm.date || 'Today',
      bedTime: logForm.bedTime,
      wakeTime: logForm.wakeTime,
      total,
      deep: +(total * 0.24).toFixed(1),
      rem: +(total * 0.27).toFixed(1),
      light: +(total * 0.49).toFixed(1),
      quality: qualityPct,
    };
    setSleepLogs(prev => [...prev, newEntry]);
    toast.success('Sleep log saved successfully!');
  };

  const openEditModal = (entry: SleepLogEntry) => {
    setEditingLog(entry);
    setLogForm({
      date: entry.date,
      bedTime: entry.bedTime,
      wakeTime: entry.wakeTime,
      quality: String(Math.round(entry.quality / 10)),
    });
    setEditModalOpen(true);
  };

  const handleUpdateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLog) return;
    const total = calcSleepHours(logForm.bedTime, logForm.wakeTime);
    const qualityPct = Math.min(100, Math.round(Number(logForm.quality) * 10));
    setSleepLogs(prev => prev.map(s => s.id === editingLog.id ? {
      ...s,
      date: logForm.date,
      bedTime: logForm.bedTime,
      wakeTime: logForm.wakeTime,
      total,
      deep: +(total * 0.24).toFixed(1),
      rem: +(total * 0.27).toFixed(1),
      light: +(total * 0.49).toFixed(1),
      quality: qualityPct,
    } : s));
    setEditModalOpen(false);
    setEditingLog(null);
    toast.success('Sleep log updated!');
  };

  const tips = [
    'Maintain a consistent sleep schedule, even on weekends.',
    'Keep your bedroom cool (65–68°F / 18–20°C) for optimal sleep.',
    'Avoid screens 1 hour before bed to reduce blue light exposure.',
    'Limit caffeine after 2 PM to prevent sleep disruption.',
    'Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.',
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sleep Duration', value: `${lastNight?.total || 7.5}h`, icon: Moon, color: 'text-indigo-500 bg-indigo-50' },
          { label: 'Sleep Quality', value: `${lastNight?.quality || 85}%`, icon: Star, color: 'text-yellow-500 bg-yellow-50' },
          { label: 'Deep Sleep', value: `${lastNight?.deep || 1.8}h`, icon: Zap, color: 'text-violet-500 bg-violet-50' },
          { label: 'Last Bedtime', value: lastNight?.bedTime || '22:30', icon: Clock, color: 'text-sky-500 bg-sky-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Sleep Score */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Last Night's Score</h3>
          <div className="flex justify-around">
            <ScoreGauge score={lastNight?.quality || 87} label="Overall Score" color="#8B5CF6" />
            <ScoreGauge score={Math.min(100, Math.round((lastNight?.deep || 1.8) / 2.2 * 100))} label="Deep Sleep" color="#10B981" />
          </div>
          <div className="mt-5 space-y-2.5">
            {[
              { label: 'Deep Sleep', value: lastNight?.deep || 1.8, color: '#8B5CF6' },
              { label: 'REM Sleep', value: lastNight?.rem || 2.1, color: '#38BDF8' },
              { label: 'Light Sleep', value: lastNight?.light || 3.2, color: '#10B981' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-gray-600 flex-1">{s.label}</span>
                <span className="font-semibold text-gray-800">{s.value}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Sleep Duration Trend</h3>
          <HealthChart type="area" data={sleepLogs} dataKeys={[
            { key: 'total', color: '#8B5CF6', label: 'Total Sleep (h)' },
            { key: 'deep', color: '#10B981', label: 'Deep Sleep (h)' },
          ]} xAxisKey="date" height={220} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Log Sleep */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus size={18} className="text-indigo-500" /> Log Sleep</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="label text-xs">Day / Label</label>
              <input value={logForm.date} onChange={e => setLogForm(p => ({ ...p, date: e.target.value }))} className="input-field" placeholder="Sat" />
            </div>
            <div>
              <label className="label text-xs">Bedtime</label>
              <input type="time" value={logForm.bedTime} onChange={e => setLogForm(p => ({ ...p, bedTime: e.target.value }))} className="input-field" />
            </div>
            <div>
              <label className="label text-xs">Wake Time</label>
              <input type="time" value={logForm.wakeTime} onChange={e => setLogForm(p => ({ ...p, wakeTime: e.target.value }))} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label text-xs">Sleep Quality: {logForm.quality}/10</label>
            <input type="range" min="1" max="10" value={logForm.quality} onChange={e => setLogForm(p => ({ ...p, quality: e.target.value }))} className="w-full accent-violet-500" />
          </div>
          <button onClick={handleLog} className="btn-purple mt-3 text-sm py-2.5 px-5 cursor-pointer">Save Sleep Log</button>
        </div>

        {/* Sleep Log History (Read / Update / Delete) */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Sleep Log History ({sleepLogs.length})</h3>
          <div className="space-y-2.5 max-h-56 overflow-y-auto scrollbar-hide">
            {[...sleepLogs].reverse().map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{entry.date} · {entry.total}h total</p>
                  <p className="text-xs text-gray-500">{entry.bedTime} → {entry.wakeTime} · Deep: {entry.deep}h · Quality: {entry.quality}%</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEditModal(entry)} title="Edit Sleep Log" className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-white cursor-pointer"><Edit size={14} /></button>
                  <button onClick={() => setDeleteId(entry.id)} title="Delete Sleep Log" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white cursor-pointer"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Sleep Improvement Tips</h3>
        <ul className="grid sm:grid-cols-2 gap-2.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">{i + 1}</div>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Sleep Log">
        <form onSubmit={handleUpdateLog} className="space-y-3.5">
          <div>
            <label className="label">Day / Date Label</label>
            <input value={logForm.date} onChange={e => setLogForm({ ...logForm, date: e.target.value })} className="input-field" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Bedtime</label>
              <input type="time" value={logForm.bedTime} onChange={e => setLogForm({ ...logForm, bedTime: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="label">Wake Time</label>
              <input type="time" value={logForm.wakeTime} onChange={e => setLogForm({ ...logForm, wakeTime: e.target.value })} className="input-field" required />
            </div>
          </div>
          <div>
            <label className="label">Sleep Quality ({logForm.quality}/10)</label>
            <input type="range" min="1" max="10" value={logForm.quality} onChange={e => setLogForm({ ...logForm, quality: e.target.value })} className="w-full accent-violet-500" />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">Save Changes</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Sleep Log" message="Remove this sleep record?" onConfirm={() => { setSleepLogs(prev => prev.filter(s => s.id !== deleteId)); setDeleteId(null); toast.success('Sleep log deleted.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default SleepRecovery;
