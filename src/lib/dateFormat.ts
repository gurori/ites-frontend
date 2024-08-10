import { format, FormatOptions } from "date-fns";
import { ru } from "date-fns/locale";

export default function dateFormat(date: string, formatStr = "d MMMM yyyy", options?: FormatOptions) {
  return format(date, formatStr, { locale: ru, ...options });
}
