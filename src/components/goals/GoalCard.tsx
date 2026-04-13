import { useState } from 'react';
import { Pencil, Trash2, Plus, CheckCircle2 } from 'lucide-react';
import type { SavingsGoal } from '../../types';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { formatCurrency } from '../../utils/formatters';
import { differenceInDays, parseISO } from 'date-fns';

interface GoalCardProps {
  goal: SavingsGoal;
  onEdit: (g: SavingsGoal) => void;
  onDelete: (id: string) => void;
  onContribute: (id: string, amount: number) => void;
}

export const GoalCard = ({ goal, onEdit, onDelete, onContribute }: GoalCardProps) => {
  const [contributeOpen, setContributeOpen] = useState(false);
  const [contributeAmount, setContributeAmount] = useState('');

  const percent = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
    100
  );
  const isCompleted = goal.currentAmount >= goal.targetAmount;
  const daysLeft =
    goal.targetDate
      ? differenceInDays(parseISO(goal.targetDate), new Date())
      : null;

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(contributeAmount.replace(',', '.'));
    if (val > 0) {
      onContribute(goal.id, val);
      setContributeAmount('');
      setContributeOpen(false);
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base"
            style={{ backgroundColor: goal.color }}
          >
            {goal.name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{goal.name}</h3>
            {daysLeft !== null && (
              <p className="text-xs text-slate-400">
                {daysLeft > 0 ? `Noch ${daysLeft} Tage` : 'Zieldatum erreicht'}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(goal)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
        <div
          className="h-2.5 rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            backgroundColor: goal.color,
          }}
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-slate-500">
          {formatCurrency(goal.currentAmount)} gespart
        </span>
        <span className="text-xs font-semibold text-slate-700">
          {percent}% von {formatCurrency(goal.targetAmount)}
        </span>
      </div>

      {isCompleted ? (
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
          <CheckCircle2 size={16} />
          Ziel erreicht! Herzlichen Glückwunsch!
        </div>
      ) : (
        <button
          onClick={() => setContributeOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:border-emerald-300 transition-colors"
          style={{ color: goal.color }}
        >
          <Plus size={15} />
          Einzahlen
        </button>
      )}

      {/* Contribute modal */}
      <Modal
        isOpen={contributeOpen}
        onClose={() => setContributeOpen(false)}
        title={`Einzahlen: ${goal.name}`}
      >
        <form onSubmit={handleContribute} className="space-y-4">
          <p className="text-sm text-slate-500">
            Noch {formatCurrency(goal.targetAmount - goal.currentAmount)} bis zum Ziel.
          </p>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Betrag (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="50"
              value={contributeAmount}
              onChange={(e) => setContributeAmount(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setContributeOpen(false)}
              className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ backgroundColor: goal.color }}
            >
              Einzahlen
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
};
