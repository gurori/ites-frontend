import apiFetch from "@/lib/apiFetch";
import { notFound } from "next/navigation";
import { getRole, getToken } from "@/lib/services/user";
import type { IOrder } from "@/lib/types/IOrder";
import OrderInfo from "./OrderInfo";

export default async function CompetitionInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await apiFetch(`/api/orders/${params.id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`);
  }

  const order: IOrder = await response.json();

  const token = getToken()!;
  const role = getRole();

  return <OrderInfo order={order} token={token} role={role} />;
}
