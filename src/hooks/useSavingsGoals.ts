import { useCallback } from 'react';
import type { SavingsGoal } from '../types';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'finanz_goals';

export function useSavingsGoals() {
  const [goals, setGoals] = useLocalStorage<SavingsGoal[]>(STORAGE_KEY, []);

  const add = useCallback(
    (goal: Omit<SavingsGoal, 'id' | 'createdAt'>) => {
      setGoals((prev) => [
        ...prev,
        { ...goal, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ]);
    },
    [setGoals]
  );

  const update = useCallback(
    (id: string, partial: Partial<Omit<SavingsGoal, 'id' | 'createdAt'>>) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...partial } : g))
      );
    },
    [setGoals]
  );

  const remove = useCallback(
    (id: string) => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    },
    [setGoals]
  );

  const contribute = useCallback(
    (id: string, amount: number) => {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === id
            ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) }
            : g
        )
      );
    },
    [setGoals]
  );

  return { goals, add, update, remove, contribute };
}
