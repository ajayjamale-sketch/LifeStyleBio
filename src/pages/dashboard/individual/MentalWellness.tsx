import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Meh, Frown, Heart, Plus, Zap, Wind, Edit, Trash2 } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { toast } from 'sonner';

interface MoodEntry {
  id: string;
  day: string;
  mood: number;
  moodLabel: string;
  energy: number;
  stress: number;
  notes: string;
  timestamp: string;
}

const STORAGE_KEY = 'lifestylebio_member_mood_logs';

const INITIAL_MOODS: MoodEntry[] = [
  { id: 'md_1', day: 'Mon', mood: 7, moodLabel: 'Good', energy: 7, stress: 4, notes: 'Productive morning walk and deep focus work.', timestamp: 'Mon, 9:00 AM' },
  { id: 'md_2', day: 'Tue', mood: 9, moodLabel: 'Great', energy: 8, stress: 3, notes: 'Great workout session and 8 hours of sleep.', timestamp: 'Tue, 8:30 AM' },
  { id: 'md_3', day: 'Wed', mood: 7, moodLabel: 'Good', energy: 7, stress: 4, notes: 'Completed 10-minute mindfulness body scan.', timestamp: 'Wed, 7:45 PM' },
];

const moods = [
  { icon: Smile, label: 'Great', value: 9, color: 'text-emerald-500 bg-emerald-50' },
  { icon: Smile, label: 'Good', value: 7, color: 'text-sky-500 bg-sky-50' },
  { icon: Meh, label: 'Okay', value: 5, color: 'text-yellow-500 bg-yellow-50' },
  { icon: Frown, label: 'Bad', value: 3, color: 'text-red-500 bg-red-50' },
];

const exercises = [
  { title: '4-7-8 Breathing', desc: 'Inhale 4s, hold 7s, exhale 8s', icon: Wind, color: 'bg-sky-50 text-sky-600', mins: 5 },
  { title: 'Body Scan Meditation', desc: '10-minute mindfulness practice', icon: Brain, color: 'bg-violet-50 text-violet-600', mins: 10 },
  { title: 'Gratitude Journal', desc: 'Write 3 things you are grateful for', icon: Heart, color: 'bg-pink-50 text-pink-600', mins: 5 },
  { title: 'Progressive Muscle Relaxation', desc: 'Tense and release muscle groups', icon: Zap, color: 'bg-emerald-50 text-emerald-600', mins: 10 },
];

