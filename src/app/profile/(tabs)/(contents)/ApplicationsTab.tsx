import type { CompetitionsProp } from "@/lib/types/ICompetition";
import type { OrdersProp } from "@/lib/types/IOrder";

import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import styles from "./Styles.module.css";

export default function ApplicationsTab({
  competitions,
  orders,
  index,
}: Readonly<Partial<CompetitionsProp & OrdersProp> & { index: number }>) {
  const anyCompetition = competitions && competitions.length > 0;
  const anyOrder = orders && orders.length > 0;
  return (
    <>
      {anyCompetition || anyOrder ? (
        <>
          <p className={styles.title}>Отправлено заявок на конкурсы: {competitions?.length}</p>
          {anyCompetition && (
            <div className="flex flex-wrap gap-8">
              {competitions.map((c) => (
                <div className="w-[218px]" key={c.id}>
                  <div className={styles.infoBlock}></div>
                  <p className="text-center text-white pt-2 line-clamp-2 break-words">
                    {c.title}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className={styles.title}>Всего ожидается заказов: {orders?.length}</p>
          {anyOrder && (
            <div className="flex flex-wrap gap-8">
              {orders.map((o) => (
                <div className="w-[218px]" key={o.id}>
                  <div className={styles.infoBlock}></div>
                  <p className="text-center text-white pt-2 line-clamp-2 break-words">
                    {o.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
