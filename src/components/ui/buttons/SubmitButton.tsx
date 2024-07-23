import { JSXElement } from "@/lib/types/JSXElement";
import { cn } from "@/lib/utils";
import { icons, PencilLine } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";

export default function SubmitButton({
  className,
  onClick,
  type = "submit",
  children = "Редактировать",
  icon = <PencilLine size={16} />
}: Readonly<{
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  children?: ReactNode;
  icon?: JSXElement
}>) {
  return (
    <button
      className={cn(
        "small bg-purple px-7 text-white flex items-center gap-4 mt-16",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}{icon}
    </button>
  );
}
