import { redirect } from "next/navigation";
import { getRole, getToken } from "@/lib/services/user";
import { cookies } from "next/headers";

export default async function ProfilePageProvider() {
  const roleCookie = cookies().get("role");
  if(roleCookie)
    redirect(`/profile/${roleCookie.value}`);

  const token = await getToken();
  const role = await getRole(token!);

  cookies().set("role", role);
  redirect(`/profile/${role}`);
}
