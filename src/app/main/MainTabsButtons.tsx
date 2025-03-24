import Link from "next/link";
import styles from "./Main.module.css";

export default function MainTabsButtons({
  active,
}: Readonly<{ active: "Конкурсы" | "Заказы" | "Команды" }>) {
  const underlineClassName =
    "bg-purple h-1.5 w-24 md:h-2 md:w-40 absolute bottom-0 rounded-t-xl";
  return (
    <>
      <div className="flex gap-8 md:gap-16 [&>*]:md:pb-6 [&>*]:pb-3 pt-4 md:pt-12 [&>*]:relative [&>*]:grid [&>*]:justify-items-center px-3">
        <Link href="/main/competitions" className={styles.title}>
          Конкурсы
          {active === "Конкурсы" && <span className={underlineClassName} />}
        </Link>
        <Link href="/main/orders" className={styles.title}>
          Заказы
          {active === "Заказы" && <span className={underlineClassName} />}
        </Link>
        <Link href="/main/teams" className={styles.title}>
          Команды
          {active === "Команды" && <span className={underlineClassName} />}
        </Link>
      </div>
      <hr />
    </>
  );
}
