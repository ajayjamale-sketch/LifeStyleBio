import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Activity, 
  HelpCircle, 
  Cpu, 
  Building2, 
  Stethoscope, 
  User, 
  Dna, 
  Sparkles, 
  ArrowRight, 
  Lock,
  Check,
  FileText
} from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';

type PersonaType = 'individual' | 'clinic' | 'coach' | 'enterprise' | 'hardware' | 'research';

interface FormData {
  name: string;
  email: string;
  organization: string;
  persona: PersonaType;
  department: string;
  urgency: 'standard' | 'priority' | 'urgent';
  requiresBAA: boolean;
  message: string;
}

const PERSONA_OPTIONS: { id: PersonaType; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; desc: string }[] = [
  { id: 'individual', label: 'Member / Biohacker', icon: User, desc: 'Personal telemetry, AI coach & accounts' },
  { id: 'clinic', label: 'Clinic / Physician', icon: Stethoscope, desc: 'EMR integration, patient dashboards & BAA' },
  { id: 'coach', label: 'Coach / Nutritionist', icon: Sparkles, desc: 'Client tracking & metabolic protocol tools' },
  { id: 'enterprise', label: 'Enterprise Wellness', icon: Building2, desc: 'Corporate healthspan & aggregate analytics' },
  { id: 'hardware', label: 'Hardware / Lab Partner', icon: Cpu, desc: 'Device SDK & diagnostic lab pipelines' },
  { id: 'research', label: 'Clinical Research', icon: Dna, desc: 'Academic studies & longevity data modeling' },
];

