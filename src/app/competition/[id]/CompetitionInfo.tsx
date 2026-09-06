"use client";

import { useState } from "react";
import apiFetch from "@/lib/apiFetch";
import type { CompetitionProp } from "@/lib/types/ICompetition";
import type { RoleEng } from "@/lib/types/Role";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CompetitionInfo({
  competition,
  token,
  role,
}: Readonly<CompetitionProp & { token: string | null; role: RoleEng | null }>) {
  const { push, replace } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addApplication = async () => {
    if (!token) {
      replace("/login");
      return;
    }

    if (role !== "member") {
      toast.error("Нужно быть участником, чтобы подавать заявки.");
      replace(`/profile/${role || ""}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch(
        `/api/competitions/${competition.id}/entries`,
        {
          method: "POST",
          token, 
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        toast.success("Ваша заявка успешно отправлена!");
        push("/main/competitions");
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
      console.error(`Error addApplication on CompetitionInfo: `, error);
      toast.error("Ошибка сети. Проверьте подключение к интернету.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: competition.contentInHtml }} />

      {
        !token ? (
          <button className="flash purple mt-8" onClick={() => push("/login")}>
            Войти, чтобы откликнуться
          </button>
        ) : role === "member" ? (
          <button
            className="flash purple mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={addApplication}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </button>
        ) : null
      }
    </>
  );
}
