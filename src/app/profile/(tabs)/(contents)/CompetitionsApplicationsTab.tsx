import type { CompetitionsApplicationsProp } from "@/lib/types/IApplication";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import { UserForCompetitionInfo } from "./ui/UserInfoCard";
import { getToken } from "@/lib/services/user";

export default async function CompetitionsApplicationsTab({
  applications,
  index,
}: Readonly<Partial<CompetitionsApplicationsProp> & { index: number }>) {
  const token = await getToken();
  return (
    <>
      {applications && applications.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {applications.map((a) => (
            <UserForCompetitionInfo
              application={a}
              token={token!.value}
              key={a.id}
            />
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
