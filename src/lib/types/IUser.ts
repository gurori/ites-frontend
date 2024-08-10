import { ICompetitionApplication } from "./IApplication";
import { ICompetition } from "./ICompetition";
import { type JobTitle } from "./JobTitle";
import { type RoleEng } from "./Role";

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
}

export interface IOrganizer extends IUser {
    competitions: ICompetition[];
    applications: ICompetitionApplication[] 
}

export type UserProp = {
    user: IUser;
}

export type UsersProp = {
    users: IUser[];
}