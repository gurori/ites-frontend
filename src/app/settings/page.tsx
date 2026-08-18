import SettingsLayout from "../profile/(settings)/SettingsLayout";
import UpdateProfileProperty from "../profile/(settings)/UpdateProfileProperty";
import { getRole, getToken } from "@/lib/services/user";
import DeleteAccauntButton from "./DeleteAccauntButton";

export default async function SettingsPage() {
  const token = getToken()!;
  const role = getRole()!;

  return (
    <SettingsLayout
      backUrl={`/profile/${role}`}
      title="Настройки"
      className="h-screen center"
    >
      <UpdateProfileProperty
        className="grid gap-4 place-items-start"
        text="Удалить аккаунт"
      >
        <p className="text-white">
          После того, как вы удалите свой аккаунт, пути назад не будет.
          Пожалуйста, будьте уверены.
        </p>
        <DeleteAccauntButton token={token} />
      </UpdateProfileProperty>
    </SettingsLayout>
  );
}
