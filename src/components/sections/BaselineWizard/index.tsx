import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, 
  Dna, Moon, Droplets, Zap, Brain, Watch, Compass, ClipboardList, LucideIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface GoalItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  desc: string;
}

interface DeviceItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const goals: GoalItem[] = [
  { id: 'longevity', label: 'Lower Biological Age & Healthspan', icon: Dna, color: 'text-emerald-600', bgColor: 'bg-emerald-50', desc: 'Optimize cellular repair, blood biomarkers & VO2 max' },
  { id: 'sleep', label: 'Deep Sleep & Recovery Architecture', icon: Moon, color: 'text-sky-600', bgColor: 'bg-sky-50', desc: 'Maximize nocturnal HRV, sleep stages & autonomic rest' },
  { id: 'metabolic', label: 'Metabolic Health & Glucose Control', icon: Droplets, color: 'text-red-500', bgColor: 'bg-red-50', desc: 'Stabilize insulin response, body fat & nutrition macros' },
  { id: 'fitness', label: 'Peak Athletic & Strength Stamina', icon: Zap, color: 'text-amber-500', bgColor: 'bg-amber-50', desc: 'Periodized training, strain tracking & progressive overload' },
  { id: 'stress', label: 'Stress Mitigation & Cognitive Clarity', icon: Brain, color: 'text-violet-600', bgColor: 'bg-violet-50', desc: 'Cortisol regulation, breathwork & mood stability' },
];

const devices: DeviceItem[] = [
  { id: 'apple', label: 'Apple Watch / HealthKit', icon: Watch, color: 'text-gray-800', bgColor: 'bg-gray-100' },
  { id: 'oura', label: 'Oura Ring (Gen 3/4)', icon: Moon, color: 'text-sky-600', bgColor: 'bg-sky-50' },
  { id: 'whoop', label: 'WHOOP 4.0', icon: Zap, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { id: 'garmin', label: 'Garmin Connect', icon: Compass, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'cgm', label: 'Dexcom / Libre CGM', icon: Droplets, color: 'text-red-500', bgColor: 'bg-red-50' },
  { id: 'manual', label: 'No Device (Manual & Lab Logging)', icon: ClipboardList, color: 'text-gray-600', bgColor: 'bg-gray-100' },
];

const BaselineWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [ageRange, setAgeRange] = useState('30-45');
  const [sex, setSex] = useState<'female' | 'male' | 'other'>('male');
  const [selectedGoal, setSelectedGoal] = useState(goals[0].id);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['apple']);
  const navigate = useNavigate();

  const toggleDevice = (devId: string) => {
    if (devId === 'manual') {
      setSelectedDevices(['manual']);
      return;
    }
    const filtered = selectedDevices.filter((d) => d !== 'manual');
    if (filtered.includes(devId)) {
      setSelectedDevices(filtered.filter((d) => d !== devId));
    } else {
      setSelectedDevices([...filtered, devId]);
    }
  };

  const handleFinish = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-xl relative">
          {/* Top Wizard Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                {step === 4 ? <CheckCircle2 size={22} className="text-emerald-500" /> : `0${step}`}
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  {step === 1 && 'Step 1: Biological Demographics'}
                  {step === 2 && 'Step 2: Primary Health Focus'}
                  {step === 3 && 'Step 3: Connected Smart Devices'}
                  {step === 4 && 'Your Personalized Healthspan Baseline'}
                </h3>
                <p className="text-xs text-gray-400">
                  {step < 4 ? `Step ${step} of 3 • Takes less than 60 seconds` : 'Generated Instant AI Action Plan'}
                </p>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === step
                      ? 'w-6 bg-emerald-500'
                      : s < step
                      ? 'w-2 bg-emerald-300'
                      : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Wizard Body Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                    Let's establish your biological baseline
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Age and biological sex provide the foundational context for endocrine ranges, metabolic rates, and cardiovascular norms.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Age Bracket
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['18-29', '30-44', '45-59', '60+'].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setAgeRange(age)}
                          className={`p-3.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                            ageRange === age
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {age} Years
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Biological Sex
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'male', label: 'Male' },
                        { id: 'female', label: 'Female' },
                        { id: 'other', label: 'Prefer not to say' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSex(s.id as any)}
                          className={`p-3.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                            sex === s.id
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary flex items-center gap-2 text-sm font-bold"
                  >
                    Continue to Health Goals <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                    What is your primary health & longevity objective?
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Your choice tailors the AI Coach focus and prioritizes specific biomarker tracking modules.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {goals.map((g) => {
                    const GoalIcon = g.icon;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGoal(g.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          selectedGoal === g.id
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-xl ${g.bgColor} ${g.color} flex items-center justify-center shrink-0`}>
                            <GoalIcon size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-900">{g.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{g.desc}</div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedGoal === g.id
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-gray-300'
                        }`}>
                          {selectedGoal === g.id && <CheckCircle2 size={13} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-ghost text-sm font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-primary flex items-center gap-2 text-sm font-bold"
                  >
                    Next: Connected Devices <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                    Select your smart health devices & wearables
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Select all that apply. LifestyleBio synchronizes in real time without manual entry.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {devices.map((d) => {
                    const isSelected = selectedDevices.includes(d.id);
                    const DeviceIcon = d.icon;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggleDevice(d.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${d.bgColor} ${d.color} flex items-center justify-center shrink-0`}>
                            <DeviceIcon size={18} />
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-gray-800">{d.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
                        }`}>
                          {isSelected && <CheckCircle2 size={11} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-ghost text-sm font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="btn-primary flex items-center gap-2 text-sm font-bold"
                  >
                    Generate My Baseline <Sparkles size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/20 rounded-full blur-3xl -z-0" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
                      <Sparkles size={13} /> Baseline Calibration Complete
                    </div>
                    
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      Your Projected Longevity Profile
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                      Based on age bracket <strong>{ageRange}</strong> with primary focus on <strong>{goals.find((g) => g.id === selectedGoal)?.label}</strong>:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-700/60">
                      <div className="bg-gray-800/80 p-3.5 rounded-xl text-center">
                        <div className="text-[10px] text-gray-400 font-medium">Initial Health Score</div>
                        <div className="text-2xl font-black text-emerald-400 mt-1">91 / 100</div>
                      </div>
                      <div className="bg-gray-800/80 p-3.5 rounded-xl text-center">
                        <div className="text-[10px] text-gray-400 font-medium">Projected Bio Age</div>
                        <div className="text-2xl font-black text-sky-400 mt-1">-3.8 Yrs</div>
                      </div>
                      <div className="bg-gray-800/80 p-3.5 rounded-xl text-center">
                        <div className="text-[10px] text-gray-400 font-medium">Synced Sensors</div>
                        <div className="text-2xl font-black text-violet-400 mt-1">{selectedDevices.length} Active</div>
                      </div>
                      <div className="bg-gray-800/80 p-3.5 rounded-xl text-center">
                        <div className="text-[10px] text-gray-400 font-medium">AI Coach Brief</div>
                        <div className="text-2xl font-black text-emerald-400 mt-1">Ready</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                    <span>Free 14-day full platform access • No credit card required</span>
                  </div>
                  <button
                    onClick={handleFinish}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:shadow-emerald-500/25"
                  >
                    Activate My Account & Dashboard <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BaselineWizard;
