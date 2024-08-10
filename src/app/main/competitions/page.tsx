import apiFetch from "@/lib/apiFetch";
import MainTabsButtons from "../MainTabsButtons";
import type { ICompetition } from "@/lib/types/ICompetition";
import Competition from "./Competition";

export const revalidate = 10;

export default async function CompetitionsPage() {
  async function getCompetitions() {
    const competitions: ICompetition[] = await apiFetch(
      "/api/competitions/get"
    ).then(async (res) => await res.json());
    return competitions;
  }
  const competitions = await getCompetitions();
  return (
    <>
      <MainTabsButtons active="Конкурсы" />
      <div className="pt-16 grid gap-16">
        {competitions.map((c) => (
          <Competition competition={c} key={c.id} />
        ))}
      </div>
    </>
  );
}
