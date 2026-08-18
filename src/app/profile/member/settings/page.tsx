import SettingsLayout from "../../(settings)/SettingsLayout";
import ProfileSettings from "./ProfileSettings";
import { getToken } from "@/lib/services/user";

export default function SettingsPage() {
  const token = getToken()!
  
  return (
    <SettingsLayout backUrl="/profile/member">
      <ProfileSettings token={token} />
    </SettingsLayout>
  );
}
