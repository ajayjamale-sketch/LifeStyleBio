import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { APP_LOGO_URL, SOCIAL_LINKS } from '@/constants/appConstants';
import { ROUTES } from '@/constants/routes';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const links = {
    Platform: [
      { label: 'Features', href: ROUTES.FEATURES },
      { label: 'Pricing', href: ROUTES.PRICING },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Blog', href: ROUTES.BLOG },
    ],
    Support: [
      { label: 'Help Center', href: ROUTES.HELP_CENTER },
      { label: 'Contact Us', href: ROUTES.CONTACT },
      { label: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
      { label: 'Terms of Service', href: ROUTES.TERMS_CONDITIONS },
    ],
    Account: [
      { label: 'Sign In', href: ROUTES.LOGIN },
      { label: 'Create Account', href: ROUTES.REGISTER },
      { label: 'For Healthcare', href: ROUTES.REGISTER },
      { label: 'For Corporates', href: ROUTES.REGISTER },
    ],
  };

  const socials = [
    { icon: Twitter, href: SOCIAL_LINKS.TWITTER, label: 'Twitter' },
    { icon: Facebook, href: SOCIAL_LINKS.FACEBOOK, label: 'Facebook' },
    { icon: Instagram, href: SOCIAL_LINKS.INSTAGRAM, label: 'Instagram' },
    { icon: Linkedin, href: SOCIAL_LINKS.LINKEDIN, label: 'LinkedIn' },
    { icon: Youtube, href: SOCIAL_LINKS.YOUTUBE, label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={APP_LOGO_URL} alt="LifestyleBio" className="h-12 w-auto brightness-0 invert mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your AI-powered health and wellness partner. Live healthier, achieve your goals, and transform your lifestyle with personalized insights.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {year} LifestyleBio. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-500 fill-red-500" /> for your health journey
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
