import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { Modal } from '@/components/common/Modal';

interface RiskActionItem {
  id: string;
  text: string;
  priority: 'warning' | 'info' | 'routine';
  done: boolean;
}

const RISK_ACTIONS_KEY = 'lifestylebio_member_risk_actions';

const DEFAULT_ACTIONS: RiskActionItem[] = [
  { id: 'ra_1', text: 'Continue daily 30-minute moderate exercise', priority: 'routine', done: true },
  { id: 'ra_2', text: 'Maintain current sleep schedule of 7-8 hours', priority: 'routine', done: true },
  { id: 'ra_3', text: 'Reduce sodium intake to below 2,300 mg/day', priority: 'warning', done: false },
  { id: 'ra_4', text: 'Schedule annual blood pressure screening', priority: 'warning', done: false },
  { id: 'ra_5', text: 'Consider a colorectal cancer screening at age 45', priority: 'info', done: false },
  { id: 'ra_6', text: 'Book annual comprehensive blood panel', priority: 'info', done: false },
];

const riskFactors = [
  { label: 'Cardiovascular Risk', score: 18, level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Your heart health indicators are within normal range. Continue regular exercise.' },
  { label: 'Diabetes Risk', score: 24, level: 'Low-Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Slightly elevated fasting glucose. Consider reducing refined carbohydrates.' },
  { label: 'Hypertension Risk', score: 35, level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Blood pressure slightly elevated. Monitor regularly and reduce sodium intake.' },
  { label: 'Metabolic Syndrome', score: 15, level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Good metabolic health. Maintain current lifestyle habits.' },
  { label: 'Mental Health Risk', score: 12, level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Stress and mood indicators are healthy. Continue mindfulness practices.' },
  { label: 'Obesity Risk', score: 22, level: 'Low-Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'BMI is approaching overweight category. Maintain calorie balance.' },
];

const RiskAssessment: React.FC = () => {
  const [actions, setActions] = useState<RiskActionItem[]>(() => {
    try {
      const saved = localStorage.getItem(RISK_ACTIONS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ACTIONS;
    } catch {
      return DEFAULT_ACTIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem(RISK_ACTIONS_KEY, JSON.stringify(actions));
  }, [actions]);

  const [newActionText, setNewActionText] = useState('');
  const [editingAction, setEditingAction] = useState<RiskActionItem | null>(null);

  const completedCount = actions.filter(a => a.done).length;
  const overallScore = Math.min(98, 72 + Math.round((completedCount / Math.max(1, actions.length)) * 18));

  const trendData = [
    { month: 'Feb', score: 65 }, { month: 'Mar', score: 68 }, { month: 'Apr', score: 70 },
    { month: 'May', score: 73 }, { month: 'Jun', score: 76 }, { month: 'Jul', score: overallScore },
  ];

  const handleToggleAction = (id: string) => {
    setActions(prev => prev.map(a => (a.id === id ? { ...a, done: !a.done } : a)));
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionText.trim()) return;
    const item: RiskActionItem = {
      id: `ra_${Date.now()}`,
      text: newActionText.trim(),
      priority: 'info',
      done: false,
    };
    setActions(prev => [...prev, item]);
    setNewActionText('');
    toast.success('Action item added to prevention plan.');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAction || !editingAction.text.trim()) return;
    setActions(prev => prev.map(a => (a.id === editingAction.id ? editingAction : a)));
    toast.success('Action item updated.');
    setEditingAction(null);
  };

  const handleDeleteAction = (id: string) => {
    setActions(prev => prev.filter(a => a.id !== id));
    toast.success('Action item removed.');
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-r from-emerald-500 to-sky-400 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Overall Health Score</h2>
            <p className="text-white/80 text-sm">Based on 50+ health indicators and completed preventive actions ({completedCount}/{actions.length})</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold font-heading">{overallScore}</div>
            <div className="text-white/80 text-sm mt-1">out of 100 · {overallScore >= 85 ? 'Excellent' : 'Good'}</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallScore}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-white rounded-full"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Risk Factors */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Risk Factor Analysis</h3>
          <div className="space-y-3">
            {riskFactors.map(r => (
              <div key={r.label} className={`p-4 rounded-xl ${r.bg} border border-gray-100`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-gray-900 text-sm">{r.label}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-white ${r.color}`}>{r.level} · {r.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.score}%` }} transition={{ duration: 1 }} className={`h-full rounded-full ${r.score < 20 ? 'bg-emerald-500' : r.score < 35 ? 'bg-yellow-400' : 'bg-orange-500'}`} />
                </div>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score Trend & Recommendations */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Score Trend</h3>
            <HealthChart type="line" data={trendData} dataKeys={[{ key: 'score', color: '#10B981' }]} xAxisKey="month" height={140} showGrid={false} />
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Preventive Action Items</h3>
              <span className="text-xs font-semibold text-emerald-600">{completedCount}/{actions.length} Done</span>
            </div>

            <form onSubmit={handleAddAction} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add preventive action..."
                value={newActionText}
                onChange={e => setNewActionText(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                title="Add Action"
              >
                <Plus size={15} />
              </button>
            </form>

            <div className="space-y-2.5">
              {actions.map(r => {
                const Icon = r.done ? CheckCircle : r.priority === 'warning' ? AlertTriangle : Info;
                return (
                  <div key={r.id} className="flex items-start justify-between gap-2 group p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <button
                      type="button"
                      onClick={() => handleToggleAction(r.id)}
                      className="flex items-start gap-2.5 text-left flex-1"
                    >
                      <Icon size={15} className={`mt-0.5 flex-shrink-0 ${r.done ? 'text-emerald-500' : r.priority === 'warning' ? 'text-orange-500' : 'text-sky-500'}`} />
                      <span className={`text-xs leading-relaxed ${r.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{r.text}</span>
                    </button>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setEditingAction(r)}
                        className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                        title="Edit"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAction(r.id)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Action Modal */}
      <Modal
        isOpen={!!editingAction}
        onClose={() => setEditingAction(null)}
        title="Edit Preventive Action Item"
        size="sm"
      >
        {editingAction && (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="label">Action Description *</label>
              <input
                type="text"
                required
                value={editingAction.text}
                onChange={e => setEditingAction({ ...editingAction, text: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Priority Level</label>
              <select
                value={editingAction.priority}
                onChange={e => setEditingAction({ ...editingAction, priority: e.target.value as RiskActionItem['priority'] })}
                className="input-field"
              >
                <option value="warning">High Priority (Warning)</option>
                <option value="info">Recommended Screening (Info)</option>
                <option value="routine">Daily Habit (Routine)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditingAction(null)} className="btn-outline text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm flex items-center gap-1.5">
                <Check size={14} /> Save
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default RiskAssessment;
