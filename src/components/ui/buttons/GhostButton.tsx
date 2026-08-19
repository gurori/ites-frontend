import { cn } from "@/lib/utils";
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import s from "./Button.module.css";

const GhostButton = React.forwardRef<
  HTMLButtonElement,
  Readonly<
    {
      children: ReactNode;
      className?: string;
    } & ButtonHTMLAttributes<HTMLButtonElement>
  >
>(({ children, className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn(s.ghost, className)} {...props}>
      {children}
    </button>
  );
});

GhostButton.displayName = "GhostButton";

export default GhostButton;
