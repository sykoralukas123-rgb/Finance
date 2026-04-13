import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { Goals } from './pages/Goals';
import { useTransactions } from './hooks/useTransactions';
import { useBudgets } from './hooks/useBudgets';
import { useSavingsGoals } from './hooks/useSavingsGoals';
import type { PageId } from './types';
import { toMonthKey } from './utils/formatters';
import { SEED_TRANSACTIONS, SEED_GOALS, SEED_BUDGETS } from './data/seedData';

const PAGE_TITLES: Record<PageId, string> = {
  dashboard: 'Dashboard',
  transactions: 'Buchungen',
  budget: 'Budget',
  goals: 'Sparziele',
};

const prevMonth = (mk: string): string => {
  const [y, m] = mk.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const nextMonth = (mk: string): string => {
  const [y, m] = mk.split('-').map(Number);
  const d = new Date(y, m, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const SEEDED_KEY = 'finanz_seeded';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [monthKey, setMonthKey] = useState<string>(toMonthKey(new Date()));

  const { transactions, add: addTx, update: updateTx, remove: removeTx, getByMonth } =
    useTransactions();
  const { setLimit, getProgress } = useBudgets();
  const { goals, add: addGoal, update: updateGoal, remove: removeGoal, contribute } =
    useSavingsGoals();

  // Seed demo data on first visit
  useEffect(() => {
    if (!localStorage.getItem(SEEDED_KEY)) {
      SEED_TRANSACTIONS.forEach((tx) => addTx(tx));
      SEED_GOALS.forEach((g) => addGoal(g));
      const currentMk = toMonthKey(new Date());
      SEED_BUDGETS.forEach((b) =>
        setLimit(b.categoryId, currentMk, b.limitAmount)
      );
      localStorage.setItem(SEEDED_KEY, '1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const monthlyTransactions = getByMonth(monthKey);
  const budgetProgress = getProgress(monthKey, transactions);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={page} onNavigate={setPage} />

      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <TopBar
          title={PAGE_TITLES[page]}
          monthKey={monthKey}
          onPrevMonth={() => setMonthKey(prevMonth(monthKey))}
          onNextMonth={() => setMonthKey(nextMonth(monthKey))}
        />

        <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
          {page === 'dashboard' && (
            <Dashboard
              transactions={transactions}
              monthKey={monthKey}
              budgetProgress={budgetProgress}
              onViewTransactions={() => setPage('transactions')}
            />
          )}
          {page === 'transactions' && (
            <Transactions
              transactions={monthlyTransactions}
              onAdd={addTx}
              onUpdate={updateTx}
              onDelete={removeTx}
            />
          )}
          {page === 'budget' && (
            <Budget transactions={transactions} monthKey={monthKey} />
          )}
          {page === 'goals' && (
            <Goals
              goals={goals}
              onAdd={addGoal}
              onUpdate={updateGoal}
              onDelete={removeGoal}
              onContribute={contribute}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
