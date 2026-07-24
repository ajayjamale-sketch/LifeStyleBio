import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { Dumbbell, Flame, Timer, Heart } from 'lucide-react';

const clients = [
  { id: 'c1', name: 'Alice Smith', goal: 'Weight Loss & Tone', workoutsThisWeek: 4 },
  { id: 'c2', name: 'Bob Johnson', goal: 'Cardiovascular Fitness', workoutsThisWeek: 5 },
  { id: 'c3', name: 'Charlie Davis', goal: 'Hypertrophy & Strength', workoutsThisWeek: 3 },
];

const mockFitnessData = {
  c1: [
    { day: 'Mon', activeMin: 45, calorieBurn: 320, avgHr: 135 },
    { day: 'Tue', activeMin: 50, calorieBurn: 380, avgHr: 140 },
    { day: 'Wed', activeMin: 0, calorieBurn: 80, avgHr: 72 },
    { day: 'Thu', activeMin: 60, calorieBurn: 450, avgHr: 145 },
    { day: 'Fri', activeMin: 30, calorieBurn: 220, avgHr: 120 },
    { day: 'Sat', activeMin: 90, calorieBurn: 680, avgHr: 150 },
    { day: 'Sun', activeMin: 0, calorieBurn: 90, avgHr: 70 },
  ],
  c2: [
    { day: 'Mon', activeMin: 60, calorieBurn: 450, avgHr: 140 },
    { day: 'Tue', activeMin: 45, calorieBurn: 320, avgHr: 138 },
    { day: 'Wed', activeMin: 75, calorieBurn: 560, avgHr: 142 },
    { day: 'Thu', activeMin: 60, calorieBurn: 480, avgHr: 145 },
    { day: 'Fri', activeMin: 30, calorieBurn: 200, avgHr: 115 },
    { day: 'Sat', activeMin: 120, calorieBurn: 900, avgHr: 152 },
    { day: 'Sun', activeMin: 0, calorieBurn: 95, avgHr: 68 },
  ],
  c3: [
    { day: 'Mon', activeMin: 50, calorieBurn: 350, avgHr: 122 },
    { day: 'Tue', activeMin: 0, calorieBurn: 90, avgHr: 72 },
    { day: 'Wed', activeMin: 55, calorieBurn: 390, avgHr: 125 },
    { day: 'Thu', activeMin: 0, calorieBurn: 85, avgHr: 70 },
    { day: 'Fri', activeMin: 60, calorieBurn: 430, avgHr: 130 },
    { day: 'Sat', activeMin: 45, calorieBurn: 310, avgHr: 120 },
    { day: 'Sun', activeMin: 0, calorieBurn: 80, avgHr: 74 },
  ],
};

const Progress: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState('c1');

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const chartData = mockFitnessData[selectedClientId as keyof typeof mockFitnessData];

  const totalActiveMin = chartData.reduce((acc, curr) => acc + curr.activeMin, 0);
  const totalCalorieBurn = chartData.reduce((acc, curr) => acc + curr.calorieBurn, 0);
  const maxHeartRate = Math.max(...chartData.map(d => d.avgHr));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Client Fitness Progress</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor workout execution, aerobic heart rate logs, and caloric expenditure.</p>
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

      <div className="grid sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <Dumbbell size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Workouts This Week</p>
            <p className="text-lg font-bold text-gray-800">{selectedClient.workoutsThisWeek} sessions</p>
            <p className="text-xs text-gray-500 mt-0.5">{selectedClient.goal}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
            <Flame size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Calories Burned</p>
            <p className="text-lg font-bold text-gray-800">{totalCalorieBurn} kcal</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
            <Timer size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Active Minutes</p>
            <p className="text-lg font-bold text-gray-800">{totalActiveMin} mins</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
            <Heart size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Peak Avg Heart Rate</p>
            <p className="text-lg font-bold text-gray-800">{maxHeartRate} bpm</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Active Minutes Daily</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <Tooltip />
                <Bar dataKey="activeMin" name="Active Time (mins)" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Daily Calorie Burn History</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="calBurnColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} domain={['dataMin - 50', 'dataMax + 100']} />
                <Tooltip />
                <Area type="monotone" dataKey="calorieBurn" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#calBurnColor)" name="Calorie Expenditure (kcal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
