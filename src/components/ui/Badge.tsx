import type { Category } from '../../types';

interface BadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export const Badge = ({ category, size = 'md' }: BadgeProps) => {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClass}`}
      style={{ backgroundColor: category.bgColor, color: category.color }}
    >
      {category.label}
    </span>
  );
};
