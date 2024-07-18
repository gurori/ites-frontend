import { cookies } from "next/headers";
import ProfileSettings from "./ProfileSettings";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  const token = cookies().get("auth");
  if (!token) redirect("/login");
  
  return <ProfileSettings token={token.value} />;
}
