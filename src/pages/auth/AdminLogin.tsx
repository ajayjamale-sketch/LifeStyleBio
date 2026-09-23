import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/constants/validationRules';
import { ROUTES } from '@/constants/routes';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/constants/roles';
import Captcha from '@/components/common/Captcha';
import { toast } from 'sonner';
import type { z } from 'zod';

type FormData = z.infer<typeof loginSchema>;

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFillAdminCredentials = () => {
    setValue('email', ADMIN_EMAIL, { shouldValidate: true });
    setValue('password', ADMIN_PASSWORD, { shouldValidate: true });
    toast.info('Admin demo credentials loaded');
  };

  const onSubmit = async (data: FormData) => {
    if (!captchaVerified) { toast.error('Please complete the security check.'); return; }
    setIsLoading(true);
    const success = await adminLogin(data);
    setIsLoading(false);
    if (success) navigate(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
          <ShieldCheck size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading leading-tight">Admin Portal</h2>
          <p className="text-gray-500 text-xs">Authorized personnel only</p>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
        <p className="text-amber-800 text-sm font-medium">Restricted Access</p>
        <p className="text-amber-600 text-xs mt-0.5">This page is for system administrators only. All access attempts are logged and monitored.</p>
      </div>

      <div className="mb-5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
          <Sparkles size={14} className="text-orange-500 shrink-0" />
          Quick Demo Access
        </span>
        <button
          type="button"
          onClick={handleFillAdminCredentials}
          className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ShieldCheck size={13} />
          Fill Admin Credentials
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">Administrator Email</label>
          <input {...register('email')} type="email" className="input-field" placeholder="admin@lifestylebio.com" autoComplete="email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input {...register('password')} type={showPassword ? 'text' : 'password'} className="input-field pr-10" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <Captcha onVerify={setCaptchaVerified} />
        <button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 shadow-md">
          {isLoading ? 'Authenticating...' : <><ShieldCheck size={16} /> Admin Sign In</>}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Not an admin?{' '}
        <Link to={ROUTES.LOGIN} className="text-emerald-600 hover:text-emerald-700 font-semibold">Regular Sign In</Link>
      </p>
    </motion.div>
  );
};

export default AdminLogin;
