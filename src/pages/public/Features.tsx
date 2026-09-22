import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Apple, Dumbbell, Moon, Brain, FileText, Watch, 
  ShieldCheck, ShoppingBag, BarChart3, Building2, UserCheck, 
  Search, CheckCircle2, ArrowRight, Sparkles, Activity, 
  Lock, Flame, ChevronRight, Zap, Shield, HeartPulse, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import CTA from '@/components/sections/CTA';
import { ROUTES } from '@/constants/routes';

interface ModuleItem {
  id: string;
  moduleNumber: string;
  title: string;
  category: 'core' | 'wellness' | 'clinical' | 'ecosystem';
  categoryLabel: string;
  icon: any;
  color: string;
  bgColor: string;
  tagline: string;
  description: string;
  features: string[];
  userActions: string;
  systemBehavior: string;
}

const allModules: ModuleItem[] = [
  {
    id: 'profile',
    moduleNumber: 'Module 01',
    title: 'Personal Health Profile',
    category: 'core',
    categoryLabel: 'Core Intelligence',
    icon: UserCheck,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    tagline: 'Comprehensive Digital Health Baseline',
    description: 'Establish a precision health baseline capturing medical history, known allergies, chronic conditions, family heredity, lifestyle assessments, and anthropometric body measurements.',
    features: [
      'Secure registration & encrypted health baseline',
      'Longitudinal medical & chronic condition tracking',
      'Allergy matrix & contraindication safety profile',
      'Family health history & genetic risk markers',
      'Lifestyle habits & anthropometric measurements',
      'Customizable biological & longevity goals',
    ],
    userActions: 'Complete health profile questionnaire and update baseline biometrics.',
    systemBehavior: 'Calibrates a personalized wellness baseline used by all downstream AI algorithms.',
  },
  {
    id: 'aicoach',
    moduleNumber: 'Module 02',
    title: 'AI Health Coach',
    category: 'core',
    categoryLabel: 'Core Intelligence',
    icon: Bot,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    tagline: '24×7 Contextual Wellness Assistant',
    description: 'An AI assistant powered by retrieval-augmented generation (RAG) that references your live sleep debt, recent blood panels, and resting HRV to deliver proactive daily habit micro-interventions.',
    features: [
      'Daily personalized health tips & morning briefings',
      'Proactive circadian habit coaching & evening wind-down',
      'Safe symptom guidance with non-diagnostic triage',
      'Medication, supplement & hydration reminders',
      'Conversational wellness chat with source citations',
      'Adaptive goal tracking & dynamic weekly action plans',
    ],
    userActions: 'Chat with AI coach, request custom lifestyle plans, and log subjective symptoms.',
    systemBehavior: 'Analyzes continuous telemetry to proactively recommend habit adjustments.',
  },
  {
    id: 'nutrition',
    moduleNumber: 'Module 03',
    title: 'Nutrition & Diet Planner',
    category: 'wellness',
    categoryLabel: 'Daily Wellness',
    icon: Apple,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    tagline: 'Precision Metabolic Nutrition Management',
    description: 'Full-spectrum dietary management with instant food barcode scanning, AI meal photo analysis, macro & micronutrient tracking, smart grocery list generation, and recipe recommendations.',
    features: [
      'Personalized meal planning (Keto, Longevity, Mediterranean, High-Protein)',
      'Accurate calorie, macro (P/F/C) & micronutrient breakdown',
      'Hydration & electrolyte intake tracker',
      'Smart grocery list generator based on weekly recipes',
      'High-speed food barcode & meal photo AI scanner',
      'Dietitian-approved healthy recipe suggestions',
    ],
    userActions: 'Scan barcodes, snap meal photos, track daily water, and generate grocery lists.',
    systemBehavior: 'Calculates energy balance and correlates meals with glucose/HRV recovery.',
  },
  {
    id: 'fitness',
    moduleNumber: 'Module 04',
    title: 'Fitness & Activity Tracking',
    category: 'wellness',
    categoryLabel: 'Daily Wellness',
    icon: Dumbbell,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    tagline: 'Daily Physical Activity & Progressive Overload',
    description: 'Monitor all workouts, daily step counts, and cardio zones. Build periodized strength programs with volume tracking, 1RM personal records, and participate in community challenges.',
    features: [
      'Personalized strength & Zone 2 cardio workout plans',
      'Extensive exercise library with proper video form demonstrations',
      'Real-time step counter & active calorie expenditure',
      'Strength progression, 1RM estimates & total volume curves',
      'Comprehensive activity history & personal records (PRs)',
      'Community & corporate fitness challenges with leaderboards',
    ],
    userActions: 'Log workouts, track cardio sessions, set personal records, and join challenges.',
    systemBehavior: 'Calculates strain scores and balances training load against sleep recovery.',
  },
  {
    id: 'sleep',
    moduleNumber: 'Module 05',
    title: 'Sleep & Recovery Analytics',
    category: 'wellness',
    categoryLabel: 'Daily Wellness',
    icon: Moon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    tagline: 'Circadian Sleep Architecture & Recovery Index',
    description: 'Optimize restorative sleep by monitoring REM, Light, and Deep sleep cycles. Receive bedtime recommendations calibrated to your body temperature drop and autonomic recovery index.',
    features: [
      'Sleep duration & sleep efficiency scoring',
      'Autonomic recovery index derived from nocturnal HRV',
      'Circadian bedtime recommendations & sleep window reminders',
      'Smart alarms synchronized with light sleep cycles',
      'Longitudinal sleep trends & sleep debt accumulation',
      'Pre-sleep guided relaxation & parasympathetic breathing',
    ],
    userActions: 'Review daily recovery index, track bedtime consistency, and follow wind-down protocols.',
    systemBehavior: 'Detects restorative deep sleep deficits and adjusts daily energy expenditure targets.',
  },
  {
    id: 'mental',
    moduleNumber: 'Module 06',
    title: 'Mental Wellness & Stress Resilience',
    category: 'wellness',
    categoryLabel: 'Daily Wellness',
    icon: Brain,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    tagline: 'Emotional Wellbeing & Autonomic Nervous System Tone',
    description: 'Support psychological health through daily mood journaling, guided meditation, real-time autonomic stress detection from HRV, gratitude logs, and burnout risk assessments.',
    features: [
      'Daily mood & cognitive energy journaling',
      'Guided mindfulness meditation library (audio & visual)',
      'Physiological sigh & box breathing exercises for stress relief',
      'Continuous daytime stress tracking via HRV balance',
      'Gratitude journaling & cognitive reframing exercises',
      'Clinical burnout risk assessment surveys',
    ],
    userActions: 'Log daily mood, complete breathing exercises, and listen to guided mindfulness.',
    systemBehavior: 'Monitors chronic autonomic stress patterns and triggers calming interventions.',
  },
  {
    id: 'records',
    moduleNumber: 'Module 07',
    title: 'Medical Records & Lab Vault',
    category: 'clinical',
    categoryLabel: 'Clinical & Devices',
    icon: FileText,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    tagline: 'Encrypted Personal Health Record & Lab OCR',
    description: 'A centralized, 256-bit encrypted medical vault for digital health records. Upload PDF lab results, store prescriptions and immunization histories, and share scoped access with doctors.',
    features: [
      'Automated OCR parser for Quest, Labcorp, and clinic PDFs',
      'Structured longitudinal biomarker trend charts (ApoB, HbA1c, hs-CRP)',
      'Digital prescription vault & medication schedule tracker',
      'Vaccination & immunization timeline records',
      'Doctor clinical notes & consultation summary vault',
      'Time-limited, password-protected document sharing tokens',
    ],
    userActions: 'Upload lab result PDFs, review biomarker ranges, and share records with physicians.',
    systemBehavior: 'Standardizes disparate clinical lab values into normalized LOINC time-series curves.',
  },
  {
    id: 'wearables',
    moduleNumber: 'Module 08',
    title: 'Wearable & Smart Device Sync',
    category: 'clinical',
    categoryLabel: 'Clinical & Devices',
    icon: Watch,
    color: 'text-gray-800',
    bgColor: 'bg-gray-100',
    tagline: 'Real-Time Biometric Stream Integration',
    description: 'Hardware-agnostic synchronization with Apple Watch, Oura, Garmin, WHOOP, Dexcom CGM, Withings, and smart scales to continuously capture vitals without manual input.',
    features: [
      'Sub-minute synchronization across 50+ smart devices',
      'Continuous resting heart rate & nocturnal HRV tracking',
      'Blood oxygen (SpO2) and respiratory rate telemetry',
      'ECG support & irregular rhythm event logging',
      'Blood pressure & vascular age integration',
      'Smart scale body composition (body fat %, muscle mass, hydration)',
    ],
    userActions: 'Connect wearable accounts via cloud OAuth or HealthKit permissions.',
    systemBehavior: 'De-duplicates multi-device feeds and filters out biometric artifacts.',
  },
  {
    id: 'risk',
    moduleNumber: 'Module 09',
    title: 'Preventive Health & Risk Assessment',
    category: 'clinical',
    categoryLabel: 'Clinical & Devices',
    icon: ShieldCheck,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    tagline: 'Longevity Risk Modeling & Screening Schedule',
    description: 'Clinically validated algorithms calculate cardiovascular, metabolic, and biological age risk scores. Provides age- and gender-specific preventive screening reminders.',
    features: [
      'Cardiovascular risk scoring (Framingham & ASCVD models)',
      'Biological vs. Chronological age differential calculation',
      'BMI, visceral fat & body composition risk modeling',
      'Age-appropriate preventive screening scheduler (Mammograms, Colonoscopies)',
      'Vaccination booster & annual health check planner',
      'Comprehensive lifestyle risk factor analysis',
    ],
    userActions: 'Complete annual risk assessments and schedule recommended preventive screenings.',
    systemBehavior: 'Calculates longevity curves and flags out-of-range clinical biomarker trends.',
  },
  {
    id: 'marketplace',
    moduleNumber: 'Module 10',
    title: 'Wellness Marketplace & Care Network',
    category: 'ecosystem',
    categoryLabel: 'Ecosystem & Governance',
    icon: ShoppingBag,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    tagline: 'Verified Care Providers & Supplement Store',
    description: 'Connect directly with verified longevity physicians, registered dietitians, fitness trainers, and health coaches for 1-on-1 consultations, personalized meal plans, and third-party tested supplements.',
    features: [
      'Vetted directory of functional doctors, dietitians, and coaches',
      'Integrated in-app appointment booking & video consultation bridge',
      'Direct client-coach data sharing with granular consent controls',
      'Curated store of third-party tested longevity supplements (NSF/USP)',
      'Customized healthy meal plan delivery subscriptions',
      'Verified customer ratings & clinical credential verification',
    ],
    userActions: 'Browse verified practitioners, book consultations, and purchase vetted supplements.',
    systemBehavior: 'Enables secure provider-to-client care delivery and handles payment escrow.',
  },
  {
    id: 'analytics',
    moduleNumber: 'Module 11',
    title: 'Health Analytics Dashboard',
    category: 'core',
    categoryLabel: 'Core Intelligence',
    icon: BarChart3,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    tagline: 'Unified Longevity Command Center',
    description: 'The central intelligence command center displaying your composite Health Score (0-100), multi-metric correlation graphs, habit consistency reports, and AI-generated weekly health digests.',
    features: [
      'Composite Health Score combining sleep, activity, nutrition, and labs',
      'Multi-axis correlation charts (e.g., Sleep vs. HRV vs. Fasting)',
      'Activity, cardiovascular, and metabolic trend analytics',
      'Habit consistency index & milestone achievements',
      'Mental wellness & autonomic stress heatmaps',
      'AI-generated weekly health progress reports & longevity forecast',
    ],
    userActions: 'Review weekly health reports, explore metric correlations, and monitor milestones.',
    systemBehavior: 'Aggregates all 11 modules into a single real-time health intelligence dashboard.',
  },
  {
    id: 'admin',
    moduleNumber: 'Module 12',
    title: 'Admin & Healthcare Partner Portal',
    category: 'ecosystem',
    categoryLabel: 'Ecosystem & Governance',
    icon: Building2,
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    tagline: 'Platform Governance & Enterprise Compliance',
    description: 'Enterprise portal for platform administrators, clinics, coaches, and corporate wellness managers to manage users, verify partner credentials, monitor security audit logs, and oversee compliance.',
    features: [
      'Multi-tier role-based access control (RBAC)',
      'Healthcare partner & coach credential verification workflow',
      'Corporate wellness program & de-identified cohort analytics',
      'Subscription billing & marketplace payout management',
      'Immutable HIPAA & SOC-2 compliance audit logging',
      'Platform telemetry, system uptime & security monitoring',
    ],
    userActions: 'Manage user roles, review audit logs, verify practitioner licenses, and launch corporate programs.',
    systemBehavior: 'Enforces strict data privacy isolation and maintains compliance audit trails.',
  },
];

