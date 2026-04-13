export type TransactionType = 'einnahme' | 'ausgabe';

export type CategoryId =
  | 'gehalt'
  | 'nebeneinkommen'
  | 'sonstiges_einnahme'
  | 'wohnen'
  | 'lebensmittel'
  | 'transport'
  | 'gesundheit'
  | 'freizeit'
  | 'kleidung'
  | 'restaurant'
  | 'bildung'
  | 'versicherung'
  | 'elektronik'
  | 'sonstiges_ausgabe';

export interface Category {
  id: CategoryId;
  label: string;
  type: TransactionType;
  color: string;
  bgColor: string;
  icon: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: CategoryId;
  date: string; // ISO: "2026-04-13"
  note: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  categoryId: CategoryId;
  monthKey: string; // "2026-04"
  limitAmount: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string | null;
  color: string;
  createdAt: string;
}

export interface BudgetProgress {
  budget: Budget;
  category: Category;
  spent: number;
  remaining: number;
  percentUsed: number;
  isOverBudget: boolean;
}

export interface MonthlySummary {
  monthKey: string;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export type PageId = 'dashboard' | 'transactions' | 'budget' | 'goals';
