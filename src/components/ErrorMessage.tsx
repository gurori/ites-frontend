import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export default function ErrorMessage({
  children,
  className,
  ...props
}: Readonly<{ children?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>; className?: string }>) {
  return (
    <span {...props} className={cn("text-red-500 h-6", className)}>
      {children?.toString()}
    </span>
  );
}
