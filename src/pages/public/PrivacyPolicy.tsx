import React from 'react';
import PageHeader from '@/components/common/PageHeader';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const PrivacyPolicy: React.FC = () => (
  <div>
    <PageHeader title="Privacy Policy" subtitle="Last updated: July 24, 2026" breadcrumbs={[{ label: 'Privacy Policy' }]} />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-8 leading-relaxed">At LifestyleBio, we take your privacy seriously. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our platform. Please read this carefully.</p>
        <Section title="1. Information We Collect">
          <p>We collect information you provide directly, including: name, email address, phone number, date of birth, health metrics, medical history, and fitness data. We also automatically collect device information, usage data, and cookies when you use our platform.</p>
        </Section>
        <Section title="2. How We Use Your Information">
          <p>We use your information to: provide and personalize our health and wellness services, generate AI-powered health insights, facilitate communication between you and healthcare providers, improve our platform, send you relevant notifications, and comply with legal obligations.</p>
        </Section>
        <Section title="3. HIPAA Compliance">
          <p>LifestyleBio is designed to be HIPAA-compliant. We implement appropriate administrative, physical, and technical safeguards to protect your Protected Health Information (PHI). We only disclose PHI with your explicit consent or as required by law.</p>
        </Section>
        <Section title="4. Data Security">
          <p>We use industry-standard security measures including AES-256 encryption for data at rest, TLS 1.3 for data in transit, multi-factor authentication, regular security audits, and 24/7 monitoring to protect your data.</p>
        </Section>
        <Section title="5. Data Sharing">
          <p>We do not sell your personal health data. We may share data with: healthcare providers you explicitly authorize, service providers who process data on our behalf under strict confidentiality agreements, and authorities when required by law.</p>
        </Section>
        <Section title="6. Your Rights">
          <p>You have the right to: access your personal data, correct inaccurate data, request deletion of your data, export your data in portable formats, withdraw consent, and lodge complaints with supervisory authorities.</p>
        </Section>
        <Section title="7. Data Retention">
          <p>We retain your data for as long as your account is active or as needed to provide services. You can request deletion at any time from Settings &gt; Privacy &gt; Delete Account. Health records may be retained for legally required periods.</p>
        </Section>
        <Section title="8. Contact Us">
          <p>For privacy-related questions, contact our Privacy Officer at: privacy@lifestylebio.com or write to: LifestyleBio Privacy Officer, 123 Wellness Avenue, San Francisco, CA 94105, USA.</p>
        </Section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
