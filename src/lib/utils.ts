import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type RoleEng, type Role } from "./types/Role";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoleEng(role: Role): RoleEng {
  const roles: { [key: string]: RoleEng } = {
    Участник: "member",
    Заказчик: "client",
    Организатор: "organizer",
  };

  return roles[role] ?? "member";
}

export function getRoleRus(role: RoleEng): Role {
  const roles: { [key: string]: Role } = {
    member: "Участник",
    client: "Заказчик",
    organizer: "Организатор",
  };

  return roles[role] ?? "Участник";
}
