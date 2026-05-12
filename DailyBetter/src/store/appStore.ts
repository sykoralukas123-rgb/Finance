import { create } from 'zustand';
import { AppSettings } from '@/types';
import { getSettings, saveSettings } from '@/db/queries/settings';
import { xpToLevel } from '@/utils/xp';

interface AppState extends AppSettings {
  hydrated: boolean;
  hydrate: () => void;
  setName: (name: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setMorningTime: (t: string) => void;
  setEveningTime: (t: string) => void;
  setOnboardingDone: () => void;
  addXp: (amount: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  hydrated: false,
  name: '',
  morningTime: '07:30',
  eveningTime: '21:00',
  onboardingDone: false,
  theme: 'dark',
  level: 1,
  totalXp: 0,

  hydrate: () => {
    const s = getSettings();
    set({ ...s, hydrated: true });
  },

  setName: (name) => {
    saveSettings({ name });
    set({ name });
  },

  setTheme: (theme) => {
    saveSettings({ theme });
    set({ theme });
  },

  setMorningTime: (morningTime) => {
    saveSettings({ morningTime });
    set({ morningTime });
  },

  setEveningTime: (eveningTime) => {
    saveSettings({ eveningTime });
    set({ eveningTime });
  },

  setOnboardingDone: () => {
    saveSettings({ onboardingDone: true });
    set({ onboardingDone: true });
  },

  addXp: (amount) => {
    const newXp = get().totalXp + amount;
    const newLevel = xpToLevel(newXp);
    saveSettings({ totalXp: newXp, level: newLevel });
    set({ totalXp: newXp, level: newLevel });
  },
}));
