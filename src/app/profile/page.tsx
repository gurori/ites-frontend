import ProfileSidePanel from "@/components/ProfileSidePanel";
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

export default async function ProfilePage() {
  const getUserData = async (): Promise<IUser> => {
    const token = cookies().get("auth");
    if(token === undefined)
      redirect("/login")
    const user: IUser = await fetch("https://localhost:52666/api/User/profile", {
      credentials: 'include',
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .then(async (res) => {
      if(res.status === 401)
        redirect("/login");
      return await res.json()});
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
