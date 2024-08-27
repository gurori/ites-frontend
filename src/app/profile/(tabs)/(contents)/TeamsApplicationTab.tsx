import type { TeamsApplicationsProp } from "@/lib/types/IApplication";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import { getToken } from "@/lib/services/user";
import { UserForTeamInfo } from "./ui/UserInfoCard";

export default async function TeamsApplicationTab({
    applications,
    index,
  }: Readonly<Partial<TeamsApplicationsProp> & { index: number }>) {
    const token = await getToken();
    return (
      <>
        {applications && applications.length !== 0 ? (
          <div className="flex flex-wrap gap-8">
            {applications.map((a) => (
              <UserForTeamInfo application={a} token={token!.value} key={a.id} />
            ))}
          </div>
        ) : (
          <ThereIsNothingMessage index={index} />
        )}
      </>
    );
  }