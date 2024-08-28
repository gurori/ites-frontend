import type { ITeam } from "@/lib/types/ITeam";
import MainTabsButtons from "../MainTabsButtons";
import apiFetch from "@/lib/apiFetch";
import Team from "./Team";

export const revalidate = 10;

export default async function MainTeamsPage() {
    async function getTeams() {
        const teams: ITeam[] = await apiFetch(
          "/api/teams"
        ).then(async (res) => await res.json());
        return teams;
      }
      const teams = await getTeams();
    return (
        <>
        <MainTabsButtons active="Команды" />
        <div className="pt-16 grid gap-16">
        {teams.map(t => (
          <Team team={t} key={t.id} />
        ))}
      </div>
        </>
    )
}