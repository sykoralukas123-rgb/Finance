import { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import type { SavingsGoal } from '../../types';
import { GoalCard } from './GoalCard';
import { GoalForm } from './GoalForm';
import { EmptyState } from '../ui/EmptyState';

interface GoalListProps {
  goals: SavingsGoal[];
  onAdd: (data: Omit<SavingsGoal, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, data: Partial<Omit<SavingsGoal, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  onContribute: (id: string, amount: number) => void;
}

export const GoalList = ({
  goals,
  onAdd,
  onUpdate,
  onDelete,
  onContribute,
}: GoalListProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<SavingsGoal | null>(null);

  const handleEdit = (g: SavingsGoal) => {
    setEditing(g);
    setFormOpen(true);
  };

  const handleSubmit = (data: Omit<SavingsGoal, 'id' | 'createdAt'>) => {
    if (editing) {
      onUpdate(editing.id, data);
    } else {
      onAdd(data);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Neues Sparziel
        </button>
      </div>

      {goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="Noch keine Sparziele"
          description="Erstelle dein erstes Sparziel und behalte den Überblick."
          action={
            <button
              onClick={() => { setEditing(null); setFormOpen(true); }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600"
            >
              Sparziel erstellen
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              goal={g}
              onEdit={handleEdit}
              onDelete={onDelete}
              onContribute={onContribute}
            />
          ))}
        </div>
      )}

      <GoalForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
};
