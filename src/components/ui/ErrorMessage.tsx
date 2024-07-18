import { type FormError } from "@/lib/types/FormError";
import { cn } from "@/lib/utils";

export default function ErrorMessage({
  children,
  className,
  ...props
}: Readonly<{ children?: string | FormError; className?: string }>) {
  return (
    <span {...props} className={cn("text-red-500 h-6", className)}>
      {children?.toString()}
    </span>
  );
}