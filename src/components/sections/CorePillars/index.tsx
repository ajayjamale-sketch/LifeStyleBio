import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Watch, FileText, Activity, Bot, ChevronRight, CheckCircle2, 
  Sparkles, Heart, Apple, Moon, Brain, Shield, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const pillars = [
  {
    id: 'ingestion',
    number: '01',
    title: 'Continuous Ingestion & Wearable Hub',
    subtitle: 'Real-Time Biometric Stream',
    icon: Watch,
    color: 'emerald',
    badge: 'Hardware Agnostic',
    desc: 'Unify heart rate variability (HRV), continuous glucose monitoring (CGM), sleep architecture, resting vitals, and SpO2 from Apple Watch, Oura, Garmin, Whoop, and smart scales into a live longitudinal telemetry stream.',
    features: [
      'Sub-minute telemetry sync across 50+ smart devices',
      'Continuous daytime stress and autonomic recovery detection',
      'Smart sensor de-duplication and artifact cleaning',
      'Automated baseline calibration over rolling 30-day windows',
    ],
    previewType: 'wearables',
  },
  {
    id: 'labs',
    number: '02',
    title: 'Medical Vault & Lab Biomarker OCR',
    subtitle: 'Decode Blood Panels & Reports',
    icon: FileText,
    color: 'sky',
    badge: 'Clinical Grade',
    desc: 'Transform opaque PDF lab reports and prescription scans into standardized LOINC-indexed biomarker trends. Monitor ApoB, hs-CRP, HbA1c, Vitamin D, and hormonal panels alongside your daily wearable data.',
    features: [
      'Automated OCR parser for Quest, Labcorp, and hospital PDFs',
      'Interactive biological age calculation & cardiovascular risk curves',
      'Encrypted AES-256 client vault with time-limited sharing tokens',
      'Optimal longevity ranges vs. standard broad reference ranges',
    ],
    previewType: 'labs',
  },
  {
    id: 'lifestyle',
    number: '03',
    title: '360° Lifestyle Optimization Engine',
    subtitle: 'Nutrition, Fitness, Sleep & Mind',
    icon: Activity,
    color: 'violet',
    badge: 'Behavioral Science',
    desc: 'Integrate the 4 pillars of daily longevity. AI-driven macro scanning with 1M+ food database, progressive overload workout builder, circadian sleep stage optimizer, and real-time stress mitigation breathwork.',
    features: [
      'Instant barcode & meal photo AI macro/micronutrient breakdown',
      'Circadian bedtime recommendations based on body temperature & HRV',
      'Periodized strength and Zone 2 cardio plans built for healthspan',
      'Guided mindfulness, gratitude journaling, and burnout risk index',
    ],
    previewType: 'lifestyle',
  },
  {
    id: 'aicoach',
    number: '04',
    title: '24×7 Contextual AI Health Coach',
    subtitle: 'Grounded in Your Biomarkers',
    icon: Bot,
    color: 'teal',
    badge: 'Context-Aware RAG',
    desc: 'An AI wellness intelligence companion that never hallucinates in a vacuum. It reads your actual blood labs, yesterday’s sleep debt, and current recovery index to deliver proactive, non-diagnostic micro-actions.',
    features: [
      'Biomarker-grounded responses (allergies, medications, sleep data)',
      'Proactive habit interventions and morning recovery briefings',
      'Non-diagnostic symptom check and doctor discussion guides',
      'Continuous healthspan forecasting and weekly performance digests',
    ],
    previewType: 'ai',
  },
];

const CorePillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState(pillars[0]);

  return (
    <section className="py-24 bg-gray-50/60 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-semibold mb-4">
            <Activity size={14} className="text-sky-500" />
            <span>The 4 Pillars of Lifestyle Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            How LifestyleBio Powers <span className="gradient-text">Complete Health Mastery</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Move beyond isolated single-metric apps. We unify the four critical layers of health intelligence into one continuous optimization flywheel.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-12">
          {pillars.map((p) => {
            const isActive = activePillar.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(p)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/70 border-gray-200/80 hover:bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {p.number}
                  </span>
                  <p.icon size={18} className={isActive ? 'text-emerald-500' : 'text-gray-400'} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">{p.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 truncate">{p.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Active Showcase */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-10 items-center"
            >
              {/* Text / Features Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <Sparkles size={13} className="text-emerald-500" />
                  <span>{activePillar.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  {activePillar.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {activePillar.desc}
                </p>

                <div className="space-y-3 pt-2">
                  {activePillar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to={ROUTES.REGISTER}
                    className="btn-primary inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    Explore Pillar Capabilities <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Interactive Visual Mockup Column */}
              <div className="lg:col-span-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-gray-700">
                  <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/10 rounded-full blur-3xl -z-0" />
                  
                  {/* Visual Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700/60 mb-5 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        {activePillar.number}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-200">{activePillar.title}</div>
                        <div className="text-[10px] text-emerald-400">Live Telemetry Simulation</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Sync Active
                    </span>
                  </div>

                  {/* Render Mockup based on previewType */}
                  {activePillar.previewType === 'wearables' && (
                    <div className="space-y-3 relative z-10">
                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Heart size={18} className="text-red-400 animate-pulse" />
                          <div>
                            <div className="text-xs text-gray-400">Heart Rate Variability (HRV)</div>
                            <div className="text-base font-bold text-white">68 ms <span className="text-xs text-emerald-400 font-normal">(+14% vs 30d baseline)</span></div>
                          </div>
                        </div>
                        <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-md">Optimal</span>
                      </div>

                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Moon size={18} className="text-sky-400" />
                          <div>
                            <div className="text-xs text-gray-400">Sleep Recovery Index</div>
                            <div className="text-base font-bold text-white">92 / 100 <span className="text-xs text-sky-400 font-normal">(1h 48m Deep)</span></div>
                          </div>
                        </div>
                        <span className="text-xs bg-sky-900/60 text-sky-300 px-2 py-0.5 rounded-md">Restorative</span>
                      </div>

                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity size={18} className="text-emerald-400" />
                          <div>
                            <div className="text-xs text-gray-400">Continuous Glucose (CGM)</div>
                            <div className="text-base font-bold text-white">92 mg/dL <span className="text-xs text-gray-400 font-normal">(Variability: 12)</span></div>
                          </div>
                        </div>
                        <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-md">In Range (99%)</span>
                      </div>
                    </div>
                  )}

                  {activePillar.previewType === 'labs' && (
                    <div className="space-y-3 relative z-10">
                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-300 font-semibold">ApoB (Cardiovascular Risk)</span>
                          <span className="text-xs text-emerald-400 font-bold">62 mg/dL (Top 5%)</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '32%' }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                          <span>Optimal (&lt;70)</span>
                          <span>Moderate (70-90)</span>
                          <span>Elevated (&gt;90)</span>
                        </div>
                      </div>

                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-300 font-semibold">hs-CRP (Systemic Inflammation)</span>
                          <span className="text-xs text-emerald-400 font-bold">0.4 mg/L (Low Risk)</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '18%' }} />
                        </div>
                      </div>

                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-300 font-semibold">HbA1c (Glycemic Average)</span>
                          <span className="text-xs text-sky-400 font-bold">5.1% (Optimal)</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-sky-400 h-2 rounded-full" style={{ width: '40%' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {activePillar.previewType === 'lifestyle' && (
                    <div className="space-y-3 relative z-10">
                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Apple size={18} className="text-orange-400" />
                          <div>
                            <div className="text-xs text-gray-400">Daily Macros Logged</div>
                            <div className="text-xs font-bold text-white">142g Protein • 58g Fat • 165g Carbs</div>
                          </div>
                        </div>
                        <span className="text-xs text-orange-400 font-bold">96% Target</span>
                      </div>

                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity size={18} className="text-sky-400" />
                          <div>
                            <div className="text-xs text-gray-400">Zone 2 Aerobic Base</div>
                            <div className="text-xs font-bold text-white">45m Completed • 138 bpm avg</div>
                          </div>
                        </div>
                        <span className="text-xs text-sky-400 font-bold">In Target Zone</span>
                      </div>

                      <div className="bg-gray-800/80 p-3.5 rounded-xl border border-gray-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Brain size={18} className="text-violet-400" />
                          <div>
                            <div className="text-xs text-gray-400">Mindfulness & Vagal Tone</div>
                            <div className="text-xs font-bold text-white">Box Breathing (10 min)</div>
                          </div>
                        </div>
                        <span className="text-xs text-violet-400 font-bold">HRV +9ms</span>
                      </div>
                    </div>
                  )}

                  {activePillar.previewType === 'ai' && (
                    <div className="space-y-3 relative z-10 text-xs">
                      <div className="bg-gray-800/90 p-3 rounded-xl border border-gray-700/60 flex gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                          AI
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                          "Good morning Alex. Your sleep recovery is <strong>92/100</strong> and resting HR is down 3 bpm. Since yesterday's Zone 2 run depleted glycogen, prioritize <strong>35g protein with whole complex carbs</strong> for lunch."
                        </p>
                      </div>

                      <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40 flex items-center justify-between text-emerald-300">
                        <span className="flex items-center gap-1.5"><Zap size={13} className="text-emerald-400" /> Action Plan: 10m Evening Mobility + 400mg Magnesium</span>
                        <span className="text-[10px] font-bold bg-emerald-800/60 px-2 py-0.5 rounded">Ready</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
