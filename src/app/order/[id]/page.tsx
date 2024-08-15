import apiFetch from "@/lib/apiFetch";
import { notFound } from "next/navigation";
import { getToken } from "@/lib/services/user";
import type { IOrder } from "@/lib/types/IOrder";
import OrderInfo from "./OrderInfo";

export default async function CompetitionInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const order: IOrder = await apiFetch(
    `/api/orders/${params.id}`
  ).then(async (res) => {
    if (res.status === 404) notFound();
    return await res.json();
  });
  const token = await getToken();
  return (
    <OrderInfo order={order} token={token!.value} />
  );
}
