import Link from "next/link";
import styles from "./Main.module.css";

export default function MainTabsButtons({
  active,
}: Readonly<{ active: "Новости" | "Заказы" | "Задания" | "Конкурсы" }>) {
  return (
    <>
      <div className="flex gap-16 [&>*]:pb-6 pt-12 [&>*]:relative [&>*]:grid [&>*]:justify-items-center px-5 overflow-x-scroll scrollbar-none">
        <Link href="/main/competitions" className={styles.title}>
          Конкурсы
          {active === "Конкурсы" && (
            <span className="bg-purple h-2 w-40 absolute bottom-0 rounded-t-xl" />
          )}
        </Link>
        <Link href="/main/tasks" className={styles.title}>
          Задания
          {active === "Задания" && (
            <span className="bg-purple h-2 w-40 absolute bottom-0 rounded-t-xl" />
          )}
        </Link>
        <Link href="/main/orders" className={styles.title}>
          Заказы
          {active === "Заказы" && (
            <span className="bg-purple h-2 w-40 absolute bottom-0 rounded-t-xl" />
          )}
        </Link>
        <Link href="/main/news" className={styles.title}>
          Новости
          {active === "Новости" && (
            <span className="bg-purple h-2 w-40 absolute bottom-0 rounded-t-xl" />
          )}
        </Link>
      </div>
      <hr />
    </>
  );
}
