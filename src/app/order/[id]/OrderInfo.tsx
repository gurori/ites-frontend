"use client";

import InfoCard from "@/components/info-card/InfoCard";
import apiFetch from "@/lib/apiFetch";
import { dateFormat, priceFormat } from "@/lib/format";
import type { OrderProp } from "@/lib/types/IOrder";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default async function OrderInfo({
    order,
  token,
}: Readonly<OrderProp & { token: string }>) {
  const deadLine = dateFormat(order.deadLine);
  const price = priceFormat(order.price);
  const { push } = useRouter();
  const addApplication = async () => {
    await apiFetch(
      `/api/orders/application/${order.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (res) => {
      console.log(res)
      if (res.ok) {
        toast("Ваша заявка успешно отправлена!");
        push("/main/orders");
      } else if (res.status === 403) {
        toast("Нужно быть участником, чтобы подавать заявки");
        push("/profile");
      } else push("/login");
    });
  };
  return (
    <InfoCard type="order">
      <h6>{order.title}</h6>
      <p className="pt-2">
        <b>
        Дедлайн: {deadLine}
        </b><br /><b>Цена: {price}</b>
      </p>
      <p className="py-10">{order.description}</p>
      <button className="flash yellow" onClick={addApplication}>
        Отправить заявку
      </button>
    </InfoCard>
  );
}
