import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import Tabs from "./(tabs)/Tabs";
import { cookies } from "next/headers";
import { IUser } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import { ITab } from "@/lib/types/ITab";
import MyWorks from "./(tabs)/(contents)/MyWorks";
import Completed from "./(tabs)/(contents)/Completed";
import Applications from "./(tabs)/(contents)/Applications";
import Favorites from "./(tabs)/(contents)/Favorites";
import Achievements from "./(tabs)/(contents)/Achievements";
import apiFetch from "@/lib/apiFetch";

export default async function ProfilePage() {
  const getUserData = async (): Promise<IUser> => {
    const token = cookies().get("auth");
    if (!token) redirect("/login");
    const user: IUser = await apiFetch("/api/User/profile", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      method: "GET",
    }).then(async (res) => await res.json());
    return user;
  };
  const user: IUser = await getUserData();
  const tabs: ITab[] = [
    { name: "Мои работы", content: <MyWorks /> },
    { name: "Выполненное", content: <Completed /> },
    { name: "Заявки", content: <Applications /> },
    { name: "Избранное", content: <Favorites /> },
    { name: "Достижения", content: <Achievements /> },
  ];
  return (
    <div className="h-screen bg-black flex">
      <ProfileSidePanel user={user} />
      <div className="container mt-5">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
