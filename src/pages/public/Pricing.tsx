import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ShieldCheck, Zap, Sparkles, Building2, 
  Users, Stethoscope, Apple, Dumbbell, ArrowRight, 
  HelpCircle, ChevronDown, ChevronUp, Lock, Award, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import CTA from '@/components/sections/CTA';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import PaymentModal, { PlanDetails } from '@/components/pricing/PaymentModal';
import { toast } from 'sonner';

interface PricingPlan extends PlanDetails {
  highlighted: boolean;
  ctaText: string;
  features: string[];
  moduleAccess: string;
}

const individualPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Baseline',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Essential quantified-self tracking for individuals starting their wellness journey.',
    targetAudience: 'Solo health tracking',
    highlighted: false,
    ctaText: 'Start Free Baseline',
    moduleAccess: 'Modules 1, 4 (Basic), 11 (Standard)',
    features: [
      'Personal Health Profile (Module 01)',
      'Step counter & manual cardio workout log',
      'Basic nutrition macro logging (3 meals/day)',
      'Sleep duration logging & 7-day data history',
      'Community health challenges',
      'Standard web & mobile PWA access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Biohacker',
    badge: 'Most Popular',
    monthlyPrice: 16,
    annualPrice: 12,
    description: 'Continuous wearable telemetry sync, 24×7 AI coaching, and deep recovery analytics.',
    targetAudience: 'Active optimizers & biohackers',
    highlighted: true,
    ctaText: 'Start 14-Day Free Trial',
    moduleAccess: 'Modules 1 through 6, 8, 11',
    features: [
      'Everything in Starter Baseline',
      'Unlimited 24×7 AI Health Coach (Module 02)',
      'AI Food Barcode Scanner & Meal Photo Analysis (Module 03)',
      'Progressive strength overload & 1RM analytics (Module 04)',
      'Sleep recovery index & nocturnal HRV trends (Module 05)',
      'Sub-minute sync for Apple Watch, Oura, Garmin, Whoop (Module 08)',
      'Continuous daytime stress detection & breathwork (Module 06)',
      '1-year longitudinal data history',
    ],
  },
  {
    id: 'longevity',
    name: 'Longevity Elite',
    badge: 'Best for Biohackers',
    monthlyPrice: 34,
    annualPrice: 28,
    description: 'Comprehensive clinical lab OCR parsing, biological age clocks, and CGM integration.',
    targetAudience: 'Longevity & preventive seekers',
    highlighted: false,
    ctaText: 'Start 14-Day Free Trial',
    moduleAccess: 'All 12 Modules (Full Access)',
    features: [
      'Everything in Pro Biohacker',
      'Medical Records Vault & Automated Lab PDF OCR (Module 07)',
      'Biological vs. Chronological Age Clocks (Module 09)',
      'Continuous Glucose Monitor (CGM) Live Stream',
      'Cardiovascular & metabolic risk modeling (Module 09)',
      'Direct 1-on-1 sharing with doctors & dietitians (Module 10)',
      'Unlimited lifetime biomarker data history',
      'Priority customer & clinical onboarding support',
    ],
  },
  {
    id: 'family',
    name: 'Family Circle Care',
    badge: 'Up to 6 Members',
    monthlyPrice: 48,
    annualPrice: 39,
    description: 'Multi-generational health monitoring for aging parents, children, and spouses.',
    targetAudience: 'Families & caregivers',
    highlighted: false,
    ctaText: 'Create Family Circle',
    moduleAccess: 'All 12 Modules + Family Hub',
    features: [
      'Includes 6 Longevity Elite accounts',
      'Shared Family Health Hub with granular privacy scopes',
      'Automated high-risk vital alerts (SpO2 drops, fall alerts)',
      'Centralized family immunization & prescription vault',
      'Shared family habit challenges & activity streaks',
      'Elderly parent remote activity monitoring',
      'Dedicated family onboarding concierge',
    ],
  },
];

const professionalPlans = [
  {
    id: 'coach',
    name: 'Coach & Dietitian Pro',
    badge: 'For Independent Pros',
    monthlyPrice: 59,
    annualPrice: 49,
    description: 'Manage up to 25 active coaching clients with live food logs, workout builders, and progress reports.',
    targetAudience: 'Nutritionists & Personal Trainers',
    features: [
      'Up to 25 active client seats included',
      'Live client food journal & macro compliance viewer',
      'Custom workout & meal protocol builder',
      'Client strain vs. recovery monitoring (Whoop/Oura)',
      'In-app direct client messaging & consultation scheduling',
      'Co-branded client invitation portal',
    ],
    ctaText: 'Start Coach Free Trial',
  },
  {
    id: 'clinic',
    name: 'Healthcare Provider Portal',
    badge: 'Clinical EHR Bridge',
    monthlyPrice: 179,
    annualPrice: 149,
    description: 'HIPAA-compliant longitudinal telemetry viewer, FHIR lab import/export, and remote patient monitoring.',
    targetAudience: 'Doctors & Functional Medicine Clinics',
    features: [
      'Up to 100 patient longitudinal charts',
      'HIPAA Business Associate Agreement (BAA) included',
      'FHIR / HL7 clinical lab import & export',
      'Out-of-range clinical biomarker alerts',
      'Doctor clinical notes & consultation summary vault',
      'Multi-clinician staff role permissions',
    ],
    ctaText: 'Partner as Provider',
  },
  {
    id: 'corporate',
    name: 'Corporate Wellness Enterprise',
    badge: 'Custom Organization Size',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Enterprise wellness programs, company step challenges, and de-identified employee health indices.',
    targetAudience: 'HR Leaders & Enterprise Wellness',
    features: [
      'Unlimited employee seats with tiered pricing',
      'De-identified aggregate employee health & vitality index',
      'Company-wide step challenges & leaderboards',
      'Burnout risk & mental wellness heatmaps',
      'Dedicated corporate customer success manager',
      'Measurable ROI reports on health benefit claims',
    ],
    ctaText: 'Request Corporate Quote',
  },
];

