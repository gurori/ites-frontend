import apiFetch from "@/lib/apiFetch";
import type { Competition } from "@/lib/types/Competition";
import { notFound } from "next/navigation";
import CompetitionInfo from "./CompetitionInfo";
import { getRole, getToken } from "@/lib/services/user";
import InfoCard from "@/components/info-card/InfoCard";

export default async function CompetitionInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await apiFetch(`/api/competitions/${params.id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch competition: ${response.status}`);
  }

  const competition: Competition = await response.json();

  const token = getToken("auth", null);
  const role = getRole(null);

  return (
    <InfoCard type="competition">
      <CompetitionInfo competition={competition} token={token} role={role} />
    </InfoCard>
  );
}
