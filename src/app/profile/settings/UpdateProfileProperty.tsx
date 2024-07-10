import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type UpdateProfilePropertyProps = {
  text: string;
  className?: string;
  children: ReactNode;
};

export default function UpdateProfileProperty({
  text,
  className,
  children,
}: UpdateProfilePropertyProps) {
  return (
    <div className="pt-12">
      <p className="text-white pb-5">{text}</p>
      <div className={cn("pl-[30px]", className)}>{children}</div>
    </div>
  );
}
