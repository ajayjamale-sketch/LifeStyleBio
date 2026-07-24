export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const HEALTH_RESPONSES: Record<string, string[]> = {
  nutrition: [
    'Based on your health profile, I recommend focusing on a balanced diet rich in whole grains, lean proteins, and plenty of vegetables. Aim for 5 servings of vegetables daily and limit processed foods.',
    'Your current calorie intake looks good. Consider adding more fiber-rich foods like legumes, nuts, and seeds to improve gut health and maintain satiety throughout the day.',
    'Hydration is crucial for overall health. Based on your weight and activity level, you should aim for about 2.5-3 liters of water daily. Start your morning with a glass of water before coffee.',
  ],
  fitness: [
    'Great job on maintaining your workout routine! To optimize your fitness gains, I recommend incorporating progressive overload by gradually increasing weight or resistance every 2 weeks.',
    'Your activity data shows room for improvement in cardiovascular endurance. Consider adding 2-3 moderate-intensity cardio sessions per week, such as brisk walking, cycling, or swimming.',
    'Recovery is just as important as training. Based on your recent activity patterns, ensure you have at least 1-2 rest days per week and prioritize quality sleep for muscle recovery.',
  ],
  sleep: [
    'Your sleep patterns indicate inconsistent sleep timing. Try to establish a consistent sleep schedule by going to bed and waking up at the same time each day, even on weekends.',
    'To improve your sleep quality, create a relaxing bedtime routine. Avoid screens 1 hour before bed, keep your room cool (65-68°F), and consider light stretching or meditation.',
    'Your deep sleep percentage is below optimal. To increase deep sleep, limit alcohol and caffeine after 2 PM, exercise regularly (but not within 3 hours of bedtime), and manage stress levels.',
  ],
  mental: [
    'Managing stress is essential for overall wellbeing. I recommend practicing mindfulness meditation for 10-15 minutes daily. Apps like Headspace or Calm can guide your practice.',
    'Your mood tracking data shows lower energy on days with poor sleep. Prioritizing sleep quality and engaging in regular physical activity can significantly improve your mental resilience.',
    'Social connections are powerful for mental wellness. Consider scheduling regular activities with friends or family, joining a wellness community, or even volunteering to boost your mood.',
  ],
  general: [
    'Hello! I am your AI Health Coach. I am here to provide personalized guidance based on your health data. How can I support your wellness journey today?',
    'I have analyzed your recent health data and overall, you are making positive progress. Keep up the consistency with your healthy habits and I will help you optimize further.',
    'Based on your health profile and goals, here are my top three recommendations: 1) Stay consistent with your meal timing, 2) Aim for 8,000 steps daily, 3) Practice 5 minutes of mindful breathing before sleep.',
    'Prevention is better than cure. With your risk factors in mind, scheduling regular health screenings and maintaining your preventive care routine is highly recommended.',
  ],
};

const TOPIC_KEYWORDS: Record<string, string[]> = {
  nutrition: ['food', 'eat', 'meal', 'diet', 'calorie', 'protein', 'carb', 'fat', 'nutrition', 'vitamin', 'supplement', 'weight'],
  fitness: ['exercise', 'workout', 'gym', 'run', 'fitness', 'train', 'strength', 'cardio', 'steps', 'activity', 'sport'],
  sleep: ['sleep', 'rest', 'insomnia', 'tired', 'fatigue', 'nap', 'night', 'dream', 'bed'],
  mental: ['stress', 'anxiety', 'mood', 'mental', 'emotion', 'mindful', 'meditat', 'wellbeing', 'depress', 'happy'],
};

const detectTopic = (message: string): string => {
  const lower = message.toLowerCase();
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return topic;
  }
  return 'general';
};

const getRandomResponse = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const aiService = {
  generateResponse: async (message: string): Promise<string> => {
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const topic = detectTopic(message);
    const responses = HEALTH_RESPONSES[topic] || HEALTH_RESPONSES.general;
    return getRandomResponse(responses);
  },

  getQuickPrompts: (): string[] => [
    'What should I eat for breakfast?',
    'How can I improve my sleep quality?',
    'Suggest a 30-minute home workout',
    'Tips for managing daily stress',
    'How much water should I drink?',
    'Best exercises for back pain relief',
    'Foods to boost my immune system',
    'How to improve my mental focus?',
  ],

  getInsights: (userData: { steps?: number; sleep?: number; calories?: number }): string[] => {
    const insights: string[] = [];

    if (userData.steps && userData.steps < 8000) {
      insights.push(`You're ${8000 - userData.steps} steps away from your daily goal. A 15-minute walk can make a big difference!`);
    }

    if (userData.sleep && userData.sleep < 7) {
      insights.push(`Your sleep last night was ${userData.sleep} hours. Try going to bed 30 minutes earlier tonight.`);
    }

    if (userData.calories && userData.calories > 2200) {
      insights.push('Your calorie intake is above your goal. Consider swapping an afternoon snack for a piece of fruit.');
    }

    if (insights.length === 0) {
      insights.push("Excellent progress today! You're meeting your health targets. Keep up the great work!");
    }

    return insights;
  },
};

export default aiService;
