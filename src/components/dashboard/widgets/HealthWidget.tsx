import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value, max = 100, size = 80, strokeWidth = 8, color = '#10B981', label, sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, max) / max) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F3F4F6" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-900">{Math.round((value / max) * 100)}%</span>
        </div>
      </div>
      {label && <p className="text-xs font-semibold text-gray-700 text-center">{label}</p>}
      {sublabel && <p className="text-xs text-gray-400 text-center">{sublabel}</p>}
    </div>
  );
};

interface ActivityRingProps {
  move: number;
  exercise: number;
  stand: number;
}

export const ActivityRing: React.FC<ActivityRingProps> = ({ move, exercise, stand }) => {
  const rings = [
    { value: move, color: '#10B981', label: 'Move', size: 100, sw: 10 },
    { value: exercise, color: '#38BDF8', label: 'Exercise', size: 76, sw: 10 },
    { value: stand, color: '#8B5CF6', label: 'Stand', size: 52, sw: 10 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
      {rings.map((ring, i) => {
        const r = (ring.size - ring.sw) / 2;
        const circ = 2 * Math.PI * r;
        const offset = circ - (Math.min(ring.value, 100) / 100) * circ;
        const pos = (100 - ring.size) / 2;
        return (
          <svg key={i} width={ring.size} height={ring.size} className="absolute -rotate-90" style={{ top: pos, left: pos }}>
            <circle cx={ring.size / 2} cy={ring.size / 2} r={r} fill="none" stroke={`${ring.color}20`} strokeWidth={ring.sw} />
            <motion.circle
              cx={ring.size / 2} cy={ring.size / 2} r={r} fill="none"
              stroke={ring.color} strokeWidth={ring.sw}
              strokeLinecap="round" strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
            />
          </svg>
        );
      })}
    </div>
  );
};

interface ScoreGaugeProps {
  score: number;
  label: string;
  color?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label, color = '#10B981' }) => {
  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#F3F4F6" strokeWidth="12" />
          <motion.circle
            cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="12"
            strokeLinecap="round" strokeDasharray={2 * Math.PI * 38}
            initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - score / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-gray-900">{score}</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400">{getScoreLabel(score)}</p>
    </div>
  );
};

export default ProgressRing;
