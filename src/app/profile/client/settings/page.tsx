import { redirect } from "next/navigation";
import ProfileSettings from "./ProfileSettings";
import { getRole, getToken } from "@/lib/services/user";
import SettingsLayout from "../../(settings)/SettingsLayout";

export default function SettingsPage() {
  const token = getToken()!;
  const role = getRole();

  if (role !== "client") {
    redirect(`/profile/${role}`);
  }

  return (
    <SettingsLayout>
      <ProfileSettings token={token} role={role} />
    </SettingsLayout>
  );
}
