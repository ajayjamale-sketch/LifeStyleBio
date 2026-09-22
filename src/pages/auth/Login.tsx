import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Eye, 
  EyeOff, 
  LogIn, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Stethoscope, 
  Building2, 
  Users, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/constants/validationRules';
import { ROUTES, getRoleDashboard } from '@/constants/routes';
import Captcha from '@/components/common/Captcha';
import { GoogleIcon, AppleIcon, LinkedInIcon, XIcon } from '@/components/common/SocialIcons';
import { toast } from 'sonner';
import type { z } from 'zod';

type FormData = z.infer<typeof loginSchema>;

const DEMO_PRESETS = [
  { label: 'Member', role: 'individual_user', email: 'alex.morgan@lifestylebio.com', pass: 'User@123456', icon: User },
  { label: 'Physician', role: 'healthcare_professional', email: 'doctor@lifestylebio.com', pass: 'Doctor@123456', icon: Stethoscope },
  { label: 'Dietitian', role: 'nutritionist', email: 'nutritionist@lifestylebio.com', pass: 'Diet@123456', icon: Sparkles },
  { label: 'Coach', role: 'fitness_coach', email: 'fitness@lifestylebio.com', pass: 'Coach@123456', icon: Activity },
  { label: 'Corporate', role: 'corporate_wellness_manager', email: 'corporate@lifestylebio.com', pass: 'Corp@123456', icon: Building2 },
  { label: 'Family', role: 'family_member', email: 'family@lifestylebio.com', pass: 'Family@123456', icon: Users },
];

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('individual_user');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex.morgan@lifestylebio.com',
      password: 'User@123456',
    },
  });

  const handleApplyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setSelectedPreset(preset.role);
    setValue('email', preset.email, { shouldValidate: true });
    setValue('password', preset.pass, { shouldValidate: true });
    toast.info(`Demo credentials loaded: ${preset.label}`);
  };

  const onSubmit = async (data: FormData) => {
    if (!captchaVerified) {
      toast.error('Please complete the security check.');
      return;
    }
    setIsLoading(true);
    const success = await login(data);
    setIsLoading(false);
    if (success) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
      const allUsers = JSON.parse(localStorage.getItem('lifestylebio_all_users') || '[]');
      const loggedInUser = allUsers.find((u: { email: string }) => u.email.toLowerCase() === data.email.toLowerCase());
      const role = loggedInUser?.role || 'individual_user';
      navigate(from || getRoleDashboard(role), { replace: true });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Connecting with ${provider} single sign-on...`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-lg shadow-slate-200/40 w-full"
    >
      {/* Header */}
      <div className="mb-3.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            <ShieldCheck size={11} /> Health ID Portal
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v2.4 Telemetry</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight mt-1.5">
          Sign In to LifestyleBio
        </h1>
      </div>

      {/* 1-Click Demo Role Selector Strip (Responsive 3 cols on mobile, 6 cols on desktop) */}
      <div className="mb-3.5 p-2 bg-slate-50 rounded-xl border border-slate-200/70">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={11} className="text-emerald-500" /> Instant Demo Role Fill:
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {DEMO_PRESETS.map((p) => {
            const isSelected = selectedPreset === p.role;
            const IconCmp = p.icon;
            return (
              <button
                type="button"
                key={p.role}
                onClick={() => handleApplyPreset(p)}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[46px] ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
                title={`Login as ${p.label}`}
              >
                <IconCmp size={13} className="shrink-0" />
                <span className="w-full text-center text-[10px] leading-none">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-slate-400 shrink-0" size={14} />
            <input
              {...register('email')}
              type="email"
              placeholder="Registered Email Address"
              autoComplete="email"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-slate-400 shrink-0" size={14} />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Master Password"
              autoComplete="current-password"
              className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between text-[11px] pt-0.5">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Remember device</span>
          </label>

          <Link 
            to={ROUTES.FORGOT_PASSWORD} 
            className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Captcha */}
        <div>
          <Captcha onVerify={setCaptchaVerified} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <LogIn size={14} />
              <span>Sign In to Account</span>
            </>
          )}
        </button>
      </form>

      {/* Social Media Login Strip */}
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[9px] uppercase font-bold text-slate-400 tracking-wider">
          <span className="bg-white px-2">Or Social Media Sign In</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign in with Google"
        >
          <GoogleIcon size={14} className="shrink-0" />
          <span className="hidden sm:inline text-slate-800 text-[10px]">Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('Apple')}
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign in with Apple"
        >
          <AppleIcon size={14} className="shrink-0 text-slate-900" />
          <span className="hidden sm:inline text-slate-800 text-[10px]">Apple</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('LinkedIn')}
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign in with LinkedIn"
        >
          <LinkedInIcon size={14} className="shrink-0 text-[#0A66C2]" />
          <span className="hidden sm:inline text-slate-800 text-[10px]">LinkedIn</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('X / Twitter')}
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign in with X"
        >
          <XIcon size={13} className="shrink-0 text-slate-900" />
          <span className="hidden sm:inline text-slate-800 text-[10px]">X</span>
        </button>
      </div>

      {/* Footer Links */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div>
          No account?{' '}
          <Link 
            to={ROUTES.REGISTER} 
            className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
          >
            Create Account
          </Link>
        </div>

        <Link
          to={ROUTES.ADMIN_LOGIN}
          className="text-slate-400 hover:text-slate-600 text-[10px] font-medium transition-colors flex items-center gap-0.5"
        >
          <span>Admin</span>
          <ArrowRight size={9} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
