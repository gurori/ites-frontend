import type { ICompetition } from "./ICompetition";
import type { IUser } from "./IUser";

export interface ICompetitionApplication {
    id: string;
    fromMember: IUser;
    forCompetition: Omit<ICompetition, "organizersIds" | "membersIds">;
}

export type CompetitionApplicationProp = {
    application: ICompetitionApplication
}

export type CompetitionsApplicationsProp = {
    applications: ICompetitionApplication[]
}