export interface IUser {
    id: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
    email: string;
    description?: string;
    jobTitle?: string;
    role: string;
};

export interface IUserProfileProps {
    user: IUser;
}