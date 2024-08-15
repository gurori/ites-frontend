import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { getOrganizer } from "@/lib/services/user";
import type { ITab } from "@/lib/types/ITab";
import type { IOrganizer } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import Tabs from "../(tabs)/Tabs";
import Favorites from "../(tabs)/(contents)/Favorites";
import BlackButton from "../(ui)/BlackButton";
import CompetitionsTab from "../(tabs)/(contents)/CompetitionsTab";
import CompetitionsApplicationsTab from "../(tabs)/(contents)/CompetitionsApplicationsTab";

export const revalidate = 10;

export default async function OrganizerProfilePage() {
  const user: IOrganizer = await getOrganizer();
  if (user.role !== "organizer") redirect(`/profile/${user.role}`);

  const tabs: ITab[] = [
    {
      name: "Конурсы",
      content: <CompetitionsTab index={0} competitions={user.competitions} />,
    },
    {
      name: "Заявки",
      content: <CompetitionsApplicationsTab index={1} applications={user.applications} />,
    },
    { name: "Избранное", content: <Favorites index={2} /> },
  ];
  return (
      <div className="container lg:pl-8">
      <ProfileSidePanel user={user} />
        <div className="flex gap-6 py-8 overflow-x-scroll scrollbar-none pl-4">
          <BlackButton href="/competition/new" className="border-purple">
            <p className="text-white text-xl">
              <b>Создать конкурс</b>
            </p>
          </BlackButton>
          <BlackButton href="/main/competitions">
            <p className="text-white text-2xl">Главная</p>
          </BlackButton>
        </div>
        <Tabs tabs={tabs} />
      </div>
  );
}
