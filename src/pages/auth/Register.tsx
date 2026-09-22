import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Eye, 
  EyeOff, 
  UserPlus, 
  Mail, 
  Lock, 
  Phone, 
  Sparkles, 
  User, 
  Stethoscope, 
  Building2, 
  Users, 
  Activity 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/constants/validationRules';
import { COUNTRY_CODES } from '@/constants/appConstants';
import { ROUTES, getRoleDashboard } from '@/constants/routes';
import Captcha from '@/components/common/Captcha';
import { GoogleIcon, AppleIcon, LinkedInIcon, XIcon } from '@/components/common/SocialIcons';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { UserRole } from '@/types/auth.types';

type FormData = z.infer<typeof registerSchema>;

const PERSONA_ROLES: { id: UserRole; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'individual_user', label: 'Member', icon: User },
  { id: 'healthcare_professional', label: 'Doctor', icon: Stethoscope },
  { id: 'nutritionist', label: 'Dietitian', icon: Sparkles },
  { id: 'fitness_coach', label: 'Coach', icon: Activity },
  { id: 'corporate_wellness_manager', label: 'Corporate', icon: Building2 },
  { id: 'family_member', label: 'Family', icon: Users },
];

const Register: React.FC = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      countryCode: '+1', 
      role: 'individual_user',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: true,
    },
  });

  const selectedRole = watch('role');
  const passwordValue = watch('password') || '';

  // Calculate simple password strength
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const pwdScore = getPasswordStrength(passwordValue);

  const onSubmit = async (data: FormData) => {
    if (!captchaVerified) { 
      toast.error('Please complete the bio-security verification check.'); 
      return; 
    }
    setIsLoading(true);
    const success = await authRegister({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      countryCode: data.countryCode,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
    });
    setIsLoading(false);
    if (success) {
      navigate(getRoleDashboard(data.role), { replace: true });
    }
  };

  const handleSocialRegister = (provider: string) => {
    toast.info(`Connecting with ${provider} single sign-on...`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-lg shadow-slate-200/40 my-2"
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            <Sparkles size={11} /> Create Longevity Account
          </div>
          <span className="text-[10px] text-slate-400 font-mono">HIPAA Encrypted</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight mt-1.5">
          Join LifestyleBio
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">
          Start your personalized healthspan baseline and telemetry tracking today.
        </p>
      </div>

      {/* Social Media Registration Strip using Official Brand Vector Icons */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <button
          type="button"
          onClick={() => handleSocialRegister('Google')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign up with Google"
        >
          <GoogleIcon size={14} className="shrink-0" />
          <span className="hidden sm:inline text-slate-800">Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialRegister('Apple')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign up with Apple"
        >
          <AppleIcon size={14} className="shrink-0 text-slate-900" />
          <span className="hidden sm:inline text-slate-800">Apple</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialRegister('LinkedIn')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign up with LinkedIn"
        >
          <LinkedInIcon size={14} className="shrink-0 text-[#0A66C2]" />
          <span className="hidden sm:inline text-slate-800">LinkedIn</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialRegister('Twitter / X')}
          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer group"
          title="Sign up with X"
        >
          <XIcon size={13} className="shrink-0 text-slate-900" />
          <span className="hidden sm:inline text-slate-800">X</span>
        </button>
      </div>

      <div className="relative my-2.5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[9px] uppercase font-bold text-slate-400 tracking-wider">
          <span className="bg-white px-2">Or register with credentials</span>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        
        {/* Role Persona Picker */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Account Type / Operational Role: *
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {PERSONA_ROLES.map(roleItem => {
              const isSelected = selectedRole === roleItem.id;
              const IconCmp = roleItem.icon;
              return (
                <button
                  type="button"
                  key={roleItem.id}
                  onClick={() => setValue('role', roleItem.id, { shouldValidate: true })}
                  className={`py-1.5 px-1.5 rounded-lg text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                  title={roleItem.label}
                >
                  <IconCmp size={13} className="shrink-0" />
                  <span className="w-full text-center text-[10px] leading-none">{roleItem.label}</span>
                </button>
              );
            })}
          </div>
          {errors.role && <p className="text-red-500 text-[10px] font-medium mt-0.5">{errors.role.message}</p>}
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input 
              {...register('firstName')} 
              placeholder="First Name *" 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {errors.firstName && <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <input 
              {...register('lastName')} 
              placeholder="Last Name *" 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {errors.lastName && <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input 
              {...register('email')} 
              type="email" 
              placeholder="Clinical or Personal Email Address *" 
              autoComplete="email" 
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          {errors.email && <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <div className="flex gap-1.5">
            <select 
              {...register('countryCode')} 
              className="w-24 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shrink-0"
            >
              {COUNTRY_CODES.map(c => (
                <option key={c.code} value={c.dialCode}>
                  {c.dialCode} ({c.code})
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                {...register('phone')} 
                type="tel" 
                placeholder="Phone (e.g. 555-0192) *" 
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>
          {errors.phone && <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-1">{errors.phone.message}</p>}
        </div>

        {/* Passwords (2 Columns) */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                {...register('password')} 
                type={showPwd ? 'text' : 'password'} 
                placeholder="Password *" 
                autoComplete="new-password" 
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPwd(!showPwd)} 
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              >
                {showPwd ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                {...register('confirmPassword')} 
                type={showConfirm ? 'text' : 'password'} 
                placeholder="Confirm *" 
                autoComplete="new-password" 
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              >
                {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Password Strength Meter */}
        {passwordValue && (
          <div className="space-y-1 pt-0.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(idx => (
                <div 
                  key={idx} 
                  className={`h-1 flex-1 rounded-full transition-all ${
                    idx <= pwdScore 
                      ? pwdScore >= 3 
                        ? 'bg-emerald-500' 
                        : pwdScore === 2 
                        ? 'bg-amber-500' 
                        : 'bg-red-500' 
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between font-medium">
              <span>{pwdScore >= 3 ? 'Strong password' : pwdScore === 2 ? 'Moderate' : 'Min 8 chars, uppercase, number & symbol'}</span>
            </div>
          </div>
        )}

        {(errors.password || errors.confirmPassword) && (
          <p className="text-red-500 text-[10px] font-medium pl-1">
            {errors.password?.message || errors.confirmPassword?.message}
          </p>
        )}

        {/* Terms Agreement Checkbox */}
        <div className="pt-0.5">
          <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600 leading-snug">
            <input 
              {...register('agreeToTerms')} 
              type="checkbox" 
              className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 w-3.5 h-3.5 shrink-0" 
            />
            <span>
              I agree to the{' '}
              <Link to={ROUTES.TERMS_CONDITIONS} className="text-emerald-600 font-semibold hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to={ROUTES.PRIVACY_POLICY} className="text-emerald-600 font-semibold hover:underline">Privacy Policy</Link>
              {' '}&amp; consent to HIPAA encryption.
            </span>
          </label>
          {errors.agreeToTerms && <p className="text-red-500 text-[10px] font-medium mt-0.5 pl-5">{errors.agreeToTerms.message}</p>}
        </div>

        {/* BioGuardian CAPTCHA */}
        <div className="pt-0.5">
          <Captcha onVerify={setCaptchaVerified} />
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 mt-1"
        >
          {isLoading ? (
            <span>Generating Bio-Account...</span>
          ) : (
            <>
              <UserPlus size={14} />
              <span>Create Health ID Account</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 text-center text-[11px] text-slate-500">
        Already have an account?{' '}
        <Link 
          to={ROUTES.LOGIN} 
          className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
        >
          Sign In
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;
