"use client";

import InfoCard from "@/components/info-card/InfoCard";
import apiFetch from "@/lib/apiFetch";
import { dateFormat } from "@/lib/format";
import type { CompetitionProp } from "@/lib/types/ICompetition";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default async function CompetitionInfo({
  competition,
  token,
}: Readonly<CompetitionProp & { token: string }>) {
  const start = dateFormat(competition.startDate);
  const end = dateFormat(competition.endDate);
  const { push } = useRouter();
  const addApplication = async () => {
    await apiFetch(
      `/api/Competitions/application/${competition.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (res) => {
      if (res.ok) {
        toast("Ваша заявка успешно отправлена!");
        push("/main/competitions");
      } else if (res.status === 403) {
        toast("Нужно быть участником, чтобы подавать заявки");
        push("/profile");
      } else push("/login");
    });
  };
  return (
    <InfoCard type="competition">
      <h6>{competition.title}</h6>
      <p className="pt-2">
        <b>
          С {start} по {end}
        </b>
      </p>
      <p className="py-10">{competition.description}</p>
      <button className="flash purple" onClick={addApplication}>
        Отправить заявку
      </button>
    </InfoCard>
  );
}
