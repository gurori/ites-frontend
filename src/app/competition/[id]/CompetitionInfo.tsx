"use client";

import apiFetch from "@/lib/apiFetch";
import type { CompetitionProp } from "@/lib/types/ICompetition";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CompetitionInfo({
  competition,
  token,
}: Readonly<CompetitionProp & { token: string }>) {
  const { push, replace } = useRouter();

  const addApplication = async () => {
    try {
      const response = await apiFetch(
        `/api/Competitions/application/${competition.id}`,
        {
          method: "PUT",
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
        replace("/profile");
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
    }
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: competition.contentInHtml }} />

      <button className="flash purple mt-8" onClick={addApplication}>
        Отправить заявку
      </button>
    </>
  );
}
