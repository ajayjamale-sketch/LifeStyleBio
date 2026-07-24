import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Star, Zap } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for individuals starting their health journey',
    badge: null,
    features: [
      'Basic health tracking',
      'Nutrition logging (up to 3 meals/day)',
      'Step counter & activity log',
      'Sleep duration tracking',
      '7-day data history',
      'Community access',
    ],
    cta: 'Get Started Free',
    href: ROUTES.REGISTER,
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 12,
    period: 'month',
    description: 'For health-conscious individuals who want comprehensive insights',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'AI Health Coach (unlimited)',
      'Advanced nutrition analytics',
      'Fitness & workout planning',
      'Sleep stage analysis',
      'Mental wellness tracking',
      'Wearable device sync',
      'Medical records storage',
      '90-day data history',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: ROUTES.REGISTER,
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 29,
    period: 'month',
    description: 'For healthcare professionals and serious health optimizers',
    badge: 'Best Value',
    features: [
      'Everything in Pro',
      'Risk assessment & predictions',
      'Healthcare partner portal',
      'Family health monitoring (up to 6)',
      'Advanced lab result tracking',
      'Preventive care reminders',
      'Export & share reports',
      'Unlimited data history',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Start Free Trial',
    href: ROUTES.REGISTER,
    highlighted: false,
  },
];

const Pricing: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="section-title mb-3">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Choose the plan that fits your health journey. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-7 ${plan.highlighted
              ? 'bg-gradient-brand text-white shadow-2xl scale-[1.03]'
              : 'bg-white border border-gray-100 shadow-sm'}`}
          >
            {plan.badge && (
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.highlighted ? 'bg-white text-emerald-600' : 'bg-emerald-500 text-white'}`}>
                {plan.badge}
              </div>
            )}
            <div className="mb-6">
              <h3 className={`text-xl font-bold font-heading mb-1.5 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>{plan.description}</p>
            </div>
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-bold font-heading ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && <span className={`text-sm mb-1.5 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>/{plan.period}</span>}
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                  <Check size={15} className={`mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-emerald-500'}`} />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to={plan.href}
              className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                plan.highlighted
                  ? 'bg-white text-emerald-600 hover:bg-gray-50 shadow-md'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md'
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
