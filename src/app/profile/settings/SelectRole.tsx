import styles from "./Settings.module.css";
import SmallStar from "@/components/ui/SmallStar";
import { type JobTitle } from "@/lib/types/JobTitle";
import { cn } from "@/lib/utils";
import { Key } from "react";

export default function SelectJobTitle({
  title,
  onClick,
  active = false,
  key,
}: Readonly<{ title: JobTitle; active?: boolean; onClick: () => void, key?: Key }>) {
  const color = {
    Разработчик: "#3C1F63",
    Дизайнер: "#B74C85",
    Менеджер: "#EC6C6C",
    Маркетолог: "#D6BD3F",
  }[title];
  return (
    <div
      key={key}
      className={cn(styles.selectRole, "transition-all flex-shrink-0", active && "border-4")}
      style={{ borderColor: `${color}86` }}
      onClick={onClick}
    >
      <p className={styles.role} style={{ color: color }}>
        {title.toUpperCase()}
      </p>
      <SmallStar color={color} className="absolute right-0 bottom-0" />
    </div>
  );
}
