import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ROUTES } from '@/constants/routes';
import { ShieldCheck, Lock, ArrowLeft, Sparkles } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Panel - High-Tech Longevity & Biometrics Visual Canvas (Desktop lg+) */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 relative overflow-hidden flex-col justify-between p-8 xl:p-10 text-white border-r border-slate-800/80 h-full">
        
        {/* Subtle Ambient Glows & Background Grid */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-0 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Top Header / Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to={ROUTES.HOME} className="inline-block group">
            <BrandLogo variant="dark" className="h-9 xl:h-10 w-auto opacity-95 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            to={ROUTES.HOME}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/10"
          >
            <ArrowLeft size={13} /> Return to Web
          </Link>
        </div>

        {/* Center Content: Headline & Live Biometric Telemetry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 my-auto py-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-bold mb-3 border border-emerald-500/30">
            <Sparkles size={12} /> Clinical Health Intelligence OS
          </div>

          <h2 className="text-2xl xl:text-3xl font-extrabold text-white font-heading leading-tight mb-3 tracking-tight">
            Continuous Biometric Telemetry &amp; Preventive Longevity
          </h2>

          <p className="text-slate-300 text-xs xl:text-sm leading-relaxed mb-6">
            Access your unified clinical dashboard, multi-sensor telemetry, autonomous AI coach protocols, and biomarker records.
          </p>

          {/* Live Biometric Telemetry Preview Widget */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/70 shadow-2xl space-y-2.5 max-w-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-200">Active Telemetry Stream</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                AES-256 GCM
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Bio Age</div>
                <div className="text-sm font-extrabold text-emerald-400 font-mono">-4.8 Yrs</div>
                <div className="text-[8px] text-slate-500 mt-0.5">Top 1% Healthspan</div>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[9px] text-slate-400 uppercase font-bold">HRV RMSSD</div>
                <div className="text-sm font-extrabold text-sky-400 font-mono">78 ms</div>
                <div className="text-[8px] text-slate-500 mt-0.5">+14% Recovery</div>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[9px] text-slate-400 uppercase font-bold">ApoB Target</div>
                <div className="text-sm font-extrabold text-purple-400 font-mono">52 mg/dL</div>
                <div className="text-[8px] text-slate-500 mt-0.5">Optimal Athero</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer: Compliance & Security Badges */}
        <div className="relative z-10 pt-4 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck size={14} />
            <span>HIPAA Enforced • SOC-2 Type II</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Lock size={11} />
            <span>Zero Data Brokerage</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="flex-1 bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-between pb-2 border-b border-slate-200 shrink-0">
          <Link to={ROUTES.HOME}>
            <BrandLogo variant="light" className="h-8 w-auto" />
          </Link>
          <Link to={ROUTES.HOME} className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1">
            <ArrowLeft size={13} /> Home
          </Link>
        </div>

        {/* Center Form Wrapper (Fits snugly inside container) */}
        <div className="w-full max-w-md mx-auto my-auto py-1">
          <Outlet />
        </div>

        {/* Footer info & disclaimer */}
        <div className="w-full max-w-md mx-auto pt-2 text-center text-[10px] text-slate-400 shrink-0">
          <p>&copy; {new Date().getFullYear()} LifestyleBio Inc. Protected under HIPAA &amp; SOC-2 Type II standards.</p>
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
