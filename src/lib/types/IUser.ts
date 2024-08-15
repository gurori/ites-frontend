import type { ICompetitionApplication, IOrderApplication } from "./IApplication";
import type { ICompetition } from "./ICompetition";
import type { IOrder } from "./IOrder";
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
};

export interface IMember extends IUser {
    competitions: ICompetition[]
    applicationsForCompetitions: ICompetition[]
    orders: IOrder[];
    applicationsForOrders: IOrder[]
}

export interface IOrganizer extends IUser {
    competitions: ICompetition[];
    applications: ICompetitionApplication[] 
}

export interface IClient extends IUser {
    orders: IOrder[];
    applications: IOrderApplication[] 
}

export type UserProp = {
    user: IUser;
}

export type UsersProp = {
    users: IUser[];
}