import { redirect } from "next/navigation";
import { getRole, getToken } from "@/lib/services/user";
import { getCookie, setCookie } from "../actions";

export default async function ProfilePageProvider() {
  const roleCookie = await getCookie("role");
  if(roleCookie)
    redirect(`/profile/${roleCookie.value}`);

  const token = await getToken();
  const role = await getRole(token!);

  setCookie("role", role);
  redirect(`/profile/${role}`);
}
