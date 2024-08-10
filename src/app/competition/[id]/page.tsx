import InfoCard from "@/components/info-card/InfoCard";
import apiFetch from "@/lib/apiFetch";
import dateFormat from "@/lib/dateFormat";
import { ICompetition } from "@/lib/types/ICompetition";
import { notFound } from "next/navigation";
import CompetitionInfo from "./CompetitionInfo";
import { getToken } from "@/lib/services/user";

export default async function CompetitionInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const competition: ICompetition = await apiFetch(
    `/api/competitions/get/${params.id}`
  ).then(async (res) => {
    if (res.status === 404) notFound();
    return await res.json();
  });
  const token = await getToken();
  return (
    <CompetitionInfo competition={competition} token={token!.value} />
  );
}
