import type { IUser } from "./IUser";

export interface Team {
  id: string;
  name: string;
  description: string;
  members: IUser[];
  membersIds?: string[];
  adminId: string;
}

export type TeamProps = {
  team: Team;
};

export type TeamsProps = {
  teams: Team[];
};
