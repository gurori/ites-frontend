import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.css";

export default function GhostButton({
  children,
  className,
}: Readonly<
  {
    children: ReactNode;
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>) {
  return <button className={cn(s.ghost, className)}>{children}</button>;
}
