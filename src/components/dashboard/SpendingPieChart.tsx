import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

interface SpendingPieChartProps {
  data: { categoryId: string; label: string; color: string; amount: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { label, amount } = payload[0].payload;
    return (
      <div className="bg-white border border-slate-100 shadow-lg rounded-xl px-3 py-2">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-sm text-slate-500">{formatCurrency(amount)}</p>
      </div>
    );
  }
  return null;
};

export const SpendingPieChart = ({ data }: SpendingPieChartProps) => (
  <Card className="h-full">
    <h3 className="text-sm font-semibold text-slate-700 mb-4">Ausgaben nach Kategorie</h3>
    {data.length === 0 ? (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        Keine Ausgaben diesen Monat
      </div>
    ) : (
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="amount"
            nameKey="label"
          >
            {data.map((entry) => (
              <Cell key={entry.categoryId} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-slate-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </Card>
);