const DEPARTMENTS_BY_PERSONA: Record<PersonaType, string[]> = {
  individual: [
    'Biomarker & Wearable Sync Support',
    'AI Health Coach Feedback',
    'Subscription & Account Billing',
    'Data Privacy & Health Export',
    'General Inquiries',
  ],
  clinic: [
    'Clinical Portal & EHR Integration (HL7/FHIR)',
    'HIPAA Business Associate Agreement (BAA)',
    'Physician Onboarding & Advisory',
    'Custom Diagnostic Lab Panels',
    'Patient Data Sovereignty Inquiries',
  ],
  coach: [
    'Coach Portal Access & Client Onboarding',
    'Metabolic Meal & Workout Plan Builder',
    'Partner Revenue & Tier Licensing',
    'Educational Accreditation Protocols',
  ],
  enterprise: [
    'Workforce Longevity Pilot Program',
    'SOC-2 Type II & Security Review',
    'SSO (SAML/Okta) Enterprise Setup',
    'Custom Population Health Analytics',
  ],
  hardware: [
    'Wearable Device API & Bluetooth SDK',
    'At-Home Blood & Epigenetic Lab Integration',
    'Continuous Glucose Monitor (CGM) Feed',
    'Technical Architecture & Latency',
  ],
  research: [
    'Multi-Omic Biomarker Dataset Inquiries',
    'Institutional Review Board (IRB) Protocols',
    'Scientific Advisory Board Inquiry',
    'Academic Preprint & Media Inquiries',
  ],
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    persona: 'individual',
    department: DEPARTMENTS_BY_PERSONA.individual[0],
    urgency: 'standard',
    requiresBAA: false,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePersonaChange = (persona: PersonaType) => {
    setFormData(prev => ({
      ...prev,
      persona,
      department: DEPARTMENTS_BY_PERSONA[persona][0],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all mandatory fields.');
      return;
    }

    setLoading(true);
    // Simulate instant secure ticket dispatch
    setTimeout(() => {
      const generatedTicket = `LB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setLoading(false);
      setIsSubmitted(true);
      toast.success('Inquiry dispatched successfully via encrypted channel.');
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketId('');
    setFormData({
      name: '',
      email: '',
      organization: '',
      persona: 'individual',
      department: DEPARTMENTS_BY_PERSONA.individual[0],
      urgency: 'standard',
      requiresBAA: false,
      message: '',
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <PageHeader
        title="Inquiries & Clinical Partnerships"
        subtitle="Connect with our medical advisory board, enterprise engineering, clinical integration, or member bio-intelligence teams."
        image="/images/about/science_lab.jpg"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Inquiries, SLAs, and Quick Resource Links */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Trust & Dispatch Architecture Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-4">
                  <ShieldCheck size={14} /> Encrypted Routing Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-3">
                  Direct Channel Dispatch
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  LifestyleBio utilizes automated cryptographic ticket routing. Inquiries are automatically directed to dedicated clinical physiologists, software architects, or enterprise account specialists based on your domain persona.
                </p>

                {/* Live SLA & System Signals */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">24-Hour Clinical SLA</div>
                      <div className="text-[11px] text-slate-500">Guaranteed practitioner & engineering response time</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <Lock size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">HIPAA & SOC-2 Type II Certified</div>
                      <div className="text-[11px] text-slate-500">All transmissions protected by AES-256 at rest and in transit</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Activity size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Telemetry Systems Operational</div>
                      <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 99.98% Global Ingestion Uptime
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Self-Serve Resource Cards */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Instant Self-Serve Hubs
                </h3>

                <Link
                  to={ROUTES.HELP_CENTER}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50/60 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-emerald-600">
                      <HelpCircle size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Help Center & Knowledge Base</div>
                      <div className="text-[11px] text-slate-500">Troubleshooting, device pairing guides, and FAQs</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to={ROUTES.FEATURES}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50/60 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-emerald-600">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Hardware & Lab Compatibility</div>
                      <div className="text-[11px] text-slate-500">Explore supported wearables, CGMs, and blood lab feeds</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to={ROUTES.PRICING}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50/60 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-emerald-600">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Enterprise & Clinical Pricing</div>
                      <div className="text-[11px] text-slate-500">Volume tiers, clinic seat licenses, and HSA/FSA info</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Right Column: Interactive Multi-Persona Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-1">
                        Dispatch an Inquiry
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Select your operational role below to customize your routing preferences.
                      </p>
                    </div>

                    {/* Operational Persona Selector Grid */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                        I am reaching out as a: *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {PERSONA_OPTIONS.map(opt => {
                          const isSelected = formData.persona === opt.id;
                          const IconComp = opt.icon;
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => handlePersonaChange(opt.id)}
                              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[82px] ${
                                isSelected
                                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <IconComp size={16} className={isSelected ? 'text-emerald-600' : 'text-slate-500'} />
                                {isSelected && (
                                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                                    <Check size={10} strokeWidth={3} />
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className={`text-xs font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                                  {opt.label}
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">
                                  {opt.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dr. Jane Smith"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Work / Personal Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@organization.com"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Organization & Specific Topic Department */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Organization / Medical Practice <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={e => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. Longevity Health Clinic"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Inquiry Department *
                        </label>
                        <select
                          value={formData.department}
                          onChange={e => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        >
                          {DEPARTMENTS_BY_PERSONA[formData.persona].map(dept => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Urgency SLA Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Priority Level & Response Timeline:
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: 'standard' })}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            formData.urgency === 'standard'
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Standard (24h)
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: 'priority' })}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            formData.urgency === 'priority'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          High Priority (12h)
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: 'urgent' })}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            formData.urgency === 'urgent'
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Critical / Clinical
                        </button>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Inquiry Specifications & Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide relevant details regarding your clinical deployment, telemetry sync questions, API requirements, or member support request..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                      />
                    </div>

                    {/* BAA & Compliance Agreement Checkbox */}
                    {(formData.persona === 'clinic' || formData.persona === 'enterprise') && (
                      <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="baaCheck"
                          checked={formData.requiresBAA}
                          onChange={e => setFormData({ ...formData, requiresBAA: e.target.checked })}
                          className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor="baaCheck" className="text-[11px] text-emerald-950 font-medium cursor-pointer">
                          <strong>Include HIPAA Business Associate Agreement (BAA)</strong> packet and SOC-2 Type II audit summary with response.
                        </label>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Encrypting & Dispatching...</span>
                      ) : (
                        <>
                          <span>Dispatch Encrypted Inquiry</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                        <Lock size={11} className="text-emerald-500" />
                        Protected under 256-bit encryption. Zero marketing tracking or spam.
                      </span>
                    </div>
                  </form>
                ) : (
                  /* Success State with Reference Ticket */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto ring-4 ring-emerald-500/10">
                      <CheckCircle2 size={36} />
                    </div>

                    <div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        Inquiry Routed Successfully
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 font-heading mt-3 mb-1">
                        Dispatch Confirmed
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        Your inquiry has been assigned to our {formData.department} division.
                      </p>
                    </div>

                    {/* Reference Ticket Card */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-sm mx-auto text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                        Dispatch Reference Identifier
                      </div>
                      <div className="font-mono text-base font-bold text-slate-900 mb-3">
                        {ticketId}
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Target Persona:</span>
                          <span className="font-semibold capitalize">{formData.persona}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Response SLA:</span>
                          <span className="font-semibold text-emerald-600">
                            {formData.urgency === 'urgent' ? 'Under 6 Hours' : formData.urgency === 'priority' ? 'Under 12 Hours' : 'Under 24 Hours'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Confirmation Sent:</span>
                          <span className="font-semibold text-slate-800">{formData.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all w-full sm:w-auto"
                      >
                        Submit Another Inquiry
                      </button>

                      <Link
                        to={ROUTES.HELP_CENTER}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all w-full sm:w-auto shadow-sm flex items-center justify-center gap-1.5"
                      >
                        Visit Knowledge Base <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
