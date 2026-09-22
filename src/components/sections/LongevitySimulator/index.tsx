import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, HeartPulse, Moon, Flame, Brain, ShieldAlert, Check, RefreshCw, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface SimulatorState {
  sleepHours: number;
  zone2Minutes: number;
  fastingHours: number;
  mindfulnessMinutes: number;
  strengthDays: number;
}

const LongevitySimulator: React.FC = () => {
  const [inputs, setInputs] = useState<SimulatorState>({
    sleepHours: 7.5,
    zone2Minutes: 120,
    fastingHours: 16,
    mindfulnessMinutes: 10,
    strengthDays: 3,
  });

  const sleepId = useId();
  const zone2Id = useId();
  const fastingId = useId();
  const mindId = useId();
  const strengthId = useId();

  // Dynamic longevity calculations based on scientific literature heuristics
  const calculateMetrics = () => {
    // Sleep contribution (optimal 7.5 - 8.5)
    const sleepDelta = inputs.sleepHours >= 7 && inputs.sleepHours <= 8.5 
      ? 1.2 : inputs.sleepHours < 6 ? -1.5 : 0.4;
    
    // Zone 2 cardio (150 min is standard guideline)
    const cardioDelta = (inputs.zone2Minutes / 60) * 0.7;

    // Fasting (14-18h optimal for autophagy triggers)
    const fastingDelta = inputs.fastingHours >= 14 ? (inputs.fastingHours - 12) * 0.3 : 0.1;

    // Mindfulness (stress / cortisol mitigation)
    const mindDelta = (inputs.mindfulnessMinutes / 10) * 0.4;

    // Strength (preserves lean muscle mass & bone density)
    const strengthDelta = inputs.strengthDays * 0.55;

    // Total estimated biological age reduction
    const rawAgeReduction = (sleepDelta + cardioDelta + fastingDelta + mindDelta + strengthDelta);
    const bioAgeDelta = Math.min(Math.max(parseFloat(rawAgeReduction.toFixed(1)), 0.5), 6.8);

    // Longevity Score (0 - 100)
    const baseScore = 65;
    const computedScore = Math.min(Math.round(baseScore + (bioAgeDelta * 4.8)), 99);

    // Cardiovascular risk reduction %
    const cvdReduction = Math.min(Math.round((inputs.zone2Minutes / 200) * 28 + (inputs.sleepHours >= 7 ? 12 : 2)), 48);

    // Insulin sensitivity boost %
    const metabolicBoost = Math.min(Math.round((inputs.fastingHours - 10) * 4 + inputs.strengthDays * 6), 56);

    return {
      bioAgeDelta,
      computedScore,
      cvdReduction,
      metabolicBoost,
    };
  };

  const metrics = calculateMetrics();

  const resetDefaults = () => {
    setInputs({
      sleepHours: 7.5,
      zone2Minutes: 120,
      fastingHours: 16,
      mindfulnessMinutes: 10,
      strengthDays: 3,
    });
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/3 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[140px]" />
      <div className="absolute bottom-10 right-0 -z-10 h-[450px] w-[450px] rounded-full bg-violet-500/5 blur-[130px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
            <Sparkles size={14} className="text-emerald-500" />
            <span>LifestyleBio Labs • Interactive Biomarker Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Simulate Your <span className="gradient-text">Biological Age & Longevity</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Adjust your daily lifestyle protocols below. Our predictive health intelligence engine models how continuous habit optimization shifts your biomarker trajectory.
          </p>
        </div>

        {/* Interactive Lab Sandbox Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-gray-50/90 rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/80">
              <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Protocol Controls</span>
              <button
                onClick={resetDefaults}
                className="text-xs font-medium text-gray-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw size={13} /> Reset Baseline
              </button>
            </div>

            <div className="space-y-6">
              {/* Slider 1: Sleep */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={sleepId} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Moon size={16} className="text-sky-500" /> Sleep Duration
                  </label>
                  <span className="text-sm font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md">
                    {inputs.sleepHours} hrs / night
                  </span>
                </div>
                <input
                  id={sleepId}
                  type="range"
                  min="5"
                  max="9.5"
                  step="0.5"
                  value={inputs.sleepHours}
                  onChange={(e) => setInputs({ ...inputs, sleepHours: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>5h (Deficit)</span>
                  <span>7.5h - 8.5h (Optimal Autophagy & HRV)</span>
                  <span>9.5h+</span>
                </div>
              </div>

              {/* Slider 2: Zone 2 Cardio */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={zone2Id} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <HeartPulse size={16} className="text-emerald-500" /> Zone 2 Aerobic Base
                  </label>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {inputs.zone2Minutes} mins / week
                  </span>
                </div>
                <input
                  id={zone2Id}
                  type="range"
                  min="0"
                  max="240"
                  step="15"
                  value={inputs.zone2Minutes}
                  onChange={(e) => setInputs({ ...inputs, zone2Minutes: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>0m (Sedentary)</span>
                  <span>150m (Longevity Standard)</span>
                  <span>240m (Peak VO2 Max)</span>
                </div>
              </div>

              {/* Slider 3: Fasting Window */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={fastingId} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Flame size={16} className="text-orange-500" /> Intermittent Fasting
                  </label>
                  <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md">
                    {inputs.fastingHours}:{24 - inputs.fastingHours} Protocol
                  </span>
                </div>
                <input
                  id={fastingId}
                  type="range"
                  min="12"
                  max="20"
                  step="1"
                  value={inputs.fastingHours}
                  onChange={(e) => setInputs({ ...inputs, fastingHours: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>12h (Circadian)</span>
                  <span>16h (Cellular Repair)</span>
                  <span>20h (Deep Autophagy)</span>
                </div>
              </div>

              {/* Slider 4: Mindfulness */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={mindId} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Brain size={16} className="text-violet-500" /> Mind & Stress Mitigation
                  </label>
                  <span className="text-sm font-bold text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-md">
                    {inputs.mindfulnessMinutes} mins / day
                  </span>
                </div>
                <input
                  id={mindId}
                  type="range"
                  min="0"
                  max="30"
                  step="5"
                  value={inputs.mindfulnessMinutes}
                  onChange={(e) => setInputs({ ...inputs, mindfulnessMinutes: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>0m</span>
                  <span>10m (Cortisol Reduction)</span>
                  <span>30m (Vagal Tone Boost)</span>
                </div>
              </div>

              {/* Slider 5: Strength */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={strengthId} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles size={16} className="text-teal-500" /> Strength & Resistance
                  </label>
                  <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-md">
                    {inputs.strengthDays} days / week
                  </span>
                </div>
                <input
                  id={strengthId}
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={inputs.strengthDays}
                  onChange={(e) => setInputs({ ...inputs, strengthDays: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>0 Days</span>
                  <span>3 Days (Bone & Muscle Preservation)</span>
                  <span>5 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Projected Outcomes Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Main Score Card */}
            <motion.div
              layout
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-7 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/20 rounded-full blur-3xl -z-0" />
              
              <div className="flex justify-between items-start relative z-10 mb-6">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                    Projected Longevity Shift
                  </span>
                  <h3 className="text-2xl font-bold mt-1 text-white">Biological Age Delta</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Zap size={22} className="text-emerald-400" />
                </div>
              </div>

              {/* Big Delta Metric */}
              <div className="relative z-10 flex items-baseline gap-2 mb-6">
                <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-violet-300">
                  -{metrics.bioAgeDelta}
                </span>
                <span className="text-xl font-bold text-gray-300">Years Younger</span>
              </div>

              {/* Sub-Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-700/60 relative z-10">
                <div className="bg-gray-800/60 p-3 rounded-xl border border-gray-700/40 text-center">
                  <div className="text-[10px] text-gray-400 font-medium">Health Score</div>
                  <div className="text-lg font-extrabold text-emerald-400 mt-0.5">{metrics.computedScore}/100</div>
                </div>
                <div className="bg-gray-800/60 p-3 rounded-xl border border-gray-700/40 text-center">
                  <div className="text-[10px] text-gray-400 font-medium">CVD Risk</div>
                  <div className="text-lg font-extrabold text-sky-400 mt-0.5">-{metrics.cvdReduction}%</div>
                </div>
                <div className="bg-gray-800/60 p-3 rounded-xl border border-gray-700/40 text-center">
                  <div className="text-[10px] text-gray-400 font-medium">Metabolic</div>
                  <div className="text-lg font-extrabold text-violet-400 mt-0.5">+{metrics.metabolicBoost}%</div>
                </div>
              </div>
            </motion.div>

            {/* AI Recommendation Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                <Check size={16} className="text-emerald-500" />
                <span>AI Longevity Assessment</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Your combination of <strong className="text-gray-900">{inputs.zone2Minutes}m Zone 2</strong> and <strong className="text-gray-900">{inputs.fastingHours}h fasting</strong> primes mitochondrial biogenesis. Sleep score is projected at <strong className="text-emerald-600">88+</strong> with healthy deep-to-REM cycling.
              </p>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <Link
                  to={ROUTES.REGISTER}
                  className="w-full btn-primary flex items-center justify-center gap-2 text-sm font-bold shadow-md hover:shadow-emerald-500/20"
                >
                  Save My Protocol & Start Tracking <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongevitySimulator;
