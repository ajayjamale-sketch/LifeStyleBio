import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Activity, CheckCircle2, Award, Zap, 
  Watch, Moon, Compass, Droplets, Scale, Timer, Microscope, LucideIcon 
} from 'lucide-react';

interface DevicePartner {
  name: string;
  badge: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const devicePartners: DevicePartner[] = [
  { name: 'Apple Health', badge: 'HealthKit Sync', icon: Watch, color: 'text-gray-900', bgColor: 'bg-gray-100' },
  { name: 'Oura Ring', badge: 'Sleep & Readiness', icon: Moon, color: 'text-sky-600', bgColor: 'bg-sky-50' },
  { name: 'WHOOP 4.0', badge: 'HRV & Strain', icon: Zap, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { name: 'Garmin Connect', badge: 'VO2 Max & GPS', icon: Compass, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'Dexcom CGM', badge: 'Live Glucose Stream', icon: Droplets, color: 'text-red-500', bgColor: 'bg-red-50' },
  { name: 'Withings', badge: 'Vascular & Scale', icon: Scale, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { name: 'Fitbit', badge: 'Activity & SpO2', icon: Timer, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { name: 'Abbott Libre', badge: 'Bio-Sensor', icon: Microscope, color: 'text-violet-600', bgColor: 'bg-violet-50' },
];

const complianceBadges = [
  { icon: ShieldCheck, label: 'HIPAA Compliant', sub: 'Encrypted PHI Storage' },
  { icon: Lock, label: 'SOC-2 Type II', sub: 'Audited Infrastructure' },
  { icon: Activity, label: 'FHIR / HL7', sub: 'Clinical Lab Interop' },
  { icon: Award, label: 'ISO 27001', sub: 'Data Security Standard' },
];

const TrustBanner: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50/80 border-y border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compliance & Security Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-8 border-b border-gray-200/70">
          {complianceBadges.map((badge, idx) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-3 justify-center md:justify-start bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <badge.icon size={18} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  {badge.label}
                  <CheckCircle2 size={12} className="text-emerald-500" />
                </div>
                <div className="text-[11px] text-gray-500">{badge.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wearables Ecosystem Ticker / Grid */}
        <div className="text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Seamless 2-Way Synchronization With 50+ Smart Devices & Clinical Labs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {devicePartners.map((device, i) => {
            const DeviceIcon = device.icon;
            return (
              <motion.div
                key={device.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs hover:border-emerald-200 hover:shadow-xs transition-all text-center group cursor-pointer flex flex-col items-center justify-center"
              >
                <div className={`w-8 h-8 rounded-lg ${device.bgColor} ${device.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <DeviceIcon size={16} />
                </div>
                <div className="font-semibold text-xs text-gray-800 truncate w-full">{device.name}</div>
                <div className="text-[10px] text-emerald-600 font-medium truncate mt-0.5 w-full">{device.badge}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
