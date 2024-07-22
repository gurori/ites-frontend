import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export default function BackButton({
  className,
  chevronLeftClassName,
}: Readonly<{ className?: string; chevronLeftClassName?: string }>) {
  return (
    <div
      className={cn("bg-gray-400 size-[34px] rounded-full center", className)}
    >
      <ChevronLeft className={cn("text-black -ml-0.5", chevronLeftClassName)} />
    </div>
  );
}
