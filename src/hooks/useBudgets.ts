import { useCallback } from 'react';
import type { Budget, Transaction, BudgetProgress } from '../types';
import type { CategoryId } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { getBudgetProgress } from '../utils/calculations';

const STORAGE_KEY = 'finanz_budgets';

export function useBudgets() {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>(STORAGE_KEY, []);

  const setLimit = useCallback(
    (categoryId: CategoryId | string, monthKey: string, limitAmount: number) => {
      setBudgets((prev) => {
        const exists = prev.findIndex(
          (b) => b.categoryId === categoryId && b.monthKey === monthKey
        );
        if (exists >= 0) {
          const updated = [...prev];
          updated[exists] = { ...updated[exists], limitAmount };
          return updated;
        }
        return [
          ...prev,
          { id: crypto.randomUUID(), categoryId: categoryId as CategoryId, monthKey, limitAmount },
        ];
      });
    },
    [setBudgets]
  );

  const removeBudget = useCallback(
    (id: string) => {
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    },
    [setBudgets]
  );

  const getProgress = useCallback(
    (monthKey: string, transactions: Transaction[]): BudgetProgress[] =>
      getBudgetProgress(transactions, budgets, monthKey),
    [budgets]
  );

  const getBudgetForCategory = useCallback(
    (categoryId: string, monthKey: string) =>
      budgets.find((b) => b.categoryId === categoryId && b.monthKey === monthKey),
    [budgets]
  );

  return { budgets, setLimit, removeBudget, getProgress, getBudgetForCategory };
}
