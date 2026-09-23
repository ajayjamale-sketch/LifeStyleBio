import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Apple, Plus, Droplets, Flame, Target, Edit, Trash2, Minus } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { toast } from 'sonner';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
}

const MEALS_STORAGE_KEY = 'lifestylebio_member_meals';
const WATER_STORAGE_KEY = 'lifestylebio_member_water';

const INITIAL_MEALS: MealItem[] = [
  { id: 'm1', name: 'Greek Yogurt & Berry Bowl', calories: 420, protein: 32, carbs: 48, fat: 11, mealType: 'breakfast', time: '08:15 AM' },
  { id: 'm2', name: 'Grilled Wild Salmon & Quinoa', calories: 680, protein: 46, carbs: 62, fat: 24, mealType: 'lunch', time: '01:10 PM' },
  { id: 'm3', name: 'Whey Isolate & Almond Shake', calories: 290, protein: 28, carbs: 18, fat: 9, mealType: 'snack', time: '04:30 PM' },
];

const weeklyData = [
  { day: 'Mon', calories: 1850, protein: 95, carbs: 220, fat: 62 },
  { day: 'Tue', calories: 2100, protein: 118, carbs: 245, fat: 70 },
  { day: 'Wed', calories: 1720, protein: 88, carbs: 198, fat: 58 },
  { day: 'Thu', calories: 2050, protein: 112, carbs: 238, fat: 67 },
  { day: 'Fri', calories: 1900, protein: 102, carbs: 215, fat: 63 },
  { day: 'Sat', calories: 2300, protein: 125, carbs: 278, fat: 75 },
  { day: 'Sun', calories: 1650, protein: 85, carbs: 190, fat: 55 },
];

