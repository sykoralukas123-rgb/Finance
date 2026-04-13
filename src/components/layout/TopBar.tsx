import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthKey } from '../../utils/formatters';

interface TopBarProps {
  title: string;
  monthKey: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const TopBar = ({ title, monthKey, onPrevMonth, onNextMonth }: TopBarProps) => {
  const isCurrentMonth =
    monthKey === new Date().toISOString().slice(0, 7);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevMonth}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm font-medium text-slate-700 w-36 text-center capitalize">
          {formatMonthKey(monthKey)}
        </span>

        <button
          onClick={onNextMonth}
          disabled={isCurrentMonth}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </header>
  );
};
