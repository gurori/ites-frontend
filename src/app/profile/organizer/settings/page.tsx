import ProfileSettings from "./ProfileSettings";
import { getToken } from "@/lib/services/user";

export default function SettingsPage() {
  const token = getToken()!
  
  return <ProfileSettings token={token!} />;
}
