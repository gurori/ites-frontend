import type { ICompetition } from "./ICompetition";
import type { IOrder } from "./IOrder";
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