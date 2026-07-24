import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Plus, Droplets, Flame, Target } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { generateNutritionData } from '@/services/dashboardService';
import { toast } from 'sonner';

const weeklyData = [
  { day: 'Mon', calories: 1850, protein: 95, carbs: 220, fat: 62 },
  { day: 'Tue', calories: 2100, protein: 118, carbs: 245, fat: 70 },
  { day: 'Wed', calories: 1720, protein: 88, carbs: 198, fat: 58 },
  { day: 'Thu', calories: 2050, protein: 112, carbs: 238, fat: 67 },
  { day: 'Fri', calories: 1900, protein: 102, carbs: 215, fat: 63 },
  { day: 'Sat', calories: 2300, protein: 125, carbs: 278, fat: 75 },
  { day: 'Sun', calories: 1650, protein: 85, carbs: 190, fat: 55 },
];

const Nutrition: React.FC = () => {
  const [nutrition] = useState(() => generateNutritionData());
  const [logForm, setLogForm] = useState({ name: '', calories: '', mealType: 'lunch' });

  const handleLogMeal = () => {
    if (!logForm.name || !logForm.calories) { toast.error('Please fill in all required fields.'); return; }
    toast.success(`${logForm.name} logged successfully!`);
    setLogForm({ name: '', calories: '', mealType: 'lunch' });
  };

  const macros = [
    { label: 'Protein', consumed: nutrition.protein.consumed, goal: nutrition.protein.goal, color: 'bg-emerald-500', unit: 'g' },
    { label: 'Carbs', consumed: nutrition.carbs.consumed, goal: nutrition.carbs.goal, color: 'bg-sky-400', unit: 'g' },
    { label: 'Fat', consumed: nutrition.fat.consumed, goal: nutrition.fat.goal, color: 'bg-violet-500', unit: 'g' },
    { label: 'Fiber', consumed: nutrition.fiber.consumed, goal: nutrition.fiber.goal, color: 'bg-orange-400', unit: 'g' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Calories Today', value: nutrition.calories.consumed, goal: nutrition.calories.goal, icon: Flame, color: 'text-orange-500 bg-orange-50', unit: 'kcal' },
          { label: 'Protein', value: nutrition.protein.consumed, goal: nutrition.protein.goal, icon: Target, color: 'text-emerald-500 bg-emerald-50', unit: 'g' },
          { label: 'Water Intake', value: `${nutrition.water.consumed.toFixed(1)}L`, goal: `${nutrition.water.goal}L`, icon: Droplets, color: 'text-sky-500 bg-sky-50', unit: '' },
          { label: 'Meals Logged', value: '3', goal: '5', icon: Apple, color: 'text-violet-500 bg-violet-50', unit: '' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
              <item.icon size={18} />
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
                    transition={{ duration: 1 }}
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
        <div className="grid sm:grid-cols-4 gap-3">
          <input value={logForm.name} onChange={e => setLogForm(p => ({ ...p, name: e.target.value }))} placeholder="Food name *" className="input-field sm:col-span-2" />
          <input value={logForm.calories} onChange={e => setLogForm(p => ({ ...p, calories: e.target.value }))} type="number" placeholder="Calories *" className="input-field" />
          <select value={logForm.mealType} onChange={e => setLogForm(p => ({ ...p, mealType: e.target.value }))} className="input-field">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <button onClick={handleLogMeal} className="btn-primary mt-3 text-sm py-2.5 px-5">Log Meal</button>
      </div>
    </div>
  );
};

export default Nutrition;
