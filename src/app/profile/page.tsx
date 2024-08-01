import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import apiFetch from "@/lib/apiFetch";

export default async function ProfilePageProvider() {
  const token = cookies().get("auth");
  if (!token) redirect("/login");

  const role = await apiFetch("/api/user/role", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (res) => {
    if ([401, 404, 204].includes(res.status)) redirect("/login");
    return await res.text();
  });
  redirect(`/profile/${role}`);
}
