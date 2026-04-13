import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import type { MonthlySummary } from '../../types';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

interface SummaryCardsProps {
  summary: MonthlySummary;
  prevSummary: MonthlySummary;
}

export const SummaryCards = ({ summary, prevSummary }: SummaryCardsProps) => {
  const balanceDelta = summary.balance - prevSummary.balance;

  const cards = [
    {
      label: 'Kontostand',
      value: summary.balance,
      delta: balanceDelta,
      icon: Wallet,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: summary.balance >= 0 ? 'text-slate-800' : 'text-red-600',
    },
    {
      label: 'Einnahmen',
      value: summary.totalIncome,
      delta: summary.totalIncome - prevSummary.totalIncome,
      icon: TrendingUp,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      valueColor: 'text-emerald-600',
    },
    {
      label: 'Ausgaben',
      value: summary.totalExpenses,
      delta: summary.totalExpenses - prevSummary.totalExpenses,
      icon: TrendingDown,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      valueColor: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, delta, icon: Icon, iconBg, iconColor, valueColor }) => (
        <Card key={label}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className={`text-2xl font-bold mt-1 ${valueColor}`}>
                {formatCurrency(value)}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <span
                  className={`text-xs font-medium ${
                    delta >= 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {delta >= 0 ? '+' : ''}
                  {formatCurrency(delta)}
                </span>
                <span className="text-xs text-slate-400">vs. Vormonat</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon size={20} className={iconColor} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
