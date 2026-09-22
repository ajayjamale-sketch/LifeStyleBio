import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustBanner from '@/components/sections/TrustBanner';
import LongevitySimulator from '@/components/sections/LongevitySimulator';
import CorePillars from '@/components/sections/CorePillars';
import EcosystemSwitcher from '@/components/sections/EcosystemSwitcher';
import MarketplacePreview from '@/components/sections/MarketplacePreview';
import BiomarkerStories from '@/components/sections/BiomarkerStories';
import BaselineWizard from '@/components/sections/BaselineWizard';
import FAQ from '@/components/sections/FAQ';

const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero: Bio-Intelligence Command Center & Interactive Organ Selector */}
      <Hero />

      {/* 2. Trust Bar: Wearable Integrations & HIPAA / SOC-2 Compliance */}
      <TrustBanner />

      {/* 3. LifestyleBio Labs: Interactive Habit & Longevity Simulator */}
      <LongevitySimulator />

      {/* 4. The 4 Core Longevity Pillars (Ingestion, Lab Vault, Lifestyle, AI Coach) */}
      <CorePillars />

      {/* 5. Multi-Persona Ecosystem Switcher (User, Dietitian, Coach, Doctor, Corporate, Family) */}
      <EcosystemSwitcher />

      {/* 6. Verified Marketplace & Care Network Preview */}
      <MarketplacePreview />

      {/* 7. Clinical Biomarker Transformation Stories */}
      <BiomarkerStories />

      {/* 8. Interactive 3-Step Baseline Healthspan Assessment (CTA Wizard) */}
      <BaselineWizard />

      {/* 9. Frequently Asked Questions */}
      <FAQ />
    </div>
  );
};

export default Home;
