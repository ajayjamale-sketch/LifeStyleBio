import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getInitials, getAvatarUrl, getRoleDashboard } from '@/utils/helpers';
import { ROLE_LABELS } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';

const getProfilePath = (role: string) => {
  const paths: Record<string, string> = {
    individual_user: ROUTES.INDIVIDUAL.PROFILE,
    nutritionist: ROUTES.NUTRITIONIST.PROFILE,
    fitness_coach: ROUTES.FITNESS_COACH.PROFILE,
    healthcare_professional: ROUTES.HEALTHCARE.PROFILE,
    corporate_wellness_manager: ROUTES.CORPORATE.PROFILE,
    family_member: ROUTES.FAMILY.PROFILE,
    admin: ROUTES.ADMIN.PROFILE,
  };
  return paths[role] || ROUTES.INDIVIDUAL.PROFILE;
};

const getSettingsPath = (role: string) => {
  const paths: Record<string, string> = {
    individual_user: ROUTES.INDIVIDUAL.SETTINGS,
    nutritionist: ROUTES.NUTRITIONIST.SETTINGS,
    fitness_coach: ROUTES.FITNESS_COACH.SETTINGS,
    healthcare_professional: ROUTES.HEALTHCARE.SETTINGS,
    corporate_wellness_manager: ROUTES.CORPORATE.SETTINGS,
    family_member: ROUTES.FAMILY.SETTINGS,
    admin: ROUTES.ADMIN.SETTINGS,
  };
  return paths[role] || ROUTES.INDIVIDUAL.SETTINGS;
};

const ProfileDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
          ) : (
            getInitials(user.firstName, user.lastName)
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold text-gray-900 leading-tight">{user.firstName} {user.lastName}</div>
          <div className="text-xs text-gray-500">{ROLE_LABELS[user.role]}</div>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-sky-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                {ROLE_LABELS[user.role]}
              </span>
            </div>
            <div className="p-2">
              <Link to={getProfilePath(user.role)} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                <User size={16} className="text-gray-400" /> My Profile
              </Link>
              <Link to={getSettingsPath(user.role)} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                <Settings size={16} className="text-gray-400" /> Settings
              </Link>
              <Link to={ROUTES.HOME} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                <Globe size={16} className="text-gray-400" /> Visit Website
              </Link>
              <div className="border-t border-gray-100 my-1" />
              <button onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors font-medium w-full">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
