import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import ExportButtons from '@/components/common/ExportButtons';
import { toast } from 'sonner';

const subData = [
  { month: 'Feb', starter: 4200, pro: 2800, premium: 980 },
  { month: 'Mar', starter: 4800, pro: 3200, premium: 1100 },
  { month: 'Apr', starter: 5400, pro: 3800, premium: 1280 },
  { month: 'May', starter: 6100, pro: 4400, premium: 1450 },
  { month: 'Jun', starter: 7200, pro: 5100, premium: 1720 },
  { month: 'Jul', starter: 8500, pro: 6200, premium: 2100 },
];

const recentSubs = [
  { user: 'John D.', plan: 'Pro', amount: '$12.00', date: 'Jul 24, 2026', status: 'active' },
  { user: 'Emma W.', plan: 'Premium', amount: '$29.00', date: 'Jul 24, 2026', status: 'active' },
  { user: 'Mike J.', plan: 'Pro', amount: '$12.00', date: 'Jul 23, 2026', status: 'active' },
  { user: 'Lisa A.', plan: 'Starter', amount: '$0.00', date: 'Jul 23, 2026', status: 'active' },
  { user: 'Tom R.', plan: 'Premium', amount: '$29.00', date: 'Jul 22, 2026', status: 'cancelled' },
];

const AdminSubscriptions: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Subscription Management</h2>
        <p className="text-gray-500 text-sm">Revenue and plan distribution</p>
      </div>
      <ExportButtons onExportCSV={() => toast.info('Exporting subscription data...')} onExportPDF={() => toast.info('Generating PDF report...')} />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Monthly Revenue', value: '$102,300', change: '+23%', icon: DollarSign, color: 'text-emerald-500 bg-emerald-50' },
        { label: 'Total Subscribers', value: '16,800', change: '+18%', icon: Users, color: 'text-sky-500 bg-sky-50' },
        { label: 'Pro Subscribers', value: '6,200', change: '+21%', icon: CreditCard, color: 'text-violet-500 bg-violet-50' },
        { label: 'MRR Growth', value: '23%', change: '+3%', icon: TrendingUp, color: 'text-orange-500 bg-orange-50' },
      ].map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={18} /></div>
          <div className="text-2xl font-bold text-gray-900">{s.value}</div>
          <p className="text-gray-500 text-xs">{s.label}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-medium">
            <ArrowUpRight size={12} />{s.change} this month
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Subscriber Growth by Plan</h3>
        <HealthChart type="area" data={subData} dataKeys={[
          { key: 'starter', color: '#9CA3AF', label: 'Starter' },
          { key: 'pro', color: '#10B981', label: 'Pro' },
          { key: 'premium', color: '#8B5CF6', label: 'Premium' },
        ]} xAxisKey="month" height={220} showLegend />
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Recent Subscriptions</h3>
        <div className="space-y-3">
          {recentSubs.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard size={14} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{s.user}</p>
                <p className="text-xs text-gray-400">{s.plan} · {s.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{s.amount}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${s.status === 'active' ? 'text-emerald-600' : 'text-red-500'}`}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminSubscriptions;
