import type { Transaction, Budget, MonthlySummary, BudgetProgress } from '../types';
import { CATEGORIES, getCategoryById } from '../constants/categories';

export const getMonthKey = (isoDate: string): string => isoDate.slice(0, 7);

export const filterByMonth = (transactions: Transaction[], monthKey: string) =>
  transactions.filter((t) => t.date.startsWith(monthKey));

export const getMonthlySummary = (
  transactions: Transaction[],
  monthKey: string
): MonthlySummary => {
  const monthly = filterByMonth(transactions, monthKey);
  const totalIncome = monthly
    .filter((t) => t.type === 'einnahme')
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = monthly
    .filter((t) => t.type === 'ausgabe')
    .reduce((s, t) => s + t.amount, 0);
  return { monthKey, totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
};

export const getSpendingByCategory = (
  transactions: Transaction[],
  monthKey: string
): { categoryId: string; label: string; color: string; amount: number }[] => {
  const monthly = filterByMonth(transactions, monthKey).filter(
    (t) => t.type === 'ausgabe'
  );
  const map = new Map<string, number>();
  monthly.forEach((t) => {
    map.set(t.categoryId, (map.get(t.categoryId) ?? 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([categoryId, amount]) => {
      const cat = getCategoryById(categoryId);
      return {
        categoryId,
        label: cat?.label ?? categoryId,
        color: cat?.color ?? '#94a3b8',
        amount,
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export const getBudgetProgress = (
  transactions: Transaction[],
  budgets: Budget[],
  monthKey: string
): BudgetProgress[] => {
  const monthBudgets = budgets.filter((b) => b.monthKey === monthKey);
  const monthly = filterByMonth(transactions, monthKey).filter(
    (t) => t.type === 'ausgabe'
  );

  return monthBudgets
    .map((budget) => {
      const category = getCategoryById(budget.categoryId);
      if (!category) return null;
      const spent = monthly
        .filter((t) => t.categoryId === budget.categoryId)
        .reduce((s, t) => s + t.amount, 0);
      const remaining = budget.limitAmount - spent;
      const percentUsed =
        budget.limitAmount > 0
          ? Math.round((spent / budget.limitAmount) * 100)
          : 0;
      return {
        budget,
        category,
        spent,
        remaining,
        percentUsed,
        isOverBudget: spent > budget.limitAmount,
      };
    })
    .filter(Boolean) as BudgetProgress[];
};

export const getLast6MonthKeys = (): string[] => {
  const result: string[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return result;
};

export const getAllExpenseCategories = () =>
  CATEGORIES.filter((c) => c.type === 'ausgabe');
