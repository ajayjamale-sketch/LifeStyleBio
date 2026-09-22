import { generateId } from '@/utils/helpers';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  nextVisit: string;
  risk: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive';
  phone?: string;
  email?: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  goal: string;
  status: 'active' | 'inactive';
  progress: number;
  joinDate: string;
  nextSession: string;
  notes?: string;
}

export interface DietPlan {
  id: string;
  title: string;
  clientName: string;
  calories: number;
  macros: string;
  duration: string;
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  clientName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  daysPerWeek: number;
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
}

export interface Consultation {
  id: string;
  patientName: string;
  doctorOrCoach: string;
  type: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  healthScore: number;
  participation: number;
  status: 'Active' | 'Inactive';
}

export interface WellnessProgram {
  id: string;
  title: string;
  category: string;
  participants: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  budget?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  accessLevel: 'Full Access' | 'View Only' | 'Emergency Only';
  healthScore: number;
  lastActive: string;
}

export interface HealthAlert {
  id: string;
  memberName: string;
  title: string;
  type: 'Critical' | 'Warning' | 'Info';
  message: string;
  timestamp: string;
  status: 'Unread' | 'Read' | 'Resolved';
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  contactEmail: string;
  status: 'Active' | 'Pending' | 'Inactive';
  integrationType: string;
  joinedDate: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  activeUsers: number;
  features: string;
  status: 'Active' | 'Deprecated';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  category: string;
  status: 'Active' | 'Upcoming' | 'Ended';
}

export interface Recommendation {
  id: string;
  patientName: string;
  type: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  status: 'Pending' | 'Applied' | 'Dismissed';
}

const KEYS = {
  PATIENTS: 'lsb_crud_patients',
  CLIENTS: 'lsb_crud_clients',
  DIET_PLANS: 'lsb_crud_diet_plans',
  WORKOUT_PLANS: 'lsb_crud_workout_plans',
  CONSULTATIONS: 'lsb_crud_consultations',
  EMPLOYEES: 'lsb_crud_employees',
  WELLNESS_PROGRAMS: 'lsb_crud_wellness_programs',
  FAMILY_MEMBERS: 'lsb_crud_family_members',
  ALERTS: 'lsb_crud_alerts',
  PARTNERS: 'lsb_crud_partners',
  SUBSCRIPTIONS: 'lsb_crud_subscriptions',
  CHALLENGES: 'lsb_crud_challenges',
  RECOMMENDATIONS: 'lsb_crud_recommendations',
};

// Seed Defaults
const INITIAL_PATIENTS: Patient[] = [
  { id: '1', name: 'Robert Garcia', age: 62, gender: 'Male', condition: 'Hypertension, Type 2 Diabetes', lastVisit: 'Jul 24, 2026', nextVisit: 'Aug 7, 2026', risk: 'high', status: 'active', phone: '+1 555-0192', email: 'rgarcia@example.com' },
  { id: '2', name: 'Anna Kim', age: 48, gender: 'Female', condition: 'Type 2 Diabetes', lastVisit: 'Jul 23, 2026', nextVisit: 'Aug 6, 2026', risk: 'medium', status: 'active', phone: '+1 555-0183', email: 'akim@example.com' },
  { id: '3', name: 'David Park', age: 35, gender: 'Male', condition: 'Routine Checkup', lastVisit: 'Jul 22, 2026', nextVisit: 'Jan 2027', risk: 'low', status: 'active', phone: '+1 555-0174', email: 'dpark@example.com' },
  { id: '4', name: 'Maria Torres', age: 71, gender: 'Female', condition: 'Cardiac Arrhythmia, Hypertension', lastVisit: 'Jul 21, 2026', nextVisit: 'Jul 28, 2026', risk: 'high', status: 'active', phone: '+1 555-0165', email: 'mtorres@example.com' },
  { id: '5', name: 'James Wilson', age: 55, gender: 'Male', condition: 'Chronic Back Pain, Obesity', lastVisit: 'Jul 18, 2026', nextVisit: 'Aug 1, 2026', risk: 'medium', status: 'active', phone: '+1 555-0156', email: 'jwilson@example.com' },
];

