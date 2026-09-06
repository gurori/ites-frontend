import type {
  ICompetitionApplication,
  IOrderApplication,
  ITeamApplication,
} from "./IApplication";
import type { Competition } from "./Competition";
import type { Order } from "./Order";
import type { Team } from "./Team";
import type { JobTitle } from "./JobTitle";
import type { RoleEng } from "./Role";

export interface IUser {
  id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  description?: string;
  jobTitle?: JobTitle;
  role: RoleEng;
}

export interface IMember extends IUser {
  competitions: Competition[];
  applicationsForCompetitions: Competition[];
  orders: Order[];
  applicationsForOrders: Order[];
  applicationsForTeams: Team[];
  teamId?: string;
  applications: ITeamApplication[];
}

export interface IOrganizer extends IUser {
  competitions: Competition[];
  applications: ICompetitionApplication[];
}

export interface IClient extends IUser {
  orders: Order[];
  applications: IOrderApplication[];
}

export type UserProp = {
  user: IUser;
};

export type UsersProp = {
  users: IUser[];
};
