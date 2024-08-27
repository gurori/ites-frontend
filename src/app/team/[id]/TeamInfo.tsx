"use client";

import apiFetch from "@/lib/apiFetch";
import type { TeamProp } from "@/lib/types/ITeam";
import s from "./TeamInfo.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import MemberInfo from "./MmeberInfo";
import { LogInIcon, UserRoundPlusIcon } from "lucide-react";

export default function TeamInfo({
  team,
  token,
}: Readonly<TeamProp & { token: string }>) {
  const admin = team.members.find((u) => u.id === team.adminId);
  const { push } = useRouter();
  const mode = useSearchParams().get("mode");
  const handleInvite = async () => {
    await navigator.clipboard.writeText(
      `Привет! 👋\n\nНажми на ссылку ниже, чтобы присоединиться к нашей команде 💻 "${team.name}" и попробовать свои силы 🚀\n\nhttps://ites.vercel.app/team/${team.id}?mode=invite`
    );
    toast("Приглашение скопировано в буфер обмена!");
  };
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
        toast("Ваша заявка успешно отправлена!", {
          description: `Подождите, пока админ команды "${team.name}" примет вашу заявку`,
        });
        push("/main/teams");
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
      <div className="flex flex-wrap gap-[43px] pt-20">
        {team.members.map((m) => (
          <MemberInfo user={m} key={m.id} />
        ))}
      </div>
      <div className="grid gap-4 place-items-start pt-16">
        {mode === "member" && (
          <button onClick={handleInvite} className={s.invite}>
            Пригласить <UserRoundPlusIcon />
          </button>
        )}
        {mode === "invite" && (
          <button onClick={addApplication} className={s.join}>
            Вступить <LogInIcon />
          </button>
        )}
      </div>
    </div>
  );
}
