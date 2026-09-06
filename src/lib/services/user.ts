import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { rolesEng } from "../constants";

import type { Client, Member, Organizer, User } from "../types/User";
import type { RoleEng } from "../types/Role";
import { fetchServerApi } from "./fetchServerApi";

export const setToken = (value: string, name = "auth") => {
  const cookieStorage = cookies();
  cookieStorage.set(name, value);
};

export const getToken = (
  name = "auth",
  redirectUrl: string | null = "/login",
) => {
  const cookieStorage = cookies();
  const token = cookieStorage.get(name)?.value;

  if (!token) {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
    return null;
  }

  return token;
};

export const getMember = (id?: string) =>
  fetchServerApi<Member>(`/api/users/member/${id ? `${id}` : "me"}`);

export const getOrganizer = (id?: string) =>
  fetchServerApi<Organizer>(`/api/users/organizer/${id ? `${id}` : "me"}`);

export const getClient = (id?: string) =>
  fetchServerApi<Client>(`/api/users/client/${id ? `${id}` : "me"}`);

export const getRole = (redirectUrl: string | null = "/login") => {
  const cookieStorage = cookies();
  const role = cookieStorage.get("role")?.value as RoleEng | undefined;

  if (role && rolesEng.includes(role)) {
    return role;
  }

  if (redirectUrl) redirect(redirectUrl);

  return null;
};

export const setRole = (value: RoleEng, name = "role") => {
  const cookieStorage = cookies();
  cookieStorage.set(name, value);
};
