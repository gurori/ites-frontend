import { format, FormatOptions } from "date-fns";
import { ru } from "date-fns/locale";

export function dateFormat(date: string, formatStr = "d MMMM yyyy", options?: FormatOptions) {
  return format(date, formatStr, { locale: ru, ...options });
}

export function priceFormat(price: number, currency = 'RUB'): string {
  return new Intl.NumberFormat('ru', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
