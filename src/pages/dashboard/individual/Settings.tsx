import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Eye, Palette, Globe, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
);

const Settings: React.FC = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifs: true, pushNotifs: true, smsNotifs: false,
    healthAlerts: true, weeklyReports: true,
    profilePublic: false, shareActivity: false,
    twoFactor: false, loginAlerts: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(p => ({ ...p, [key]: !p[key] }));
    toast.success('Setting updated successfully!');
  };

  const sections = [
    {
      icon: Bell, title: 'Notifications', color: 'text-emerald-500 bg-emerald-50',
      items: [
        { label: 'Email Notifications', sub: 'Receive health updates via email', key: 'emailNotifs' as const },
        { label: 'Push Notifications', sub: 'Browser and mobile push alerts', key: 'pushNotifs' as const },
        { label: 'SMS Notifications', sub: 'Text message alerts for critical updates', key: 'smsNotifs' as const },
        { label: 'Health Alerts', sub: 'Abnormal vitals and risk notifications', key: 'healthAlerts' as const },
        { label: 'Weekly Reports', sub: 'Receive your weekly health summary', key: 'weeklyReports' as const },
      ]
    },
    {
      icon: Eye, title: 'Privacy', color: 'text-sky-500 bg-sky-50',
      items: [
        { label: 'Public Profile', sub: 'Allow others to view your profile', key: 'profilePublic' as const },
        { label: 'Share Activity', sub: 'Share workout and health milestones', key: 'shareActivity' as const },
      ]
    },
    {
      icon: Shield, title: 'Security', color: 'text-violet-500 bg-violet-50',
      items: [
        { label: 'Two-Factor Authentication', sub: 'Extra security layer for your account', key: 'twoFactor' as const },
        { label: 'Login Alerts', sub: 'Get notified of new sign-ins', key: 'loginAlerts' as const },
      ]
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {sections.map(section => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.color}`}>
              <section.icon size={17} />
            </div>
            <h3 className="font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="space-y-4 divide-y divide-gray-50">
            {section.items.map(item => (
              <div key={item.key} className="flex items-center justify-between pt-3 first:pt-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
        <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2"><AlertTriangle size={17} /> Danger Zone</h3>
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-900">Delete Account</p>
            <p className="text-xs text-gray-500">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <button onClick={() => setShowDeleteDialog(true)} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors flex items-center gap-1.5">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Account"
        message="Are you absolutely sure? This will permanently delete your account, health data, and all associated records. This action CANNOT be undone."
        confirmLabel="Yes, Delete Account"
        onConfirm={() => { setShowDeleteDialog(false); toast.error('Account deletion requires email confirmation. Check your inbox.'); }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
};

export default Settings;
