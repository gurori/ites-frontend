"use client";

import InfoCard from "@/components/info-card/InfoCard";
import apiFetch from "@/lib/apiFetch";
import { dateFormat, priceFormat } from "@/lib/format";
import type { OrderProp } from "@/lib/types/IOrder";
import type { RoleEng } from "@/lib/types/Role";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrderInfo({
  order,
  token,
  role,
}: Readonly<OrderProp & { token: string; role: RoleEng }>) {
  const { push, replace } = useRouter();

  const deadLine = dateFormat(order.deadLine);
  const price = priceFormat(order.price);

  const addApplication = async () => {
    try {
      const response = await apiFetch(`/api/orders/application/${order.id}`, {
        method: "PUT",
        token,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Ваша заявка успешно отправлена!");
        push("/main/orders");
        return;
      }

      if (response.status === 403) {
        toast.error("Нужно быть участником, чтобы подавать заявки.");
        replace(`/profile/${role}`);
        return;
      }

      if (response.status === 401) {
        replace("/login");
        return;
      }

      toast.error("Произошла ошибка при отправке заявки.");
    } catch (error) {
      console.error("Error addApplication on OrderInfo:", error);
      toast.error("Ошибка сети. Проверьте подключение к интернету.");
    }
  };

  return (
    <InfoCard type="order">
      <h6>{order.title}</h6>
      <p className="pt-2">
        <b>Дедлайн: {deadLine}</b>
        <br />
        <b>Цена: {price}</b>
      </p>
      <p className="py-10">{order.description}</p>
      <button className="flash yellow" onClick={addApplication}>
        Отправить заявку
      </button>
    </InfoCard>
  );
}
