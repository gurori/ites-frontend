"use client";

import apiFetch from "@/lib/apiFetch";
import type { TeamProp } from "@/lib/types/ITeam";
import s from "./TeamInfo.module.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MemberInfo from "./MmeberInfo";

export default async function TeamInfo({
  team,
  token,
}: Readonly<TeamProp & { token: string }>) {
  const admin = team.members.find((u) => u.id === team.adminId);
  const { push } = useRouter();
  const addApplication = async () => {
    await apiFetch(`/api/teams/application/${team.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      console.log(res);
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
    <div className={s.card}>
      <h4 className={s.name}>{team.name}</h4>
      <div className="flex justify-between">
        <p className={s.gray}>Всего участников: {team.members.length}</p>
        <p className={s.gray}>Админ: {admin?.firstName}</p>
      </div>
      <div className="flex gap-[43px] pt-20">
        {team.members.map((m) => (
          <MemberInfo user={m} key={m.id} />
        ))}
      </div>
    </div>
  );
}
