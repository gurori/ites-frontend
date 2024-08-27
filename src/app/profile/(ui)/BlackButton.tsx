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
    <Link href={href} className={styles.balckButton}>
      <div className={cn(styles.border, "border-2 border-solid border-white", className)}>
        {children}
        <ChevronRight className="text-white absolute bottom-3 right-3" />
      </div>
    </Link>
  );
}
