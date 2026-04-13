import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import type { Transaction, TransactionType, CategoryId } from '../../types';
import { getCategoriesByType } from '../../constants/categories';
import { today } from '../../utils/formatters';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Transaction, 'id' | 'createdAt'>) => void;
  initial?: Transaction | null;
}

const defaultForm = {
  type: 'ausgabe' as TransactionType,
  amount: '',
  categoryId: 'sonstiges_ausgabe' as CategoryId,
  date: today(),
  note: '',
};

export const TransactionForm = ({
  isOpen,
  onClose,
  onSubmit,
  initial,
}: TransactionFormProps) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setForm({
        type: initial.type,
        amount: String(initial.amount),
        categoryId: initial.categoryId,
        date: initial.date,
        note: initial.note,
      });
    } else {
      setForm(defaultForm);
    }
    setError('');
  }, [initial, isOpen]);

  const categories = getCategoriesByType(form.type);

  const handleTypeChange = (type: TransactionType) => {
    const firstCat = getCategoriesByType(type)[0];
    setForm((f) => ({ ...f, type, categoryId: firstCat.id as CategoryId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount.replace(',', '.'));
    if (!amount || amount <= 0) {
      setError('Bitte einen gültigen Betrag eingeben.');
      return;
    }
    onSubmit({
      type: form.type,
      amount,
      categoryId: form.categoryId,
      date: form.date,
      note: form.note,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Buchung bearbeiten' : 'Neue Buchung'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type toggle */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Art</label>
          <div className="grid grid-cols-2 gap-2">
            {(['ausgabe', 'einnahme'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                  form.type === t
                    ? t === 'ausgabe'
                      ? 'bg-red-50 border-red-300 text-red-700'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {t === 'ausgabe' ? 'Ausgabe' : 'Einnahme'}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Betrag (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            required
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Kategorie
          </label>
          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm((f) => ({ ...f, categoryId: e.target.value as CategoryId }))
            }
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Datum</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            required
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Notiz (optional)
          </label>
          <input
            type="text"
            placeholder="z.B. Supermarkt Edeka"
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 bg-emerald-500 rounded-xl text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
          >
            {initial ? 'Speichern' : 'Hinzufügen'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
