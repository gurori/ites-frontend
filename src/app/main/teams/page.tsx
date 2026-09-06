import type { Team as TeamModel } from "@/lib/types/Team";
import MainTabsButtons from "../MainTabsButtons";
import apiFetch from "@/lib/apiFetch";
import Team from "./Team";

export const revalidate = 10;

export default async function MainTeamsPage() {
  const response = await apiFetch("/api/teams");

  if (!response.ok) {
    throw new Error(`Failed to fetch teams: ${response.status}`);
  }

  const teams: TeamModel[] = await response.json();

  return (
    <>
      <MainTabsButtons active="Команды" />
      <div className="pt-8 md:pt-16 grid gap-16">
        {teams.map((team) => (
          <Team team={team} key={team.id} />
        ))}
      </div>
    </>
  );
}
