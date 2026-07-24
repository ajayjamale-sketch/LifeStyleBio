export const STORAGE_KEYS = {
  THEME: 'lifestylebio_theme',
  AUTH_TOKEN: 'lifestylebio_auth_token',
  USER_DATA: 'lifestylebio_user',
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
export const APP_LOGO_URL = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop';
export const APP_DESCRIPTION = 'AI-powered personalized health platform';
