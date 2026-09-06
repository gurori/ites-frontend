"use client";

import type { ITeam, TeamsProp } from "@/lib/types/ITeam";
import { useState } from "react";
import s from "@/app/profile/(tabs)/(contents)/ui/UI.module.css";
import apiFetch from "@/lib/apiFetch";
import { toast } from "sonner";

export default function TeamList({
  teams,
  token,
}: TeamsProp & { token: string }) {
  const [list, setList] = useState(teams);

  const handleAccept = async (id: ITeam["id"], accept: boolean) => {
    try {
      const res = await apiFetch(`/api/moderation/teams/${id}`, {
        method: "PATCH",
        token,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accept }),
      });

      if (!res.ok) {
        toast.error("Не удалось обновить статус команды.");
        return;
      }

      setList((prev) => prev.filter((x) => x.id !== id));
      toast.success(
        accept ? "Команда успешно опубликована!" : "Команда удалена.",
      );
    } catch (error) {
      console.error("Error handling team:", error);
      toast.error("Ошибка сети. Проверьте подключение.");
    }
  };

  return (
    <>
      {list.map((t) => (
        <div
          className="border-[#000] border-2 border-opacity-50 rounded-3xl p-8"
          key={t.id}
        >
          <h4 className="text-white text-4xl md:text-5xl">{t.name}</h4>
          <p className="text-white text-xl pt-4">{t.description}</p>
          <div className="flex gap-4 mt-6">
            <button
              className={s.red}
              style={{ boxShadow: "none" }}
              onClick={() => handleAccept(t.id, false)}
            >
              Удалить
            </button>
            <button
              className={s.green}
              style={{ boxShadow: "none" }}
              onClick={() => handleAccept(t.id, true)}
            >
              Опубликовать
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
