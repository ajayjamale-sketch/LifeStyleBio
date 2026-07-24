import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, UserPlus, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/constants/validationRules';
import { ROLE_OPTIONS } from '@/constants/roles';
import { COUNTRY_CODES } from '@/constants/appConstants';
import { ROUTES, getRoleDashboard } from '@/constants/routes';
import Captcha from '@/components/common/Captcha';
import { toast } from 'sonner';
import type { z } from 'zod';

type FormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { countryCode: '+1', role: 'individual_user' },
  });

  const onSubmit = async (data: FormData) => {
    if (!captchaVerified) { toast.error('Please complete the security check.'); return; }
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
    if (success) navigate(getRoleDashboard(data.role));
  };

  const selectedRole = watch('role');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 font-heading mb-1.5">Create Your Account</h2>
      <p className="text-gray-500 text-sm mb-6">Join 500,000+ people living healthier lives.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">First Name *</label>
            <input {...register('firstName')} className="input-field" placeholder="John" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="label">Last Name *</label>
            <input {...register('lastName')} className="input-field" placeholder="Doe" />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Email Address *</label>
          <input {...register('email')} type="email" className="input-field" placeholder="you@example.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Phone Number *</label>
          <div className="flex gap-2">
            <select {...register('countryCode')} className="input-field w-28 flex-shrink-0">
              {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}
            </select>
            <input {...register('phone')} type="tel" className="input-field flex-1" placeholder="5551234567" />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="label">I am a *</label>
          <div className="grid grid-cols-2 gap-2">
            {ROLE_OPTIONS.map(role => (
              <label
                key={role.value}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                  selectedRole === role.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <input {...register('role')} type="radio" value={role.value} className="hidden" />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedRole === role.value ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                }`}>
                  {selectedRole === role.value && <Check size={9} className="text-white" />}
                </div>
                <span className="font-medium text-gray-700 text-xs">{role.label}</span>
              </label>
            ))}
          </div>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="label">Password *</label>
          <div className="relative">
            <input {...register('password')} type={showPwd ? 'text' : 'password'} className="input-field pr-10" placeholder="Min 8 chars, uppercase, number, symbol" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="label">Confirm Password *</label>
          <div className="relative">
            <input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'} className="input-field pr-10" placeholder="Re-enter password" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-start gap-2.5">
          <input {...register('agreeToTerms')} type="checkbox" id="terms" className="mt-0.5 accent-emerald-500" />
          <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
            I agree to the{' '}
            <Link to={ROUTES.TERMS_CONDITIONS} className="text-emerald-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to={ROUTES.PRIVACY_POLICY} className="text-emerald-600 hover:underline">Privacy Policy</Link>
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms.message}</p>}

        <Captcha onVerify={setCaptchaVerified} />

        <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
          {isLoading ? 'Creating account...' : <><UserPlus size={16} /> Create Account</>}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-emerald-600 hover:text-emerald-700 font-semibold">Sign In</Link>
      </p>
    </motion.div>
  );
};

export default Register;
