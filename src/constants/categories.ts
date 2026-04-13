import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  // Income
  {
    id: 'gehalt',
    label: 'Gehalt',
    type: 'einnahme',
    color: '#10b981',
    bgColor: '#d1fae5',
    icon: 'Briefcase',
  },
  {
    id: 'nebeneinkommen',
    label: 'Nebeneinkommen',
    type: 'einnahme',
    color: '#06b6d4',
    bgColor: '#cffafe',
    icon: 'TrendingUp',
  },
  {
    id: 'sonstiges_einnahme',
    label: 'Sonstige Einnahmen',
    type: 'einnahme',
    color: '#8b5cf6',
    bgColor: '#ede9fe',
    icon: 'PlusCircle',
  },
  // Expenses
  {
    id: 'wohnen',
    label: 'Wohnen',
    type: 'ausgabe',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    icon: 'Home',
  },
  {
    id: 'lebensmittel',
    label: 'Lebensmittel',
    type: 'ausgabe',
    color: '#84cc16',
    bgColor: '#ecfccb',
    icon: 'ShoppingCart',
  },
  {
    id: 'transport',
    label: 'Transport',
    type: 'ausgabe',
    color: '#3b82f6',
    bgColor: '#dbeafe',
    icon: 'Car',
  },
  {
    id: 'restaurant',
    label: 'Restaurant & Café',
    type: 'ausgabe',
    color: '#f97316',
    bgColor: '#ffedd5',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'freizeit',
    label: 'Freizeit & Hobby',
    type: 'ausgabe',
    color: '#ec4899',
    bgColor: '#fce7f3',
    icon: 'Gamepad2',
  },
  {
    id: 'gesundheit',
    label: 'Gesundheit',
    type: 'ausgabe',
    color: '#14b8a6',
    bgColor: '#ccfbf1',
    icon: 'Heart',
  },
  {
    id: 'kleidung',
    label: 'Kleidung',
    type: 'ausgabe',
    color: '#a855f7',
    bgColor: '#f3e8ff',
    icon: 'Shirt',
  },
  {
    id: 'bildung',
    label: 'Bildung',
    type: 'ausgabe',
    color: '#0ea5e9',
    bgColor: '#e0f2fe',
    icon: 'BookOpen',
  },
  {
    id: 'versicherung',
    label: 'Versicherung',
    type: 'ausgabe',
    color: '#6366f1',
    bgColor: '#e0e7ff',
    icon: 'Shield',
  },
  {
    id: 'elektronik',
    label: 'Elektronik',
    type: 'ausgabe',
    color: '#64748b',
    bgColor: '#f1f5f9',
    icon: 'Laptop',
  },
  {
    id: 'sonstiges_ausgabe',
    label: 'Sonstiges',
    type: 'ausgabe',
    color: '#94a3b8',
    bgColor: '#f8fafc',
    icon: 'MoreHorizontal',
  },
];

export const getCategoryById = (id: string): Category | undefined =>
  CATEGORIES.find((c) => c.id === id);

export const getCategoriesByType = (type: 'einnahme' | 'ausgabe') =>
  CATEGORIES.filter((c) => c.type === type);
