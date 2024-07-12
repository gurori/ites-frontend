import { type JobTitle } from "@/lib/types/JobTitle";
import { type Role } from "@/lib/types/Role";

export default function JobTitle({
  title = "Участник",
}: {
  title?: JobTitle | Role;
}) {
  const color = {
    Участник: "#665BE3",
    Разработчик: "#3C1F63",
    Дизайнер: "#B74C85",
    Менеджер: "#EC6C6C",
    Маркетолог: "#D6BD3F",
  }[title.toString()];
  return (
    <div
      className="h-5 px-2 rounded-2xl bg-gray-200 text-sm"
      style={{ color: color }}
    >
      ★{"  "}
      {title}
    </div>
  );
}
