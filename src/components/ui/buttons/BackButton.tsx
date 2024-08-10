import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export default function BackButton({
  className,
  chevronLeftClassName,
  onClick,
}: Readonly<{ className?: string; chevronLeftClassName?: string; onClick?: () => void}>) {
  return (
    <div
      className={cn("bg-gray-400 size-[34px] rounded-full center cursor-pointer", className)}
      onClick={onClick}
    >
      <ChevronLeft className={cn("text-black -ml-0.5", chevronLeftClassName)} />
    </div>
  );
}
