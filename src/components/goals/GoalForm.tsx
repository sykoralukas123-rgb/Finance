import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import type { SavingsGoal } from '../../types';

interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SavingsGoal, 'id' | 'createdAt'>) => void;
  initial?: SavingsGoal | null;
}

const PRESET_COLORS = [
  '#10b981', '#3b82f6', '#f59e0b', '#ec4899',
  '#8b5cf6', '#f97316', '#06b6d4', '#84cc16',
];

const defaultForm = {
  name: '',
  targetAmount: '',
  currentAmount: '',
  targetDate: '',
  color: PRESET_COLORS[0],
};

export const GoalForm = ({ isOpen, onClose, onSubmit, initial }: GoalFormProps) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        targetAmount: String(initial.targetAmount),
        currentAmount: String(initial.currentAmount),
        targetDate: initial.targetDate ?? '',
        color: initial.color,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initial, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(form.targetAmount.replace(',', '.'));
    const current = parseFloat(form.currentAmount.replace(',', '.')) || 0;
    if (target <= 0) return;
    onSubmit({
      name: form.name,
      targetAmount: target,
      currentAmount: Math.min(current, target),
      targetDate: form.targetDate || null,
      color: form.color,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Ziel bearbeiten' : 'Neues Sparziel'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
          <input
            type="text"
            placeholder="z.B. Urlaub, neues Fahrrad…"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Zielbetrag (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              placeholder="1000"
              value={form.targetAmount}
              onChange={(e) => setForm((f) => ({ ...f, targetAmount: e.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Bereits gespart (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0"
              value={form.currentAmount}
              onChange={(e) => setForm((f) => ({ ...f, currentAmount: e.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Zieldatum (optional)
          </label>
          <input
            type="date"
            value={form.targetDate}
            onChange={(e) => setForm((f) => ({ ...f, targetDate: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Farbe</label>
          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm((f) => ({ ...f, color: c }))}
                className={`w-7 h-7 rounded-full transition-transform ${
                  form.color === c ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : ''
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
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
            {initial ? 'Speichern' : 'Erstellen'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
