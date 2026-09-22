import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  Cpu, 
  Dna, 
  Heart, 
  Activity, 
  Zap,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
  className?: string;
}

const ICONS_POOL = [
  { id: 'heart', label: 'Heart Cardio', icon: Heart },
  { id: 'dna', label: 'DNA Helix', icon: Dna },
  { id: 'pulse', label: 'Telemetry Pulse', icon: Activity },
  { id: 'sensor', label: 'Bio Sensor', icon: Cpu },
  { id: 'energy', label: 'Cellular ATP', icon: Zap },
];

const Captcha: React.FC<CaptchaProps> = ({ onVerify, className = '' }) => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified' | 'challenge' | 'failed'>('idle');
  const [token, setToken] = useState<string>('');
  const [targetIcon, setTargetIcon] = useState(ICONS_POOL[0]);
  const [randomizedIcons, setRandomizedIcons] = useState(ICONS_POOL);

  const resetVerification = () => {
    setStatus('idle');
    setToken('');
    onVerify(false);
  };

  const handleTurnstileClick = () => {
    if (status === 'verifying' || status === 'verified') return;
    setStatus('verifying');

    // Simulate cryptographic proof-of-work & behavioral biometric verification
    setTimeout(() => {
      const generatedToken = `bio_sec_${Math.random().toString(36).substring(2, 8)}`;
      setToken(generatedToken);
      setStatus('verified');
      onVerify(true);
    }, 600);
  };

  const setupBiometricChallenge = () => {
    const shuffled = [...ICONS_POOL].sort(() => Math.random() - 0.5);
    const target = shuffled[Math.floor(Math.random() * shuffled.length)];
    setRandomizedIcons(shuffled);
    setTargetIcon(target);
    setStatus('challenge');
    onVerify(false);
  };

  const handleIconSelect = (selectedId: string) => {
    if (selectedId === targetIcon.id) {
      const generatedToken = `bio_sec_${Math.random().toString(36).substring(2, 8)}`;
      setToken(generatedToken);
      setStatus('verified');
      onVerify(true);
    } else {
      setStatus('failed');
      setTimeout(() => {
        setupBiometricChallenge();
      }, 1000);
    }
  };

  return (
    <div className={`rounded-xl border border-slate-200/90 bg-slate-50/80 p-2.5 sm:p-3 transition-all select-none ${className}`}>
      
      {/* Standard Turnstile / Smart Verification View */}
      {status !== 'challenge' && (
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Checkbox Trigger with Strict Dimensions and Aspect Ratio */}
            <button
              type="button"
              onClick={handleTurnstileClick}
              disabled={status === 'verifying' || status === 'verified'}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 aspect-square transition-all cursor-pointer ${
                status === 'verified'
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                  : status === 'verifying'
                  ? 'bg-white border-emerald-400'
                  : 'bg-white border-slate-300 hover:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
              }`}
            >
              {status === 'verified' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </motion.div>
              )}
              {status === 'verifying' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500 border-t-transparent"
                />
              )}
            </button>

            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-800 truncate leading-tight">
                {status === 'verified' ? (
                  <span className="text-emerald-700">Security Verified</span>
                ) : status === 'verifying' ? (
                  <span className="text-slate-600">Verifying security token...</span>
                ) : (
                  <span>Verify you are human</span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate leading-tight mt-0.5">
                {status === 'verified' ? `Token: ${token}` : 'HIPAA Protected Shield'}
              </div>
            </div>
          </div>

          {/* Right Brand Badge */}
          <div className="flex flex-col items-end shrink-0 pl-1.5 border-l border-slate-200/80">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
              <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
              <span>BioGuardian</span>
            </div>
            <span className="text-[8px] text-slate-400">Protected</span>
          </div>
        </div>
      )}

      {/* Optional Interactive Biometric Icon Challenge (Fallback Mode) */}
      {status === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
              <Sparkles size={12} className="text-emerald-600" />
              Select the <strong>{targetIcon.label}</strong> icon:
            </span>
            <button
              type="button"
              onClick={setupBiometricChallenge}
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
              title="New challenge"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {randomizedIcons.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleIconSelect(item.id)}
                  className="p-2 bg-white hover:bg-emerald-50 hover:border-emerald-400 rounded-lg border border-slate-200 flex flex-col items-center justify-center transition-all cursor-pointer group"
                >
                  <IconComp size={16} className="text-slate-600 group-hover:text-emerald-600 group-hover:scale-110 transition-all" />
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Failure State */}
      {status === 'failed' && (
        <div className="text-[10px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
          <AlertCircle size={11} /> Verification failed. Retrying...
        </div>
      )}
    </div>
  );
};

export default Captcha;
