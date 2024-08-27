import type { IUser } from "./IUser";

export interface ITeam {
    id: string;
    name: string;
    description: string;
    members: IUser[]
    membersIds?: string[];
    adminId: string;
}

export type TeamProp = {
    team: ITeam
}

export type TeamsProp = {
    teams: ITeam[]
}