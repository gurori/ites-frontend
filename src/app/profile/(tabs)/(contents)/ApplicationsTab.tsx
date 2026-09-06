import type { CompetitionsProps } from "@/lib/types/Competition";
import type { OrdersProp } from "@/lib/types/Order";
import type { TeamsProp } from "@/lib/types/ITeam";

import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import styles from "./Styles.module.css";
import { cn, getHtmlTags } from "@/lib/utils";
import Link from "next/link";

export default function ApplicationsTab({
  competitions,
  orders,
  teams,
  index,
}: Readonly<
  Partial<CompetitionsProps & OrdersProp & TeamsProp> & { index: number }
>) {
  const anyCompetition = competitions && competitions.length > 0;
  const anyOrder = orders && orders.length > 0;
  const anyTeam = teams && teams.length > 0;

  return (
    <>
      {anyCompetition || anyOrder ? (
        <>
          <p className={cn(styles.title, "-mt-8")}>
            Отправлено заявок на конкурсы: {competitions?.length}
          </p>
          {anyCompetition && (
            <div className="flex flex-wrap gap-8">
              {competitions.map((c) => (
                <Link
                  href={`/competition/${c.id}`}
                  className="w-[218px]"
                  key={c.id}
                >
                  <div className={styles.infoBlock}></div>
                  <p
                    className="text-center text-white pt-2 line-clamp-1 break-words [&>*]:text-lg [&>*]:font-normal"
                    dangerouslySetInnerHTML={{
                      __html: getHtmlTags(c.contentInHtml, 1),
                    }}
                  ></p>
                </Link>
              ))}
            </div>
          )}
          <p className={styles.title}>
            Всего ожидается заказов: {orders?.length}
          </p>
          {anyOrder && (
            <div className="flex flex-wrap gap-8">
              {orders.map((o) => (
                <Link href={`/order/${o.id}`} className="w-[218px]" key={o.id}>
                  <div className={styles.infoBlock}></div>
                  <p className="text-center text-white pt-2 line-clamp-2 break-words">
                    {o.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
          <p className={styles.title}>
            Отправлено заявок в команды: {teams?.length}
          </p>
          {anyTeam && (
            <div className="flex flex-wrap gap-8">
              {teams.map((t) => (
                <Link href={`/team/${t.id}`} className="w-[218px]" key={t.id}>
                  <div className={styles.infoBlock}></div>
                  <p className="text-center text-white pt-2 line-clamp-2 break-words">
                    {t.name}
                  </p>
                </Link>
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
