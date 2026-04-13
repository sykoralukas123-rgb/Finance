import type { Transaction, BudgetProgress } from '../types';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { SpendingPieChart } from '../components/dashboard/SpendingPieChart';
import { MonthlyBarChart } from '../components/dashboard/MonthlyBarChart';
import { BudgetAlerts } from '../components/dashboard/BudgetAlerts';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { getMonthlySummary, getSpendingByCategory } from '../utils/calculations';

interface DashboardProps {
  transactions: Transaction[];
  monthKey: string;
  budgetProgress: BudgetProgress[];
  onViewTransactions: () => void;
}

const prevMonthKey = (mk: string) => {
  const [y, m] = mk.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const Dashboard = ({
  transactions,
  monthKey,
  budgetProgress,
  onViewTransactions,
}: DashboardProps) => {
  const summary = getMonthlySummary(transactions, monthKey);
  const prevSummary = getMonthlySummary(transactions, prevMonthKey(monthKey));
  const spendingData = getSpendingByCategory(transactions, monthKey);
  const monthlyTransactions = transactions
    .filter((t) => t.date.startsWith(monthKey))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} prevSummary={prevSummary} />

      {budgetProgress.some((p) => p.percentUsed >= 80) && (
        <BudgetAlerts progress={budgetProgress} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingPieChart data={spendingData} />
        <MonthlyBarChart transactions={transactions} />
      </div>

      <RecentTransactions
        transactions={monthlyTransactions}
        onViewAll={onViewTransactions}
      />
    </div>
  );
};
