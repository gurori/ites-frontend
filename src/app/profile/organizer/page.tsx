import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { getUserData } from "@/lib/services/user";
import { type ITab } from "@/lib/types/ITab";
import { type IUser } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import Tabs from "../(tabs)/Tabs";
import Completed from "../(tabs)/(contents)/Completed";
import Applications from "../(tabs)/(contents)/Applications";
import Favorites from "../(tabs)/(contents)/Favorites";

export default async function OrganizerProfilePage() {
  const user: IUser = await getUserData();
  if (user.role !== "organizer") redirect(`/profile/${user.role}`);
  const tabs: ITab[] = [
    { name: "Выполненное", content: <Completed /> },
    { name: "Заявки", content: <Applications /> },
    { name: "Избранное", content: <Favorites /> },
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
