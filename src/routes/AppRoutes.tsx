import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoadingScreen from '@/components/common/LoadingScreen';

// Public Pages
const Home = lazy(() => import('@/pages/public/Home'));
const About = lazy(() => import('@/pages/public/About'));
const Features = lazy(() => import('@/pages/public/Features'));
const Pricing = lazy(() => import('@/pages/public/Pricing'));
const Blog = lazy(() => import('@/pages/public/Blog'));
const BlogDetails = lazy(() => import('@/pages/public/BlogDetails'));
const Contact = lazy(() => import('@/pages/public/Contact'));
const HelpCenter = lazy(() => import('@/pages/public/HelpCenter'));
const PrivacyPolicy = lazy(() => import('@/pages/public/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/public/TermsConditions'));
const NotFound = lazy(() => import('@/pages/public/NotFound'));

// Auth Pages
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const AdminLogin = lazy(() => import('@/pages/auth/AdminLogin'));

// Individual Dashboard
const IndividualDashboard = lazy(() => import('@/pages/dashboard/individual/Dashboard'));
const HealthProfile = lazy(() => import('@/pages/dashboard/individual/HealthProfile'));
const AIHealthCoach = lazy(() => import('@/pages/dashboard/individual/AIHealthCoach'));
const Nutrition = lazy(() => import('@/pages/dashboard/individual/Nutrition'));
const Fitness = lazy(() => import('@/pages/dashboard/individual/Fitness'));
const SleepRecovery = lazy(() => import('@/pages/dashboard/individual/SleepRecovery'));
const MentalWellness = lazy(() => import('@/pages/dashboard/individual/MentalWellness'));
const MedicalRecords = lazy(() => import('@/pages/dashboard/individual/MedicalRecords'));
const Wearables = lazy(() => import('@/pages/dashboard/individual/Wearables'));
const RiskAssessment = lazy(() => import('@/pages/dashboard/individual/RiskAssessment'));
const Marketplace = lazy(() => import('@/pages/dashboard/individual/Marketplace'));
const Analytics = lazy(() => import('@/pages/dashboard/individual/Analytics'));
const IndividualProfile = lazy(() => import('@/pages/dashboard/individual/Profile'));
const IndividualSettings = lazy(() => import('@/pages/dashboard/individual/Settings'));

// Nutritionist Dashboard
const NutritionistDashboard = lazy(() => import('@/pages/dashboard/nutritionist/Dashboard'));
const NutritionistClients = lazy(() => import('@/pages/dashboard/nutritionist/Clients'));
const DietPlans = lazy(() => import('@/pages/dashboard/nutritionist/DietPlans'));
const NutritionistProgress = lazy(() => import('@/pages/dashboard/nutritionist/Progress'));
const Consultations = lazy(() => import('@/pages/dashboard/nutritionist/Consultations'));
const NutritionistProfile = lazy(() => import('@/pages/dashboard/nutritionist/Profile'));
const NutritionistSettings = lazy(() => import('@/pages/dashboard/nutritionist/Settings'));

// Fitness Coach Dashboard
const FitnessCoachDashboard = lazy(() => import('@/pages/dashboard/fitness-coach/Dashboard'));
const FitnessClients = lazy(() => import('@/pages/dashboard/fitness-coach/Clients'));
const WorkoutPlans = lazy(() => import('@/pages/dashboard/fitness-coach/WorkoutPlans'));
const FitnessProgress = lazy(() => import('@/pages/dashboard/fitness-coach/Progress'));
const Challenges = lazy(() => import('@/pages/dashboard/fitness-coach/Challenges'));
const FitnessCoachProfile = lazy(() => import('@/pages/dashboard/fitness-coach/Profile'));
const FitnessCoachSettings = lazy(() => import('@/pages/dashboard/fitness-coach/Settings'));

// Healthcare Dashboard
const HealthcareDashboard = lazy(() => import('@/pages/dashboard/healthcare/Dashboard'));
const Patients = lazy(() => import('@/pages/dashboard/healthcare/Patients'));
const HealthcareMedicalRecords = lazy(() => import('@/pages/dashboard/healthcare/MedicalRecords'));
const Recommendations = lazy(() => import('@/pages/dashboard/healthcare/Recommendations'));
const Appointments = lazy(() => import('@/pages/dashboard/healthcare/Appointments'));
const HealthcareProfile = lazy(() => import('@/pages/dashboard/healthcare/Profile'));
const HealthcareSettings = lazy(() => import('@/pages/dashboard/healthcare/Settings'));