const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'Emma Johnson', email: 'emma@email.com', phone: '+1 555-0101', goal: 'Weight Loss', status: 'active', progress: 72, joinDate: 'Jan 2026', nextSession: 'Jul 25, 2026' },
  { id: '2', name: 'Michael Chen', email: 'mchen@email.com', phone: '+1 555-0102', goal: 'Muscle Gain', status: 'active', progress: 58, joinDate: 'Feb 2026', nextSession: 'Jul 26, 2026' },
  { id: '3', name: 'Sarah Williams', email: 'swilliams@email.com', phone: '+1 555-0103', goal: 'Diabetes Management', status: 'active', progress: 84, joinDate: 'Nov 2025', nextSession: 'Jul 27, 2026' },
  { id: '4', name: 'James Rodriguez', email: 'jrod@email.com', phone: '+1 555-0104', goal: 'Heart Health', status: 'inactive', progress: 40, joinDate: 'Mar 2026', nextSession: 'TBD' },
  { id: '5', name: 'Lisa Anderson', email: 'landerson@email.com', phone: '+1 555-0105', goal: 'Sports Performance', status: 'active', progress: 91, joinDate: 'Dec 2025', nextSession: 'Jul 28, 2026' },
];

const INITIAL_DIET_PLANS: DietPlan[] = [
  { id: '1', title: 'Low Carb Mediterranean', clientName: 'Emma Johnson', calories: 1800, macros: 'P: 30%, C: 30%, F: 40%', duration: '4 Weeks', status: 'active', createdAt: '2026-07-20' },
  { id: '2', title: 'High Protein Muscle Building', clientName: 'Michael Chen', calories: 2800, macros: 'P: 40%, C: 40%, F: 20%', duration: '8 Weeks', status: 'active', createdAt: '2026-07-18' },
  { id: '3', title: 'Glycemic Index Balance', clientName: 'Sarah Williams', calories: 2000, macros: 'P: 25%, C: 45%, F: 30%', duration: '12 Weeks', status: 'active', createdAt: '2026-07-15' },
];

const INITIAL_WORKOUT_PLANS: WorkoutPlan[] = [
  { id: '1', title: 'Full Body Hypertrophy', clientName: 'Michael Chen', level: 'Intermediate', duration: '60 min', daysPerWeek: 4, status: 'active', createdAt: '2026-07-21' },
  { id: '2', title: 'Fat Loss HIIT Routine', clientName: 'Emma Johnson', level: 'Beginner', duration: '45 min', daysPerWeek: 3, status: 'active', createdAt: '2026-07-19' },
  { id: '3', title: 'Athletic Conditioning', clientName: 'Lisa Anderson', level: 'Advanced', duration: '75 min', daysPerWeek: 5, status: 'active', createdAt: '2026-07-14' },
];

const INITIAL_CONSULTATIONS: Consultation[] = [
  { id: '1', patientName: 'Robert Garcia', doctorOrCoach: 'Dr. Smith', type: 'Follow-up', date: '2026-07-25', time: '10:00 AM', status: 'Scheduled', notes: 'Check blood pressure & insulin log' },
  { id: '2', patientName: 'Emma Johnson', doctorOrCoach: 'Dr. Smith', type: 'Nutrition Review', date: '2026-07-25', time: '02:30 PM', status: 'Scheduled', notes: 'Macro adjustment for month 2' },
  { id: '3', patientName: 'David Park', doctorOrCoach: 'Dr. Smith', type: 'General Checkup', date: '2026-07-24', time: '11:15 AM', status: 'Completed', notes: 'All Vitals normal' },
];

const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alex Mercer', email: 'alex.m@company.com', department: 'Engineering', role: 'Senior Developer', healthScore: 88, participation: 95, status: 'Active' },
  { id: '2', name: 'Sophia Turner', email: 'sophia.t@company.com', department: 'Marketing', role: 'Growth Lead', healthScore: 92, participation: 100, status: 'Active' },
  { id: '3', name: 'Daniel Vance', email: 'daniel.v@company.com', department: 'Sales', role: 'Account Exec', healthScore: 74, participation: 60, status: 'Active' },
  { id: '4', name: 'Elena Rostova', email: 'elena.r@company.com', department: 'Product', role: 'UX Designer', healthScore: 81, participation: 85, status: 'Active' },
];

const INITIAL_WELLNESS_PROGRAMS: WellnessProgram[] = [
  { id: '1', title: '10k Daily Steps Challenge', category: 'Fitness', participants: 142, startDate: '2026-07-01', endDate: '2026-07-31', status: 'Active', budget: '$1,500' },
  { id: '2', title: 'Mindfulness & Meditation', category: 'Mental Health', participants: 89, startDate: '2026-07-10', endDate: '2026-08-10', status: 'Active', budget: '$2,000' },
  { id: '3', title: 'Healthy Office Snacks', category: 'Nutrition', participants: 210, startDate: '2026-06-01', endDate: '2026-12-31', status: 'Active', budget: '$5,000' },
];

