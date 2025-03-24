import Link from "next/link";
import styles from "./UI.module.css";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";

export default function BlackButton({
  children,
  href,
  className,
}: Readonly<{ href: Url; children: ReactNode; className?: string }>) {
  return (
    <Link
      href={href}
      className={cn(
        styles.balckButton,
        "p-5 w-full md:w-[188px] md:h-[202px] md:p-[28px]"
      )}
    >
      <div
        className={cn(
          styles.border,
          "flex place-items-center p-2.5 justify-between border-2 border-solid border-white md:pt-[28px] md:px-0 md:pb-0 md:justify-center md:place-items-start md:w-[131px] md:h-[139px] md:text-center",
          className
        )}
      >
        {children}
        <ChevronRight className="text-white md:absolute md:bottom-3 md:right-3" />
      </div>
    </Link>
  );
}
