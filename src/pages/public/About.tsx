import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, ShieldCheck, Activity, Bot, Sparkles, 
  Apple, Dumbbell, Zap, Lock, Award, HeartPulse, 
  CheckCircle2, ArrowRight, Dna, Microscope, Users, Building2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import CTA from '@/components/sections/CTA';
import { ROUTES } from '@/constants/routes';

const missionPillars = [
  {
    icon: ShieldCheck,
    title: 'Promote Preventive Healthcare',
    desc: 'Shift the paradigm from reactive sickness management to proactive disease prevention by identifying risk markers years before clinical symptoms manifest.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    icon: Activity,
    title: 'Simplify Health Monitoring',
    desc: 'Unify disparate wearable telemetry, clinical lab reports, continuous glucose feeds, and daily habits into a single, intuitive personal health OS.',
    color: 'text-sky-600 bg-sky-50 border-sky-100',
  },
  {
    icon: Apple,
    title: 'Personalize Nutrition & Fitness',
    desc: 'Deliver individualized dietary protocols, progressive overload workouts, and macro targets calibrated to your unique metabolic baseline and genetic profile.',
    color: 'text-orange-600 bg-orange-50 border-orange-100',
  },
  {
    icon: Zap,
    title: 'Encourage Healthy Habits',
    desc: 'Empower continuous micro-behavioral changes through contextual circadian nudges, habit consistency scores, and real-time biometric feedback loops.',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    icon: Bot,
    title: 'AI-Driven Wellness Coaching',
    desc: 'A 24×7 conversational health companion grounded in your actual lab panels and sleep architecture, delivering safe, non-diagnostic daily action plans.',
    color: 'text-violet-600 bg-violet-50 border-violet-100',
  },
  {
    icon: Sparkles,
    title: 'Continuous Longevity Insights',
    desc: 'Track biological age reduction, cardiovascular resilience curves, and metabolic stability to help every human live a healthier, longer, and more fulfilling life.',
    color: 'text-teal-600 bg-teal-50 border-teal-100',
  },
];

const advisoryBoard = [
  {
    name: 'Dr. Christopher Chen, MD',
    role: 'Chief Medical Officer • Longevity Medicine',
    credentials: 'Harvard Medical School • 18+ Yrs Clinical Experience',
    bio: 'Pioneer in cardiovascular longevity and preventive biomarker analytics. Dr. Chen oversees LifestyleBio’s clinical risk algorithms and diagnostic safety guardrails.',
    image: '/images/about/advisor_chen.jpg',
    specialties: ['Cardiovascular Biomarkers', 'ApoB Optimization', 'Longevity Protocols'],
  },
  {
    name: 'Dr. Amara Patel, PhD',
    role: 'VP of AI & Health Intelligence',
    credentials: 'Stanford University Bio-X • Computational Biology',
    bio: 'Leading researcher in multi-modal health machine learning and retrieval-augmented biomarker synthesis. Architect of LifestyleBio’s 24×7 Contextual AI Coach.',
    image: '/images/about/advisor_amara.jpg',
    specialties: ['Contextual RAG Models', 'Telemetry Ingestion', 'Predictive Analytics'],
  },
  {
    name: 'Dr. Julian Weiss, MD, PhD',
    role: 'Director of Epigenetics & Longevity',
    credentials: 'Mayo Clinic Fellow • University of Copenhagen',
    bio: 'Specialist in biological age clocks, cellular senescence, and mitochondrial biogenesis. Drives LifestyleBio’s longitudinal healthspan forecasting engine.',
    image: '/images/about/advisor_weiss.jpg',
    specialties: ['Biological Age Clocks', 'Mitochondrial Health', 'Metabolic Fitness'],
  },
];

const paradigmComparison = [
  {
    dimension: 'Approach',
    traditional: 'Reactive (treats disease after symptoms appear)',
    lifestyleBio: 'Preventive (optimizes healthspan before disease onset)',
  },
  {
    dimension: 'Data Frequency',
    traditional: 'Episodic (1 annual physical checkup)',
    lifestyleBio: 'Continuous (500k+ weekly telemetry data points)',
  },
  {
    dimension: 'Biomarker Scope',
    traditional: 'Basic standard reference ranges (population average)',
    lifestyleBio: 'Optimal longevity ranges & longitudinal rate-of-change',
  },
  {
    dimension: 'Guidance',
    traditional: 'Generic one-size-fits-all brochure advice',
    lifestyleBio: 'Hyper-personalized N=1 AI action plans grounded in your labs',
  },
  {
    dimension: 'Care Ecosystem',
    traditional: 'Fragmented silos between doctors, dietitians & trainers',
    lifestyleBio: 'Unified platform connecting user, clinic, coaches & family',
  },
];

