import apiFetch from "@/lib/apiFetch";
import { getToken } from "@/lib/services/user";
import type { IOrder } from "@/lib/types/IOrder";
import type { ITeam } from "@/lib/types/ITeam";
import { redirect } from "next/navigation";
import TeamList from "./TeamList";
import OrderList from "./OrderList";

export default async function ModeratePage() {
  const token = getToken()!;

  const response = await apiFetch("/api/moders", {
    token,
  });

  if ([403, 401].includes(response.status)) {
    redirect("/login");
  }

  if (!response.ok) {
    console.error(`Failed to fetch data: ${response.status}`);
    redirect("/profile/organizer")
  }

  const data: { teams: ITeam[]; orders: IOrder[] } = await response.json();

  return (
    <main className="min-h-screen bg-black">
      <div className="container pb-16 space-y-16">
        <div className="pt-10">
          <h2 className="text-white">Команды</h2>
          <hr />
        </div>
        <TeamList teams={data.teams} token={token} />

        <div>
          <h2 className="text-white">Заказы</h2>
          <hr />
        </div>
        <OrderList orders={data.orders} token={token} />
      </div>
    </main>
  );
}
