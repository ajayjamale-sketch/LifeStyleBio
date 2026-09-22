import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Sparkles, HeartPulse, Brain, 
  Moon, Droplets, Dumbbell, Bot, Zap, LucideIcon 
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface OrganFocus {
  id: string;
  name: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  metricLabel: string;
  metricValue: string;
  badge: string;
  coachNote: string;
  healthScore: number;
}

const organOptions: OrganFocus[] = [
  {
    id: 'heart',
    name: 'Heart & HRV',
    icon: HeartPulse,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    metricLabel: 'Resting HRV',
    metricValue: '74 ms (+14%)',
    badge: 'Optimal Autonomic Tone',
    coachNote: 'Cardiovascular recovery is high today. Prime window for 45m Zone 2 cardio.',
    healthScore: 94,
  },
  {
    id: 'brain',
    name: 'Cognitive & Mind',
    icon: Brain,
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-50',
    metricLabel: 'Stress Biomarker',
    metricValue: 'Low Cortisol Index',
    badge: 'High Mental Clarity',
    coachNote: 'Nocturnal resting HR stabilized. Morning focus capacity projected at 98%.',
    healthScore: 96,
  },
  {
    id: 'metabolic',
    name: 'Blood & Glucose',
    icon: Droplets,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    metricLabel: 'Continuous Glucose',
    metricValue: '88 mg/dL (CGM)',
    badge: 'Glycemic Stability 99%',
    coachNote: 'Post-prandial spike cleared in 35 mins. Fasting autophagy triggered.',
    healthScore: 92,
  },
  {
    id: 'sleep',
    name: 'Sleep & Recovery',
    icon: Moon,
    iconColor: 'text-sky-500',
    iconBg: 'bg-sky-50',
    metricLabel: 'Deep Sleep Ratio',
    metricValue: '1h 52m (24%)',
    badge: 'Peak Cellular Repair',
    coachNote: 'Body temperature dropped 0.8°F on schedule. REM architecture is fully restored.',
    healthScore: 95,
  },
  {
    id: 'muscle',
    name: 'Muscle & Longevity',
    icon: Dumbbell,
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-50',
    metricLabel: 'VO2 Max & Load',
    metricValue: '51.4 ml/kg/min',
    badge: 'Top 10% for Age Group',
    coachNote: 'Progressive overload targets met this week. Muscle protein synthesis primed.',
    healthScore: 93,
  },
];

const goalChips = [
  { id: 'age', label: 'Lower Biological Age', icon: Zap },
  { id: 'sleep', label: 'Deep Sleep Architecture', icon: Moon },
  { id: 'glucose', label: 'Reverse Insulin Resistance', icon: Droplets },
  { id: 'stamina', label: 'Peak Athletic Stamina', icon: Activity },
  { id: 'stress', label: 'Chronic Stress Mitigation', icon: Brain },
];

const Hero: React.FC = () => {
  const [activeOrgan, setActiveOrgan] = useState<OrganFocus>(organOptions[0]);
  const [selectedGoal, setSelectedGoal] = useState(goalChips[0].id);

  const ActiveIcon = activeOrgan.icon;
  const currentGoalObj = goalChips.find((g) => g.id === selectedGoal) || goalChips[0];

  return (
    <section className="relative overflow-hidden bg-pattern pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background ambient light orbs */}
      <div className="absolute top-0 right-0 -z-10 h-[650px] w-[650px] rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Heading & Bio-Intelligence Intro */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-6 shadow-2xs">
              <Activity size={14} className="text-emerald-500 animate-pulse" />
              <span>The AI Operating System for Longevity & Preventive Health</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.08] mb-6 font-heading"
          >
            Optimize Your Healthspan. <br className="hidden sm:inline" />
            <span className="gradient-text">Decode Your Biomarkers.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Unify smart wearables, lab reports, clinical records, nutrition, and 24×7 AI coaching into one continuous personal health baseline.
          </motion.p>

          {/* Interactive Organ / Biomarker Focus Selector */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-3xl mx-auto"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">
              Select Biomarker Focus:
            </span>
            {organOptions.map((organ) => {
              const isSelected = activeOrgan.id === organ.id;
              const Icon = organ.icon;
              return (
                <button
                  key={organ.id}
                  onClick={() => setActiveOrgan(organ)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gray-900 text-white shadow-md ring-2 ring-emerald-400/40'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-emerald-400' : organ.iconColor} />
                  <span>{organ.name}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Goal Selector Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-3"
          >
            {goalChips.map((chip) => {
              const isSelected = selectedGoal === chip.id;
              const ChipIcon = chip.icon;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedGoal(chip.id)}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ChipIcon size={12} className={isSelected ? 'text-white' : 'text-gray-500'} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <Link to={ROUTES.REGISTER} className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:shadow-emerald-500/25">
              Start Free Health Assessment <ArrowRight size={17} />
            </Link>
            <Link to={ROUTES.FEATURES} className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold">
              Explore All 12 Modules
            </Link>
          </motion.div>
        </div>

        {/* Live Interactive Telemetry Preview Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-4"
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-gray-700/70 relative overflow-hidden">
            {/* Ambient blur circle */}
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-emerald-500/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-sky-500/15 rounded-full blur-3xl -z-0" />

            {/* Top Status Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 border-b border-gray-700/60 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ActiveIcon size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">Live Bio-Intelligence Dashboard</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <p className="text-xs text-gray-400">Target Goal: <span className="text-emerald-400 font-semibold">{currentGoalObj.label}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold px-2.5 py-1 rounded-full">
                  {activeOrgan.badge}
                </span>
                <span className="text-xs bg-gray-800 text-gray-300 font-medium px-2.5 py-1 rounded-full border border-gray-700">
                  Biological Age: -3.8 Yrs
                </span>
              </div>
            </div>

            {/* Middle Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6 relative z-10">
              <div className="bg-gray-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-gray-700/50">
                <div className="text-[11px] text-gray-400 font-medium">Composite Health Score</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {activeOrgan.healthScore} <span className="text-xs text-gray-400 font-normal">/100</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Top 5% Longevity Tier</div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-gray-700/50">
                <div className="text-[11px] text-gray-400 font-medium">{activeOrgan.metricLabel}</div>
                <div className="text-lg font-black text-sky-400 mt-1 truncate">
                  {activeOrgan.metricValue}
                </div>
                <div className="text-[10px] text-sky-400 font-semibold mt-0.5">Live Sensor Stream</div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-gray-700/50">
                <div className="text-[11px] text-gray-400 font-medium">Cardiovascular Risk</div>
                <div className="text-2xl font-black text-violet-400 mt-1">
                  -34% <span className="text-xs text-gray-400 font-normal">10-Yr</span>
                </div>
                <div className="text-[10px] text-violet-400 font-semibold mt-0.5">Framingham Model</div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-gray-700/50">
                <div className="text-[11px] text-gray-400 font-medium">Clinical Lab Status</div>
                <div className="text-lg font-black text-emerald-400 mt-1">
                  18 Optimal
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">0 Critical Flags</div>
              </div>
            </div>

            {/* AI Coach Context Nudge Box */}
            <div className="bg-gray-800/90 rounded-2xl p-4 border border-gray-700/60 flex items-start gap-3 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Health Coach • Contextual Guidance</span>
                  <span className="text-[10px] text-gray-400">Just now</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-relaxed">
                  "{activeOrgan.coachNote}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
