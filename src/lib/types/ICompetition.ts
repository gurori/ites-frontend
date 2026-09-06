export interface Competition {
  id: string;
  contentInHtml: string;
}

export type CompetitionProp = {
  competition: Competition;
};

export type CompetitionsProp = {
  competitions: Competition[];
};
