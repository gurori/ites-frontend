import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { getOrganizer } from "@/lib/services/user";
import type { Tab } from "@/lib/types/Tab";
import type { Organizer } from "@/lib/types/User";
import { redirect } from "next/navigation";
import Tabs from "../(tabs)/Tabs";
import Favorites from "../(tabs)/(contents)/Favorites";
import BlackButton from "../(ui)/BlackButton";
import CompetitionsTab from "../(tabs)/(contents)/CompetitionsTab";
import CompetitionsApplicationsTab from "../(tabs)/(contents)/CompetitionsApplicationsTab";
import PurpleButton from "../(ui)/PurpleButton";
import Link from "next/link";

export default async function OrganizerProfilePage() {
  const user: Organizer = await getOrganizer();
  if (user.role !== "organizer") redirect(`/profile/${user.role}`);

  const tabs: Tab[] = [
    {
      name: "Конурсы",
      content: <CompetitionsTab index={0} competitions={user.competitions} />,
    },
    {
      name: "Заявки",
      content: (
        <CompetitionsApplicationsTab
          index={1}
          applications={user.applications}
        />
      ),
    },
    { name: "Избранное", content: <Favorites index={2} /> },
  ];
  return (
    <div className="container mt-5 lg:pl-8">
      <ProfileSidePanel user={user} />
      <div className="grid md:flex gap-6 py-8 items-start">
        <BlackButton href="/main/competitions">
          <p className="text-white text-2xl">
            <b>Главная</b>
          </p>
        </BlackButton>
        <BlackButton href="/competition/new" className="border-purple">
          <p className="text-white text-2xl">Создать конкурс</p>
        </BlackButton>
        <Link href="/moderate">
          <PurpleButton>
            <b>
              <p className="text-white text-2xl">Модерация</p>
            </b>
          </PurpleButton>
        </Link>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
