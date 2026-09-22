import React, { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { User, AuthState, LoginCredentials, RegisterData, UserRole } from '@/types/auth.types';
import { STORAGE_KEYS, APP_NAME } from '@/constants/appConstants';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/constants/roles';
import { generateId } from '@/utils/helpers';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  adminLogin: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  switchRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_ADMIN: User = {
  id: 'admin_001',
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  firstName: 'System',
  lastName: 'Admin',
  phone: '5550001234',
  countryCode: '+1',
  role: 'admin',
  avatar: undefined,
  createdAt: new Date().toISOString(),
  isActive: true,
};

const DEFAULT_DEMO_USER: User = {
  id: 'user_001',
  email: 'alex.morgan@lifestylebio.com',
  password: 'User@123456',
  firstName: 'Alex',
  lastName: 'Morgan',
  phone: '555-0192',
  countryCode: '+1',
  role: 'individual_user',
  createdAt: new Date().toISOString(),
  isActive: true,
};

const INITIAL_SEED_USERS: User[] = [
  DEFAULT_DEMO_USER,
  DEFAULT_ADMIN,
  {
    id: 'user_002',
    email: 'nutritionist@lifestylebio.com',
    password: 'Diet@123456',
    firstName: 'Dr. Sarah',
    lastName: 'Taylor',
    phone: '555-0193',
    countryCode: '+1',
    role: 'nutritionist',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'user_003',
    email: 'fitness@lifestylebio.com',
    password: 'Coach@123456',
    firstName: 'Coach Marcus',
    lastName: 'Vance',
    phone: '555-0194',
    countryCode: '+1',
    role: 'fitness_coach',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'user_004',
    email: 'doctor@lifestylebio.com',
    password: 'Doctor@123456',
    firstName: 'Dr. Robert',
    lastName: 'Chen',
    phone: '555-0195',
    countryCode: '+1',
    role: 'healthcare_professional',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'user_005',
    email: 'corporate@lifestylebio.com',
    password: 'Corp@123456',
    firstName: 'Elena',
    lastName: 'Rostova',
    phone: '555-0196',
    countryCode: '+1',
    role: 'corporate_wellness_manager',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'user_006',
    email: 'family@lifestylebio.com',
    password: 'Family@123456',
    firstName: 'John',
    lastName: 'Smith',
    phone: '555-0197',
    countryCode: '+1',
    role: 'family_member',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clean up literal "undefined" key bug from localStorage if left behind
    localStorage.removeItem('undefined');

    let allUsers: User[] = [];
    try {
      allUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    } catch {
      allUsers = [];
    }

    if (!Array.isArray(allUsers) || allUsers.length === 0) {
      allUsers = INITIAL_SEED_USERS;
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(allUsers));
    } else {
      INITIAL_SEED_USERS.forEach(seedUser => {
        if (!allUsers.some(u => u.email.toLowerCase() === seedUser.email.toLowerCase())) {
          allUsers.push(seedUser);
        }
      });
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(allUsers));
    }

    // Restore session
    const savedUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    let sessionUser: User | null = null;
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.id && parsed.role) {
          sessionUser = parsed;
        }
      } catch {
        sessionUser = null;
      }
    }

    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const foundUser = allUsers.find(
      u => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
    );

    if (!foundUser) {
      toast.error('Invalid email or password. Please try again.');
      return false;
    }

    if (!foundUser.isActive) {
      toast.error('Your account has been deactivated. Please contact support.');
      return false;
    }

    if (foundUser.role === 'admin') {
      toast.error('Please use the Admin Login page to access the admin portal.');
      return false;
    }

    const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() };
    const updatedUsers = allUsers.map(u => u.id === foundUser.id ? updatedUser : u);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success(`Welcome back, ${foundUser.firstName}!`);
    return true;
  }, []);

  const adminLogin = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const adminUser = allUsers.find(
      u => u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password &&
        u.role === 'admin'
    );

    if (!adminUser) {
      toast.error('Invalid admin credentials.');
      return false;
    }

    const updatedUser = { ...adminUser, lastLogin: new Date().toISOString() };
    const updatedUsers = allUsers.map(u => u.id === adminUser.id ? updatedUser : u);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success(`Admin portal access granted. Welcome, ${adminUser.firstName}!`);
    return true;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const emailExists = allUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());

    if (emailExists) {
      toast.error('An account with this email already exists.');
      return false;
    }

    const newUser: User = {
      id: generateId(),
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      countryCode: data.countryCode,
      role: data.role as UserRole,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    allUsers.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(allUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    setUser(newUser);
    toast.success(`Welcome to ${APP_NAME}, ${newUser.firstName}! Your journey starts now.`);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
    toast.success('You have been signed out successfully.');
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const updatedUsers = allUsers.map(u => u.id === user.id ? updated : u);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
    setUser(updated);
  }, [user]);

  const switchRole = useCallback((newRole: UserRole) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
    const targetUser = allUsers.find(u => u.role === newRole) || {
      ...DEFAULT_DEMO_USER,
      role: newRole,
      firstName: `${newRole.charAt(0).toUpperCase() + newRole.slice(1)} Demo`,
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(targetUser));
    setUser(targetUser);
    toast.success(`Switched role view to ${newRole.replace('_', ' ')}`);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      adminLogin,
      register,
      logout,
      updateUser,
      switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
