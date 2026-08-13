import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import apiFetch from "../apiFetch";
import { rolesEng } from "../constants";

import type { IClient, IMember, IOrganizer, IUser } from "../types/IUser";
import type { RoleEng } from "../types/Role";
import { fetchServerApi } from "./fetchServerApi";

export const setToken = (value: string, name = "auth") => {
  const cookieStorage = cookies();
  cookieStorage.set(name, value)
}

export const getToken = (
  name = "auth",
  redirectUrl: string | undefined = "/login",
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

export const getManyUsers = async (ids: string[]): Promise<IUser[]> => {
  if (!ids || ids.length === 0) {
    return [];
  }

  const token = getToken() ?? undefined;
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("ids", id));

  const response = await apiFetch(
    `/api/user/profile/many?${params.toString()}`,
    {
      token,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    return (await response.json()) as IUser[];
  }

  return [];
};

export const getRole = async () => {
  const cookieStorage = cookies();
  const role = cookieStorage.get("role")?.value as RoleEng | undefined;

  if (role && rolesEng.includes(role)) {
    return role;
  }

  redirect("/login");
};

export const setRole = (value: RoleEng, name = "role") => {
  const cookieStorage = cookies();
  cookieStorage.set(name, value);
};
