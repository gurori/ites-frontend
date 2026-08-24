"use client";

import type { IOrder, OrdersProp } from "@/lib/types/IOrder";
import { useState } from "react";
import s from "@/app/profile/(tabs)/(contents)/ui/UI.module.css";
import apiFetch from "@/lib/apiFetch";
import { toast } from "sonner";

export default function OrderList({
  orders,
  token,
}: OrdersProp & { token: string }) {
  const [list, setList] = useState(orders);

  const handleAccept = async (id: IOrder["id"], accept: boolean) => {
    try {
      const res = await apiFetch(`/api/moderation/order/${id}/${accept}`, {
        method: "POST",
        token, 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("Не удалось обновить статус заказа.");
        return;
      }

      setList((prev) => prev.filter((x) => x.id !== id));
      toast.success(accept ? "Заказ успешно опубликован!" : "Заказ удален.");
    } catch (error) {
      console.error("Error handling order:", error);
      toast.error("Ошибка сети. Проверьте подключение.");
    }
  };

  return (
    <>
      {list.map((o) => (
        <div
          className="border-[#000] border-2 border-opacity-50 rounded-3xl p-8"
          key={o.id}
        >
          <h4 className="text-white text-4xl md:text-5xl">{o.title}</h4>
          <p className="text-white text-xl pt-4">{o.description}</p>
          <div className="flex gap-4 mt-6">
            <button
              className={s.red}
              style={{ boxShadow: "none" }}
              onClick={() => handleAccept(o.id, false)}
            >
              Удалить
            </button>
            <button
              className={s.green}
              style={{ boxShadow: "none" }}
              onClick={() => handleAccept(o.id, true)}
            >
              Опубликовать
            </button>
          </div>
        </div>
      ))}
    </>
  );
}