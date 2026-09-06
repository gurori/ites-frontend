import apiFetch from "@/lib/apiFetch";
import type { Team } from "@/lib/types/Team";
import { notFound } from "next/navigation";
import TeamInfo from "./TeamInfo";
import { getRole, getToken } from "@/lib/services/user";

export default async function TeamInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const token = getToken("auth", null);
  const role = getRole(null);

  const response = await apiFetch(`/api/teams/${id}`);

  if (response.status === 404) {
    return notFound();
  }

  if (!response.ok) {
    console.error("Failed to fetch team:", response.status);
    throw new Error(`Failed to fetch team with status ${response.status}`);
  }

  const team: Team = await response.json();

  return <TeamInfo team={team} token={token} role={role} />;
}
