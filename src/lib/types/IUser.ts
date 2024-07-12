import { type JobTitle } from "./JobTitle";
import { type Role } from "./Role";

export interface IUser {
    id: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
    email: string;
    description?: string;
    jobTitle?: JobTitle;
    role: Role;
};

export interface IUserProfileProps {
    user: IUser;
}