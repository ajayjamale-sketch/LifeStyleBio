import React from 'react';
import PageHeader from '@/components/common/PageHeader';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const TermsConditions: React.FC = () => (
  <div>
    <PageHeader title="Terms & Conditions" subtitle="Last updated: July 24, 2026" gradient="wellness" breadcrumbs={[{ label: 'Terms & Conditions' }]} />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <p className="text-gray-600 mb-8 leading-relaxed">By accessing or using LifestyleBio, you agree to be bound by these Terms and Conditions. If you disagree with any part, you may not access our services.</p>
      <Section title="1. Acceptance of Terms">
        <p>By creating an account or using any LifestyleBio service, you confirm that you are at least 18 years old, have read and agree to these terms, and have the legal authority to enter this agreement.</p>
      </Section>
      <Section title="2. Description of Services">
        <p>LifestyleBio provides an AI-powered health and wellness platform including nutrition tracking, fitness planning, sleep analytics, mental wellness tools, medical record storage, and related services. Our services are for informational and wellness purposes and do not constitute medical advice.</p>
      </Section>
      <Section title="3. Medical Disclaimer">
        <p>LifestyleBio is not a medical provider. Content on the platform is for informational purposes only and should not replace professional medical advice. Always consult qualified healthcare professionals for medical decisions, diagnosis, or treatment.</p>
      </Section>
      <Section title="4. Account Security">
        <p>You are responsible for maintaining the confidentiality of your credentials and all activities under your account. Notify us immediately of unauthorized access. We are not liable for losses from unauthorized account use.</p>
      </Section>
      <Section title="5. Subscription and Billing">
        <p>Paid subscriptions are billed in advance. Prices may change with 30 days notice. You may cancel anytime, but we do not provide prorated refunds for unused subscription periods unless required by law.</p>
      </Section>
      <Section title="6. Intellectual Property">
        <p>LifestyleBio retains all rights to the platform, including code, design, content, and AI models. You retain ownership of health data you input. You grant us a license to process your data to provide services.</p>
      </Section>
      <Section title="7. Limitation of Liability">
        <p>LifestyleBio shall not be liable for indirect, incidental, special, or consequential damages. Our total liability for direct damages shall not exceed the amount you paid in the 12 months preceding the claim.</p>
      </Section>
      <Section title="8. Governing Law">
        <p>These terms are governed by the laws of California, USA. Disputes shall be resolved through binding arbitration in San Francisco, CA, except where prohibited by law.</p>
      </Section>
    </div>
  </div>
);

export default TermsConditions;
