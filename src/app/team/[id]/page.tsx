import apiFetch from "@/lib/apiFetch";
import type { ITeam } from "@/lib/types/ITeam";
import { notFound } from "next/navigation";
import TeamInfo from "./TeamInfo";
import { getToken } from "@/lib/services/user";

export default async function TeamInfoPage({
  params,
}: {
  params: { id: string };
}) {
    const token = await getToken();
  const team: ITeam = await apiFetch(`/api/teams/${params.id}`).then(
    async (r) => {
      if (r.status === 404) return notFound();
      return await r.json();
    }
  );
  return <TeamInfo team={team} token={token!.value} />;
}
