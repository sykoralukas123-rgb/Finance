interface ProgressBarProps {
  percent: number; // 0-100+
  className?: string;
}

export const ProgressBar = ({ percent, className = '' }: ProgressBarProps) => {
  const capped = Math.min(percent, 100);
  const color =
    percent >= 100
      ? 'bg-red-500'
      : percent >= 80
      ? 'bg-amber-400'
      : 'bg-emerald-500';

  return (
    <div className={`w-full bg-slate-100 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className={`h-2 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${capped}%` }}
      />
    </div>
  );
};
