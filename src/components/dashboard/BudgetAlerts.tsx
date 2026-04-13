import { AlertTriangle, AlertCircle } from 'lucide-react';
import type { BudgetProgress } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface BudgetAlertsProps {
  progress: BudgetProgress[];
}

export const BudgetAlerts = ({ progress }: BudgetAlertsProps) => {
  const alerts = progress.filter((p) => p.percentUsed >= 80);
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((p) => (
        <div
          key={p.budget.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
            p.isOverBudget
              ? 'bg-red-50 border border-red-100'
              : 'bg-amber-50 border border-amber-100'
          }`}
        >
          {p.isOverBudget ? (
            <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          ) : (
            <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
          )}
          <span className={p.isOverBudget ? 'text-red-700' : 'text-amber-700'}>
            {p.isOverBudget ? (
              <>
                <strong>{p.category.label}</strong>: Budget überschritten!{' '}
                {formatCurrency(Math.abs(p.remaining))} zu viel ausgegeben.
              </>
            ) : (
              <>
                <strong>{p.category.label}</strong>: {p.percentUsed}% des Budgets verbraucht ({formatCurrency(p.remaining)} verbleiben).
              </>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
