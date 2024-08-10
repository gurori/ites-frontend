import type { CompetitionsApplicationsProp } from "@/lib/types/IApplication";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import UserInfoCard from "./ui/UserInfoCard";
import { getToken } from "@/lib/services/user";

export default async function MembersApplicationsTab({
  applications,
  index,
}: Readonly<Partial<CompetitionsApplicationsProp> & { index: number }>) {
  const token = await getToken();
  return (
    <>
      {applications && applications.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {applications.map((a) => (
            <UserInfoCard application={a} token={token!.value}  key={a.id} />
          ))}
        </div>
      ) : (<ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
