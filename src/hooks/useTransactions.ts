import { useCallback } from 'react';
import type { Transaction } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { filterByMonth, getMonthlySummary } from '../utils/calculations';

const STORAGE_KEY = 'finanz_transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEY,
    []
  );

  const add = useCallback(
    (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
      const newTx: Transaction = {
        ...tx,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);
    },
    [setTransactions]
  );

  const update = useCallback(
    (id: string, partial: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => {
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...partial } : t))
      );
    },
    [setTransactions]
  );

  const remove = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    },
    [setTransactions]
  );

  const getByMonth = useCallback(
    (monthKey: string) =>
      filterByMonth(transactions, monthKey).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [transactions]
  );

  const getSummary = useCallback(
    (monthKey: string) => getMonthlySummary(transactions, monthKey),
    [transactions]
  );

  return { transactions, add, update, remove, getByMonth, getSummary };
}
