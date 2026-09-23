import React, { useId } from 'react';

export interface BrandLogoProps {
  variant?: 'light' | 'dark'; // 'light' = for light backgrounds (dark text); 'dark' = for dark backgrounds (white text)
  iconOnly?: boolean;
  className?: string;
  height?: number | string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  iconOnly = false,
  className = 'h-9 sm:h-10 w-auto',
}) => {
  const id = useId().replace(/:/g, '');
  const emeraldId = `emeraldGrad_${id}`;
  const skyId = `skyGrad_${id}`;
  const purpleId = `purpleGrad_${id}`;
  const bioTextId = `bioTextGrad_${id}`;
  const glowId = `glowFilter_${id}`;

  const textColor = variant === 'dark' ? '#F8FAFC' : '#0F172A';
  const subtitleColor = variant === 'dark' ? '#94A3B8' : '#64748B';

  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
        aria-label="LifestyleBio Icon"
      >
        <defs>
          <linearGradient id={emeraldId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={skyId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id={purpleId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10B981" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter={`url(#${glowId})`}>
          <rect x="0" y="0" width="180" height="180" rx="44" fill="#0F172A" />
          <rect x="0" y="0" width="180" height="180" rx="44" fill="none" stroke={`url(#${emeraldId})`} strokeWidth="2.5" opacity="0.4" />
          <circle cx="90" cy="90" r="50" fill="#10B981" opacity="0.08" />

          {/* Primary Emerald Vitality Orbit Ring */}
          <path
            d="M 90,32 C 122,32 148,58 148,90 C 148,118 128,142 98,146 C 89,147 83,142 83,134 C 83,127 88,122 95,121 C 114,119 126,106 126,90 C 126,72 110,56 90,56 C 70,56 54,72 54,90 C 54,100 58,108 64,115 C 69,120 69,128 63,134 C 57,140 48,138 43,132 C 34,121 28,106 28,90 C 28,58 58,32 90,32 Z"
            fill={`url(#${emeraldId})`}
          />

          {/* Secondary Sky Cyber Telemetry Curve */}
          <path
            d="M 90,148 C 58,148 32,122 32,90 C 32,78 37,67 45,58 C 50,52 59,54 63,60 C 67,66 65,75 60,80 C 58,82 57,86 57,90 C 57,108 72,124 90,124 C 104,124 116,116 122,103 C 125,97 133,94 139,97 C 146,100 148,109 143,115 C 133,135 113,148 90,148 Z"
            fill={`url(#${skyId})`}
          />

          {/* Central DNA Telemetry Pulse Core */}
          <path
            d="M 52,90 L 71,90 L 79,68 L 90,114 L 101,76 L 109,95 L 128,95"
            fill="none"
            stroke={`url(#${purpleId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Biometric Nodes */}
          <circle cx="90" cy="90" r="6" fill="#10B981" />
          <circle cx="90" cy="90" r="11" fill="none" stroke="#38BDF8" strokeWidth="2.5" opacity="0.85" />
          <circle cx="79" cy="68" r="4.5" fill="#38BDF8" />
          <circle cx="101" cy="76" r="4.5" fill="#8B5CF6" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 540 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="LifestyleBio"
    >
      <defs>
        <linearGradient id={emeraldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id={skyId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <linearGradient id={purpleId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        <linearGradient id={bioTextId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="60%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#10B981" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* ICON EMBLEM */}
      <g transform="translate(14, 12)" filter={`url(#${glowId})`}>
        <rect
          x="6"
          y="6"
          width="100"
          height="100"
          rx="28"
          fill={variant === 'dark' ? '#1E293B' : '#F1F5F9'}
          stroke={variant === 'dark' ? '#334155' : '#CBD5E1'}
          strokeWidth="1.5"
          opacity={variant === 'dark' ? '0.7' : '0.6'}
        />

        {/* Primary Emerald Vitality Orbit Ring */}
        <path
          d="M 56,18 C 78,18 94,34 94,56 C 94,76 80,92 60,94 C 54,94.5 50,91 50,86 C 50,81.5 53.5,78 58,77.5 C 70,76 78,67 78,56 C 78,44 68,34 56,34 C 44,34 34,44 34,56 C 34,62 36.5,67.5 40.5,71.5 C 44,75 44,80 40,83.5 C 36.5,87 31,86 28,82 C 22,75 18,66 18,56 C 18,34 34,18 56,18 Z"
          fill={`url(#${emeraldId})`}
        />

        {/* Secondary Sky Cyber Telemetry Curve */}
        <path
          d="M 56,94 C 34,94 18,78 18,56 C 18,48 21,41 26,35 C 29.5,31 35,32 37.5,36 C 40,40 39,45.5 35.5,49 C 34.5,50.5 34,53 34,56 C 34,68 44,78 56,78 C 65,78 72.5,72.5 76,64.5 C 78,60.5 83,58.5 87,60.5 C 91.5,62.5 93,68 90,72 C 83.5,85 71,94 56,94 Z"
          fill={`url(#${skyId})`}
        />

        {/* Central DNA Telemetry Pulse Core */}
        <path
          d="M 32,56 L 44,56 L 49,42 L 56,72 L 63,47 L 68,59 L 80,59"
          fill="none"
          stroke={`url(#${purpleId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Biometric Nodes */}
        <circle cx="56" cy="56" r="4" fill="#10B981" />
        <circle cx="56" cy="56" r="7" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.75" />
        <circle cx="49" cy="42" r="3" fill="#38BDF8" />
        <circle cx="63" cy="47" r="3" fill="#8B5CF6" />
      </g>

      {/* TYPOGRAPHY */}
      <g transform="translate(138, 73)">
        <text
          x="0"
          y="0"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
          fontSize="44"
          fontWeight="800"
          fill={textColor}
          letterSpacing="-1.2px"
        >
          Lifestyle
        </text>

        <text
          x="192"
          y="0"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
          fontSize="44"
          fontWeight="800"
          fill={`url(#${bioTextId})`}
          letterSpacing="-0.8px"
        >
          Bio
        </text>

        {/* Glowing Node over 'i' in Bio */}
        <circle cx="231" cy="-36" r="4" fill="#10B981" />
        <circle cx="231" cy="-36" r="7.5" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />

        {/* Subtitle / Clinical Tagline */}
        <g transform="translate(2, 26)">
          <text
            x="0"
            y="0"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
            fontSize="9.5"
            fontWeight="700"
            fill={subtitleColor}
            letterSpacing="3.5px"
          >
            PRECISION HEALTHSPAN &amp; LONGEVITY OS
          </text>
        </g>
      </g>
    </svg>
  );
};

export default BrandLogo;
