import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logout from "./Logout";

export default async function LogoutPage() {
  if(!cookies().has("auth"))
    redirect("/")

  return <Logout />;
}