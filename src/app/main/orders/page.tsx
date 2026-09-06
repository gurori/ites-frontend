import type { Order } from "@/lib/types/Order";
import MainTabsButtons from "../MainTabsButtons";
import apiFetch from "@/lib/apiFetch";
import Order from "./Order";

export const revalidate = 10;

export default async function OrdersPage() {
  const response = await apiFetch("/api/orders");

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  const orders: Order[] = await response.json();

  return (
    <>
      <MainTabsButtons active="Заказы" />
      <div className="pt-8 md:pt-16 grid gap-16">
        {orders.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </div>
    </>
  );
}
