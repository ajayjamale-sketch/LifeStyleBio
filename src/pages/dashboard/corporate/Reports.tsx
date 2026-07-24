import React from 'react';
import { motion } from 'framer-motion';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import ExportButtons from '@/components/common/ExportButtons';
import { exportToCSV } from '@/utils/exportCSV';
import { toast } from 'sonner';

const monthlyData = [
  { month: 'Jan', participation: 58, score: 64, sick_days: 4.2 },
  { month: 'Feb', participation: 62, score: 67, sick_days: 3.9 },
  { month: 'Mar', participation: 67, score: 70, sick_days: 3.6 },
  { month: 'Apr', participation: 72, score: 73, sick_days: 3.3 },
  { month: 'May', participation: 77, score: 77, sick_days: 3.0 },
  { month: 'Jun', participation: 81, score: 80, sick_days: 2.7 },
  { month: 'Jul', participation: 85, score: 83, sick_days: 2.5 },
];

const deptData = [
  { dept: 'Eng', score: 86 }, { dept: 'Marketing', score: 82 }, { dept: 'Sales', score: 74 },
  { dept: 'HR', score: 90 }, { dept: 'Finance', score: 78 }, { dept: 'Ops', score: 71 },
];

const CorporateReports: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Wellness Reports</h2>
        <p className="text-gray-500 text-sm">Organization health and wellness analytics</p>
      </div>
      <ExportButtons
        onExportCSV={() => exportToCSV(monthlyData, 'wellness_reports')}
        onExportPDF={() => toast.info('PDF report generation in progress...')}
      />
    </div>

    <div className="grid lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Participation & Wellness Score Trend</h3>
        <HealthChart type="line" data={monthlyData} dataKeys={[
          { key: 'participation', color: '#10B981', label: 'Participation %' },
          { key: 'score', color: '#8B5CF6', label: 'Wellness Score' },
        ]} xAxisKey="month" height={230} showLegend />
      </div>
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Average Sick Days Per Employee</h3>
        <HealthChart type="area" data={monthlyData} dataKeys={[{ key: 'sick_days', color: '#EF4444', label: 'Sick Days' }]} xAxisKey="month" height={230} />
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">Wellness Score by Department</h3>
      <HealthChart type="bar" data={deptData} dataKeys={[{ key: 'score', color: '#38BDF8', label: 'Wellness Score' }]} xAxisKey="dept" height={250} />
    </div>
  </div>
);

export default CorporateReports;
