import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function ErrorMessage({
  children,
  className,
  ...props
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <span {...props} className={cn("text-red-500 h-6", className)}>
      {children}
    </span>
  );
}
