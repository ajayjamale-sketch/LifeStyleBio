export interface HealthProfile {
  userId: string;
  height: number;
  weight: number;
  bloodType?: string;
  allergies: string[];
  medications: string[];
  chronicConditions: string[];
  fitnessLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  healthGoals: string[];
  dietaryPreferences: string[];
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'occasional' | 'moderate' | 'heavy';
  sleepHours: number;
  stressLevel: number;
  updatedAt: string;
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  waterIntake: number;
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  time: string;
}

export interface FitnessLog {
  id: string;
  userId: string;
  date: string;
  workoutType: string;
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

export interface SleepLog {
  id: string;
  userId: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  duration: number;
  quality: number;
  deepSleep: number;
  remSleep: number;
  lightSleep: number;
  awakeTime: number;
  notes?: string;
}

export interface MoodLog {
  id: string;
  userId: string;
  date: string;
  mood: number;
  energy: number;
  anxiety: number;
  stress: number;
  notes?: string;
  activities: string[];
}

export interface MedicalRecord {
  id: string;
  userId: string;
  type: 'lab_report' | 'prescription' | 'diagnosis' | 'vaccination' | 'imaging' | 'other';
  title: string;
  description: string;
  date: string;
  doctor?: string;
  hospital?: string;
  fileUrl?: string;
  results?: Record<string, string | number>;
  createdAt: string;
  updatedAt: string;
}

export interface VitalSigns {
  id: string;
  userId: string;
  date: string;
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  bloodOxygen?: number;
  temperature?: number;
  weight?: number;
  steps?: number;
  source: 'manual' | 'wearable';
}