// Corporate Dashboard
const CorporateDashboard = lazy(() => import('@/pages/dashboard/corporate/Dashboard'));
const Employees = lazy(() => import('@/pages/dashboard/corporate/Employees'));
const WellnessPrograms = lazy(() => import('@/pages/dashboard/corporate/WellnessPrograms'));
const CorporateReports = lazy(() => import('@/pages/dashboard/corporate/Reports'));
const CorporateAnalytics = lazy(() => import('@/pages/dashboard/corporate/Analytics'));
const CorporateProfile = lazy(() => import('@/pages/dashboard/corporate/Profile'));
const CorporateSettings = lazy(() => import('@/pages/dashboard/corporate/Settings'));

// Family Dashboard
const FamilyDashboard = lazy(() => import('@/pages/dashboard/family/Dashboard'));
const SharedProfiles = lazy(() => import('@/pages/dashboard/family/SharedProfiles'));
const Alerts = lazy(() => import('@/pages/dashboard/family/Alerts'));
const FamilyProfile = lazy(() => import('@/pages/dashboard/family/Profile'));
const FamilySettings = lazy(() => import('@/pages/dashboard/family/Settings'));

// Admin Dashboard
const AdminDashboard = lazy(() => import('@/pages/dashboard/admin/Dashboard'));
const AdminUsers = lazy(() => import('@/pages/dashboard/admin/Users'));
const AdminPartners = lazy(() => import('@/pages/dashboard/admin/Partners'));
const AdminSubscriptions = lazy(() => import('@/pages/dashboard/admin/Subscriptions'));
const AdminMarketplace = lazy(() => import('@/pages/dashboard/admin/Marketplace'));
const AdminReports = lazy(() => import('@/pages/dashboard/admin/Reports'));
const AuditLogs = lazy(() => import('@/pages/dashboard/admin/AuditLogs'));
const Security = lazy(() => import('@/pages/dashboard/admin/Security'));
const AdminProfile = lazy(() => import('@/pages/dashboard/admin/Profile'));
const AdminSettings = lazy(() => import('@/pages/dashboard/admin/Settings'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.FEATURES} element={<Features />} />
          <Route path={ROUTES.PRICING} element={<Pricing />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetails />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.HELP_CENTER} element={<HelpCenter />} />
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={ROUTES.TERMS_CONDITIONS} element={<TermsConditions />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
          <Route path={ROUTES.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<PublicRoute><AdminLogin /></PublicRoute>} />
        </Route>

        {/* Individual Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['individual_user']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.INDIVIDUAL.DASHBOARD} element={<IndividualDashboard />} />
          <Route path={ROUTES.INDIVIDUAL.HEALTH_PROFILE} element={<HealthProfile />} />
          <Route path={ROUTES.INDIVIDUAL.AI_COACH} element={<AIHealthCoach />} />
          <Route path={ROUTES.INDIVIDUAL.NUTRITION} element={<Nutrition />} />
          <Route path={ROUTES.INDIVIDUAL.FITNESS} element={<Fitness />} />
          <Route path={ROUTES.INDIVIDUAL.SLEEP} element={<SleepRecovery />} />
          <Route path={ROUTES.INDIVIDUAL.MENTAL_WELLNESS} element={<MentalWellness />} />
          <Route path={ROUTES.INDIVIDUAL.MEDICAL_RECORDS} element={<MedicalRecords />} />
          <Route path={ROUTES.INDIVIDUAL.WEARABLES} element={<Wearables />} />
          <Route path={ROUTES.INDIVIDUAL.RISK_ASSESSMENT} element={<RiskAssessment />} />
          <Route path={ROUTES.INDIVIDUAL.MARKETPLACE} element={<Marketplace />} />
          <Route path={ROUTES.INDIVIDUAL.ANALYTICS} element={<Analytics />} />
          <Route path={ROUTES.INDIVIDUAL.PROFILE} element={<IndividualProfile />} />
          <Route path={ROUTES.INDIVIDUAL.SETTINGS} element={<IndividualSettings />} />
        </Route>

        {/* Nutritionist Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['nutritionist']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.NUTRITIONIST.DASHBOARD} element={<NutritionistDashboard />} />
          <Route path={ROUTES.NUTRITIONIST.CLIENTS} element={<NutritionistClients />} />
          <Route path={ROUTES.NUTRITIONIST.DIET_PLANS} element={<DietPlans />} />
          <Route path={ROUTES.NUTRITIONIST.PROGRESS} element={<NutritionistProgress />} />
          <Route path={ROUTES.NUTRITIONIST.CONSULTATIONS} element={<Consultations />} />
          <Route path={ROUTES.NUTRITIONIST.PROFILE} element={<NutritionistProfile />} />
          <Route path={ROUTES.NUTRITIONIST.SETTINGS} element={<NutritionistSettings />} />
        </Route>

        {/* Fitness Coach Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['fitness_coach']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.FITNESS_COACH.DASHBOARD} element={<FitnessCoachDashboard />} />
          <Route path={ROUTES.FITNESS_COACH.CLIENTS} element={<FitnessClients />} />
          <Route path={ROUTES.FITNESS_COACH.WORKOUT_PLANS} element={<WorkoutPlans />} />
          <Route path={ROUTES.FITNESS_COACH.PROGRESS} element={<FitnessProgress />} />
          <Route path={ROUTES.FITNESS_COACH.CHALLENGES} element={<Challenges />} />
          <Route path={ROUTES.FITNESS_COACH.PROFILE} element={<FitnessCoachProfile />} />
          <Route path={ROUTES.FITNESS_COACH.SETTINGS} element={<FitnessCoachSettings />} />
        </Route>

        {/* Healthcare Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['healthcare_professional']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.HEALTHCARE.DASHBOARD} element={<HealthcareDashboard />} />
          <Route path={ROUTES.HEALTHCARE.PATIENTS} element={<Patients />} />
          <Route path={ROUTES.HEALTHCARE.MEDICAL_RECORDS} element={<HealthcareMedicalRecords />} />
          <Route path={ROUTES.HEALTHCARE.RECOMMENDATIONS} element={<Recommendations />} />
          <Route path={ROUTES.HEALTHCARE.APPOINTMENTS} element={<Appointments />} />
          <Route path={ROUTES.HEALTHCARE.PROFILE} element={<HealthcareProfile />} />
          <Route path={ROUTES.HEALTHCARE.SETTINGS} element={<HealthcareSettings />} />
        </Route>

        {/* Corporate Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['corporate_wellness_manager']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.CORPORATE.DASHBOARD} element={<CorporateDashboard />} />
          <Route path={ROUTES.CORPORATE.EMPLOYEES} element={<Employees />} />
          <Route path={ROUTES.CORPORATE.WELLNESS_PROGRAMS} element={<WellnessPrograms />} />
          <Route path={ROUTES.CORPORATE.REPORTS} element={<CorporateReports />} />
          <Route path={ROUTES.CORPORATE.ANALYTICS} element={<CorporateAnalytics />} />
          <Route path={ROUTES.CORPORATE.PROFILE} element={<CorporateProfile />} />
          <Route path={ROUTES.CORPORATE.SETTINGS} element={<CorporateSettings />} />
        </Route>

        {/* Family Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['family_member']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.FAMILY.DASHBOARD} element={<FamilyDashboard />} />
          <Route path={ROUTES.FAMILY.SHARED_PROFILES} element={<SharedProfiles />} />
          <Route path={ROUTES.FAMILY.ALERTS} element={<Alerts />} />
          <Route path={ROUTES.FAMILY.PROFILE} element={<FamilyProfile />} />
          <Route path={ROUTES.FAMILY.SETTINGS} element={<FamilySettings />} />
        </Route>

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN.USERS} element={<AdminUsers />} />
          <Route path={ROUTES.ADMIN.PARTNERS} element={<AdminPartners />} />
          <Route path={ROUTES.ADMIN.SUBSCRIPTIONS} element={<AdminSubscriptions />} />
          <Route path={ROUTES.ADMIN.MARKETPLACE} element={<AdminMarketplace />} />
          <Route path={ROUTES.ADMIN.REPORTS} element={<AdminReports />} />
          <Route path={ROUTES.ADMIN.AUDIT_LOGS} element={<AuditLogs />} />
          <Route path={ROUTES.ADMIN.SECURITY} element={<Security />} />
          <Route path={ROUTES.ADMIN.PROFILE} element={<AdminProfile />} />
          <Route path={ROUTES.ADMIN.SETTINGS} element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
