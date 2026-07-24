import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Is my health data secure?', a: 'Absolutely. LifestyleBio uses enterprise-grade encryption and follows HIPAA compliance standards. Your data is never shared with third parties without your explicit consent.' },
  { q: 'Can I use LifestyleBio with my existing wearable devices?', a: 'Yes! LifestyleBio integrates with major wearables including Apple Watch, Fitbit, Garmin, Oura Ring, and many more. Data syncs automatically to keep your health metrics current.' },
  { q: 'What roles are available on the platform?', a: 'LifestyleBio supports Individual Users, Nutritionists, Fitness Coaches, Healthcare Professionals, Corporate Wellness Managers, and Family Members — each with dedicated dashboards.' },
  { q: 'Can I cancel or change my subscription anytime?', a: 'Yes. You can upgrade, downgrade, or cancel your subscription at any time from your account settings. No long-term contracts or hidden fees.' },
  { q: 'Does the AI Health Coach replace my doctor?', a: 'No. The AI Health Coach is designed to complement your healthcare journey with personalized insights and education. Always consult qualified healthcare professionals for medical decisions.' },
  { q: 'Is there a free trial available?', a: 'Yes! All plans include a 14-day free trial with no credit card required. You can explore all features before deciding which plan best suits your needs.' },
  { q: 'How accurate is the nutrition tracking?', a: 'Our nutrition database contains over 1 million foods with accurate macro and micronutrient data. You can also scan barcodes, take photos of meals, or log custom recipes.' },
  { q: 'Can I share my health data with my healthcare provider?', a: 'Yes. LifestyleBio allows you to generate comprehensive health reports that can be shared with your healthcare providers, making appointments more productive and informed.' },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to know about LifestyleBio.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-4 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
