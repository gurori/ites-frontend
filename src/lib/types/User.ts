import type {
  CompetitionEntry,
  OrderBid,
  TeamJoinRequest,
} from "./applications";
import type { Competition } from "./Competition";
import type { Order } from "./Order";
import type { Team } from "./Team";
import type { JobTitle } from "./JobTitle";
import type { RoleEng } from "./Role";
import { WithId } from "./WithId";

export type User = WithId<{
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  description?: string;
  jobTitle?: JobTitle;
  role: RoleEng;
}>;

export type Member = User & {
  competitions: Competition[];
  applicationsForCompetitions: Competition[];
  orders: Order[];
  applicationsForOrders: Order[];
  applicationsForTeams: Team[];
  teamId?: string;
  applications: TeamJoinRequest[];
};

export type Organizer = User & {
  competitions: Competition[];
  applications: CompetitionEntry[];
};

export type Client = User & {
  orders: Order[];
  applications: OrderBid[];
};

export type UserProps = {
  user: User;
};

export type UsersProps = {
  users: User[];
};
