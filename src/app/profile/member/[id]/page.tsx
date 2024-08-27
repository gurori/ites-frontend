import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { ITab } from "@/lib/types/ITab";
import type { IMember } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import { getMember } from "@/lib/services/user";
import MyWorks from "../../(tabs)/(contents)/MyWorks";
import Completed from "../../(tabs)/(contents)/Completed";
import ApplicationsTab from "../../(tabs)/(contents)/ApplicationsTab";
import Favorites from "../../(tabs)/(contents)/Favorites";
import Achievements from "../../(tabs)/(contents)/Achievements";
import Tabs from "../../(tabs)/Tabs";
import CompetitionsTab from "../../(tabs)/(contents)/CompetitionsTab";
import BlackButton from "../../(ui)/BlackButton";
import { Url } from "next/dist/shared/lib/router/router";
import OrdersTab from "../../(tabs)/(contents)/OrdersTab";

export const revalidate = 10;

export default async function MemberProfilePage({
    params,
  }: {
    params: { id: string };
  }) {
  const user: IMember = await getMember(params.id);
  if (user.role !== "member") redirect(`/profile/${user.role}`);
  const teamUrl: Url = {
    pathname: `/team/${user.teamId || "new"}`,
    query: user.teamId ? {
      mode: "invite"
    } : null
  }
  const tabs: ITab[] = [
    {
      name: "Конкурсы",
      content: <CompetitionsTab index={0} competitions={user.competitions} />,
    },
    {
      name: "Заказы",
      content: <OrdersTab index={1} orders={user.orders} />,
    },
    {
      name: "Заявки",
      content: (
        <ApplicationsTab
          index={2}
          competitions={user.applicationsForCompetitions}
          orders={user.applicationsForOrders}
          teams={user.ApplicationsForTeams}
        />
      ),
    },
  ];
  return (
      <div className="container mt-5">
      <ProfileSidePanel user={user} onlyInfo />
      <div className="flex gap-6 py-8 overflow-x-scroll scrollbar-none pl-4">
          <BlackButton href={teamUrl} className="border-purple">
            <p className="text-white text-2xl">Команда</p>
          </BlackButton>
        </div>
        <Tabs tabs={tabs} />
      </div>
  );
}
