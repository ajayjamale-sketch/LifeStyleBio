export const STORAGE_KEYS = {
  THEME: 'lifestylebio_theme',
  AUTH_TOKEN: 'lifestylebio_auth_token',
  USER_DATA: 'lifestylebio_user',
  CURRENT_USER: 'lifestylebio_current_user',
  ALL_USERS: 'lifestylebio_all_users',
  HEALTH_DATA: 'lifestylebio_health_data',
  MEDICAL_RECORDS: 'lifestylebio_medical_records',
} as const;

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const COUNTRY_CODES = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'IN', name: 'India', dialCode: '+91' },
] as const;

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/lifestylebio',
  FACEBOOK: 'https://facebook.com/lifestylebio',
  INSTAGRAM: 'https://instagram.com/lifestylebio',
  LINKEDIN: 'https://linkedin.com/company/lifestylebio',
} as const;

export const APP_NAME = 'LifestyleBio';
export const APP_LOGO_URL = `${import.meta.env.BASE_URL}logo.svg`;
export const APP_LOGO_ICON_URL = `${import.meta.env.BASE_URL}logo-icon.svg`;
export const APP_DESCRIPTION = 'AI-powered personalized health platform';

