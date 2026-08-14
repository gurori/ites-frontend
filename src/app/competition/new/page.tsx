import { getRole, getToken } from "@/lib/services/user";
import CompetitionForm from "./CompetitionForm";
import { redirect } from "next/navigation";

export default async function CreateCompetitionPage() {
  const token = getToken();
  const role = getRole();

  if (role !== "organizer") redirect(`/profile/${role}`);

  return <CompetitionForm token={token!} />;
}
