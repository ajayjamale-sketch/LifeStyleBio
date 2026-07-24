import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Eye, Key, Wifi } from 'lucide-react';
import { toast } from 'sonner';

const Toggle: React.FC<{ checked: boolean; onChange: () => void; label: string; desc: string }> = ({ checked, onChange, label, desc }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
    <div>
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
    <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  </div>
);

const Security: React.FC = () => {
  const [settings, setSettings] = useState({
    enforce2FA: false, ipWhitelist: false,
    sessionTimeout: true, failedLoginLock: true,
    encryptionAtRest: true, auditLogging: true,
    ddosProtection: true, rateLimit: true,
  });

  const toggle = (k: keyof typeof settings) => {
    setSettings(p => ({ ...p, [k]: !p[k] }));
    toast.success('Security setting updated.');
  };

  const securityScore = Math.round(Object.values(settings).filter(Boolean).length / Object.values(settings).length * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Score */}
      <div className="bg-gradient-to-r from-emerald-500 to-sky-400 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Security Score</h2>
            <p className="text-white/80 text-sm">Based on active security configurations</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{securityScore}%</div>
            <div className="text-white/80 text-sm">{securityScore >= 80 ? 'Strong' : securityScore >= 60 ? 'Good' : 'Needs Improvement'}</div>
          </div>
        </div>
      </div>

      {/* Settings */}
      {[
        { icon: Key, title: 'Authentication', color: 'text-emerald-500 bg-emerald-50',
          items: [
            { key: 'enforce2FA' as const, label: 'Enforce 2FA for all users', desc: 'Require two-factor authentication for all accounts' },
            { key: 'failedLoginLock' as const, label: 'Lock after failed attempts', desc: 'Lock accounts after 5 consecutive failed logins' },
            { key: 'sessionTimeout' as const, label: 'Session timeout', desc: 'Auto-logout inactive sessions after 30 minutes' },
          ]},
        { icon: Shield, title: 'Data Protection', color: 'text-sky-500 bg-sky-50',
          items: [
            { key: 'encryptionAtRest' as const, label: 'Encryption at rest', desc: 'AES-256 encryption for all stored health data' },
            { key: 'auditLogging' as const, label: 'Audit logging', desc: 'Log all admin and sensitive user actions' },
          ]},
        { icon: Wifi, title: 'Network Security', color: 'text-violet-500 bg-violet-50',
          items: [
            { key: 'ipWhitelist' as const, label: 'IP whitelisting', desc: 'Restrict admin access to approved IP addresses' },
            { key: 'ddosProtection' as const, label: 'DDoS protection', desc: 'Advanced protection against denial of service attacks' },
            { key: 'rateLimit' as const, label: 'API rate limiting', desc: 'Limit API requests to prevent abuse' },
          ]},
      ].map(section => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.color}`}><section.icon size={17} /></div>
            <h3 className="font-bold text-gray-900">{section.title}</h3>
          </div>
          {section.items.map(item => (
            <Toggle key={item.key} checked={settings[item.key]} onChange={() => toggle(item.key)} label={item.label} desc={item.desc} />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default Security;
