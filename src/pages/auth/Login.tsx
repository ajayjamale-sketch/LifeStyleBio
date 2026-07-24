import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/constants/validationRules';
import { ROUTES, getRoleDashboard } from '@/constants/routes';
import Captcha from '@/components/common/Captcha';
import type { z } from 'zod';

type FormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!captchaVerified) { import('sonner').then(m => m.toast.error('Please complete the security check.')); return; }
    setIsLoading(true);
    const success = await login(data);
    setIsLoading(false);
    if (success) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
      navigate(from || getRoleDashboard('individual_user'), { replace: true });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 font-heading mb-1.5">Welcome Back</h2>
      <p className="text-gray-500 text-sm mb-7">Sign in to continue your health journey.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">Email Address</label>
          <input {...register('email')} type="email" className="input-field" placeholder="you@example.com" autoComplete="email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label mb-0">Password</label>
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Forgot password?</Link>
          </div>
          <div className="relative">
            <input {...register('password')} type={showPassword ? 'text' : 'password'} className="input-field pr-10" placeholder="••••••••" autoComplete="current-password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <Captcha onVerify={setCaptchaVerified} />

        <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
          {isLoading ? 'Signing in...' : <><LogIn size={16} /> Sign In</>}
        </button>
      </form>

      <div className="mt-6 p-4 bg-emerald-50 rounded-xl text-xs text-emerald-700 border border-emerald-100">
        <p className="font-semibold mb-1">Demo Accounts:</p>
        <p>Register with any email to try any user role</p>
        <p>Admin: admin@lifestylebio.com / Admin@123456</p>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-emerald-600 hover:text-emerald-700 font-semibold">Create Account</Link>
      </p>
    </motion.div>
  );
};

export default Login;
