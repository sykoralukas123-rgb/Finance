export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  identity: string;
  stackAfterId: string | null;
  frequency: HabitFrequency;
  customDays: number[] | null; // 0=Mo … 6=So
  color: string;
  createdAt: number;
  archived: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  xpEarned: number;
}

export interface HabitWithStats extends Habit {
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  totalCompletions: number;
}

export type GoalHorizon = '3months' | '1year';
export type LifeArea = 'finanzen' | 'studium' | 'gesundheit' | 'beruf' | 'persoenlich';

export interface Goal {
  id: string;
  title: string;
  description: string;
  area: LifeArea | null;
  horizon: GoalHorizon;
  targetDate: string | null;
  createdAt: number;
  completed: boolean;
  linkedHabitIds: string[];
}

export interface Reflexion {
  id: string;
  date: string;
  mood: number; // 1–5
  wentWell: string;
  learned: string;
  createdAt: number;
}

export interface MorgenRoutine {
  id: string;
  date: string;
  intention: string;
  priority1: string;
  priority2: string;
  priority3: string;
  createdAt: number;
}

export interface LebensbereichRating {
  id: string;
  month: string; // YYYY-MM
  finanzen: number;
  studium: number;
  gesundheit: number;
  beruf: number;
  persoenlich: number;
}

export interface AppSettings {
  name: string;
  morningTime: string; // HH:MM
  eveningTime: string; // HH:MM
  onboardingDone: boolean;
  theme: 'dark' | 'light';
  level: number;
  totalXp: number;
}

export interface HeatmapDay {
  date: string;
  count: number;
  total: number;
}
