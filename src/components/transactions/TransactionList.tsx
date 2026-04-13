import { useState, useMemo } from 'react';
import { Plus, Receipt } from 'lucide-react';
import type { Transaction, TransactionType, CategoryId } from '../../types';
import { TransactionItem } from './TransactionItem';
import { TransactionForm } from './TransactionForm';
import { EmptyState } from '../ui/EmptyState';
import { CATEGORIES } from '../../constants/categories';

interface TransactionListProps {
  transactions: Transaction[];
  onAdd: (data: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export const TransactionList = ({
  transactions,
  onAdd,
  onUpdate,
  onDelete,
}: TransactionListProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [filterType, setFilterType] = useState<TransactionType | 'alle'>('alle');
  const [filterCat, setFilterCat] = useState<CategoryId | 'alle'>('alle');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filterType !== 'alle' && t.type !== filterType) return false;
      if (filterCat !== 'alle' && t.categoryId !== filterCat) return false;
      return true;
    });
  }, [transactions, filterType, filterCat]);

  const handleEdit = (t: Transaction) => {
    setEditing(t);
    setFormOpen(true);
  };

  const handleSubmit = (data: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editing) {
      onUpdate(editing.id, data);
    } else {
      onAdd(data);
    }
    setEditing(null);
  };

  const categoriesForFilter = CATEGORIES.filter(
    (c) => filterType === 'alle' || c.type === filterType
  );

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value as TransactionType | 'alle');
            setFilterCat('alle');
          }}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
        >
          <option value="alle">Alle Arten</option>
          <option value="ausgabe">Ausgaben</option>
          <option value="einnahme">Einnahmen</option>
        </select>

        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value as CategoryId | 'alle')}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
        >
          <option value="alle">Alle Kategorien</option>
          {categoriesForFilter.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="ml-auto">
          <button
            onClick={() => { setEditing(null); setFormOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Neue Buchung
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Keine Buchungen gefunden"
            description="Füge deine erste Buchung hinzu."
            action={
              <button
                onClick={() => { setEditing(null); setFormOpen(true); }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                Buchung hinzufügen
              </button>
            }
          />
        ) : (
          filtered.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <TransactionForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
};