const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  { id: '1', name: 'Eleanor Smith', relationship: 'Mother', age: 68, accessLevel: 'Full Access', healthScore: 78, lastActive: '2 hours ago' },
  { id: '2', name: 'John Smith Sr.', relationship: 'Father', age: 71, accessLevel: 'Full Access', healthScore: 82, lastActive: 'Yesterday' },
  { id: '3', name: 'Lucas Smith', relationship: 'Son', age: 14, accessLevel: 'View Only', healthScore: 96, lastActive: 'Today' },
];

const INITIAL_ALERTS: HealthAlert[] = [
  { id: '1', memberName: 'Eleanor Smith', title: 'High Blood Pressure Warning', type: 'Critical', message: 'Systolic blood pressure reached 145 mmHg at 8:30 AM', timestamp: 'Today, 8:30 AM', status: 'Unread' },
  { id: '2', memberName: 'John Smith Sr.', title: 'Missed Medication Reminder', type: 'Warning', message: 'Evening insulin dosage not logged', timestamp: 'Yesterday, 9:00 PM', status: 'Read' },
  { id: '3', memberName: 'Lucas Smith', title: 'Daily Step Goal Reached', type: 'Info', message: 'Lucas completed 12,000 steps today!', timestamp: 'Today, 6:00 PM', status: 'Read' },
];

const INITIAL_PARTNERS: Partner[] = [
  { id: '1', name: 'Fitbit Integration', category: 'Wearables', contactEmail: 'partner-api@fitbit.com', status: 'Active', integrationType: 'OAuth 2.0 API', joinedDate: '2025-09-12' },
  { id: '2', name: 'Garmin Connect', category: 'Wearables', contactEmail: 'developer@garmin.com', status: 'Active', integrationType: 'Webhooks API', joinedDate: '2025-11-04' },
  { id: '3', name: 'Quest Diagnostics', category: 'Lab & Diagnostics', contactEmail: 'b2b@quest.com', status: 'Active', integrationType: 'HL7 / FHIR', joinedDate: '2026-01-20' },
];

const INITIAL_SUBSCRIPTIONS: SubscriptionPlan[] = [
  { id: '1', name: 'Individual Premium', price: '$14.99', interval: 'Monthly', activeUsers: 1420, features: 'AI Coach, Wearables Sync, Advanced Analytics', status: 'Active' },
  { id: '2', name: 'Family Shield', price: '$29.99', interval: 'Monthly', activeUsers: 680, features: 'Up to 6 accounts, Emergency Alerts, Telehealth integration', status: 'Active' },
  { id: '3', name: 'Corporate Enterprise', price: '$499.00', interval: 'Monthly', activeUsers: 45, features: 'Unlimited employees, custom wellness challenges, dedicated support', status: 'Active' },
];

const INITIAL_CHALLENGES: Challenge[] = [
  { id: '1', title: '30-Day Lean Muscle Building', description: 'Push pull legs routine for 30 consecutive days', participants: 45, duration: '30 Days', category: 'Hypertrophy', status: 'Active' },
  { id: '2', title: 'Summer Cardio Shred', description: 'HIIT & Endurance daily challenges', participants: 88, duration: '14 Days', category: 'Fat Loss', status: 'Active' },
];

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  { id: '1', patientName: 'Robert Garcia', type: 'Medication Adjustment', recommendation: 'Increase Lisinopril dosage to 20mg daily', priority: 'High', date: '2026-07-24', status: 'Pending' },
  { id: '2', patientName: 'Anna Kim', type: 'Dietary Plan', recommendation: 'Reduce glycemic load in evening meals', priority: 'Medium', date: '2026-07-23', status: 'Applied' },
];

