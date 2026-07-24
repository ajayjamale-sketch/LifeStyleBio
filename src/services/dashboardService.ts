import { randomBetween } from '@/utils/helpers';

export const generateWeeklyHealthData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    steps: randomBetween(4000, 12000),
    calories: randomBetween(1600, 2800),
    sleep: parseFloat((randomBetween(55, 90) / 10).toFixed(1)),
    water: parseFloat((randomBetween(15, 35) / 10).toFixed(1)),
    heartRate: randomBetween(62, 88),
  }));
};

export const generateMonthlyData = (months = 6) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const monthIndex = (now.getMonth() - (months - 1 - i) + 12) % 12;
    return {
      month: monthNames[monthIndex],
      weight: parseFloat((randomBetween(700, 850) / 10).toFixed(1)),
      bmi: parseFloat((randomBetween(220, 280) / 10).toFixed(1)),
      calories: randomBetween(1800, 2400),
      workouts: randomBetween(8, 25),
    };
  });
};

export const generateNutritionData = () => {
  return {
    calories: { consumed: randomBetween(1400, 1900), goal: 2000 },
    protein: { consumed: randomBetween(80, 120), goal: 150 },
    carbs: { consumed: randomBetween(180, 240), goal: 250 },
    fat: { consumed: randomBetween(55, 80), goal: 65 },
    fiber: { consumed: randomBetween(18, 30), goal: 35 },
    water: { consumed: randomBetween(15, 28) / 10, goal: 2.5 },
  };
};

export const generateSleepData = (days = 7) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString('en', { weekday: 'short' }),
      total: parseFloat((randomBetween(55, 90) / 10).toFixed(1)),
      deep: parseFloat((randomBetween(10, 25) / 10).toFixed(1)),
      rem: parseFloat((randomBetween(15, 25) / 10).toFixed(1)),
      light: parseFloat((randomBetween(20, 40) / 10).toFixed(1)),
      quality: randomBetween(60, 95),
    };
  });
};

export const generateFitnessData = () => {
  return {
    weeklyWorkouts: randomBetween(3, 6),
    totalMinutes: randomBetween(120, 380),
    caloriesBurned: randomBetween(800, 2200),
    avgHeartRate: randomBetween(128, 158),
    streak: randomBetween(3, 21),
  };
};

export const generateVitalSigns = () => {
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      heartRate: randomBetween(62, 88),
      systolic: randomBetween(110, 135),
      diastolic: randomBetween(70, 90),
      bloodOxygen: randomBetween(96, 100),
      temperature: parseFloat((randomBetween(970, 991) / 100).toFixed(1)),
    };
  });
};

export const generateActivityRing = () => ({
  move: randomBetween(40, 100),
  exercise: randomBetween(30, 100),
  stand: randomBetween(50, 100),
});
