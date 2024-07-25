import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type RoleEng, type Role } from "./types/Role";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoleEng(role: Role): RoleEng {
  const roles: { [key: string]: RoleEng } = {
    Участник: "Member",
    Заказчик: "Client",
    Организатор: "Organizer",
  };

  return roles[role] ?? "Member";
}
