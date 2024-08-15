import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import styles from "./Styles.module.css";
import type { OrdersProp } from "@/lib/types/IOrder";

export default async function OrdersTab({
  orders,
  index,
}: Readonly<Partial<OrdersProp> & { index: number }>) {
  return (
    <>
      {orders && orders.length !== 0 ? (
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
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}