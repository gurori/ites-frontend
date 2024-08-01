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

export interface IUserProfileProps {
    user: IUser;
}