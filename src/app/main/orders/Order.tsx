import styles from "./Order.module.css";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import type { OrderProp } from "@/lib/types/IOrder";
import { dateFormat, priceFormat } from "@/lib/format";

export default function Order({ order }: Readonly<OrderProp>) {
  return (
    <div className={cn(styles.order, "grid gap-8 md:flex md:gap-32 justify-between")}>
      <div className="grid content-between">
        <p className={styles.title}>{order.title}</p>
        <p className="line-clamp-4 md:line-clamp-3">{order.description}</p>
        <div className={styles.date}>
          <p>Дедлайн: {dateFormat(order.deadLine)}</p>
          <p className="pt-2">Цена: {priceFormat(order.price)}</p>
        </div>
      </div>
      <div className="grid place-content-between">
        <p> </p> {/*there will be a bookmark icon */}
        <Link
          href={`/order/${order.id}`}
          className={cn(styles.button, "flex justify-between items-center")}
        >
          Узнать подробнее <MoveRightIcon />
        </Link>
      </div>
    </div>
  );
}
