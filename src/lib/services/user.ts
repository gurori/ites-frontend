import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import apiFetch from "../apiFetch";
import { type IUser } from "../types/IUser";

export const getUserData = async () => {
  const token = cookies().get("auth");
  if (!token) redirect("/login");
  const user: IUser = await apiFetch("/api/User/profile", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if ([401, 404, 204].includes(res.status)) redirect("/login");
    return await res.json();
  });
  return user;
};
