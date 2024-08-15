import type { IOrder } from "@/lib/types/IOrder";
import MainTabsButtons from "../MainTabsButtons";
import apiFetch from "@/lib/apiFetch";
import Order from "./Order";

export const revalidate = 10;

export default async function OrdersPage() {
    async function getOrders() {
        const orders: IOrder[] = await apiFetch(
          "/api/orders"
        ).then(async (res) => await res.json());
        return orders;
      }
      const orders = await getOrders();
    return (
        <>
        <MainTabsButtons active="Заказы" />
        <div className="pt-16 grid gap-16">
        {orders.map((o) => (
          <Order order={o} key={o.id} />
        ))}
      </div>
        </>
    )
}