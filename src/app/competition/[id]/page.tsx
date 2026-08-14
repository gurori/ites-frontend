import apiFetch from "@/lib/apiFetch";
import { ICompetition } from "@/lib/types/ICompetition";
import { notFound } from "next/navigation";
import CompetitionInfo from "./CompetitionInfo";
import { getToken } from "@/lib/services/user";
import InfoCard from "@/components/info-card/InfoCard";

export default async function CompetitionInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const competition: ICompetition = await apiFetch(
    `/api/competitions/get/${params.id}`,
    {
      cache: "no-store",
    },
  ).then(async (res) => {
    if (res.status === 404) notFound();
    return await res.json();
  });

  const token = getToken()!;

  return (
    <InfoCard type="competition">
      <CompetitionInfo competition={competition} token={token} />
    </InfoCard>
  );
}
