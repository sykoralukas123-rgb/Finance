import { create } from 'zustand';
import { Goal } from '@/types';
import { getAllGoals, insertGoal, updateGoal, deleteGoal, markGoalComplete } from '@/db/queries/goals';
import { v4 as uuid } from 'uuid';

interface GoalState {
  goals: Goal[];
  hydrated: boolean;
  hydrate: () => void;
  addGoal: (data: Omit<Goal, 'id' | 'createdAt'>) => void;
  editGoal: (goal: Goal) => void;
  removeGoal: (id: string) => void;
  completeGoal: (id: string, done: boolean) => void;
  goalProgress: (goalId: string, completions: { habitId: string; date: string }[]) => number;
}

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],
  hydrated: false,

  hydrate: () => {
    const goals = getAllGoals();
    set({ goals, hydrated: true });
  },

  addGoal: (data) => {
    const goal: Goal = { ...data, id: uuid(), createdAt: Date.now() };
    insertGoal(goal);
    set((s) => ({ goals: [...s.goals, goal] }));
  },

  editGoal: (goal) => {
    updateGoal(goal);
    set((s) => ({ goals: s.goals.map((g) => (g.id === goal.id ? goal : g)) }));
  },

  removeGoal: (id) => {
    deleteGoal(id);
    set((s) => ({ goals: s.goals.filter((g) => g.id !== id) }));
  },

  completeGoal: (id, done) => {
    markGoalComplete(id, done);
    set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, completed: done } : g)) }));
  },

  goalProgress: (goalId, completions) => {
    const goal = get().goals.find((g) => g.id === goalId);
    if (!goal || goal.linkedHabitIds.length === 0) return 0;

    const last30Days = new Set(
      Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().slice(0, 10);
      })
    );

    const relevantCompletions = completions.filter(
      (c) => goal.linkedHabitIds.includes(c.habitId) && last30Days.has(c.date)
    );

    const maxPossible = goal.linkedHabitIds.length * 30;
    return Math.min(100, Math.round((relevantCompletions.length / maxPossible) * 100));
  },
}));
