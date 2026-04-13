import type { SavingsGoal } from '../types';
import { GoalList } from '../components/goals/GoalList';

interface GoalsProps {
  goals: SavingsGoal[];
  onAdd: (data: Omit<SavingsGoal, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, data: Partial<Omit<SavingsGoal, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  onContribute: (id: string, amount: number) => void;
}

export const Goals = ({
  goals,
  onAdd,
  onUpdate,
  onDelete,
  onContribute,
}: GoalsProps) => (
  <GoalList
    goals={goals}
    onAdd={onAdd}
    onUpdate={onUpdate}
    onDelete={onDelete}
    onContribute={onContribute}
  />
);
