import type { User } from "./User";

export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
  membersIds?: string[];
  adminId: string;
}

export type TeamProps = {
  team: Team;
};

export type TeamsProps = {
  teams: Team[];
};
