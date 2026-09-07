import type { User } from "./User";
import type { WithId } from "./WithId";

export type Team = WithId<{
  name: string;
  description: string;
  members: User[];
  membersIds?: string[];
  adminId: string;
}>;

export type TeamProps = {
  team: Team;
};

export type TeamsProps = {
  teams: Team[];
};
