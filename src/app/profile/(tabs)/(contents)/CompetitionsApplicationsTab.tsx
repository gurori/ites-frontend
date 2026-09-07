import type { CompetitionEntriesProps } from "@/lib/types/IApplication";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import { UserForCompetitionInfo } from "./ui/UserInfoCard";
import { getToken } from "@/lib/services/user";

export default async function CompetitionsApplicationsTab({
  entries: applications,
  index,
}: Readonly<Partial<CompetitionEntriesProps> & { index: number }>) {
  const token = getToken()!;
  return (
    <>
      {applications && applications.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {applications.map((a) => (
            <UserForCompetitionInfo entry={a} token={token} key={a.id} />
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