// LocalStorage Helper
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(item);
  } catch (e) {
    return defaultVal;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

export const crudService = {
  // Patients
  getPatients: (): Patient[] => getStored(KEYS.PATIENTS, INITIAL_PATIENTS),
  addPatient: (data: Omit<Patient, 'id'>): Patient => {
    const list = crudService.getPatients();
    const newItem: Patient = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.PATIENTS, updated);
    return newItem;
  },
  updatePatient: (id: string, updates: Partial<Patient>): Patient | null => {
    const list = crudService.getPatients();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.PATIENTS, list);
    return list[index];
  },
  deletePatient: (id: string): boolean => {
    const list = crudService.getPatients();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.PATIENTS, filtered);
    return true;
  },

  // Clients
  getClients: (): Client[] => getStored(KEYS.CLIENTS, INITIAL_CLIENTS),
  addClient: (data: Omit<Client, 'id'>): Client => {
    const list = crudService.getClients();
    const newItem: Client = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.CLIENTS, updated);
    return newItem;
  },
  updateClient: (id: string, updates: Partial<Client>): Client | null => {
    const list = crudService.getClients();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.CLIENTS, list);
    return list[index];
  },
  deleteClient: (id: string): boolean => {
    const list = crudService.getClients();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.CLIENTS, filtered);
    return true;
  },

  // Diet Plans
  getDietPlans: (): DietPlan[] => getStored(KEYS.DIET_PLANS, INITIAL_DIET_PLANS),
  addDietPlan: (data: Omit<DietPlan, 'id'>): DietPlan => {
    const list = crudService.getDietPlans();
    const newItem: DietPlan = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.DIET_PLANS, updated);
    return newItem;
  },
  updateDietPlan: (id: string, updates: Partial<DietPlan>): DietPlan | null => {
    const list = crudService.getDietPlans();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.DIET_PLANS, list);
    return list[index];
  },
  deleteDietPlan: (id: string): boolean => {
    const list = crudService.getDietPlans();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.DIET_PLANS, filtered);
    return true;
  },

  // Workout Plans
  getWorkoutPlans: (): WorkoutPlan[] => getStored(KEYS.WORKOUT_PLANS, INITIAL_WORKOUT_PLANS),
  addWorkoutPlan: (data: Omit<WorkoutPlan, 'id'>): WorkoutPlan => {
    const list = crudService.getWorkoutPlans();
    const newItem: WorkoutPlan = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.WORKOUT_PLANS, updated);
    return newItem;
  },
  updateWorkoutPlan: (id: string, updates: Partial<WorkoutPlan>): WorkoutPlan | null => {
    const list = crudService.getWorkoutPlans();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.WORKOUT_PLANS, list);
    return list[index];
  },
  deleteWorkoutPlan: (id: string): boolean => {
    const list = crudService.getWorkoutPlans();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.WORKOUT_PLANS, filtered);
    return true;
  },

  // Consultations
  getConsultations: (): Consultation[] => getStored(KEYS.CONSULTATIONS, INITIAL_CONSULTATIONS),
  addConsultation: (data: Omit<Consultation, 'id'>): Consultation => {
    const list = crudService.getConsultations();
    const newItem: Consultation = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.CONSULTATIONS, updated);
    return newItem;
  },
  updateConsultation: (id: string, updates: Partial<Consultation>): Consultation | null => {
    const list = crudService.getConsultations();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.CONSULTATIONS, list);
    return list[index];
  },
  deleteConsultation: (id: string): boolean => {
    const list = crudService.getConsultations();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.CONSULTATIONS, filtered);
    return true;
  },

  // Employees
  getEmployees: (): Employee[] => getStored(KEYS.EMPLOYEES, INITIAL_EMPLOYEES),
  addEmployee: (data: Omit<Employee, 'id'>): Employee => {
    const list = crudService.getEmployees();
    const newItem: Employee = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.EMPLOYEES, updated);
    return newItem;
  },
  updateEmployee: (id: string, updates: Partial<Employee>): Employee | null => {
    const list = crudService.getEmployees();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.EMPLOYEES, list);
    return list[index];
  },
  deleteEmployee: (id: string): boolean => {
    const list = crudService.getEmployees();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.EMPLOYEES, filtered);
    return true;
  },

  // Wellness Programs
  getWellnessPrograms: (): WellnessProgram[] => getStored(KEYS.WELLNESS_PROGRAMS, INITIAL_WELLNESS_PROGRAMS),
  addWellnessProgram: (data: Omit<WellnessProgram, 'id'>): WellnessProgram => {
    const list = crudService.getWellnessPrograms();
    const newItem: WellnessProgram = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.WELLNESS_PROGRAMS, updated);
    return newItem;
  },
  updateWellnessProgram: (id: string, updates: Partial<WellnessProgram>): WellnessProgram | null => {
    const list = crudService.getWellnessPrograms();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.WELLNESS_PROGRAMS, list);
    return list[index];
  },
  deleteWellnessProgram: (id: string): boolean => {
    const list = crudService.getWellnessPrograms();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.WELLNESS_PROGRAMS, filtered);
    return true;
  },

  // Family Members
  getFamilyMembers: (): FamilyMember[] => getStored(KEYS.FAMILY_MEMBERS, INITIAL_FAMILY_MEMBERS),
  addFamilyMember: (data: Omit<FamilyMember, 'id'>): FamilyMember => {
    const list = crudService.getFamilyMembers();
    const newItem: FamilyMember = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.FAMILY_MEMBERS, updated);
    return newItem;
  },
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>): FamilyMember | null => {
    const list = crudService.getFamilyMembers();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.FAMILY_MEMBERS, list);
    return list[index];
  },
  deleteFamilyMember: (id: string): boolean => {
    const list = crudService.getFamilyMembers();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.FAMILY_MEMBERS, filtered);
    return true;
  },

  // Health Alerts
  getAlerts: (): HealthAlert[] => getStored(KEYS.ALERTS, INITIAL_ALERTS),
  addAlert: (data: Omit<HealthAlert, 'id'>): HealthAlert => {
    const list = crudService.getAlerts();
    const newItem: HealthAlert = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.ALERTS, updated);
    return newItem;
  },
  updateAlert: (id: string, updates: Partial<HealthAlert>): HealthAlert | null => {
    const list = crudService.getAlerts();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.ALERTS, list);
    return list[index];
  },
  deleteAlert: (id: string): boolean => {
    const list = crudService.getAlerts();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.ALERTS, filtered);
    return true;
  },

  // Partners
  getPartners: (): Partner[] => getStored(KEYS.PARTNERS, INITIAL_PARTNERS),
  addPartner: (data: Omit<Partner, 'id'>): Partner => {
    const list = crudService.getPartners();
    const newItem: Partner = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.PARTNERS, updated);
    return newItem;
  },
  updatePartner: (id: string, updates: Partial<Partner>): Partner | null => {
    const list = crudService.getPartners();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.PARTNERS, list);
    return list[index];
  },
  deletePartner: (id: string): boolean => {
    const list = crudService.getPartners();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.PARTNERS, filtered);
    return true;
  },

  // Subscriptions
  getSubscriptions: (): SubscriptionPlan[] => getStored(KEYS.SUBSCRIPTIONS, INITIAL_SUBSCRIPTIONS),
  addSubscription: (data: Omit<SubscriptionPlan, 'id'>): SubscriptionPlan => {
    const list = crudService.getSubscriptions();
    const newItem: SubscriptionPlan = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.SUBSCRIPTIONS, updated);
    return newItem;
  },
  updateSubscription: (id: string, updates: Partial<SubscriptionPlan>): SubscriptionPlan | null => {
    const list = crudService.getSubscriptions();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.SUBSCRIPTIONS, list);
    return list[index];
  },
  deleteSubscription: (id: string): boolean => {
    const list = crudService.getSubscriptions();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.SUBSCRIPTIONS, filtered);
    return true;
  },

  // Challenges
  getChallenges: (): Challenge[] => getStored(KEYS.CHALLENGES, INITIAL_CHALLENGES),
  addChallenge: (data: Omit<Challenge, 'id'>): Challenge => {
    const list = crudService.getChallenges();
    const newItem: Challenge = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.CHALLENGES, updated);
    return newItem;
  },
  updateChallenge: (id: string, updates: Partial<Challenge>): Challenge | null => {
    const list = crudService.getChallenges();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.CHALLENGES, list);
    return list[index];
  },
  deleteChallenge: (id: string): boolean => {
    const list = crudService.getChallenges();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.CHALLENGES, filtered);
    return true;
  },

  // Recommendations
  getRecommendations: (): Recommendation[] => getStored(KEYS.RECOMMENDATIONS, INITIAL_RECOMMENDATIONS),
  addRecommendation: (data: Omit<Recommendation, 'id'>): Recommendation => {
    const list = crudService.getRecommendations();
    const newItem: Recommendation = { ...data, id: generateId() };
    const updated = [newItem, ...list];
    setStored(KEYS.RECOMMENDATIONS, updated);
    return newItem;
  },
  updateRecommendation: (id: string, updates: Partial<Recommendation>): Recommendation | null => {
    const list = crudService.getRecommendations();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    setStored(KEYS.RECOMMENDATIONS, list);
    return list[index];
  },
  deleteRecommendation: (id: string): boolean => {
    const list = crudService.getRecommendations();
    const filtered = list.filter(item => item.id !== id);
    setStored(KEYS.RECOMMENDATIONS, filtered);
    return true;
  },
};
