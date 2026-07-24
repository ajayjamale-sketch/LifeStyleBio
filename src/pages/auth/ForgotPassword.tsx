import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { forgotPasswordSchema } from '@/constants/validationRules';
import { ROUTES } from '@/constants/routes';
import Captcha from '@/components/common/Captcha';
import { toast } from 'sonner';
import type { z } from 'zod';

type FormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!captchaVerified) { toast.error('Please complete the security check.'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    console.log('Password reset for:', data.email);
    setSent(true);
    toast.success('Password reset instructions sent to your email.');
    setIsLoading(false);
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail size={28} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
        <p className="text-gray-500 mb-6 leading-relaxed">We've sent password reset instructions to your email address. The link expires in 1 hour.</p>
        <Link to={ROUTES.LOGIN} className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Sign In
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-6">
        <ArrowLeft size={15} /> Back to Sign In
      </Link>
      <h2 className="text-2xl font-bold text-gray-900 font-heading mb-2">Forgot Password?</h2>
      <p className="text-gray-500 text-sm mb-7">Enter your email and we'll send you a link to reset your password.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
            <input {...register('email')} type="email" className="input-field pl-10" placeholder="you@example.com" />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <Captcha onVerify={setCaptchaVerified} />
        <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
          {isLoading ? 'Sending...' : <><Send size={16} /> Send Reset Link</>}
        </button>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
