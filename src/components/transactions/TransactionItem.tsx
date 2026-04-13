import { Pencil, Trash2 } from 'lucide-react';
import type { Transaction } from '../../types';
import { getCategoryById } from '../../constants/categories';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatDateShort } from '../../utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionItem = ({
  transaction: t,
  onEdit,
  onDelete,
}: TransactionItemProps) => {
  const category = getCategoryById(t.categoryId);
  const isExpense = t.type === 'ausgabe';

  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-slate-50 group transition-colors">
      {/* Color dot */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: category?.bgColor ?? '#f1f5f9' }}
      >
        <span
          className="text-xs font-bold"
          style={{ color: category?.color ?? '#94a3b8' }}
        >
          {category?.label.slice(0, 2).toUpperCase() ?? '??'}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 truncate">
            {t.note || category?.label || 'Buchung'}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {category && <Badge category={category} size="sm" />}
          <span className="text-xs text-slate-400">{formatDateShort(t.date)}</span>
        </div>
      </div>

      {/* Amount */}
      <span
        className={`text-sm font-semibold flex-shrink-0 ${
          isExpense ? 'text-red-500' : 'text-emerald-600'
        }`}
      >
        {isExpense ? '-' : '+'}
        {formatCurrency(t.amount)}
      </span>

      {/* Actions (visible on hover) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(t)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(t.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
