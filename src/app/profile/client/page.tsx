import ProfileSidePanel from "@/components/sidePanel/ProfileSidePanel";
import { getClient } from "@/lib/services/user";
import type { ITab } from "@/lib/types/ITab";
import type { IClient } from "@/lib/types/IUser";
import { redirect } from "next/navigation";
import Tabs from "../(tabs)/Tabs";
import Completed from "../(tabs)/(contents)/Completed";
import Applications from "../(tabs)/(contents)/ApplicationsTab";
import Favorites from "../(tabs)/(contents)/Favorites";
import BlackButton from "../(ui)/BlackButton";
import OrdersTab from "../(tabs)/(contents)/OrdersTab";
import OrdersApplicationsTab from "../(tabs)/(contents)/OrdersApplicationsTab";
import { AlignJustifyIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default async function ClientProfilePage() {
  const user: IClient = await getClient();
  if (user.role !== "client") redirect(`/profile/${user.role}`);
  const tabs: ITab[] = [
    {
      name: "Мои заказы",
      content: <OrdersTab index={0} orders={user.orders} />,
    },
    {
      name: "Заявки",
      content: (
        <OrdersApplicationsTab index={1} applications={user.applications} />
      ),
    },
    { name: "Избранное", content: <Favorites index={2} /> },
  ];
  return (
    <>
      <div className="container mt-5 lg:pl-8">
          <ProfileSidePanel user={user} />
        <div className="flex gap-6 py-8 overflow-x-scroll scrollbar-none pl-4">
          <BlackButton href="/order/new" className="border-purple">
            <p className="text-white text-xl">
              <b>Создать заказ</b>
            </p>
          </BlackButton>
          <BlackButton href="/main/competitions">
            <p className="text-white text-2xl">Главная</p>
          </BlackButton>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}
