import type { Transaction } from '../types';
import { TransactionList } from '../components/transactions/TransactionList';

interface TransactionsProps {
  transactions: Transaction[];
  onAdd: (data: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export const Transactions = ({
  transactions,
  onAdd,
  onUpdate,
  onDelete,
}: TransactionsProps) => (
  <TransactionList
    transactions={transactions}
    onAdd={onAdd}
    onUpdate={onUpdate}
    onDelete={onDelete}
  />
);
