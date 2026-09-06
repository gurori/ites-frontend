export interface Competition {
  id: string;
  contentInHtml: string;
}

export type CompetitionProps = {
  competition: Competition;
};

export type CompetitionsProps = {
  competitions: Competition[];
};
