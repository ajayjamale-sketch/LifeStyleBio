export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  FEATURES: '/features',
  PRICING: '/pricing',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:slug',
  CONTACT: '/contact',
  HELP_CENTER: '/help-center',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  NOT_FOUND: '*',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN_LOGIN: '/admin/login',

  // Individual User Dashboard
  INDIVIDUAL: {
    DASHBOARD: '/dashboard',
    HEALTH_PROFILE: '/dashboard/health-profile',
    AI_COACH: '/dashboard/ai-coach',
    NUTRITION: '/dashboard/nutrition',
    FITNESS: '/dashboard/fitness',
    SLEEP: '/dashboard/sleep',
    MENTAL_WELLNESS: '/dashboard/mental-wellness',
    MEDICAL_RECORDS: '/dashboard/medical-records',
    WEARABLES: '/dashboard/wearables',
    RISK_ASSESSMENT: '/dashboard/risk-assessment',
    MARKETPLACE: '/dashboard/marketplace',
    ANALYTICS: '/dashboard/analytics',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
  },

  // Nutritionist Dashboard
  NUTRITIONIST: {
    DASHBOARD: '/nutritionist/dashboard',
    CLIENTS: '/nutritionist/clients',
    DIET_PLANS: '/nutritionist/diet-plans',
    PROGRESS: '/nutritionist/progress',
    CONSULTATIONS: '/nutritionist/consultations',
    PROFILE: '/nutritionist/profile',
    SETTINGS: '/nutritionist/settings',
  },

  // Fitness Coach Dashboard
  FITNESS_COACH: {
    DASHBOARD: '/fitness-coach/dashboard',
    CLIENTS: '/fitness-coach/clients',
    WORKOUT_PLANS: '/fitness-coach/workout-plans',
    PROGRESS: '/fitness-coach/progress',
    CHALLENGES: '/fitness-coach/challenges',
    PROFILE: '/fitness-coach/profile',
    SETTINGS: '/fitness-coach/settings',
  },

  // Healthcare Professional Dashboard
  HEALTHCARE: {
    DASHBOARD: '/healthcare/dashboard',
    PATIENTS: '/healthcare/patients',
    MEDICAL_RECORDS: '/healthcare/medical-records',
    RECOMMENDATIONS: '/healthcare/recommendations',
    APPOINTMENTS: '/healthcare/appointments',
    PROFILE: '/healthcare/profile',
    SETTINGS: '/healthcare/settings',
  },

  // Corporate Wellness Manager Dashboard
  CORPORATE: {
    DASHBOARD: '/corporate/dashboard',
    EMPLOYEES: '/corporate/employees',
    WELLNESS_PROGRAMS: '/corporate/wellness-programs',
    REPORTS: '/corporate/reports',
    ANALYTICS: '/corporate/analytics',
    PROFILE: '/corporate/profile',
    SETTINGS: '/corporate/settings',
  },

  // Family Member Dashboard
  FAMILY: {
    DASHBOARD: '/family/dashboard',
    SHARED_PROFILES: '/family/shared-profiles',
    ALERTS: '/family/alerts',
    PROFILE: '/family/profile',
    SETTINGS: '/family/settings',
  },

  // Admin Dashboard
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    PARTNERS: '/admin/partners',
    SUBSCRIPTIONS: '/admin/subscriptions',
    MARKETPLACE: '/admin/marketplace',
    REPORTS: '/admin/reports',
    AUDIT_LOGS: '/admin/audit-logs',
    SECURITY: '/admin/security',
    PROFILE: '/admin/profile',
    SETTINGS: '/admin/settings',
  },
} as const;

export const getRoleDashboard = (role: string): string => {
  const dashboards: Record<string, string> = {
    individual_user: ROUTES.INDIVIDUAL.DASHBOARD,
    nutritionist: ROUTES.NUTRITIONIST.DASHBOARD,
    fitness_coach: ROUTES.FITNESS_COACH.DASHBOARD,
    healthcare_professional: ROUTES.HEALTHCARE.DASHBOARD,
    corporate_wellness_manager: ROUTES.CORPORATE.DASHBOARD,
    family_member: ROUTES.FAMILY.DASHBOARD,
    admin: ROUTES.ADMIN.DASHBOARD,
  };
  return dashboards[role] || ROUTES.INDIVIDUAL.DASHBOARD;
};
