// API endpoint constants (for future backend integration)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.lifestylebio.com/v1';

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',
};

export const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  SETTINGS: '/users/settings',
  AVATAR: '/users/avatar',
  UPDATE: '/users/update',
  DELETE: '/users/delete',
};

export const HEALTH_ENDPOINTS = {
  PROFILE: '/health/profile',
  VITALS: '/health/vitals',
  NUTRITION: '/health/nutrition',
  FITNESS: '/health/fitness',
  SLEEP: '/health/sleep',
  MOOD: '/health/mood',
};

export const MEDICAL_ENDPOINTS = {
  RECORDS: '/medical/records',
  LABS: '/medical/labs',
  PRESCRIPTIONS: '/medical/prescriptions',
  APPOINTMENTS: '/medical/appointments',
};

export const ANALYTICS_ENDPOINTS = {
  DASHBOARD: '/analytics/dashboard',
  HEALTH_TRENDS: '/analytics/health-trends',
  REPORTS: '/analytics/reports',
};
