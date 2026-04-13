import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card } from '../ui/Card';
import type { Transaction } from '../../types';
import { getLast6MonthKeys, getMonthlySummary } from '../../utils/calculations';
import { formatCurrency, formatMonthShort } from '../../utils/formatters';

interface MonthlyBarChartProps {
  transactions: Transaction[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 shadow-lg rounded-xl px-3 py-2 text-xs space-y-1">
        <p className="font-semibold text-slate-700 mb-1 capitalize">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MonthlyBarChart = ({ transactions }: MonthlyBarChartProps) => {
  const monthKeys = getLast6MonthKeys();
  const data = monthKeys.map((mk) => {
    const s = getMonthlySummary(transactions, mk);
    return {
      name: formatMonthShort(mk),
      Einnahmen: s.totalIncome,
      Ausgaben: s.totalExpenses,
    };
  });

  return (
    <Card className="h-full">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">6-Monats-Übersicht</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={14} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}€`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => <span className="text-xs text-slate-500">{v}</span>}
          />
          <Bar dataKey="Einnahmen" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Ausgaben" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
