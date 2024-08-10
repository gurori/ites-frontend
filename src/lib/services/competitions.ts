import apiFetch from "../apiFetch";
import type { ICompetition } from "../types/ICompetition";

export default async function getManyCompetitions(competitionsIds: string[]) {
  const competitions: ICompetition[] | undefined = await apiFetch(
    `/api/Competitions/get/many?ids=${competitionsIds?.join("&ids=")}`
  ).then(async (res) => {
    if (res.ok) return await res.json();
    return undefined;
  });

  return competitions;
}
