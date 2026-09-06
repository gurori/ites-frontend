import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { rolesEng } from "../constants";

import type { IClient, IMember, IOrganizer, IUser } from "../types/IUser";
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

export const getUserData = () => fetchServerApi<IUser>("/api/user/profile");

export const getMember = (id?: string) =>
  fetchServerApi<IMember>(`/api/user/member${id ? `/${id}` : ""}`);

export const getOrganizer = () =>
  fetchServerApi<IOrganizer>("/api/user/organizer");

export const getClient = () => fetchServerApi<IClient>("/api/user/client");

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
