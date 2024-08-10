import { type JobTitle } from "@/lib/types/JobTitle";
import { type Role, type RoleEng } from "@/lib/types/Role";
import { cn, getRoleRus } from "@/lib/utils";

export default function JobTitle({
  title,
  className,
}: {
  title: JobTitle | Role | RoleEng;
  className?: string;
}) {
  let color = {
    Разработчик: "#3C1F63",
    Дизайнер: "#B74C85",
    Менеджер: "#EC6C6C",
    Маркетолог: "#D6BD3F",
  }[title.toString()];
  if (!color) {
    title = getRoleRus(title as RoleEng);
    color = "#665BE3";
  }
  return (
    <div
      className={cn("h-5 px-2 rounded-2xl bg-gray-200 text-sm", className)}
      style={{ color: color }}
    >
      ★{"  "}
      {title}
    </div>
  );
}
