import { z } from 'zod';

export const emailSchema = z.string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z.string()
  .min(7, 'Phone number must be at least 7 digits')
  .max(15, 'Phone number must be at most 15 digits')
  .regex(/^[0-9]+$/, 'Phone number must contain only digits');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: emailSchema,
  countryCode: z.string().min(1, 'Country code is required'),
  phone: phoneSchema,
  role: z.enum([
    'individual_user',
    'nutritionist',
    'fitness_coach',
    'healthcare_professional',
    'corporate_wellness_manager',
    'family_member',
  ]),
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(1000),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
});

export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: emailSchema,
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const healthProfileSchema = z.object({
  height: z.number().min(50, 'Height must be at least 50cm').max(300, 'Height must be at most 300cm'),
  weight: z.number().min(20, 'Weight must be at least 20kg').max(500, 'Weight must be at most 500kg'),
  bloodType: z.string().optional(),
  fitnessLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']),
  smokingStatus: z.enum(['never', 'former', 'current']),
  alcoholConsumption: z.enum(['none', 'occasional', 'moderate', 'heavy']),
  sleepHours: z.number().min(1).max(24),
  stressLevel: z.number().min(1).max(10),
});

export const medicalRecordSchema = z.object({
  type: z.enum(['lab_report', 'prescription', 'diagnosis', 'vaccination', 'imaging', 'other']),
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  doctor: z.string().optional(),
  hospital: z.string().optional(),
});
