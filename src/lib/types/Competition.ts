import type { WithId } from "./WithId";

export type Competition = WithId<{
  title: string;
  contentInHtml: string;
}>;

export type CompetitionSummary = Pick<Competition, "id" | "title">;

export type CompetitionProps = {
  competition: Competition;
};

export type CompetitionsProps = {
  competitions: CompetitionSummary[];
};
