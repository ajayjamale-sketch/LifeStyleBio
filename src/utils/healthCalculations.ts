export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
};

export const getBMICategory = (bmi: number): { label: string; color: string; description: string } => {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500', description: 'Below healthy range' };
  if (bmi < 25) return { label: 'Normal Weight', color: 'text-emerald-500', description: 'Healthy weight range' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500', description: 'Above healthy range' };
  return { label: 'Obese', color: 'text-red-500', description: 'High health risk' };
};

export const calculateBMR = (
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female'
): number => {
  if (gender === 'male') {
    return Math.round(88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears);
  }
  return Math.round(447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears);
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.375));
};

export const calculateIdealWeight = (heightCm: number, gender: 'male' | 'female'): number => {
  const heightIn = heightCm / 2.54;
  if (gender === 'male') {
    return parseFloat((50 + 2.3 * (heightIn - 60)).toFixed(1));
  }
  return parseFloat((45.5 + 2.3 * (heightIn - 60)).toFixed(1));
};

export const calculateHeartRateZones = (age: number): {
  zone1: [number, number];
  zone2: [number, number];
  zone3: [number, number];
  zone4: [number, number];
  zone5: [number, number];
} => {
  const maxHR = 220 - age;
  return {
    zone1: [Math.round(maxHR * 0.5), Math.round(maxHR * 0.6)],
    zone2: [Math.round(maxHR * 0.6), Math.round(maxHR * 0.7)],
    zone3: [Math.round(maxHR * 0.7), Math.round(maxHR * 0.8)],
    zone4: [Math.round(maxHR * 0.8), Math.round(maxHR * 0.9)],
    zone5: [Math.round(maxHR * 0.9), maxHR],
  };
};

export const calculateWaterIntake = (weightKg: number): number => {
  return parseFloat((weightKg * 0.033).toFixed(1));
};

export const calculateSleepScore = (
  duration: number,
  deepSleepPercent: number,
  remSleepPercent: number,
  awakeTime: number
): number => {
  let score = 100;
  if (duration < 6) score -= 30;
  else if (duration < 7) score -= 15;
  else if (duration > 9) score -= 10;
  if (deepSleepPercent < 15) score -= 20;
  if (remSleepPercent < 20) score -= 15;
  if (awakeTime > 30) score -= 15;
  return Math.max(0, Math.min(100, score));
};

export const calculateStressScore = (
  workHours: number,
  sleepHours: number,
  exerciseDays: number,
  meditationMins: number
): number => {
  let score = 50;
  score -= (workHours - 8) * 3;
  score += (sleepHours - 6) * 5;
  score += exerciseDays * 4;
  score += meditationMins * 0.5;
  return Math.max(0, Math.min(100, Math.round(score)));
};

export const getCaloricGoal = (tdee: number, goal: string): number => {
  const adjustments: Record<string, number> = {
    lose_weight: -500,
    lose_weight_fast: -1000,
    maintain: 0,
    gain_muscle: 300,
    gain_weight: 500,
  };
  return tdee + (adjustments[goal] || 0);
};

export const calculateMacros = (calories: number, goal: string): { protein: number; carbs: number; fat: number } => {
  const ratios: Record<string, { protein: number; carbs: number; fat: number }> = {
    lose_weight: { protein: 0.35, carbs: 0.35, fat: 0.3 },
    maintain: { protein: 0.3, carbs: 0.4, fat: 0.3 },
    gain_muscle: { protein: 0.35, carbs: 0.45, fat: 0.2 },
    gain_weight: { protein: 0.25, carbs: 0.5, fat: 0.25 },
  };
  const ratio = ratios[goal] || ratios.maintain;
  return {
    protein: Math.round((calories * ratio.protein) / 4),
    carbs: Math.round((calories * ratio.carbs) / 4),
    fat: Math.round((calories * ratio.fat) / 9),
  };
};

export const cmToFeetInches = (cm: number): string => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};

export const kgToLbs = (kg: number): number => {
  return parseFloat((kg * 2.20462).toFixed(1));
};
