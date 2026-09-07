import type { OrderBidsProps } from "@/lib/types/applications";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import { UserForOrderInfo } from "./ui/UserInfoCard";
import { getToken } from "@/lib/services/user";

export default async function OrdersApplicationsTab({
  bids: applications,
  index,
}: Readonly<Partial<OrderBidsProps> & { index: number }>) {
  const token = getToken()!;
  return (
    <>
      {applications && applications.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {applications.map((a) => (
            <UserForOrderInfo bid={a} token={token} key={a.id} />
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
