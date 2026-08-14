import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logout from "./Logout";
import s from "./Logout.module.css";

export default async function LogoutPage() {
  if (!cookies().has("auth")) redirect("/");

  return (
    <div className="h-screen bg-black center">
      <div className={s.logout}>
        <p className="text-white">Вы уверены, что хоите выйти?</p>
        <div className="flex gap-4 justify-self-end">
          <Logout />
        </div>
      </div>
    </div>
  );
}
