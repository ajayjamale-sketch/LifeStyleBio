import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Workflow, Lightbulb, Shield, Cpu, HeartPulse, BarChart2 } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import CTA from '@/components/sections/CTA';

const visionPoints = [
  { icon: Target, title: 'Our Mission', desc: 'To democratize access to evidence-based health management tools, enabling every individual to achieve optimal health through personalized, AI-powered insights.' },
  { icon: Eye, title: 'Our Vision', desc: 'A world where preventive healthcare is the norm, where people have the knowledge and tools to live longer, healthier, and more fulfilling lives.' },
];

const workflow = [
  { step: '01', title: 'Create Your Profile', desc: 'Complete a comprehensive health assessment covering your medical history, goals, lifestyle, and preferences.' },
  { step: '02', title: 'Connect Your Data', desc: 'Sync your wearables, manually log health metrics, and import medical records to build a complete health picture.' },
  { step: '03', title: 'Get AI Insights', desc: 'Receive personalized recommendations, risk assessments, and coaching from our advanced AI health system.' },
  { step: '04', title: 'Track Progress', desc: 'Monitor improvements with detailed analytics, celebrate achievements, and continuously optimize your health journey.' },
];

const skills = [
  { icon: Cpu, title: 'AI & Machine Learning', desc: 'Advanced algorithms trained on millions of health data points to deliver personalized insights.', color: 'bg-violet-50 text-violet-600' },
  { icon: HeartPulse, title: 'Health Sciences', desc: 'Backed by research from leading universities and health institutions worldwide.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: BarChart2, title: 'Data Analytics', desc: 'Sophisticated health data processing and visualization for actionable insights.', color: 'bg-sky-50 text-sky-600' },
  { icon: Shield, title: 'Healthcare Compliance', desc: 'HIPAA-compliant, privacy-first architecture protecting your sensitive health data.', color: 'bg-teal-50 text-teal-600' },
  { icon: Lightbulb, title: 'UX Research', desc: 'Designed with healthcare professionals and patients for the best user experience.', color: 'bg-yellow-50 text-yellow-600' },
  { icon: Workflow, title: 'Systems Integration', desc: 'Seamless connection with 200+ health apps, devices, and healthcare systems.', color: 'bg-orange-50 text-orange-600' },
];

const About: React.FC = () => (
  <div>
    <PageHeader
      title="About LifestyleBio"
      subtitle="We are on a mission to transform how the world approaches health and wellness through AI-powered, personalized healthcare."
      image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=500&fit=crop"
      breadcrumbs={[{ label: 'About' }]}
    />

    {/* Vision & Mission */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {visionPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl p-8 border border-emerald-100"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
                <point.icon size={22} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Strategy Image */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title mb-5">Our Strategic <span className="gradient-text">Approach</span></h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              LifestyleBio employs a precision health strategy that combines quantified self-tracking, behavioral science, and clinical expertise to deliver truly personalized health guidance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We operate at the intersection of technology and healthcare, using real-world evidence and continuous learning to improve our AI models and deliver increasingly accurate, relevant insights.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Evidence-Based', 'Privacy-First', 'User-Centered', 'Clinically Validated'].map(tag => (
                <div key={tag} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" alt="Strategy" className="rounded-2xl shadow-xl w-full" />
          </div>
        </div>
      </div>
    </section>

    {/* Workflow */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">How It <span className="gradient-text">Works</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">Get started in minutes and see results within days.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {workflow.map((w, i) => (
            <motion.div
              key={w.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-white font-bold text-lg">{w.step}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{w.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Skill Areas */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Our Core <span className="gradient-text">Competencies</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">Built on deep expertise across healthcare, technology, and data science.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${skill.color}`}>
                <skill.icon size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{skill.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CTA />
  </div>
);

export default About;
