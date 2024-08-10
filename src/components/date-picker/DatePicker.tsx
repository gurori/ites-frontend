import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Matcher } from "react-day-picker";

export default function DatePicker({
  field,
  disabled = (d) => d <= new Date()
}: Readonly<{
  field: ControllerRenderProps<
    {
      [x: string]: any;
    },
    any
  >;
  disabled?: Matcher | Matcher[]
}>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "rounded-gray",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите дату</span>}
          <CalendarIcon className="ml-auto h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
