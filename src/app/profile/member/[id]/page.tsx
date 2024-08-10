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

export const revalidate = 10;

export default async function MemberProfilePage({
    params,
  }: {
    params: { id: string };
  }) {
  const user: IMember = await getMember(params.id);
  if (user.role !== "member") redirect(`/profile/${user.role}`);
  const tabs: ITab[] = [
    { name: "Мои работы", content: <MyWorks index={0} /> },
    { name: "Конкурсы", content: <CompetitionsTab index={1} competitions={user.competitions} /> },
    { name: "Выполненное", content: <Completed index={2} /> },
    { name: "Достижения", content: <Achievements index={3} /> },
  ];
  return (
    <>
      <ProfileSidePanel user={user} onlyInfo />
      <div className="container mt-5">
        <div className="flex gap-6 py-8">
        </div>
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}
