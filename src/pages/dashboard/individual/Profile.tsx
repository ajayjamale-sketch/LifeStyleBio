import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Camera, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { profileSchema } from '@/constants/validationRules';
import { ROLE_LABELS } from '@/constants/roles';
import { getInitials } from '@/utils/helpers';
import { toast } from 'sonner';
import type { z } from 'zod';

type FormData = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
      city: user?.city || '',
      country: user?.country || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      bio: data.bio,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      city: data.city,
      country: data.country,
    });
    toast.success('Profile updated successfully!');
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Avatar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white text-3xl font-bold mx-auto">
            {user ? getInitials(user.firstName, user.lastName) : 'U'}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md hover:bg-emerald-600 transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>
        <span className="inline-block mt-2 px-3 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
          {user?.role ? ROLE_LABELS[user.role] : 'Individual User'}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-bold text-gray-900">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">First Name *</label>
            <input {...register('firstName')} className="input-field" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="label">Last Name *</label>
            <input {...register('lastName')} className="input-field" />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label className="label">Email Address *</label>
          <input {...register('email')} type="email" className="input-field bg-gray-50" readOnly />
          <p className="text-gray-400 text-xs mt-1">Contact support to change your email address</p>
        </div>
        <div>
          <label className="label">Phone Number</label>
          <input {...register('phone')} type="tel" className="input-field" />
        </div>
        <div>
          <label className="label">Bio</label>
          <textarea {...register('bio')} rows={3} className="input-field resize-none" placeholder="Tell us about yourself..." />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Date of Birth</label>
            <input {...register('dateOfBirth')} type="date" className="input-field" />
          </div>
          <div>
            <label className="label">Gender</label>
            <select {...register('gender')} className="input-field">
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">City</label>
            <input {...register('city')} className="input-field" placeholder="San Francisco" />
          </div>
          <div>
            <label className="label">Country</label>
            <input {...register('country')} className="input-field" placeholder="United States" />
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          <Save size={16} /> {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