const categoryTabs = [
  { id: 'all', label: 'All 12 Modules' },
  { id: 'core', label: 'AI & Core Health' },
  { id: 'wellness', label: 'Daily Wellness' },
  { id: 'clinical', label: 'Clinical & Devices' },
  { id: 'ecosystem', label: 'Ecosystem & Portals' },
];

const compatibilityList = [
  { brand: 'Apple Health', category: 'Smartwatch / Mobile', metrics: 'HRV, Sleep Stages, Resting HR, VO2 Max, ECG, Steps', status: 'Full Sync' },
  { brand: 'Oura Ring (Gen 3/4)', category: 'Smart Ring', metrics: 'Sleep Score, Readiness Index, HRV RMSSD, Skin Temp', status: 'Full Sync' },
  { brand: 'WHOOP 4.0', category: 'Biometric Strap', metrics: 'Strain Score, Sleep Debt, Nocturnal HRV, Respiratory Rate', status: 'Full Sync' },
  { brand: 'Garmin Connect', category: 'GPS & Multisport', metrics: 'VO2 Max, Body Battery, Pulse Ox, Training Load', status: 'Full Sync' },
  { brand: 'Dexcom CGM (G6/G7)', category: 'Bio-Sensor', metrics: 'Continuous Glucose, Mean Glucose, Glycemic Variability', status: 'Live Stream' },
  { brand: 'Withings Scale & BPM', category: 'Vascular & Scale', metrics: 'Body Fat %, Muscle Mass, Vascular Age, Pulse Wave', status: 'Full Sync' },
  { brand: 'Quest Diagnostics', category: 'Clinical Lab', metrics: 'Lipid Panels, hs-CRP, HbA1c, Vitamin D, Hormones (LOINC)', status: 'OCR / FHIR' },
  { brand: 'Labcorp', category: 'Clinical Lab', metrics: 'Comprehensive Metabolic Panels, CBC, Endocrine Tests', status: 'OCR / FHIR' },
];

