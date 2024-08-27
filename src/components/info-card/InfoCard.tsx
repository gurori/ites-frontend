import type { ReactNode } from "react";
import styles from "./InfoCard.module.css";
import { cn } from "@/lib/utils";

export default function InfoCard({
  children,
  type,
}: Readonly<{
  children: ReactNode;
  type: "competition" | "order" | "news" | "task";
}>) {
  const { color, title } = {
    competition: { title: "О задании", color: "bg-purple" },
    order: { title: "О заказе", color: "bg-yellow" },
    news: { title: "Новость", color: "bg-gray-450" },
    task: { title: "О задании", color: "bg-gray-600" },
  }[type];
  return (
    <div className={styles.card}>
      <div className={cn("h-1/3 rounded-t-[28px]", color)}></div>
      <div className="px-2 md:px-14 py-8 h-2/3">
        <h6>{title}</h6>
        {children}
      </div>
    </div>
  );
}
