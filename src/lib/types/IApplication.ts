import type { Competition } from "./Competition";
import type { Order } from "./Order";
import { Team } from "./Team";
import type { User } from "./User";

export interface ICompetitionApplication {
  id: string;
  fromMember: User;
  forCompetition: Omit<Competition, "organizersIds" | "membersIds">;
}

export interface IOrderApplication {
  id: string;
  fromMember: User;
  forOrder: Omit<Order, "memberId" | "clientId">;
}

export interface ITeamApplication {
  id: string;
  fromMember: User;
}

export type CompetitionApplicationProp = {
  application: ICompetitionApplication;
};

export type CompetitionsApplicationsProp = {
  applications: ICompetitionApplication[];
};

export type OrderApplicationProp = {
  application: IOrderApplication;
};

export type OrdersApplicationsProp = {
  applications: IOrderApplication[];
};

export type TeamApplicationProp = {
  application: ITeamApplication;
};

export type TeamsApplicationsProp = {
  applications: ITeamApplication[];
};
