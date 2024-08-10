import { redirect } from "next/navigation";
import { getRole, getToken } from "@/lib/services/user";
import { cookies } from "next/headers";

export default async function ProfilePageProvider() {
  const token = await getToken();

  const role = await getRole(token!);
  redirect(`/profile/${role}`);
}
