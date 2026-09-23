import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/appConstants';
import { ROUTES } from '@/constants/routes';
import { XIcon, LinkedInIcon, FacebookIcon } from '@/components/common/SocialIcons';
import { BrandLogo } from '@/components/common/BrandLogo';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const links = {
    Platform: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Platform Features', href: ROUTES.FEATURES },
      { label: 'Pricing & Tiers', href: ROUTES.PRICING },
      { label: 'About LifestyleBio', href: ROUTES.ABOUT },
      { label: 'Longevity Blog', href: ROUTES.BLOG },
    ],
    Support: [
      { label: 'Help Center & FAQ', href: ROUTES.HELP_CENTER },
      { label: 'Contact Us', href: ROUTES.CONTACT },
    ],
    Portals: [
      { label: 'Member Sign In', href: ROUTES.LOGIN },
      { label: 'Create Account', href: ROUTES.REGISTER },
      { label: 'Password Recovery', href: ROUTES.FORGOT_PASSWORD },
      { label: 'Admin Portal', href: ROUTES.ADMIN_LOGIN },
    ],
    Legal: [
      { label: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
      { label: 'Terms & Conditions', href: ROUTES.TERMS_CONDITIONS },
    ],
  };

  const socials = [
    { icon: XIcon, href: SOCIAL_LINKS.TWITTER, label: 'X (Twitter)' },
    { icon: LinkedInIcon, href: SOCIAL_LINKS.LINKEDIN, label: 'LinkedIn' },
    { icon: FacebookIcon, href: SOCIAL_LINKS.FACEBOOK, label: 'Facebook' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 mb-12">
          {/* Brand Col (2 cols) */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Link to={ROUTES.HOME} className="inline-block">
                <BrandLogo variant="dark" className="h-9 sm:h-10 w-auto" />
              </Link>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              The AI-powered personal health, longevity, and preventive wellness platform. Unifying wearables, lab records, and 24×7 coaching into one continuous healthspan baseline.
            </p>
            <div className="flex items-center gap-2.5 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors text-gray-300 hover:text-white"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
              <ShieldCheck size={14} />
              <span>HIPAA Compliant • 256-Bit Encrypted</span>
            </div>
          </div>

          {/* Links Columns (4 cols) */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="col-span-1">
              <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-gray-400 hover:text-emerald-400 text-xs transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Clinical Non-Diagnostic Medical Disclaimer */}
        <div className="bg-gray-800/60 rounded-2xl p-4 border border-gray-700/50 mb-8 text-[11px] text-gray-400 leading-relaxed">
          <strong className="text-gray-300 font-semibold">Medical Disclaimer:</strong> LifestyleBio is an informational health intelligence and lifestyle optimization platform. The insights, biomarker interpretations, and AI coaching recommendations provided are for wellness and educational purposes only and do not constitute medical diagnosis, treatment, or professional clinical advice. Always consult a qualified healthcare provider for medical conditions or emergencies.
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {year} LifestyleBio Inc. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed for human longevity and preventive vitality <Heart size={12} className="text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
