import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import PricingSection from '@/components/sections/Pricing';
import CTA from '@/components/sections/CTA';

const PricingPage: React.FC = () => (
  <div>
    <PageHeader
      title="Pricing Plans"
      subtitle="Simple, transparent plans designed for individuals, professional coaches, corporate teams, and healthcare providers."
      image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&h=400&fit=crop"
      breadcrumbs={[{ label: 'Pricing' }]}
    />
    <PricingSection />
    <CTA />
  </div>
);

export default PricingPage;
