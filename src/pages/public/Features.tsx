import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import FeaturesSection from '@/components/sections/Features';
import CTA from '@/components/sections/CTA';

const Features: React.FC = () => (
  <div>
    <PageHeader
      title="Platform Features"
      subtitle="Everything you need to manage, optimize, and transform your health — all in one powerful platform."
      image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=400&fit=crop"
      breadcrumbs={[{ label: 'Features' }]}
    />
    <FeaturesSection />
    <CTA />
  </div>
);

export default Features;
