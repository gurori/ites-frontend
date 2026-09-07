import type { TeamJoinRequestsProps } from "@/lib/types/applications";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import { getToken } from "@/lib/services/user";
import { UserForTeamInfo } from "./ui/UserInfoCard";

export default async function TeamsApplicationTab({
  teamJoinRequests: applications,
  index,
}: Readonly<Partial<TeamJoinRequestsProps> & { index: number }>) {
  const token = getToken()!;
  return (
    <>
      {applications && applications.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {applications.map((a) => (
            <UserForTeamInfo teamJoinRequest={a} token={token} key={a.id} />
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