const MentalWellness: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MOODS;
    } catch {
      return INITIAL_MOODS;
    }
  });
  const [mindfulMinutes, setMindfulMinutes] = useState(42);
  const [selectedMood, setSelectedMood] = useState<number | null>(7);
  const [stress, setStress] = useState(4);
  const [notes, setNotes] = useState('');
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const avgMood = entries.length ? (entries.reduce((s, e) => s + e.mood, 0) / entries.length).toFixed(1) : '7.6';
  const avgStress = entries.length ? (entries.reduce((s, e) => s + e.stress, 0) / entries.length) : 4;

  const handleLogMood = () => {
    if (!selectedMood) { toast.error('Please select your mood.'); return; }
    const moodObj = moods.find(m => m.value === selectedMood) || moods[1];
    const newEntry: MoodEntry = {
      id: `md_${Date.now()}`,
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      mood: selectedMood,
      moodLabel: moodObj.label,
      energy: Math.max(1, 10 - stress),
      stress,
      notes: notes.trim() || `Feeling ${moodObj.label.toLowerCase()} today.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setEntries(prev => [newEntry, ...prev]);
    toast.success('Mood & journal entry saved!');
    setNotes('');
  };

  const openEditModal = (entry: MoodEntry) => {
    setEditingEntry(entry);
    setSelectedMood(entry.mood);
    setStress(entry.stress);
    setNotes(entry.notes);
    setEditModalOpen(true);
  };

  const handleUpdateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry || !selectedMood) return;
    const moodObj = moods.find(m => m.value === selectedMood) || moods[1];
    setEntries(prev => prev.map(item => item.id === editingEntry.id ? {
      ...item,
      mood: selectedMood,
      moodLabel: moodObj.label,
      stress,
      energy: Math.max(1, 10 - stress),
      notes: notes.trim() || item.notes,
    } : item));
    setEditModalOpen(false);
    setEditingEntry(null);
    setNotes('');
    toast.success('Mood journal entry updated!');
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Mood Score', value: `${avgMood}/10`, color: 'text-violet-500 bg-violet-50' },
          { label: 'Stress Level', value: avgStress <= 4 ? 'Low' : avgStress <= 7 ? 'Moderate' : 'High', color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Mindful Minutes', value: `${mindfulMinutes} min`, color: 'text-sky-500 bg-sky-50' },
          { label: 'Journal Entries', value: String(entries.length), color: 'text-yellow-500 bg-yellow-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`text-2xl font-bold mb-1 ${s.color.split(' ')[0]}`}>{s.value}</div>
            <p className="text-gray-500 text-xs">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Log Mood */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">How are you feeling today?</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {moods.map(m => (
              <button
                key={m.label}
                type="button"
                onClick={() => setSelectedMood(m.value)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${selectedMood === m.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <m.icon size={20} className={m.color.split(' ')[0]} />
                <span className="text-sm font-medium text-gray-700">{m.label}</span>
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="label text-xs">Stress Level: {stress}/10</label>
            <input type="range" min="1" max="10" value={stress} onChange={e => setStress(Number(e.target.value))} className="w-full accent-violet-500" />
          </div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add notes about your day..." className="input-field resize-none text-sm mb-3" />
          <button onClick={handleLogMood} className="btn-purple w-full text-sm py-2.5 flex items-center justify-center gap-2 cursor-pointer">
            <Plus size={16} /> Log Mood
          </button>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Mood & Stress Trends</h3>
          <HealthChart type="line" data={[...entries].reverse()} dataKeys={[
            { key: 'mood', color: '#8B5CF6', label: 'Mood' },
            { key: 'energy', color: '#10B981', label: 'Energy' },
            { key: 'stress', color: '#EF4444', label: 'Stress' },
          ]} xAxisKey="day" height={220} showLegend />
        </div>
      </div>

      {/* Mood Journal Entries (Read / Update / Delete) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Mood & Gratitude Journal ({entries.length})</h3>
        <div className="space-y-3">
          {entries.map(entry => (
            <div key={entry.id} className="flex items-start justify-between gap-4 p-3.5 bg-gray-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{entry.moodLabel} ({entry.mood}/10)</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">Stress: {entry.stress}/10</span>
                  <span className="text-xs text-gray-400">{entry.timestamp}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{entry.notes}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEditModal(entry)} title="Edit Entry" className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-white cursor-pointer"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(entry.id)} title="Delete Entry" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white cursor-pointer"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {!entries.length && <p className="text-center text-sm text-gray-400 py-6">No mood entries recorded yet.</p>}
        </div>
      </div>

      {/* Wellness Exercises */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Recommended Exercises</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {exercises.map(ex => (
            <div key={ex.title} className={`p-4 rounded-xl ${ex.color.split(' ')[0]} border border-gray-100`}>
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center mb-3 shadow-sm">
                <ex.icon size={17} className={ex.color.split(' ')[1]} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{ex.title}</h4>
              <p className="text-gray-500 text-xs">{ex.desc}</p>
              <button
                onClick={() => {
                  setMindfulMinutes(m => m + ex.mins);
                  toast.success(`Started ${ex.title} (+${ex.mins} mindful mins logged)!`);
                }}
                className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                Start Now (+{ex.mins}m)
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setNotes(''); }} title="Edit Mood Journal Entry">
        <form onSubmit={handleUpdateEntry} className="space-y-3.5">
          <div>
            <label className="label">Mood</label>
            <div className="grid grid-cols-4 gap-2">
              {moods.map(m => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelectedMood(m.value)}
                  className={`p-2.5 rounded-xl border-2 text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer ${selectedMood === m.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}
                >
                  <m.icon size={16} className={m.color.split(' ')[0]} />
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Stress Level ({stress}/10)</label>
            <input type="range" min="1" max="10" value={stress} onChange={e => setStress(Number(e.target.value))} className="w-full accent-violet-500" />
          </div>
          <div>
            <label className="label">Journal Notes</label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} className="input-field resize-none" required />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">Save Changes</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Mood Entry" message="Remove this entry from your mental wellness journal?" onConfirm={() => { setEntries(prev => prev.filter(e => e.id !== deleteId)); setDeleteId(null); toast.success('Mood entry removed.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default MentalWellness;
