import type { OrdersApplicationsProp } from "@/lib/types/IApplication";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import { UserForOrderInfo } from "./ui/UserInfoCard";
import { getToken } from "@/lib/services/user";

export default async function OrdersApplicationsTab({
  applications,
  index,
}: Readonly<Partial<OrdersApplicationsProp> & { index: number }>) {
  const token = await getToken();
  return (
    <>
      {applications && applications.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {applications.map((a) => (
            <UserForOrderInfo application={a} token={token!.value} key={a.id} />
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
