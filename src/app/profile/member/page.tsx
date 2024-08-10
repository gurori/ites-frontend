import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { ITab } from "@/lib/types/ITab";
import type { IMember } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import Tabs from "../(tabs)/Tabs";
import Achievements from "../(tabs)/(contents)/Achievements";
import Favorites from "../(tabs)/(contents)/Favorites";
import Completed from "../(tabs)/(contents)/Completed";
import MyWorks from "../(tabs)/(contents)/MyWorks";
import ApplicationsTab from "../(tabs)/(contents)/ApplicationsTab";
import { getMember } from "@/lib/services/user";
import BlackButton from "../(ui)/BlackButton";
import CompetitionsTab from "../(tabs)/(contents)/CompetitionsTab";

export const revalidate = 10;

export default async function MemberProfilePage() {
  const user: IMember = await getMember();
  if (user.role !== "member") redirect(`/profile/${user.role}`);
  const tabs: ITab[] = [
    { name: "Конкурсы", content: <CompetitionsTab index={0} competitions={user.competitions} /> },
    { name: "Заявки", content: <ApplicationsTab index={2} competitions={user.applicationsForCompetitions} /> },
    { name: "Избранное", content: <Favorites index={3} /> },
    { name: "Достижения", content: <Achievements index={4} /> },
  ];
  return (
    <>
      <ProfileSidePanel user={user} />
      <div className="container mt-5">
        <div className="flex gap-6 py-8">

      <BlackButton href="/main/competitions">
            <p className="text-white text-2xl">Главная</p>
          </BlackButton>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}