const comparisonMatrix = [
  { feature: 'Personal Digital Health Profile', starter: true, pro: true, longevity: true, family: true },
  { feature: 'Activity, Steps & Cardio Logging', starter: true, pro: true, longevity: true, family: true },
  { feature: '24×7 Contextual AI Health Coach', starter: false, pro: true, longevity: true, family: true },
  { feature: 'AI Meal Photo & Barcode Scanner', starter: false, pro: true, longevity: true, family: true },
  { feature: 'Wearable Sync (Apple, Oura, Garmin, Whoop)', starter: false, pro: true, longevity: true, family: true },
  { feature: 'Sleep Recovery & Nocturnal HRV Index', starter: false, pro: true, longevity: true, family: true },
  { feature: 'Medical Records & PDF Lab OCR Vault', starter: false, false: false, longevity: true, family: true },
  { feature: 'Biological Age Clocks & Risk Modeling', starter: false, false: false, longevity: true, family: true },
  { feature: 'Continuous Glucose (CGM) Integration', starter: false, false: false, longevity: true, family: true },
  { feature: 'Marketplace Doctor/Dietitian Consults', starter: 'Basic', pro: 'Standard', longevity: 'Priority', family: 'Priority' },
  { feature: 'Family Members Included', starter: '1', pro: '1', longevity: '1', family: '6 Accounts' },
  { feature: 'Historical Data Retention', starter: '7 Days', pro: '1 Year', longevity: 'Lifetime', family: 'Lifetime' },
];

const pricingFaqs = [
  {
    q: 'Can I use HSA or FSA funds to pay for LifestyleBio?',
    a: 'Yes! LifestyleBio subscriptions and eligible marketplace services (such as certified dietitian consultations and clinical biomarker testing) often qualify for Health Savings Account (HSA) and Flexible Spending Account (FSA) reimbursement as preventive health interventions. Itemized receipts are available in your account settings.',
  },
  {
    q: 'How does the 14-day free trial work?',
    a: 'You receive instant, unrestricted access to all Pro or Longevity Elite features for 14 days without any upfront commitment. You can cancel with one click anytime in your settings before the trial ends and you will not be charged.',
  },
  {
    q: 'What happens to my uploaded lab records if I cancel?',
    a: 'Your health data belongs 100% to you. If you cancel your paid subscription, your account transitions to the free Starter tier and your uploaded medical documents remain securely encrypted. You can export all your health telemetry and lab reports at any time via standard PDF and CSV exports.',
  },
  {
    q: 'Is my health data protected under HIPAA?',
    a: 'Yes. LifestyleBio is engineered with a privacy-first, zero-knowledge architecture. All Protected Health Information (PHI) is encrypted at rest with 256-bit AES encryption and in transit using TLS 1.3. We never sell your data, monetize advertising, or train public AI models on your personal records.',
  },
  {
    q: 'Can I upgrade, downgrade, or switch billing cycles later?',
    a: 'Yes, you can easily switch between monthly and annual billing, or upgrade from Pro to Longevity Elite or Family Circle at any time with prorated billing.',
  },
];

const PricingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isAnnual, setIsAnnual] = useState(true);
  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePlanSelect = (plan: PricingPlan) => {
    if (!isAuthenticated) {
      toast.info('Please sign in or create an account to start your free trial.');
      navigate(ROUTES.LOGIN);
      return;
    }
    setSelectedPlanForCheckout(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <PageHeader
        title="Transparent Healthspan Investments"
        subtitle="Choose the right plan to optimize your health baseline, connect with care providers, or empower your corporate team."
        image="/images/features/hero_features.jpg"
        breadcrumbs={[{ label: 'Pricing' }]}
        height="md"
      />

      {/* Pricing Controls & Switchers */}
      <section className="pt-16 pb-20 bg-gray-50/70 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Toggle Controls */}
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-14 text-center">
            {/* Persona Segment Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-gray-200/80 mb-6">
              <button
                onClick={() => setActiveTab('individual')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'individual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Individuals & Families
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'business'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Coaches, Clinics & Enterprise
              </button>
            </div>

            {/* Monthly vs Annual Switcher */}
            {activeTab === 'individual' && (
              <div className="flex items-center gap-3">
                <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly Billing
                </span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isAnnual ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    layout
                    className={`bg-white w-6 h-6 rounded-full shadow-md ${isAnnual ? 'ml-auto' : ''}`}
                  />
                </button>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs sm:text-sm font-semibold ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                    Annual Billing
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Individual & Family Plans Grid */}
          {activeTab === 'individual' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
              {individualPlans.map((plan, i) => {
                const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                      plan.highlighted
                        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white shadow-xl ring-2 ring-emerald-400'
                        : 'bg-white border border-gray-200/80 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
                        {plan.badge}
                      </div>
                    )}

                    <div>
                      {/* Title & Description */}
                      <div className="mb-4">
                        <h3 className={`text-lg font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                          {plan.name}
                        </h3>
                        <p className={`text-xs mt-1 leading-relaxed ${plan.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                          {plan.description}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="mb-6 pb-5 border-b border-gray-100/30">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-4xl font-black font-heading ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                            {displayPrice === 0 ? '$0' : `$${displayPrice}`}
                          </span>
                          {displayPrice > 0 && (
                            <span className={`text-xs ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                              / month {isAnnual ? '(billed annually)' : ''}
                            </span>
                          )}
                        </div>
                        <div className={`text-[11px] font-medium mt-1 ${plan.highlighted ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          {plan.targetAudience}
                        </div>
                      </div>

                      {/* Feature List */}
                      <div className="space-y-2.5 mb-8">
                        <div className={`text-[10px] font-bold uppercase tracking-wider ${plan.highlighted ? 'text-gray-400' : 'text-gray-400'}`}>
                          Included Features
                        </div>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <CheckCircle2
                              size={14}
                              className={`shrink-0 mt-0.5 ${plan.highlighted ? 'text-emerald-400' : 'text-emerald-500'}`}
                            />
                            <span className={plan.highlighted ? 'text-gray-200' : 'text-gray-700'}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handlePlanSelect(plan)}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                          plan.highlighted
                            ? 'btn-primary'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        {plan.ctaText} <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Business & Pro Plans Grid */}
          {activeTab === 'business' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {professionalPlans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                        {plan.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mb-5 leading-relaxed">{plan.description}</p>

                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-gray-900 font-heading">
                          {plan.monthlyPrice === 0 ? 'Custom' : `$${isAnnual ? plan.annualPrice : plan.monthlyPrice}`}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-xs text-gray-500">/ month</span>
                        )}
                      </div>
                      <div className="text-[11px] font-medium text-emerald-600 mt-1">
                        {plan.targetAudience}
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Professional Capabilities
                      </div>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlanSelect(plan)}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    {plan.ctaText} <ArrowRight size={15} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detailed Feature Comparison Matrix */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-heading">
              Detailed Plan <span className="gradient-text">Feature Matrix</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Compare modular access across all individual and family subscription tiers.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="pb-4 font-bold">Platform Capability</th>
                  <th className="pb-4 font-bold text-center">Starter</th>
                  <th className="pb-4 font-bold text-center text-emerald-600">Pro Biohacker</th>
                  <th className="pb-4 font-bold text-center">Longevity Elite</th>
                  <th className="pb-4 font-bold text-center">Family Circle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-xs sm:text-sm">
                {comparisonMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 font-medium text-gray-800">{row.feature}</td>
                    <td className="py-3.5 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check size={16} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-xs text-gray-600 font-semibold">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center bg-emerald-50/40 font-semibold text-emerald-900">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check size={16} className="text-emerald-600 mx-auto" />
                        ) : (
                          <span className="text-gray-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-xs text-emerald-700 font-semibold">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.longevity === 'boolean' ? (
                        row.longevity ? (
                          <Check size={16} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-xs text-gray-700 font-semibold">{row.longevity}</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.family === 'boolean' ? (
                        row.family ? (
                          <Check size={16} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-xs text-gray-700 font-semibold">{row.family}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="py-14 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-sm text-white">14-Day Risk-Free Trial</h4>
              <p className="text-xs text-gray-400 mt-1">Full access to AI and telemetry. Cancel anytime in one click.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                <HeartHandshake size={24} />
              </div>
              <h4 className="font-bold text-sm text-white">HSA / FSA Eligible</h4>
              <p className="text-xs text-gray-400 mt-1">Pay for subscriptions with pre-tax wellness health savings funds.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
                <Lock size={24} />
              </div>
              <h4 className="font-bold text-sm text-white">HIPAA & SOC-2 Certified</h4>
              <p className="text-xs text-gray-400 mt-1">Encrypted personal health records vault with zero third-party data selling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs Accordion */}
      <section className="py-20 bg-gray-50/70 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
              <HelpCircle size={14} className="text-emerald-500" />
              <span>Billing & FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-heading">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-gray-900 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} className="text-emerald-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTA />

      {/* Payment & Free Trial Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlanForCheckout}
        initialIsAnnual={isAnnual}
      />
    </div>
  );
};

export default PricingPage;
