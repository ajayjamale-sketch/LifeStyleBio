import { fileToBase64, validateImageFile } from '@/utils/fileCompressor';

export const storageService = {
  uploadAvatar: async (file: File, userId: string): Promise<string> => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const base64 = await fileToBase64(file);
    const key = `lsb_avatar_${userId}`;
    localStorage.setItem(key, base64);
    return base64;
  },

  getAvatar: (userId: string): string | null => {
    return localStorage.getItem(`lsb_avatar_${userId}`);
  },

  removeAvatar: (userId: string): void => {
    localStorage.removeItem(`lsb_avatar_${userId}`);
  },

  uploadDocument: async (file: File, userId: string, docType: string): Promise<string> => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF and image files are supported');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    const base64 = await fileToBase64(file);
    const key = `lsb_doc_${userId}_${docType}_${Date.now()}`;
    localStorage.setItem(key, base64);
    return key;
  },

  getStorageUsage: (): { used: number; total: number } => {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage.getItem(key)?.length || 0;
      }
    }
    return {
      used: parseFloat((total / 1024 / 1024).toFixed(2)),
      total: 5, // 5MB typical localStorage limit
    };
  },
};

export default storageService;
