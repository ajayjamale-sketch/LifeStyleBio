import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { calculateBMI, getBMICategory } from '@/utils/healthCalculations';
import { healthProfileSchema } from '@/constants/validationRules';
import { BLOOD_TYPES } from '@/constants/appConstants';
import { toast } from 'sonner';
import type { z } from 'zod';

type FormData = z.infer<typeof healthProfileSchema>;

const STORAGE_KEY = 'lifestylebio_member_health_profile';
const DEFAULT_HEALTH_PROFILE: FormData = {
  height: 170,
  weight: 70,
  bloodType: 'O+',
  fitnessLevel: 'moderately_active',
  smokingStatus: 'never',
  alcoholConsumption: 'occasional',
  sleepHours: 8,
  stressLevel: 5,
};

const HealthProfile: React.FC = () => {
  const { user } = useAuth();
  const storageKey = `${STORAGE_KEY}_${user?.id || 'default'}`;

  const getSavedProfile = (): FormData => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? { ...DEFAULT_HEALTH_PROFILE, ...JSON.parse(saved) } : DEFAULT_HEALTH_PROFILE;
    } catch {
      return DEFAULT_HEALTH_PROFILE;
    }
  };

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues: getSavedProfile(),
  });

  const height = watch('height');
  const weight = watch('weight');
  const bmi = height && weight ? calculateBMI(weight, height) : null;
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  const onSubmit = async (data: FormData) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
    toast.success('Health profile saved to your record!');
  };

  const handleReset = () => {
    localStorage.removeItem(storageKey);
    reset(DEFAULT_HEALTH_PROFILE);
    toast.info('Health profile reset to default baseline.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <User size={22} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Health Profile</h2>
          <p className="text-gray-500 text-sm">Complete your profile for personalized AI recommendations</p>
        </div>
      </div>

      {bmi && bmiInfo && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Your BMI Summary</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 font-heading">{bmi}</div>
              <div className={`text-sm font-medium mt-1 ${bmiInfo.color}`}>{bmiInfo.label}</div>
              <div className="text-xs text-gray-400">{bmiInfo.description}</div>
            </div>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-yellow-400 to-red-400" />
              <div className="relative h-4 -mt-4 flex items-center">
                <div
                  className="absolute w-3 h-3 bg-white border-2 border-gray-700 rounded-full shadow-md transition-all duration-500"
                  style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%`, marginLeft: '-6px' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="label">Height (cm) *</label>
            <input {...register('height', { valueAsNumber: true })} type="number" className="input-field" placeholder="170" min="100" max="250" />
            {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height.message}</p>}
          </div>
          <div>
            <label className="label">Weight (kg) *</label>
            <input {...register('weight', { valueAsNumber: true })} type="number" className="input-field" placeholder="70" min="30" max="300" />
            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
          </div>
          <div>
            <label className="label">Blood Type</label>
            <select {...register('bloodType')} className="input-field">
              <option value="">Unknown</option>
              {BLOOD_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Fitness Level *</label>
            <select {...register('fitnessLevel')} className="input-field">
              <option value="sedentary">Sedentary (Little to no exercise)</option>
              <option value="lightly_active">Lightly Active (1-3 days/week)</option>
              <option value="moderately_active">Moderately Active (3-5 days/week)</option>
              <option value="very_active">Very Active (6-7 days/week)</option>
              <option value="extra_active">Extra Active (Athlete level)</option>
            </select>
          </div>
          <div>
            <label className="label">Smoking Status *</label>
            <select {...register('smokingStatus')} className="input-field">
              <option value="never">Never smoked</option>
              <option value="former">Former smoker</option>
              <option value="current">Current smoker</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Alcohol Consumption *</label>
            <select {...register('alcoholConsumption')} className="input-field">
              <option value="none">None</option>
              <option value="occasional">Occasional (1-2x/month)</option>
              <option value="moderate">Moderate (1-4x/week)</option>
              <option value="heavy">Heavy (5+x/week)</option>
            </select>
          </div>
          <div>
            <label className="label">Sleep Hours per Night *</label>
            <input {...register('sleepHours', { valueAsNumber: true })} type="number" className="input-field" min="1" max="24" step="0.5" />
            {errors.sleepHours && <p className="text-red-500 text-xs mt-1">{errors.sleepHours.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Stress Level: {watch('stressLevel')}/10 *</label>
          <input {...register('stressLevel', { valueAsNumber: true })} type="range" min="1" max="10" className="w-full accent-emerald-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Minimal stress</span><span>Extreme stress</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary flex items-center gap-2 cursor-pointer">
            <Save size={16} /> Save Health Profile
          </button>
          <button type="button" onClick={handleReset} className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            Reset Baseline
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthProfile;
