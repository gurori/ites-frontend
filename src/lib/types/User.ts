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

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  description?: string;
  jobTitle?: JobTitle;
  role: RoleEng;
}

export interface Member extends User {
  competitions: Competition[];
  applicationsForCompetitions: Competition[];
  orders: Order[];
  applicationsForOrders: Order[];
  applicationsForTeams: Team[];
  teamId?: string;
  applications: ITeamApplication[];
}

export interface Organizer extends User {
  competitions: Competition[];
  applications: ICompetitionApplication[];
}

export interface Client extends User {
  orders: Order[];
  applications: IOrderApplication[];
}

export type UserProps = {
  user: User;
};

export type UsersProps = {
  users: User[];
};
