import type { ICompetition } from "./ICompetition";
import type { IOrder } from "./IOrder";
import { ITeam } from "./ITeam";
import type { IUser } from "./IUser";

export interface ICompetitionApplication {
    id: string;
    fromMember: IUser;
    forCompetition: Omit<ICompetition, "organizersIds" | "membersIds">;
}

export interface IOrderApplication {
    id: string;
    fromMember: IUser;
    forOrder: Omit<IOrder, "memberId" | "clientId">;
}

export interface ITeamApplication {
    id: string;
    fromMember: IUser;
}

export type CompetitionApplicationProp = {
    application: ICompetitionApplication
}

export type CompetitionsApplicationsProp = {
    applications: ICompetitionApplication[]
}

export type OrderApplicationProp = {
    application: IOrderApplication
}

export type OrdersApplicationsProp = {
    applications: IOrderApplication[]
}

export type TeamApplicationProp = {
    application: ITeamApplication
}

export type TeamsApplicationsProp = {
    applications: ITeamApplication[]
}