import { create } from 'zustand';
import { Habit, HabitCompletion, HabitWithStats } from '@/types';
import {
  getAllHabits, insertHabit, updateHabit, archiveHabit,
  getAllCompletions, insertCompletion, deleteCompletion,
} from '@/db/queries/habits';
import { todayStr } from '@/utils/dates';
import { currentStreak, calculateStreaks } from '@/utils/streaks';
import { XP_PER_HABIT } from '@/utils/xp';
import { v4 as uuid } from 'uuid';

interface HabitState {
  habits: Habit[];
  completions: HabitCompletion[];
  hydrated: boolean;
  hydrate: () => void;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Habit;
  editHabit: (habit: Habit) => void;
  removeHabit: (id: string) => void;
  toggleToday: (habitId: string) => { wasCompleted: boolean; xpEarned: number };
  getWithStats: () => HabitWithStats[];
  getTodayHabits: () => HabitWithStats[];
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  completions: [],
  hydrated: false,

  hydrate: () => {
    const habits = getAllHabits();
    const completions = getAllCompletions();
    set({ habits, completions, hydrated: true });
  },

  addHabit: (data) => {
    const habit: Habit = {
      ...data,
      id: uuid(),
      createdAt: Date.now(),
    };
    insertHabit(habit);
    set((s) => ({ habits: [...s.habits, habit] }));
    return habit;
  },

  editHabit: (habit) => {
    updateHabit(habit);
    set((s) => ({ habits: s.habits.map((h) => (h.id === habit.id ? habit : h)) }));
  },

  removeHabit: (id) => {
    archiveHabit(id);
    set((s) => ({ habits: s.habits.filter((h) => h.id !== id) }));
  },

  toggleToday: (habitId) => {
    const today = todayStr();
    const { completions } = get();
    const existing = completions.find((c) => c.habitId === habitId && c.date === today);

    if (existing) {
      deleteCompletion(habitId, today);
      set((s) => ({
        completions: s.completions.filter((c) => !(c.habitId === habitId && c.date === today)),
      }));
      return { wasCompleted: false, xpEarned: 0 };
    } else {
      const completion: HabitCompletion = {
        id: uuid(),
        habitId,
        date: today,
        xpEarned: XP_PER_HABIT,
      };
      insertCompletion(completion);
      set((s) => ({ completions: [...s.completions, completion] }));
      return { wasCompleted: true, xpEarned: XP_PER_HABIT };
    }
  },

  getWithStats: () => {
    const { habits, completions } = get();
    return habits.map((h) => {
      const hCompletions = completions.filter((c) => c.habitId === h.id);
      const streaks = calculateStreaks(h, hCompletions);
      const today = todayStr();
      return {
        ...h,
        currentStreak: currentStreak(h, hCompletions),
        longestStreak: streaks.longest,
        completedToday: hCompletions.some((c) => c.date === today),
        totalCompletions: hCompletions.length,
      };
    });
  },

  getTodayHabits: () => {
    const today = todayStr();
    const d = new Date(today + 'T00:00:00');
    const dayOfWeek = (d.getDay() + 6) % 7; // 0=Mo

    return get().getWithStats().filter((h) => {
      if (h.frequency === 'daily') return true;
      if (h.frequency === 'weekly') return dayOfWeek === 0;
      if (h.frequency === 'custom' && h.customDays) return h.customDays.includes(dayOfWeek);
      return true;
    });
  },
}));
