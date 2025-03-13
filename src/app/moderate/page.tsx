import apiFetch from "@/lib/apiFetch";
import { getToken } from "@/lib/services/user";
import type { IOrder } from "@/lib/types/IOrder";
import type { ITeam } from "@/lib/types/ITeam";
import { redirect } from "next/navigation";
import TeamList from "./TeamList";
import OrderList from "./OrderList";

export default async function ModeratePage() {
  const token = await getToken();
  if (!token) redirect("/login");
  const res = await apiFetch("/api/moders", {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if ([403, 401].includes(res.status)) redirect("/");
  const data: { teams: ITeam[]; orders: IOrder[] } = await res.json();
  const { orders, teams } = data;
  return (
    <main className="min-h-screen bg-black">
      <div className="container pb-16 space-y-16">
        <div className="pt-10">
          <h2 className="text-white">Команды</h2>
          <hr />
        </div>
        <TeamList teams={teams} token={token.value} />
        <div className="">
          <h2 className="text-white">Заказы</h2>
          <hr />
        </div>
        <OrderList orders={orders} token={token.value} />
      </div>
    </main>
  );
}
