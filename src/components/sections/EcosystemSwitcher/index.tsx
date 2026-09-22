import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Apple, Dumbbell, Stethoscope, Building2, Users, 
  CheckCircle2, ArrowRight, ShieldCheck, BarChart3, Clock, LineChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const personas = [
  {
    id: 'individual',
    title: 'Individual User',
    roleLabel: 'For Longevity & Biohacking Seekers',
    icon: User,
    color: 'emerald',
    tagline: 'Take 100% Control of Your Healthspan',
    desc: 'Connect your wearable devices, decode your lab reports, track daily nutrition and recovery, and receive proactive 24×7 guidance from your biomarker-grounded AI Health Coach.',
    bullets: [
      'Personalized Longevity & Composite Health Score',
      'Unified daily telemetry (HRV, sleep stages, glucose, steps)',
      'Automated lab biomarker timeline and biological age estimation',
      'One-tap sharing with your doctor, trainer, or nutritionist',
    ],
    metric: { value: '94%', label: 'Long-term Habit Adherence' },
    cta: 'Start Free Individual Plan',
    ctaLink: ROUTES.REGISTER,
  },
  {
    id: 'nutritionist',
    title: 'Nutritionist & Dietitian',
    roleLabel: 'For Dietary Professionals',
    icon: Apple,
    color: 'orange',
    tagline: 'Deliver Evidence-Based Nutrition at Scale',
    desc: 'Eliminate tedious manual food logging. Review real-time client meal photos, macro compliance, micronutrient trends, and continuous glucose curves to tailor precision diet plans.',
    bullets: [
      'Live client food journal and macro/micronutrient tracking',
      'Automated grocery list and custom recipe plan generator',
      'Biomarker correlation (Cholesterol, Fasting Glucose vs. Meals)',
      'Built-in client messaging and telehealth scheduling',
    ],
    metric: { value: '3.2x', label: 'Faster Protocol Revisions' },
    cta: 'Join as a Certified Nutritionist',
    ctaLink: ROUTES.REGISTER,
  },
  {
    id: 'coach',
    title: 'Fitness Coach',
    roleLabel: 'For Personal Trainers & S&C Coaches',
    icon: Dumbbell,
    color: 'sky',
    tagline: 'Optimize Recovery, Strain & Progressive Overload',
    desc: 'Build custom periodized workout regimens. Monitor client recovery indices before they train to prevent overtraining injuries, and track 1RM strength curves over time.',
    bullets: [
      'Comprehensive exercise library with form check guides',
      'Live strain vs. recovery monitoring (Whoop/Oura/Garmin sync)',
      'Strength progression analytics and volume load tracking',
      'Automated group fitness challenges and leaderboards',
    ],
    metric: { value: '-42%', label: 'Client Overtraining Incidents' },
    cta: 'Join as a Fitness Coach',
    ctaLink: ROUTES.REGISTER,
  },
  {
    id: 'healthcare',
    title: 'Healthcare Provider',
    roleLabel: 'For Doctors & Functional Medicine',
    icon: Stethoscope,
    color: 'teal',
    tagline: 'Longitudinal Patient Telemetry Between Clinical Visits',
    desc: 'Access patient-consented longitudinal vitals, blood panels, and medication compliance data. Receive flagged alerts for out-of-range clinical metrics before routine visits.',
    bullets: [
      'HIPAA-compliant longitudinal patient chart & trend viewer',
      'FHIR / HL7 standardized lab report import & export',
      'Custom clinical notes and preventive screening protocols',
      'Secure doctor-to-patient consultation messaging',
    ],
    metric: { value: '100%', label: 'HIPAA & SOC-2 Compliant' },
    cta: 'Partner With LifestyleBio',
    ctaLink: ROUTES.REGISTER,
  },
  {
    id: 'corporate',
    title: 'Corporate Wellness',
    roleLabel: 'For HR & Employee Health Leaders',
    icon: Building2,
    color: 'purple',
    tagline: 'Boost Team Vitality & Lower Healthcare Premiums',
    desc: 'Launch company-wide wellness initiatives, step challenges, and burnout prevention programs while strictly preserving individual employee data privacy through de-identified cohort analytics.',
    bullets: [
      'De-identified aggregate employee health & vitality index',
      'Company step challenges and gamified wellness milestones',
      'Mental health and burnout assessment trend heatmaps',
      'Measurable ROI on corporate health benefit spending',
    ],
    metric: { value: '+28%', label: 'Employee Engagement Lift' },
    cta: 'Book Corporate Demo',
    ctaLink: ROUTES.REGISTER,
  },
  {
    id: 'family',
    title: 'Family Circle',
    roleLabel: 'For Multi-Generational Caregivers',
    icon: Users,
    color: 'blue',
    tagline: 'Keep Your Loved Ones Safe & Healthy Together',
    desc: 'Monitor health milestones for aging parents or children with permission-scoped views. Receive automated alerts for irregular heart rates, low physical activity, or missed medications.',
    bullets: [
      'Shared family health dashboard with granular privacy controls',
      'Automated high-risk biometric notifications (SpO2 drops, fall alerts)',
      'Centralized family immunization and prescription vault',
      'Shared healthy habit challenges across generations',
    ],
    metric: { value: '24×7', label: 'Proactive Family Safety Alerts' },
    cta: 'Create Family Circle',
    ctaLink: ROUTES.REGISTER,
  },
];

const EcosystemSwitcher: React.FC = () => {
  const [activePersona, setActivePersona] = useState(personas[0]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-800 text-xs font-semibold mb-4">
            <Users size={14} className="text-violet-500" />
            <span>Multi-Sided Health Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Built for Everyone in Your <span className="gradient-text">Care Network</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            LifestyleBio connects individuals directly with their dietitians, trainers, physicians, employers, and loved ones through secure, permission-scoped portals.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide max-w-5xl mx-auto mb-12">
          {personas.map((p) => {
            const isActive = activePersona.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePersona(p)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <p.icon size={16} className={isActive ? 'text-emerald-400' : 'text-gray-500'} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Persona Display Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-emerald-50/20 rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <activePersona.icon size={15} className="text-emerald-600" />
                  <span>{activePersona.roleLabel}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {activePersona.tagline}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {activePersona.desc}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {activePersona.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    to={activePersona.ctaLink}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    {activePersona.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Key Metric Highlight */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-7 border border-gray-100 shadow-md flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase">Impact Metric</span>
                    <BarChart3 size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-gray-900 font-heading">
                      {activePersona.metric.value}
                    </div>
                    <div className="text-sm font-semibold text-emerald-600 mt-1">
                      {activePersona.metric.label}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Designed specifically for high-frequency engagement and verified clinical data privacy.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>Granular role-based permissions & encrypted data store</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSwitcher;
