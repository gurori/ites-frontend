export interface ICompetition {
  id: string;
  contentInHtml: string;
  // title: string;
  // description: string;
  // startDate: string;
  // endDate: string;
  membersIds: string[];
  organizersIds: string[];
}

export type CompetitionProp = {
  competition: ICompetition;
};

export type CompetitionsProp = {
  competitions: ICompetition[];
};
