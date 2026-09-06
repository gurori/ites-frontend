import apiFetch from "@/lib/apiFetch";
import { getToken } from "@/lib/services/user";
import type { Order } from "@/lib/types/Order";
import type { Team } from "@/lib/types/Team";
import { redirect } from "next/navigation";
import TeamList from "./TeamList";
import OrderList from "./OrderList";

export default async function ModeratePage() {
  const token = getToken()!;

  const response = await apiFetch("/api/moderation", {
    token,
  });

  if ([403, 401].includes(response.status)) {
    redirect("/login");
  }

  if (!response.ok) {
    console.error(`Failed to fetch data: ${response.status}`);
    redirect("/profile/organizer");
  }

  const data: { teams: Team[]; orders: Order[] } = await response.json();

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
