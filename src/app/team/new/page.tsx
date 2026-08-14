import { getRole, getToken } from "@/lib/services/user";
import TeamForm from "./TeamForm";
import { redirect } from "next/navigation";

export default async function NewTeamPage() {
    const token = getToken()!;
    const role = getRole()!;

    if (role !== "member") redirect(`/profile/${role}`);

    return <TeamForm token={token} />;
  }
  