import { getRole, getToken } from "@/lib/services/user";
import CompetitionForm from "./CompetitionForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CreateCompetitionPage() {
  const token = await getToken();

  const role = await getRole(token!);
  if (role !== "organizer") redirect(`/profile/${role}`);

  return <CompetitionForm token={token!.value} />;
}
