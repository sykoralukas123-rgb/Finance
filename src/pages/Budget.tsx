import type { Transaction } from '../types';
import { BudgetList } from '../components/budget/BudgetList';

interface BudgetProps {
  transactions: Transaction[];
  monthKey: string;
}

export const Budget = ({ transactions, monthKey }: BudgetProps) => (
  <BudgetList transactions={transactions} monthKey={monthKey} />
);
