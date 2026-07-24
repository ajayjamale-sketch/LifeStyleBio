import React, { createContext, useState, useCallback } from 'react';
import type { HealthProfile, MedicalRecord, NutritionLog, FitnessLog, SleepLog, MoodLog, VitalSigns } from '@/types/health.types';
import { generateId } from '@/utils/helpers';

const STORAGE_KEYS = {
  HEALTH_DATA: 'health_data',
  MEDICAL_RECORDS: 'medical_records',
} as const;

interface HealthContextType {
  healthProfile: HealthProfile | null;
  medicalRecords: MedicalRecord[];
  nutritionLogs: NutritionLog[];
  fitnessLogs: FitnessLog[];
  sleepLogs: SleepLog[];
  moodLogs: MoodLog[];
  vitalSigns: VitalSigns[];
  updateHealthProfile: (profile: Partial<HealthProfile>) => void;
  addMedicalRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => MedicalRecord;
  updateMedicalRecord: (id: string, updates: Partial<MedicalRecord>) => void;
  deleteMedicalRecord: (id: string) => void;
  loadHealthData: (userId: string) => void;
}

export const HealthContext = createContext<HealthContextType | null>(null);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [nutritionLogs] = useState<NutritionLog[]>([]);
  const [fitnessLogs] = useState<FitnessLog[]>([]);
  const [sleepLogs] = useState<SleepLog[]>([]);
  const [moodLogs] = useState<MoodLog[]>([]);
  const [vitalSigns] = useState<VitalSigns[]>([]);

  const loadHealthData = useCallback((userId: string) => {
    const allHealthData = JSON.parse(localStorage.getItem(STORAGE_KEYS.HEALTH_DATA) || '{}');
    const userHealth = allHealthData[userId];
    if (userHealth) setHealthProfile(userHealth);

    const allRecords: MedicalRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS) || '[]');
    setMedicalRecords(allRecords.filter(r => r.userId === userId));
  }, []);

  const updateHealthProfile = useCallback((profile: Partial<HealthProfile>) => {
    const current = healthProfile;
    const updated = { ...current, ...profile, updatedAt: new Date().toISOString() } as HealthProfile;
    const allHealthData = JSON.parse(localStorage.getItem(STORAGE_KEYS.HEALTH_DATA) || '{}');
    if (updated.userId) {
      allHealthData[updated.userId] = updated;
      localStorage.setItem(STORAGE_KEYS.HEALTH_DATA, JSON.stringify(allHealthData));
    }
    setHealthProfile(updated);
  }, [healthProfile]);

  const addMedicalRecord = useCallback((record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>): MedicalRecord => {
    const newRecord: MedicalRecord = {
      ...record,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const allRecords: MedicalRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS) || '[]');
    allRecords.push(newRecord);
    localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(allRecords));
    setMedicalRecords(prev => [newRecord, ...prev]);
    return newRecord;
  }, []);

  const updateMedicalRecord = useCallback((id: string, updates: Partial<MedicalRecord>) => {
    const allRecords: MedicalRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS) || '[]');
    const updatedRecords = allRecords.map(r =>
      r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
    );
    localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(updatedRecords));
    setMedicalRecords(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const deleteMedicalRecord = useCallback((id: string) => {
    const allRecords: MedicalRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS) || '[]');
    const filtered = allRecords.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(filtered));
    setMedicalRecords(prev => prev.filter(r => r.id !== id));
  }, []);

  return (
    <HealthContext.Provider value={{
      healthProfile,
      medicalRecords,
      nutritionLogs,
      fitnessLogs,
      sleepLogs,
      moodLogs,
      vitalSigns,
      updateHealthProfile,
      addMedicalRecord,
      updateMedicalRecord,
      deleteMedicalRecord,
      loadHealthData,
    }}>
      {children}
    </HealthContext.Provider>
  );
};
