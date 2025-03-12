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
import Image from "next/image";
import Link from "next/link";
import JobTitle from "@/components/ui/JobTitle";

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
    query: user.teamId
      ? {
          mode: "invite",
        }
      : null,
  };
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
          teams={user.applicationsForTeams}
        />
      ),
    },
  ];
  return (
    <div className="container mt-5">
      <div className="md:flex gap-8 my-8 grid ">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/api/Files/users/${user.id}/avatar.jpg`}
          alt="avatar"
          width={160}
          height={160}
          className="rounded-full size-[160px]"
        />
        <div className="grid gap-2 place-items-start items-center justify-between">
          <JobTitle title={user.jobTitle || user.role} />
          <p className="flex items-center text-white gap-4 text-2xl">
            {`${user.lastName} ${user.firstName} ${user.middleName}`}
          </p>
          <p className="text-[#a7a7a7]">{user.description}</p>
        </div>
      </div>
      <div className="flex gap-6 pb-8">
        <BlackButton href={teamUrl} className="border-purple">
          <p className="text-white text-2xl">Команда</p>
        </BlackButton>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