const EMPTY_MEAL = {
  name: '',
  calories: '',
  protein: '25',
  carbs: '35',
  fat: '12',
  mealType: 'lunch' as MealItem['mealType'],
};

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<MealItem[]>(() => {
    try {
      const saved = localStorage.getItem(MEALS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MEALS;
    } catch {
      return INITIAL_MEALS;
    }
  });
  const [waterLiters, setWaterLiters] = useState<number>(() => {
    const saved = localStorage.getItem(WATER_STORAGE_KEY);
    return saved ? Number(saved) : 2.0;
  });
  const [logForm, setLogForm] = useState(EMPTY_MEAL);
  const [editingMeal, setEditingMeal] = useState<MealItem | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem(WATER_STORAGE_KEY, String(waterLiters));
  }, [waterLiters]);

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

  const handleLogMeal = () => {
    if (!logForm.name.trim() || !logForm.calories) {
      toast.error('Please fill in food name and calories.');
      return;
    }
    const newMeal: MealItem = {
      id: `meal_${Date.now()}`,
      name: logForm.name.trim(),
      calories: Number(logForm.calories),
      protein: Number(logForm.protein) || 0,
      carbs: Number(logForm.carbs) || 0,
      fat: Number(logForm.fat) || 0,
      mealType: logForm.mealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMeals(prev => [newMeal, ...prev]);
    toast.success(`${newMeal.name} logged successfully!`);
    setLogForm(EMPTY_MEAL);
  };

  const openEditModal = (m: MealItem) => {
    setEditingMeal(m);
    setLogForm({
      name: m.name,
      calories: String(m.calories),
      protein: String(m.protein),
      carbs: String(m.carbs),
      fat: String(m.fat),
      mealType: m.mealType,
    });
    setEditModalOpen(true);
  };

  const handleUpdateMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMeal || !logForm.name.trim() || !logForm.calories) return;
    setMeals(prev => prev.map(m => m.id === editingMeal.id ? {
      ...m,
      name: logForm.name.trim(),
      calories: Number(logForm.calories),
      protein: Number(logForm.protein) || 0,
      carbs: Number(logForm.carbs) || 0,
      fat: Number(logForm.fat) || 0,
      mealType: logForm.mealType,
    } : m));
    setEditModalOpen(false);
    setEditingMeal(null);
    setLogForm(EMPTY_MEAL);
    toast.success('Meal entry updated!');
  };

  const macros = [
    { label: 'Protein', consumed: totalProtein, goal: 140, color: 'bg-emerald-500', unit: 'g' },
    { label: 'Carbs', consumed: totalCarbs, goal: 220, color: 'bg-sky-400', unit: 'g' },
    { label: 'Fat', consumed: totalFat, goal: 70, color: 'bg-violet-500', unit: 'g' },
    { label: 'Calories', consumed: totalCalories, goal: 2100, color: 'bg-orange-400', unit: 'kcal' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Calories Today', value: totalCalories, goal: 2100, icon: Flame, color: 'text-orange-500 bg-orange-50', unit: 'kcal' },
          { label: 'Protein', value: totalProtein, goal: 140, icon: Target, color: 'text-emerald-500 bg-emerald-50', unit: 'g' },
          { label: 'Water Intake', value: `${waterLiters.toFixed(2)}L`, goal: '2.5L', icon: Droplets, color: 'text-sky-500 bg-sky-50', unit: '', isWater: true },
          { label: 'Meals Logged', value: String(meals.length), goal: '5', icon: Apple, color: 'text-violet-500 bg-violet-50', unit: '' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon size={18} />
              </div>
              {item.isWater && (
                <div className="flex items-center gap-1">
                  <button onClick={() => setWaterLiters(w => Math.max(0, +(w - 0.25).toFixed(2)))} className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 cursor-pointer" title="-250ml"><Minus size={12} /></button>
                  <button onClick={() => { setWaterLiters(w => +(w + 0.25).toFixed(2)); toast.success('+250ml water logged!'); }} className="p-1 bg-sky-100 hover:bg-sky-200 rounded-lg text-sky-600 cursor-pointer" title="+250ml"><Plus size={12} /></button>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">{item.value}{item.unit && <span className="text-sm font-normal text-gray-500 ml-1">{item.unit}</span>}</div>
            <p className="text-gray-500 text-xs">{item.label} · Goal: {item.goal}{item.unit}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Macro Progress */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Macros Progress</h3>
          <div className="space-y-4">
            {macros.map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{m.label}</span>
                  <span className="text-gray-500 text-xs">{m.consumed}{m.unit} / {m.goal}{m.unit}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((m.consumed / m.goal) * 100, 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${m.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Weekly Calorie Intake</h3>
          <HealthChart type="bar" data={weeklyData} dataKeys={[
            { key: 'calories', color: '#10B981', label: 'Calories' },
          ]} xAxisKey="day" height={200} />
        </div>
      </div>

      {/* Log Meal */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus size={18} className="text-emerald-500" /> Log a Meal</h3>
        <div className="grid sm:grid-cols-6 gap-3">
          <input value={logForm.name} onChange={e => setLogForm(p => ({ ...p, name: e.target.value }))} placeholder="Food name *" className="input-field sm:col-span-2" />
          <input value={logForm.calories} onChange={e => setLogForm(p => ({ ...p, calories: e.target.value }))} type="number" placeholder="Calories *" className="input-field" />
          <input value={logForm.protein} onChange={e => setLogForm(p => ({ ...p, protein: e.target.value }))} type="number" placeholder="Protein (g)" className="input-field" />
          <input value={logForm.carbs} onChange={e => setLogForm(p => ({ ...p, carbs: e.target.value }))} type="number" placeholder="Carbs (g)" className="input-field" />
          <select value={logForm.mealType} onChange={e => setLogForm(p => ({ ...p, mealType: e.target.value as MealItem['mealType'] }))} className="input-field">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <button onClick={handleLogMeal} className="btn-primary mt-3 text-sm py-2.5 px-5 cursor-pointer">Log Meal</button>
      </div>

      {/* Logged Meals List (Read / Update / Delete) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Today's Logged Meals ({meals.length})</h3>
        <div className="space-y-2.5">
          {meals.map(m => (
            <div key={m.id} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{m.name}</span>
                  <span className="text-[11px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{m.mealType}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {m.calories} kcal · {m.protein}g protein · {m.carbs}g carbs · {m.fat}g fat · {m.time}
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEditModal(m)} title="Edit Meal" className="p-1.5 text-gray-400 hover:text-sky-600 rounded-lg hover:bg-white cursor-pointer"><Edit size={14} /></button>
                <button onClick={() => setDeleteId(m.id)} title="Delete Meal" className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white cursor-pointer"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {!meals.length && <p className="text-center text-sm text-gray-400 py-6">No meals logged today.</p>}
        </div>
      </div>

      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setLogForm(EMPTY_MEAL); }} title="Edit Logged Meal">
        <form onSubmit={handleUpdateMeal} className="space-y-3.5">
          <div>
            <label className="label">Food Name *</label>
            <input value={logForm.name} onChange={e => setLogForm({ ...logForm, name: e.target.value })} className="input-field" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Calories (kcal) *</label>
              <input type="number" value={logForm.calories} onChange={e => setLogForm({ ...logForm, calories: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="label">Meal Type</label>
              <select value={logForm.mealType} onChange={e => setLogForm({ ...logForm, mealType: e.target.value as MealItem['mealType'] })} className="input-field">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Protein (g)</label>
              <input type="number" value={logForm.protein} onChange={e => setLogForm({ ...logForm, protein: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label">Carbs (g)</label>
              <input type="number" value={logForm.carbs} onChange={e => setLogForm({ ...logForm, carbs: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label">Fat (g)</label>
              <input type="number" value={logForm.fat} onChange={e => setLogForm({ ...logForm, fat: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-5">Save Changes</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Delete Meal Entry" message="Remove this meal from today's nutrition log?" onConfirm={() => { setMeals(prev => prev.filter(m => m.id !== deleteId)); setDeleteId(null); toast.success('Meal removed.'); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export default Nutrition;
