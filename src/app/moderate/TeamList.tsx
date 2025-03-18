"use client";

import { useState } from "react";
import type { ITeam, TeamsProp } from "@/lib/types/ITeam";
import s from "@/app/profile/(tabs)/(contents)/ui/UI.module.css";
import apiFetch from "@/lib/apiFetch";

export default async function TeamList({
  teams,
  token,
}: TeamsProp & { token: string }) {
  const handleDelete = async (id: ITeam["id"]) => {
    const res = await apiFetch(`/api/moders/team/${id}/false`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log(res);
    } else setList(list.filter((x) => x.id !== id));
  };
  const handleAccept = async (id: ITeam["id"]) => {
    const res = await apiFetch(`/api/moders/team/${id}/true`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log(res);
    } else setList(list.filter((x) => x.id !== id));
  };
  const [list, setList] = useState(teams);
  return list.map((t) => (
    <div className="border-[#000] border-2 border-opacity-50 rounded-3xl p-8">
      <h4 className="text-white text-4xl md:text-5xl">{t.name}</h4>
      <p className="text-white text-xl pt-4">{t.description}</p>
      <div className="flex gap-4 mt-6">
        <button
          className={s.red}
          style={{ boxShadow: "none" }}
          onClick={() =>  handleDelete(t.id)}
        >
          Удалить
        </button>
        <button
          className={s.green}
          style={{ boxShadow: "none" }}
          onClick={() =>  handleAccept(t.id)}
        >
          Опубликовать
        </button>
      </div>
    </div>
  ));
}
