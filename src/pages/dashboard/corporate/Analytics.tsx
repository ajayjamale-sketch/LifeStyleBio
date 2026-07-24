import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { Users, Percent, Heart, Shield } from 'lucide-react';

const mockCompanyData = [
  { month: 'Jan', activeEmployees: 120, avgHealthScore: 74, wellnessEngagement: 65 },
  { month: 'Feb', activeEmployees: 135, avgHealthScore: 75, wellnessEngagement: 68 },
  { month: 'Mar', activeEmployees: 150, avgHealthScore: 77, wellnessEngagement: 72 },
  { month: 'Apr', activeEmployees: 165, avgHealthScore: 78, wellnessEngagement: 75 },
  { month: 'May', activeEmployees: 182, avgHealthScore: 81, wellnessEngagement: 80 },
  { month: 'Jun', activeEmployees: 200, avgHealthScore: 82, wellnessEngagement: 84 },
];

const programEngagement = [
  { name: 'Step Challenge', active: 160, completed: 110 },
  { name: 'Mindfulness Practice', active: 120, completed: 85 },
  { name: 'Heart Health Check', active: 190, completed: 175 },
  { name: 'Weight Mgmt Guide', active: 95, completed: 60 },
  { name: 'Sleep Restoration', active: 140, completed: 100 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Corporate Wellness Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Review organization-wide participation trends, engagement rates, and average physiological health indicators.</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <Users size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Enrolled Employees</p>
            <p className="text-lg font-bold text-gray-800">200 active</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
            <Percent size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Participation Rate</p>
            <p className="text-lg font-bold text-gray-800">84%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center flex-shrink-0">
            <Heart size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Avg Health Score</p>
            <p className="text-lg font-bold text-gray-800">82/100</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center flex-shrink-0">
            <Shield size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">HIPAA Compliant</p>
            <p className="text-lg font-bold text-gray-800">Secure</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Wellness Engagement & Health Index Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockCompanyData}>
                <defs>
                  <linearGradient id="engColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <Tooltip />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="wellnessEngagement" stroke="#38BDF8" strokeWidth={2.5} fillOpacity={1} fill="url(#engColor)" name="Engagement (%)" />
                <Area type="monotone" dataKey="avgHealthScore" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" name="Avg Health Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Engagement by Wellness Program</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programEngagement} barSize={8} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={12} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="#9CA3AF" fontSize={10} width={90} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="active" name="Enrolled" fill="#38BDF8" radius={[0, 4, 4, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
