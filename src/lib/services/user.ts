import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import apiFetch from "../apiFetch";

import type { IClient, IMember, IOrganizer, IUser } from "../types/IUser";
import type { RoleEng } from "../types/Role";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getCookie } from "@/app/actions";

export const getUserData = async () => {
  const token = await Promise.resolve(cookies().get("auth"));
  if (!token) redirect("/login");
  const user: IUser = await apiFetch("/api/User/profile", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if ([401, 404, 204, 403].includes(res.status)) redirect("/login");
    return await res.json();
  });
  return user;
};

export const getMember = async (id?: string) => {
  const token = await getToken();
  if (!token) redirect("/login");
  const user: IMember = await apiFetch(`/api/User/member${id ? `/${id}`:""}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if ([401, 404, 204, 403].includes(res.status)) redirect("/login");
    return await res.json();
  });
  return user;
};
export const getOrganizer = async () => {
  const token = await getToken()
  if (!token) redirect("/login");
  const user: IOrganizer = await apiFetch("/api/User/organizer", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if ([401, 404, 204, 403].includes(res.status)) redirect("/login");
    return await res.json();
  });
  return user;
};
export const getClient = async () => {
  const token = await getToken()
  if (!token) redirect("/login");
  const user: IClient = await apiFetch("/api/User/client", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    console.log(res)
    if ([401, 404, 204, 403].includes(res.status)) redirect("/login");
    return await res.json();
  });
  console.log(user)
  return user;
};

export const getManyUsers = async (ids: string[]) => {
  const token = cookies().get("auth");
  if (!token) redirect("/login");
  const users: IUser[] | undefined = await apiFetch(`/api/User/profile/many?ids=${ids?.join("&ids=")}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if (res.ok) return await res.json();
    return undefined;
  });
  return users;
};

export const getRole = async (token: RequestCookie) => {
  const roleCookie = await getCookie("role");
  if(roleCookie)
    return roleCookie.value;
  const role = await apiFetch("/api/user/role", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if ([401, 404, 204].includes(res.status)) redirect("/login");
    return (await res.text()) as RoleEng;
  });
  return role;
};

export const getToken = async (
  name = "auth",
  isRedirect = true,
  redirectUrl = "/login"
) => {
  if(!cookies().has(name) && isRedirect)
    redirect(redirectUrl)

  const token = cookies().get(name);
  return token;
};
