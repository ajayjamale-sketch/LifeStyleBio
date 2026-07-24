import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { Flame, Scale, TrendingDown } from 'lucide-react';

const clients = [
  { id: 'c1', name: 'Alice Smith', targetCalories: 1800, weight: 68.5, targetWeight: 65 },
  { id: 'c2', name: 'Bob Johnson', targetCalories: 2200, weight: 84.2, targetWeight: 80 },
  { id: 'c3', name: 'Charlie Davis', targetCalories: 2500, weight: 76.1, targetWeight: 78 },
];

const mockProgressData = {
  c1: [
    { day: 'Mon', calories: 1750, weight: 69.1, protein: 120, carbs: 180, fat: 55 },
    { day: 'Tue', calories: 1820, weight: 68.9, protein: 125, carbs: 190, fat: 58 },
    { day: 'Wed', calories: 1690, weight: 68.8, protein: 118, carbs: 170, fat: 52 },
    { day: 'Thu', calories: 1780, weight: 68.6, protein: 130, carbs: 175, fat: 60 },
    { day: 'Fri', calories: 1800, weight: 68.5, protein: 122, carbs: 185, fat: 54 },
    { day: 'Sat', calories: 1950, weight: 68.7, protein: 110, carbs: 210, fat: 65 },
    { day: 'Sun', calories: 1720, weight: 68.5, protein: 115, carbs: 175, fat: 50 },
  ],
  c2: [
    { day: 'Mon', calories: 2300, weight: 85.0, protein: 150, carbs: 240, fat: 75 },
    { day: 'Tue', calories: 2150, weight: 84.8, protein: 160, carbs: 220, fat: 70 },
    { day: 'Wed', calories: 2250, weight: 84.6, protein: 155, carbs: 230, fat: 72 },
    { day: 'Thu', calories: 2200, weight: 84.5, protein: 162, carbs: 225, fat: 70 },
    { day: 'Fri', calories: 2180, weight: 84.3, protein: 158, carbs: 215, fat: 68 },
    { day: 'Sat', calories: 2400, weight: 84.4, protein: 145, carbs: 260, fat: 80 },
    { day: 'Sun', calories: 2220, weight: 84.2, protein: 150, carbs: 235, fat: 71 },
  ],
  c3: [
    { day: 'Mon', calories: 2400, weight: 75.5, protein: 140, carbs: 280, fat: 80 },
    { day: 'Tue', calories: 2550, weight: 75.7, protein: 145, carbs: 290, fat: 85 },
    { day: 'Wed', calories: 2500, weight: 75.8, protein: 142, carbs: 285, fat: 82 },
    { day: 'Thu', calories: 2600, weight: 75.9, protein: 150, carbs: 300, fat: 88 },
    { day: 'Fri', calories: 2450, weight: 76.0, protein: 148, carbs: 275, fat: 79 },
    { day: 'Sat', calories: 2700, weight: 76.2, protein: 135, carbs: 320, fat: 95 },
    { day: 'Sun', calories: 2520, weight: 76.1, protein: 140, carbs: 290, fat: 83 },
  ],
};

const Progress: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState('c1');

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const chartData = mockProgressData[selectedClientId as keyof typeof mockProgressData];

  const avgCalories = Math.round(chartData.reduce((acc, curr) => acc + curr.calories, 0) / chartData.length);
  const avgWeight = (chartData.reduce((acc, curr) => acc + curr.weight, 0) / chartData.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Client Nutrition Progress</h1>
          <p className="text-gray-500 text-sm mt-1">Review caloric intake, macronutrient compliance, and weight trends for your clients.</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Client:</label>
          <select
            value={selectedClientId}
            onChange={e => setSelectedClientId(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Avg Daily Intake</p>
            <p className="text-lg font-bold text-gray-800">{avgCalories} kcal</p>
            <p className="text-xs text-gray-500 mt-0.5">Target: {selectedClient.targetCalories} kcal</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <Scale size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Current Weight</p>
            <p className="text-lg font-bold text-gray-800">{selectedClient.weight} kg</p>
            <p className="text-xs text-gray-500 mt-0.5">Avg: {avgWeight} kg</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Target Weight Goal</p>
            <p className="text-lg font-bold text-gray-800">{selectedClient.targetWeight} kg</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Caloric Intake History</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="calColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} domain={['dataMin - 200', 'dataMax + 200']} />
                <Tooltip />
                <Area type="monotone" dataKey="calories" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#calColor)" name="Calories (kcal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Macronutrient Compliance (g)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="protein" name="Protein" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="carbs" name="Carbs" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fat" name="Fat" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
