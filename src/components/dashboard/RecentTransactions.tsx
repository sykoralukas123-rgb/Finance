import { ArrowRight } from 'lucide-react';
import type { Transaction } from '../../types';
import { getCategoryById } from '../../constants/categories';
import { formatCurrency, formatDateShort } from '../../utils/formatters';
import { Card } from '../ui/Card';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export const RecentTransactions = ({
  transactions,
  onViewAll,
}: RecentTransactionsProps) => {
  const recent = transactions.slice(0, 5);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Letzte Buchungen</h3>
        <button
          onClick={onViewAll}
          className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          Alle anzeigen <ArrowRight size={12} />
        </button>
      </div>
      {recent.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">
          Noch keine Buchungen diesen Monat
        </p>
      ) : (
        <div className="divide-y divide-slate-50">
          {recent.map((t) => {
            const cat = getCategoryById(t.categoryId);
            return (
              <div key={t.id} className="flex items-center gap-3 py-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    backgroundColor: cat?.bgColor ?? '#f1f5f9',
                    color: cat?.color ?? '#94a3b8',
                  }}
                >
                  {cat?.label.slice(0, 2).toUpperCase() ?? '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">
                    {t.note || cat?.label || 'Buchung'}
                  </p>
                  <p className="text-xs text-slate-400">{formatDateShort(t.date)}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    t.type === 'ausgabe' ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {t.type === 'ausgabe' ? '-' : '+'}
                  {formatCurrency(t.amount)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
