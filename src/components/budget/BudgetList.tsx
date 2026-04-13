import { useState } from 'react';
import { Plus, Pencil, Trash2, PiggyBank } from 'lucide-react';
import type { Transaction, Category } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { BudgetForm } from './BudgetForm';
import { formatCurrency } from '../../utils/formatters';
import { getAllExpenseCategories } from '../../utils/calculations';
import { useBudgets } from '../../hooks/useBudgets';
import { EmptyState } from '../ui/EmptyState';

interface BudgetListProps {
  transactions: Transaction[];
  monthKey: string;
}

export const BudgetList = ({ transactions, monthKey }: BudgetListProps) => {
  const { setLimit, removeBudget, getProgress, getBudgetForCategory } =
    useBudgets();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const progress = getProgress(monthKey, transactions);
  const allExpenseCats = getAllExpenseCategories();

  const handleOpenForm = (cat: Category) => {
    setSelectedCategory(cat);
    setFormOpen(true);
  };

  const currentLimit =
    selectedCategory
      ? getBudgetForCategory(selectedCategory.id, monthKey)?.limitAmount ?? null
      : null;

  return (
    <div className="space-y-6">
      {/* Active budgets */}
      {progress.length === 0 ? (
        <EmptyState
          icon={PiggyBank}
          title="Noch kein Budget festgelegt"
          description="Lege Limits fest, um deine Ausgaben im Blick zu behalten."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
          {progress.map((p) => (
            <div key={p.budget.id} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.category.color }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {p.category.label}
                  </span>
                  {p.isOverBudget && (
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      Überschritten
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {formatCurrency(p.spent)} / {formatCurrency(p.budget.limitAmount)}
                  </span>
                  <button
                    onClick={() => handleOpenForm(p.category)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => removeBudget(p.budget.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <ProgressBar percent={p.percentUsed} />
              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-slate-400">{p.percentUsed}% verbraucht</span>
                <span
                  className={`text-xs font-medium ${
                    p.isOverBudget ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {p.isOverBudget
                    ? `${formatCurrency(Math.abs(p.remaining))} überfällig`
                    : `${formatCurrency(p.remaining)} verfügbar`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add budgets for remaining categories */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Plus size={16} />
          Budget hinzufügen
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {allExpenseCats
            .filter(
              (cat) =>
                !progress.some((p) => p.category.id === cat.id)
            )
            .map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleOpenForm(cat)}
                className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:border-emerald-300 transition-colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
        </div>
      </div>

      {selectedCategory && (
        <BudgetForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          category={selectedCategory}
          currentLimit={currentLimit}
          onSave={(amount) => setLimit(selectedCategory.id, monthKey, amount)}
        />
      )}
    </div>
  );
};
