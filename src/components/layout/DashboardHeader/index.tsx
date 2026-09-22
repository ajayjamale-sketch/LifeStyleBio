import React from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ProfileDropdown from '../ProfileDropdown';
import NotificationDropdown from '../NotificationDropdown';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

const getPageTitle = (pathname: string): string => {
  const map: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/health-profile': 'Health Profile',
    '/dashboard/ai-coach': 'AI Health Coach',
    '/dashboard/nutrition': 'Nutrition & Diet',
    '/dashboard/fitness': 'Fitness & Activity',
    '/dashboard/sleep': 'Sleep & Recovery',
    '/dashboard/mental-wellness': 'Mental Wellness',
    '/dashboard/medical-records': 'Medical Records',
    '/dashboard/wearables': 'Wearable Integration',
    '/dashboard/risk-assessment': 'Risk Assessment',
    '/dashboard/marketplace': 'Wellness Marketplace',
    '/dashboard/analytics': 'Health Analytics',
    '/dashboard/profile': 'My Profile',
    '/dashboard/settings': 'Settings',
    '/nutritionist/dashboard': 'Dashboard',
    '/nutritionist/clients': 'My Clients',
    '/nutritionist/diet-plans': 'Diet Plans',
    '/nutritionist/progress': 'Client Progress',
    '/nutritionist/consultations': 'Consultations',
    '/fitness-coach/dashboard': 'Dashboard',
    '/fitness-coach/clients': 'My Clients',
    '/fitness-coach/workout-plans': 'Workout Plans',
    '/fitness-coach/challenges': 'Fitness Challenges',
    '/healthcare/dashboard': 'Dashboard',
    '/healthcare/patients': 'My Patients',
    '/healthcare/appointments': 'Appointments',
    '/corporate/dashboard': 'Dashboard',
    '/corporate/employees': 'Employees',
    '/corporate/wellness-programs': 'Wellness Programs',
    '/family/dashboard': 'Family Dashboard',
    '/family/shared-profiles': 'Family Profiles',
    '/family/alerts': 'Health Alerts',
    '/admin/dashboard': 'Admin Dashboard',
    '/admin/users': 'User Management',
    '/admin/partners': 'Healthcare Partners',
    '/admin/subscriptions': 'Subscriptions',
    '/admin/audit-logs': 'Audit Logs',
    '/admin/security': 'Security',
  };
  return map[pathname] || 'Dashboard';
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 font-heading leading-tight">{getPageTitle(pathname)}</h1>
          <p className="text-xs text-gray-400 hidden sm:block">{today}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
