import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { ITab } from "@/lib/types/ITab";
import { IUser } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import Tabs from "../(tabs)/Tabs";
import Achievements from "../(tabs)/(contents)/Achievements";
import Favorites from "../(tabs)/(contents)/Favorites";
import Applications from "../(tabs)/(contents)/Applications";
import Completed from "../(tabs)/(contents)/Completed";
import MyWorks from "../(tabs)/(contents)/MyWorks";
import { getUserData } from "@/lib/services/user";

export default async function MemberProfilePage() {
  const user: IUser = await getUserData();
  if (user.role !== "member") redirect(`/profile/${user.role}`);
  const tabs: ITab[] = [
    { name: "Мои работы", content: <MyWorks /> },
    { name: "Выполненное", content: <Completed /> },
    { name: "Заявки", content: <Applications /> },
    { name: "Избранное", content: <Favorites /> },
    { name: "Достижения", content: <Achievements /> },
  ];
  return (
    <>
      <ProfileSidePanel user={user} />
      <div className="container mt-5">
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}
