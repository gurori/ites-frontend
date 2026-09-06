import apiFetch from "@/lib/apiFetch";
import MainTabsButtons from "../MainTabsButtons";
import type { Competition } from "@/lib/types/Competition";
import Competition from "./Competition";

export const revalidate = 10;

export default async function CompetitionsPage() {
  const response = await apiFetch("/api/competitions");

  if (!response.ok) {
    throw new Error(`Failed to fetch competitions: ${response.status}`);
  }

  const competitions: Competition[] = await response.json();

  return (
    <>
      <MainTabsButtons active="Конкурсы" />
      <div className="pt-8 md:pt-16 grid gap-16">
        {competitions.map((competition) => (
          <Competition competition={competition} key={competition.id} />
        ))}
      </div>
    </>
  );
}
