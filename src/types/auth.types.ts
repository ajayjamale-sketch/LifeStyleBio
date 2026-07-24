export type UserRole =
  | 'individual_user'
  | 'nutritionist'
  | 'fitness_coach'
  | 'healthcare_professional'
  | 'corporate_wellness_manager'
  | 'family_member'
  | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}
