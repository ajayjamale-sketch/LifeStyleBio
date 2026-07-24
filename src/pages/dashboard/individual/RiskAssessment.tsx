import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Info, TrendingDown } from 'lucide-react';
import HealthChart from '@/components/dashboard/charts/HealthChart';
import { ScoreGauge } from '@/components/dashboard/widgets/HealthWidget';

const riskFactors = [
  { label: 'Cardiovascular Risk', score: 18, level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Your heart health indicators are within normal range. Continue regular exercise.' },
  { label: 'Diabetes Risk', score: 24, level: 'Low-Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Slightly elevated fasting glucose. Consider reducing refined carbohydrates.' },
  { label: 'Hypertension Risk', score: 35, level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Blood pressure slightly elevated. Monitor regularly and reduce sodium intake.' },
  { label: 'Metabolic Syndrome', score: 15, level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Good metabolic health. Maintain current lifestyle habits.' },
  { label: 'Mental Health Risk', score: 12, level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Stress and mood indicators are healthy. Continue mindfulness practices.' },
  { label: 'Obesity Risk', score: 22, level: 'Low-Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'BMI is approaching overweight category. Maintain calorie balance.' },
];

const recommendations = [
  { icon: CheckCircle, text: 'Continue daily 30-minute moderate exercise', done: true },
  { icon: CheckCircle, text: 'Maintain current sleep schedule of 7-8 hours', done: true },
  { icon: AlertTriangle, text: 'Reduce sodium intake to below 2,300 mg/day', done: false },
  { icon: AlertTriangle, text: 'Schedule annual blood pressure screening', done: false },
  { icon: Info, text: 'Consider a colorectal cancer screening at age 45', done: false },
  { icon: Info, text: 'Book annual comprehensive blood panel', done: false },
];

const RiskAssessment: React.FC = () => {
  const overallScore = 78;

  const trendData = [
    { month: 'Feb', score: 65 }, { month: 'Mar', score: 68 }, { month: 'Apr', score: 70 },
    { month: 'May', score: 73 }, { month: 'Jun', score: 76 }, { month: 'Jul', score: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-r from-emerald-500 to-sky-400 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Overall Health Score</h2>
            <p className="text-white/80 text-sm">Based on 50+ health indicators and lifestyle factors</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold font-heading">{overallScore}</div>
            <div className="text-white/80 text-sm mt-1">out of 100 · Good</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallScore}%` }}
            transition={{ duration: 1.2 }}
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
            <h3 className="font-bold text-gray-900 mb-3">Action Items</h3>
            <div className="space-y-2.5">
              {recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <r.icon size={15} className={`mt-0.5 flex-shrink-0 ${r.done ? 'text-emerald-500' : r.icon === AlertTriangle ? 'text-orange-500' : 'text-sky-500'}`} />
                  <span className={`text-xs leading-relaxed ${r.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
