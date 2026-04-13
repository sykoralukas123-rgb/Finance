import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import type { Category } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface BudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  currentLimit: number | null;
  onSave: (amount: number) => void;
}

export const BudgetForm = ({
  isOpen,
  onClose,
  category,
  currentLimit,
  onSave,
}: BudgetFormProps) => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setAmount(currentLimit != null ? String(currentLimit) : '');
  }, [currentLimit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount.replace(',', '.'));
    if (val > 0) {
      onSave(val);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Budget: ${category.label}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-slate-500">
          Lege ein monatliches Limit für <strong>{category.label}</strong> fest.
          {currentLimit != null && (
            <span> Aktuell: {formatCurrency(currentLimit)}</span>
          )}
        </p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Monatliches Limit (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="z.B. 300"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
            autoFocus
          />
        </div>
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 bg-emerald-500 rounded-xl text-sm font-medium text-white hover:bg-emerald-600"
          >
            Speichern
          </button>
        </div>
      </form>
    </Modal>
  );
};
