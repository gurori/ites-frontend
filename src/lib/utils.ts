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

export function getHtmlTags(htmlString: string, count: number) {
  console.log(htmlString);
  
    const regex = /<([a-z][^>]*)>([\s\S]*?)<\/\1>/gi; // Use [\s\S] to match any character including new lines
    const matches = [];
    let match;

    while ((match = regex.exec(htmlString)) !== null && matches.length < count) {
        matches.push(match[0]); // Store the matched tag with content
    }
    console.log(matches.join(''));
    
    return matches.join(''); // Return the concatenated tags with content
}
