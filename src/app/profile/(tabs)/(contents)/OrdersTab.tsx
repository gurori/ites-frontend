import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import styles from "./Styles.module.css";
import type { OrdersProp } from "@/lib/types/Order";
import Link from "next/link";

export default async function OrdersTab({
  orders,
  index,
}: Readonly<Partial<OrdersProp> & { index: number }>) {
  return (
    <>
      {orders && orders.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {orders.map((o) => (
            <Link href={`/order/${o.id}`} key={o.id}>
              <div className="w-[218px]">
                <div className={styles.infoBlock}></div>
                <p className="text-center text-white pt-2 line-clamp-2 break-words">
                  {o.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