const futurePillars = [
  { icon: Dna, title: 'DNA & Epigenetic Clocks', desc: 'Ingestion of epigenetic methylation panels to measure biological organ aging rates.' },
  { icon: Activity, title: 'Continuous Glucose (CGM)', desc: 'Real-time metabolic glycemic variability scoring and post-prandial meal impact analytics.' },
  { icon: Microscope, title: 'Microbiome Analysis', desc: 'Personalized gut flora sequencing to guide targeted prebiotics and anti-inflammatory diets.' },
  { icon: Bot, title: 'Predictive Health Forecasting', desc: 'Simulating 10-year biomarker trajectories to proactively prevent chronic conditions.' },
];

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <PageHeader
        title="Engineering the Future of Human Healthspan"
        subtitle="LifestyleBio is an AI-powered health intelligence platform unifying wearables, lab records, nutrition, fitness, and longevity coaching into a single personal health ecosystem."
        image="/images/about/hero_longevity.jpg"
        breadcrumbs={[{ label: 'About' }]}
        height="lg"
      />

      {/* Vision & Mission Banner */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                <Eye size={24} className="text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Our Vision</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4 leading-snug">
                Lifelong Health Intelligence for Every Human
              </h3>
              <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
                To empower every individual to live a healthier, longer, and more fulfilling life through continuous, data-driven personalized health intelligence.
              </p>
            </motion.div>

            {/* Mission Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-6 bg-gray-50 rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Our Mission</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 mb-4 leading-snug">
                Democratizing Preventive Precision Healthcare
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We bridge the gap between everyday quantified self-tracking and clinical medicine—giving users actionable, evidence-based guidance while enabling clinicians, nutritionists, and coaches to deliver superior care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 6 Core Mission Pillars from PRD */}
      <section className="py-20 bg-gray-50/70 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Core Commitments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-heading">
              Our 6 Strategic <span className="gradient-text">Pillars of Impact</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Every feature across LifestyleBio is designed around six foundational objectives defined in our core mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {missionPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${pillar.color}`}>
                      <PillarIcon size={22} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Healthcare Paradigm Shift */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto mb-16">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold">
                <HeartPulse size={14} />
                <span>The Paradigm Shift</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                From Reactive Sickness Care to <span className="gradient-text">Continuous Longevity</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Conventional healthcare relies on annual episodic lab draws that detect problems only when irreversible damage has occurred. LifestyleBio transforms health management into a continuous, real-time feedback loop.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">Sub-minute continuous wearable sensor synchronization</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">Automated OCR translation of blood panels into longitudinal biomarker curves</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">Multi-tenant sharing with dietitians, trainers, and physicians</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                <img
                  src="/images/about/science_lab.jpg"
                  alt="Precision Longevity Science Laboratory"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs font-bold text-emerald-400">Bio-Intelligence Engine</div>
                    <p className="text-xs text-gray-200 mt-0.5">Multi-modal synthesis of telemetry, clinical labs, and genomics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs overflow-x-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award size={18} className="text-emerald-500" />
              <span>Comparative Healthcare Architecture</span>
            </h3>
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-3 font-semibold">Dimension</th>
                  <th className="pb-3 font-semibold">Traditional Healthcare</th>
                  <th className="pb-3 font-semibold text-emerald-600">LifestyleBio Intelligence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-xs sm:text-sm">
                {paradigmComparison.map((row, i) => (
                  <tr key={i} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 font-bold text-gray-800">{row.dimension}</td>
                    <td className="py-3.5 text-gray-500">{row.traditional}</td>
                    <td className="py-3.5 text-emerald-700 font-semibold">{row.lifestyleBio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Clinical & Scientific Advisory Board */}
      <section className="py-24 bg-gray-50/80 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-800 text-xs font-semibold mb-4">
              <Award size={14} className="text-violet-500" />
              <span>Scientific Advisory Board</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-heading">
              Guided by Leaders in <span className="gradient-text">Medicine & AI</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Our clinical algorithms, risk models, and safety boundaries are directed by world-renowned longevity physicians, AI researchers, and computational biologists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {advisoryBoard.map((advisor, idx) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative mb-5 overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">{advisor.name}</h3>
                  <div className="text-xs font-bold text-emerald-600 mt-1">{advisor.role}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{advisor.credentials}</div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                    {advisor.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {advisor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-semibold bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Roadmap & Biohacking Frontier (PRD Section 5) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
              <Sparkles size={14} className="text-emerald-500" />
              <span>Future Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              The Next Frontier in <span className="gradient-text">Predictive Biohacking</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              We are continuously expanding the LifestyleBio ecosystem with next-generation multi-omic integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {futurePillars.map((p, i) => {
              const PillarIcon = p.icon;
              return (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-2xs hover:border-emerald-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                    <PillarIcon size={20} />
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1.5">{p.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security & Ethical AI Commitment */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <Lock size={14} />
              <span>Our Security & Ethical Pledge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Health Data Belongs Exclusively to You
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
              We never sell patient data, monetize advertising, or train public AI models on your personal health records. All data is protected with 256-bit AES encryption at rest and in transit, in strict compliance with HIPAA and SOC-2 Type II standards.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTA />
    </div>
  );
};

export default About;
