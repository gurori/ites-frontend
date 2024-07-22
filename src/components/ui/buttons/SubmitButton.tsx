import { cn } from "@/lib/utils";
import { PencilLine } from "lucide-react";
import { MouseEventHandler } from "react";

export default function SubmitButton({
  className,
  onClick,
  type = 'submit'
}: Readonly<{ className?: string, onClick?: MouseEventHandler<HTMLButtonElement>, type?: "submit" | "reset" | "button" }>) {
  return (
    <button
      className={cn(
        "small bg-purple px-7 text-white flex items-center gap-4 mt-16",
        className
      )}
      onClick={onClick}
      type={type}
    >
      Редактировать <PencilLine size={16} />
    </button>
  );
}
