export default function JobTitle({ title = "Участник" }) {
  const color = {
    Участник: "#665BE3",
    Разработчик: "#3C1F63",
    Дизайнер: "#B74C85",
    Менеджер: "#EC6C6C",
    Маркетолог: "#D6BD3F",
  }[title];
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