const Features: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  // Filter modules
  const filteredModules = allModules.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Header */}
      <PageHeader
        title="Complete Platform Features"
        subtitle="Explore all 12 interconnected modules of LifestyleBio — engineered to unify wearables, clinical labs, nutrition, fitness, and AI coaching into one cohesive health ecosystem."
        image="/images/features/hero_features.jpg"
        breadcrumbs={[{ label: 'Features' }]}
        height="lg"
      />

      {/* Flagship Feature Highlights (Alternating Showcases) */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
              <Sparkles size={14} className="text-emerald-500" />
              <span>Flagship Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-heading">
              Intelligent Healthcare at <span className="gradient-text">Your Fingertips</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Experience the power of contextual AI and precision health tracking designed for lifelong longevity.
            </p>
          </div>

          {/* Highlight 1: AI Health Coach */}
          <div className="grid lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto mb-20">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold">
                <Bot size={14} />
                <span>Module 02 • AI Health Coach</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                24×7 Conversational Wellness Intelligence
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Unlike generic chatbots, our AI Health Coach is directly grounded in your live biometric data. It understands your nocturnal HRV recovery, yesterday's calorie deficit, and recent lab results before giving proactive habit recommendations.
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Non-diagnostic symptom check & doctor prep notes</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Proactive morning briefings based on nocturnal recovery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Contextual medication, hydration & circadian wind-down reminders</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-900">
                <img
                  src="/images/features/ai_coach.jpg"
                  alt="AI Health Coach App Interface"
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Highlight 2: AI Nutrition & Barcode Scanner */}
          <div className="grid lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
                <Apple size={14} />
                <span>Module 03 • Nutrition & Barcode Scanner</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                Instant AI Meal Analysis & Metabolic Macro Tracking
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Effortlessly log meals with our computer-vision barcode scanner and AI meal photo analyzer. Track essential macros and micronutrients with a comprehensive database of 1M+ verified foods.
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Instant barcode scanning with 1M+ verified food items</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Personalized meal plans & smart grocery list generation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Direct dietary sharing with your certified nutritionist</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100">
                <img
                  src="/images/features/nutrition_scan.jpg"
                  alt="AI Food Barcode Scanner and Nutrition Planner"
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 12 Modules Explorer */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
              <Activity size={14} className="text-emerald-500" />
              <span>Full Spectrum Health Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-heading">
              The 12 Core <span className="gradient-text">Platform Modules</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Explore every feature, user capability, and system behavior across the entire LifestyleBio ecosystem.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules by keyword (e.g., glucose, barcode, sleep, doctor, ECG, macros)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-gray-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            <AnimatePresence>
              {filteredModules.map((mod, idx) => {
                const ModuleIcon = mod.icon;
                const isExpanded = expandedModule === mod.id;

                return (
                  <motion.div
                    key={mod.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.04 }}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                          {mod.moduleNumber}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.bgColor} ${mod.color} group-hover:scale-110 transition-transform`}>
                          <ModuleIcon size={20} />
                        </div>
                      </div>

                      <h3 className="font-bold text-lg text-gray-900 mb-1 leading-snug">
                        {mod.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 mb-3">{mod.tagline}</p>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        {mod.description}
                      </p>

                      {/* Key Features List */}
                      <div className="space-y-2 pt-2 border-t border-gray-50">
                        {mod.features.slice(0, isExpanded ? mod.features.length : 3).map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable details drawer */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4 mt-4 border-t border-gray-100 space-y-3 text-xs bg-gray-50/70 p-3.5 rounded-2xl"
                        >
                          <div>
                            <strong className="text-gray-900 block font-semibold mb-0.5">User Actions:</strong>
                            <span className="text-gray-600">{mod.userActions}</span>
                          </div>
                          <div>
                            <strong className="text-emerald-700 block font-semibold mb-0.5">System Behavior:</strong>
                            <span className="text-gray-600">{mod.systemBehavior}</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom CTA / Expand Toggle */}
                    <div className="pt-5 mt-4 border-t border-gray-50 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        {isExpanded ? 'Show Less' : 'View Full Details'}
                      </button>
                      <Link
                        to={ROUTES.REGISTER}
                        className="text-xs font-bold text-gray-900 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Activate <ChevronRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Hardware & Clinical Lab Compatibility Matrix */}
      <section className="py-20 bg-gray-50/80 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-semibold mb-4">
              <Watch size={14} className="text-sky-500" />
              <span>Hardware & Diagnostic Compatibility</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Supported Devices & <span className="gradient-text">Clinical Integrations</span>
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              LifestyleBio connects seamlessly with leading wearables, bio-sensors, and clinical laboratories.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-3 font-semibold">Device / Partner</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Synchronized Telemetry</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {compatibilityList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 font-bold text-gray-900">{item.brand}</td>
                    <td className="py-3.5 text-gray-500">{item.category}</td>
                    <td className="py-3.5 text-gray-600 text-xs">{item.metrics}</td>
                    <td className="py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 size={11} className="text-emerald-500" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTA />
    </div>
  );
};

export default Features;
