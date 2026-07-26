"use client";

import type { IOrder, OrdersProp } from "@/lib/types/IOrder";
import { useEffect, useState } from "react";
import s from "@/app/profile/(tabs)/(contents)/ui/UI.module.css";
import apiFetch from "@/lib/apiFetch";

export default function OrderList({
  orders,
  token,
}: OrdersProp & { token: string }) {
  const handleAccept = async (id: IOrder["id"], accept: boolean) => {
    const res = await apiFetch(`/api/moders/order/${id}/${accept}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
    } else setList(list.filter((x) => x.id !== id));
  };
  const [list, setList] = useState(orders);
  const [currentId, setCurrentId] = useState<null | IOrder["id"]>(null);
  const [accept, setAccept] = useState<null | boolean>(null);
  useEffect(() => {
    const handleClick = async () => {
      if (currentId !== null && accept !== null)
        await handleAccept(currentId, accept);
    };
    handleClick();
  }, [accept]);
  return list.map((o) => (
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
          onClick={() => {
            setCurrentId(o.id);
            setAccept(false);
          }}
        >
          Удалить
        </button>
        <button
          className={s.green}
          style={{ boxShadow: "none" }}
          onClick={() => {
            setCurrentId(o.id);
            setAccept(true);
          }}
        >
          Опубликовать
        </button>
      </div>
    </div>
  ));
}
