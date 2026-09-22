import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Bot, Apple, Dumbbell, Moon, Brain, FileText,
  Watch, Shield, ShoppingBag, BarChart2, Settings, Users, ClipboardList,
  TrendingUp, MessageSquare, Briefcase, Building2, Bell, Globe, LogOut,
  ChevronLeft, ChevronRight, Activity, Stethoscope, Calendar, Star,
  HeartPulse, UserCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { APP_LOGO_URL, APP_LOGO_ICON_URL } from '@/constants/appConstants';
import { ROUTES } from '@/constants/routes';
import type { SidebarItem } from '@/types/common.types';

const SIDEBAR_CONFIG: Record<string, SidebarItem[]> = {
  individual_user: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.INDIVIDUAL.DASHBOARD },
    { label: 'Health Profile', icon: User, path: ROUTES.INDIVIDUAL.HEALTH_PROFILE },
    { label: 'AI Health Coach', icon: Bot, path: ROUTES.INDIVIDUAL.AI_COACH },
    { label: 'Nutrition', icon: Apple, path: ROUTES.INDIVIDUAL.NUTRITION },
    { label: 'Fitness', icon: Dumbbell, path: ROUTES.INDIVIDUAL.FITNESS },
    { label: 'Sleep & Recovery', icon: Moon, path: ROUTES.INDIVIDUAL.SLEEP },
    { label: 'Mental Wellness', icon: Brain, path: ROUTES.INDIVIDUAL.MENTAL_WELLNESS },
    { label: 'Medical Records', icon: FileText, path: ROUTES.INDIVIDUAL.MEDICAL_RECORDS },
    { label: 'Wearables', icon: Watch, path: ROUTES.INDIVIDUAL.WEARABLES },
    { label: 'Risk Assessment', icon: Shield, path: ROUTES.INDIVIDUAL.RISK_ASSESSMENT },
    { label: 'Marketplace', icon: ShoppingBag, path: ROUTES.INDIVIDUAL.MARKETPLACE },
    { label: 'Analytics', icon: BarChart2, path: ROUTES.INDIVIDUAL.ANALYTICS },
    { label: 'Profile', icon: UserCheck, path: ROUTES.INDIVIDUAL.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.INDIVIDUAL.SETTINGS },
  ],
  nutritionist: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.NUTRITIONIST.DASHBOARD },
    { label: 'My Clients', icon: Users, path: ROUTES.NUTRITIONIST.CLIENTS },
    { label: 'Diet Plans', icon: ClipboardList, path: ROUTES.NUTRITIONIST.DIET_PLANS },
    { label: 'Client Progress', icon: TrendingUp, path: ROUTES.NUTRITIONIST.PROGRESS },
    { label: 'Consultations', icon: MessageSquare, path: ROUTES.NUTRITIONIST.CONSULTATIONS },
    { label: 'Profile', icon: UserCheck, path: ROUTES.NUTRITIONIST.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.NUTRITIONIST.SETTINGS },
  ],
  fitness_coach: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.FITNESS_COACH.DASHBOARD },
    { label: 'My Clients', icon: Users, path: ROUTES.FITNESS_COACH.CLIENTS },
    { label: 'Workout Plans', icon: Dumbbell, path: ROUTES.FITNESS_COACH.WORKOUT_PLANS },
    { label: 'Client Progress', icon: TrendingUp, path: ROUTES.FITNESS_COACH.PROGRESS },
    { label: 'Challenges', icon: Star, path: ROUTES.FITNESS_COACH.CHALLENGES },
    { label: 'Profile', icon: UserCheck, path: ROUTES.FITNESS_COACH.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.FITNESS_COACH.SETTINGS },
  ],
  healthcare_professional: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.HEALTHCARE.DASHBOARD },
    { label: 'My Patients', icon: Users, path: ROUTES.HEALTHCARE.PATIENTS },
    { label: 'Medical Records', icon: FileText, path: ROUTES.HEALTHCARE.MEDICAL_RECORDS },
    { label: 'Recommendations', icon: Stethoscope, path: ROUTES.HEALTHCARE.RECOMMENDATIONS },
    { label: 'Appointments', icon: Calendar, path: ROUTES.HEALTHCARE.APPOINTMENTS },
    { label: 'Profile', icon: UserCheck, path: ROUTES.HEALTHCARE.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.HEALTHCARE.SETTINGS },
  ],
  corporate_wellness_manager: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.CORPORATE.DASHBOARD },
    { label: 'Employees', icon: Users, path: ROUTES.CORPORATE.EMPLOYEES },
    { label: 'Wellness Programs', icon: HeartPulse, path: ROUTES.CORPORATE.WELLNESS_PROGRAMS },
    { label: 'Reports', icon: FileText, path: ROUTES.CORPORATE.REPORTS },
    { label: 'Analytics', icon: BarChart2, path: ROUTES.CORPORATE.ANALYTICS },
    { label: 'Profile', icon: UserCheck, path: ROUTES.CORPORATE.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.CORPORATE.SETTINGS },
  ],
  family_member: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.FAMILY.DASHBOARD },
    { label: 'Family Profiles', icon: Users, path: ROUTES.FAMILY.SHARED_PROFILES },
    { label: 'Health Alerts', icon: Bell, path: ROUTES.FAMILY.ALERTS },
    { label: 'Profile', icon: UserCheck, path: ROUTES.FAMILY.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.FAMILY.SETTINGS },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.ADMIN.DASHBOARD },
    { label: 'User Management', icon: Users, path: ROUTES.ADMIN.USERS },
    { label: 'Healthcare Partners', icon: Briefcase, path: ROUTES.ADMIN.PARTNERS },
    { label: 'Subscriptions', icon: Activity, path: ROUTES.ADMIN.SUBSCRIPTIONS },
    { label: 'Marketplace', icon: ShoppingBag, path: ROUTES.ADMIN.MARKETPLACE },
    { label: 'Reports', icon: BarChart2, path: ROUTES.ADMIN.REPORTS },
    { label: 'Audit Logs', icon: ClipboardList, path: ROUTES.ADMIN.AUDIT_LOGS },
    { label: 'Security', icon: Shield, path: ROUTES.ADMIN.SECURITY },
    { label: 'Profile', icon: UserCheck, path: ROUTES.ADMIN.PROFILE },
    { label: 'Settings', icon: Settings, path: ROUTES.ADMIN.SETTINGS },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = user ? SIDEBAR_CONFIG[user.role] || [] : [];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${isCollapsed ? 'justify-center px-2' : ''}`}>
        <img
          src={isCollapsed ? APP_LOGO_ICON_URL : APP_LOGO_URL}
          alt="LifestyleBio"
          className={`${isCollapsed ? 'h-8 w-8' : 'h-10 w-auto'} transition-all object-contain`}
        />
        {!isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 hidden lg:flex"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button
          onClick={onToggleCollapse}
          className="flex justify-center py-2 text-gray-400 hover:text-gray-600 hidden lg:flex"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Visit Website */}
      {!isCollapsed && (
        <div className="px-3 py-2">
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-colors border border-dashed border-gray-200"
          >
            <Globe size={14} />
            Visit Website
          </Link>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-hide">
        {items.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-emerald-50 text-emerald-600 border-l-2 border-emerald-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <item.icon size={18} className={active ? 'text-emerald-500' : 'text-gray-400'} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Sign Out' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full ${isCollapsed ? 'justify-center px-2' : ''}`}
        >
          <LogOut size={18} />
          {!isCollapsed && 'Sign Out'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 z-40 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <SidebarContent />
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-100 z-40 shadow-2xl"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
