import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

export const formatDate = (isoDate: string): string =>
  format(parseISO(isoDate), 'd. MMMM yyyy', { locale: de });

export const formatDateShort = (isoDate: string): string =>
  format(parseISO(isoDate), 'd. MMM', { locale: de });

export const formatMonthKey = (monthKey: string): string => {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return format(date, 'MMMM yyyy', { locale: de });
};

export const formatMonthShort = (monthKey: string): string => {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return format(date, 'MMM yy', { locale: de });
};

export const toMonthKey = (date: Date): string =>
  format(date, 'yyyy-MM');

export const today = (): string => format(new Date(), 'yyyy-MM-dd');
