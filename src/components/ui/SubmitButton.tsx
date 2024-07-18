import { cn } from "@/lib/utils";
import { PencilLine } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";

export default function SubmitButton({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <button
      className={cn(
        "small bg-purple px-7 text-white flex items-center gap-4 mt-16",
        className
      )}
    >
      Редактировать <PencilLine size={16} />
    </button>
  );
}
