import { getRole, getToken } from "@/lib/services/user";
import TeamForm from "./TeamForm";
import { redirect } from "next/navigation";

export default async function NewTeamPage() {
    const token = await getToken();
    const role = await getRole(token!);
    if (role !== "member") redirect(`/profile/${role}`);

    return <TeamForm token={token!.value} />;
  }
  