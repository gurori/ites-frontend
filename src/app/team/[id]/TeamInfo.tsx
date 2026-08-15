"use client";

import { useState } from "react";
import apiFetch from "@/lib/apiFetch";
import type { TeamProp } from "@/lib/types/ITeam";
import s from "./TeamInfo.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import MemberInfo from "./MemberInfo";
import { LogInIcon, UserRoundPlusIcon } from "lucide-react";
import type { RoleEng } from "@/lib/types/Role";

export default function TeamInfo({
  team,
  token,
  role,
}: Readonly<TeamProp & { token: string | null; role: RoleEng | null }>) {
  const { push, replace } = useRouter();
  const params = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const admin = team.members.find((u) => u.id === team.adminId);
  const mode = params.get("mode");

  const handleInvite = async () => {
    try {
      const currentOrigin = window.location.origin;
      await navigator.clipboard.writeText(
        `${currentOrigin}/team/${team.id}?mode=invite`,
      );
      toast.success("Ссылка скопирована в буфер обмена.");
    } catch (error) {
      console.error("Failed to copy invite link:", error);
      toast.error(
        "Не удалось скопировать ссылку. Проверьте разрешения браузера.",
      );
    }
  };

  const addApplication = async () => {
    if (!token || !role) {
      toast.error("Войдите в систему, чтобы подавать заявки.");
      replace("/login");
      return;
    }

    if (role !== "member") {
      toast.error("Нужно быть участником, чтобы подавать заявки.");
      push(`/profile/${role}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch(`/api/teams/application/${team.id}`, {
        method: "PUT",
        token,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Ваша заявка успешно отправлена!", {
          description: `Подождите, пока админ команды "${team.name}" примет вашу заявку.`,
        });
        push(`/profile/${role}`);
        return;
      }

      if (response.status === 401) {
        toast.error("Войдите в систему, чтобы подавать заявки.");
        replace("/login");
        return;
      }

      if (response.status === 403) {
        toast.error("Нужно быть участником, чтобы подавать заявки.");
        push(`/profile/${role}`);
        return;
      }

      toast.error("Произошла ошибка при отправке заявки.");
    } catch (error) {
      console.error("Error addApplication on TeamInfo: ", error);
      toast.error("Ошибка сети. Проверьте подключение к интернету.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.card}>
      <h4 className={s.name}>{team.name}</h4>
      <div className="grid gap-2 lg:flex lg:justify-between">
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
          <button
            onClick={addApplication}
            className={`${s.join} disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Отправка..."
            ) : (
              <>
                Вступить <LogInIcon />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
