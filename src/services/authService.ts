import type { User } from '@/types/auth.types';
import { STORAGE_KEYS } from '@/constants/appConstants';

export const authService = {
  getAllUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
  },

  getUserById: (id: string): User | undefined => {
    const users = authService.getAllUsers();
    return users.find(u => u.id === id);
  },

  getUserByEmail: (email: string): User | undefined => {
    const users = authService.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  updateUser: (id: string, updates: Partial<User>): User | null => {
    const users = authService.getAllUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
    return users[index];
  },

  deleteUser: (id: string): boolean => {
    const users = authService.getAllUsers();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(filtered));
    return true;
  },

  toggleUserStatus: (id: string): User | null => {
    const users = authService.getAllUsers();
    const user = users.find(u => u.id === id);
    if (!user) return null;
    return authService.updateUser(id, { isActive: !user.isActive });
  },

  getCurrentUser: (): User | null => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  },

  isEmailTaken: (email: string, excludeId?: string): boolean => {
    const users = authService.getAllUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== excludeId);
  },
};

export default authService;
