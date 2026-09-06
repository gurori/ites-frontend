import { Tab } from "@/lib/types/Tab";
import type { Member } from "@/lib/types/User";
import { redirect } from "next/navigation";
import { getMember } from "@/lib/services/user";
import ApplicationsTab from "../../(tabs)/(contents)/ApplicationsTab";
import Tabs from "../../(tabs)/Tabs";
import CompetitionsTab from "../../(tabs)/(contents)/CompetitionsTab";
import BlackButton from "../../(ui)/BlackButton";
import OrdersTab from "../../(tabs)/(contents)/OrdersTab";
import Image from "next/image";
import JobTitle from "@/components/ui/JobTitle";

export const revalidate = 10;

interface PageProps {
  params: { id: string };
}

export default async function MemberProfilePage({ params }: PageProps) {
  const { id } = params;
  const user: Member = await getMember(id);

  if (user.role !== "member") {
    redirect(`/profile/${user.role}`);
  }

  const teamUrl = {
    pathname: `/team/${user.teamId || "new"}`,
    ...(user.teamId ? { query: { mode: "invite" } } : {}),
  };

  const fullName = [user.lastName, user.firstName, user.middleName]
    .filter(Boolean)
    .join(" ");

  const tabs: Tab[] = [
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
      <div className="md:flex gap-8 my-8 grid">
        <Image
          src={`/api/external/files/users/${user.id}/avatar`}
          alt="avatar"
          width={160}
          height={160}
          className="rounded-full size-[160px] place-self-center"
        />
        <div className="grid gap-2 place-items-start items-center justify-center">
          <JobTitle
            title={user.jobTitle || user.role}
            className="place-self-center md:place-self-start"
          />
          <p className="flex items-center text-white gap-4 text-2xl place-self-center md:place-self-start">
            {fullName}
          </p>
          {user.description && (
            <p className="text-[#a7a7a7] place-self-center md:place-self-start">
              {user.description}
            </p>
          )}
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
