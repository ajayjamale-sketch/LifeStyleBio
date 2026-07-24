import type { UserRole } from '@/types/auth.types';

export const ROLES = {
  INDIVIDUAL_USER: 'individual_user' as UserRole,
  NUTRITIONIST: 'nutritionist' as UserRole,
  FITNESS_COACH: 'fitness_coach' as UserRole,
  HEALTHCARE_PROFESSIONAL: 'healthcare_professional' as UserRole,
  CORPORATE_WELLNESS_MANAGER: 'corporate_wellness_manager' as UserRole,
  FAMILY_MEMBER: 'family_member' as UserRole,
  ADMIN: 'admin' as UserRole,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  individual_user: 'Individual User',
  nutritionist: 'Nutritionist',
  fitness_coach: 'Fitness Coach',
  healthcare_professional: 'Healthcare Professional',
  corporate_wellness_manager: 'Corporate Wellness Manager',
  family_member: 'Family Member',
  admin: 'Administrator',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  individual_user: 'Personal health and wellness tracking',
  nutritionist: 'Manage clients and diet plans',
  fitness_coach: 'Manage clients and workout programs',
  healthcare_professional: 'Patient management and medical records',
  corporate_wellness_manager: 'Corporate wellness program management',
  family_member: 'Family health monitoring and alerts',
  admin: 'Platform administration and management',
};

export const ROLE_OPTIONS = [
  { value: 'individual_user', label: 'Individual User', description: 'Personal health tracking' },
  { value: 'nutritionist', label: 'Nutritionist', description: 'Manage clients and diet plans' },
  { value: 'fitness_coach', label: 'Fitness Coach', description: 'Manage clients and workouts' },
  { value: 'healthcare_professional', label: 'Healthcare Professional', description: 'Patient management' },
  { value: 'corporate_wellness_manager', label: 'Corporate Wellness Manager', description: 'Corporate wellness' },
  { value: 'family_member', label: 'Family Member', description: 'Family health monitoring' },
];

export const ADMIN_EMAIL = 'admin@lifestylebio.com';
export const ADMIN_PASSWORD = 'Admin@123456';
